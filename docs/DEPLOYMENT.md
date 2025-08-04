# 🚀 Deployment to AWS

This document provides a detailed, step-by-step guide for deploying this containerized application to **AWS Elastic Container Service (ECS)**. We will use the **Fargate** launch type for a serverless deployment.

## Prerequisites

1. A valid **AWS Account**.
2. **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** installed and running locally.
3. **[AWS CLI](https://aws.amazon.com/cli/)** installed and configured.

### Deployment Flow Overview

1. **Create an IAM User**: For security, create a user with specific permissions to perform the deployment.
2. **Push Image to ECR**: Build the Docker image locally and upload it to AWS's private container registry (Elastic Container Registry).
3. **Configure ECS Resources**: Set up the necessary Cluster, Task Definition, and Service on the AWS Console.
4. **Verify Deployment**: Access the service via its public IP to confirm a successful deployment.

---

## Step 1: Create an IAM User

To securely interact with AWS from your local machine, we will create an IAM user with only the necessary permissions.

1. Log in to the AWS Console and navigate to the **IAM** service.
2. In the left navigation pane, select **Users** and click **Create user**.
3. **User name**: Enter a meaningful name (e.g., `llm-api-deployer`). **Do not** check the box for "Provide user access to the AWS Management Console".
4. **Set permissions**: Choose **Attach policies directly**, then search for and attach the following two AWS-managed policies:
   - `AmazonECS_FullAccess`
   - `AmazonEC2ContainerRegistryFullAccess`
5. After creating the user, navigate to their **Security credentials** tab and click **Create access key**.
6. Select **Command Line Interface (CLI)** as the use case and create the key.
7. **Save your `Access Key ID` and `Secret Access Key`**.
8. In your local terminal, run `aws configure` and enter the credentials you just obtained, along with your default region (e.g., `ap-southeast-2`).

## Step 2: Push Docker Image to ECR

ECR is a private Docker image registry provided by AWS.

1. **Create an ECR Repository**:

   ```bash
   # Replace your-app-name and your-aws-region with your own settings
   aws ecr create-repository --repository-name your-app-name --region your-aws-region
   ```

2. **Log in to ECR**:

   ```bash
   # Replace 123456789012 and your-aws-region with your AWS Account ID and region
   aws ecr get-login-password --region your-aws-region | docker login --username AWS --password-stdin 123456789012.dkr.ecr.your-aws-region.amazonaws.com
   ```

3. **Build, Tag, and Push the Image**:

   ```bash
   # 1. Build locally
   docker build -t your-app-name .

   # 2. Tag the image for the remote repository
   docker tag your-app-name:latest 123456789012.dkr.ecr.your-aws-region.amazonaws.com/your-app-name:latest

   # 3. Push to ECR
   docker push 123456789012.dkr.ecr.your-aws-region.amazonaws.com/your-app-name:latest
   ```

## Step 3: Configure ECS Resources (on the AWS Console)

### 3.1 Create an ECS Cluster

1. Navigate to the **ECS** service, select **Clusters** from the left pane, and click **Create cluster**.
2. **Cluster name**: Enter a name (e.g., `my-app-cluster`).
3. **Infrastructure**: Select **AWS Fargate (serverless)**.
4. Click **Create**.

### 3.2 Create a Task Definition

1. Select **Task Definitions** from the left pane and click **Create new task definition**.
2. **Task definition family**: Enter a name (e.g., `my-app-task-def`).
3. **Launch type**: Select **AWS Fargate**.
4. **Task size**: Assign CPU and memory (e.g., `0.5 vCPU`, `1 GB Memory`).
5. **Container details**:
   - **Name**: A name for the container (e.g., `my-app-container`).
   - **Image URI**: Paste the image URI you pushed to ECR in Step 2.
   - **Port mappings**: Add a new rule, setting **Container port** to `8000`.
   - **Environment variables**: Click **Add environment variable** and add all the key-value pairs from your `.env` file one by one.

### 3.3 Create a Service

1. Return to your cluster's page and click **Create** under the **Services** tab.
2. **Compute configuration**: Ensure you are using the **FARGATE** capacity provider.
3. **Deployment configuration**:
   - **Task Definition**: Select the `my-app-task-def` you just created.
   - **Service name**: Enter a name (e.g., `my-app-service`).
   - **Desired tasks**: Enter `1`.
4. **Networking**:
   - Select your default **VPC** and at least **two Subnets**.
   - **Security Group**: Create a new security group and add an **Inbound rule**:
     - **Type**: `Custom TCP`
     - **Port range**: `8000`
     - **Source**: `Anywhere-IPv4` (`0.0.0.0/0`)
   - **Public IP**: Ensure this option is **Turned on**.
5. Click **Create**.

## Step 4: Verify the Deployment

1. Wait a few minutes for the service's task status to become **RUNNING**.
2. Click on the task ID to view its details.
3. In the **Network** section, copy the **Public IP** address.
4. In your browser, navigate to `http://<Your Public IP>:8000/api-docs`. If you can see the Swagger UI, the deployment was
