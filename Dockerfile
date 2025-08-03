# --- Stage 1: 選擇基礎環境 ---
# 我們從一個官方的、輕量的 Node.js 18 環境開始。
# 'alpine' 是一個極簡的 Linux 發行版，讓我們的映像檔更小、更安全。
FROM node:18-alpine

# --- Stage 2: 設定工作空間 ---
# 在容器內部建立一個資料夾，之後的所有操作都會在這裡進行。
WORKDIR /usr/src/app

# --- Stage 3: 安裝依賴 (最重要的一步) ---
# 為什麼只先複製 package.json？
# Docker 在建置時是一層一層的。只要這一層的檔案沒變，Docker 就會使用快取。
# 你的依賴套件通常不常變動，但你的程式碼會。
# 這樣做可以讓我們在修改程式碼後，重新建置時跳過 `npm install` 這最耗時的一步。
COPY package*.json ./

# 執行 `npm ci`。它比 `npm install` 更適合在 CI/CD 或正式環境使用，
# 因為它會嚴格按照 package-lock.json 安裝，速度更快且版本更穩定。
# --only=production 告訴 npm 只安裝正式環境需要的依賴，忽略 devDependencies。
RUN npm ci --only=production

# --- Stage 4: 複製程式碼 ---
# 現在依賴都裝好了，再把專案的所有檔案複製進來。
COPY . .

# --- Stage 5: 宣告與啟動 ---
# 告訴 Docker，我們的應用程式會使用 8000 port。
# 這只是一個宣告，實際的 port 映射會在執行時設定。
EXPOSE 8000

# 設定容器啟動時要執行的預設指令。
# 就是在終端機裡執行 `node server.js`。
CMD [ "node", "server.js" ]