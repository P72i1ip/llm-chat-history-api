## Step 1. 重構後端資料結構（如需拆分 Message collection）

- [ ] 拆分 Message 為獨立 collection，Conversation 只存 message id array
- [ ] 調整 controller 與 API 路由，確保 CRUD 正常
- [ ] 測試原有功能是否正常

## Step 2. 串接 GPT API

- [ ] 在後端新增 `/chat` 路由，接收用戶訊息
- [ ] 呼叫 OpenAI GPT API，取得回覆
- [ ] 將用戶訊息與 GPT 回覆都存入 Message collection
- [ ] 加入錯誤處理（API key、rate limit、失敗重試等）
- [ ] README 補充 GPT API 串接流程

## Step 3. 建立前端 MVP

- [ ] 建立 React + TypeScript 前端專案
- [ ] 註冊/登入頁面，表單驗證
- [ ] 聊天頁面（顯示歷史訊息、輸入新訊息）
- [ ] 串接後端 API（註冊、登入、取得聊天紀錄、發送訊息）
- [ ] 登入後用 JWT 管理 session
- [ ] README 補充前端啟動方式與 API 串接說明

## Step 4. 基本測試與文件

- [ ] 撰寫主要 API 測試（Jest/Supertest）
- [ ] 完善 Swagger API 文件
- [ ] README 更新所有新功能與啟動方式

## Step 5. 部署與加分項目（可選）

- [ ] 加入 Dockerfile，支援一鍵啟動
- [ ] 部署到 Render/Heroku/Vercel，提供 Demo 連結
- [ ] 加入 express-rate-limit、helmet 等安全中介軟體

---

**建議做法：**  
每完成一個步驟就 commit，並在 README 記錄進度。  
先確保「註冊/登入 → 聊天 UI → GPT 串接」三大流程跑通，  
再補齊測試、文件與部署。
