
## Step 1. Docker 化專案
- 撰寫 `Dockerfile`，讓後端可容器化啟動
- 撰寫 `docker-compose.yml`（如需 MongoDB 等服務）
- 本地測試 Docker 啟動
- **預估：0.5 ~ 1 天**

---

## Step 2. CI/CD 自動化
- 設定 GitHub Actions（或 GitLab CI），push/PR 自動跑測試、Lint
- 可加自動 build Docker image 步驟
- **預估：0.5 ~ 1 天**

---

## Step 3. 部署到 AWS
- 註冊 AWS 帳號，建立 IAM 權限
- 建立 ECR（Elastic Container Registry），push Docker image
- 用 ECS Fargate、EC2 或 Elastic Beanstalk 部署容器
- 設定環境變數、網路、健康檢查
- **預估：1 ~ 2 天**

---

## Step 4. 文件與驗證
- README 詳細記錄 Docker、CI/CD、AWS 部署步驟
- API 文件（Swagger）補充完整
- 測試部署環境 API 可正常運作
- **預估：0.5 天**

---

### **總計：2.5 ~ 4.5 天**
