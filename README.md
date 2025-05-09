
## Secure AI Chatbot

**Secure AI Chatbot** is a locally deployed, offline-capable chatbot system designed for internal use by governmental bodies or international organizations. It features secure user authentication, document-aware AI conversations, and a fully private architecture for environments where data isolation is critical.

---

## System Overview

* **Frontend**: React + TypeScript with institutional styling
* **Backend**: Python FastAPI + Uvicorn
* **AI Support**: Local large language models via [Ollama](https://ollama.com)
* **Security**: Air-gapped mode, no third-party dependencies at runtime


---

## Interface Preview

### Login Page
<img width="566" alt="Pasted Graphic 1" src="https://github.com/user-attachments/assets/6b367e45-7b6d-492f-ba35-e9cb9218612a" />


### Registration Page

<img width="496" alt="Pasted Graphic 2" src="https://github.com/user-attachments/assets/741956d1-9903-4755-b980-deda1c24d49f" />


### Main Chat Interface

<img width="1015" alt="Pasted Graphic" src="https://github.com/user-attachments/assets/a24eb3de-b4da-458c-97ac-43103c3a6460" />


> *Note: Screenshots show branding for demonstration only. Logo and colors can be customized.*

---

## Features

* User account registration and login
* Local chat history with multi-session support
* Real-time streaming responses with optional "thinking phase"
* File upload and secure document QA (PDF, TXT, DOCX, etc.)
* Arabic RTL input support
* Dark/light mode toggle

---

## Installation Guide

### Prerequisites

* Python ≥ 3.9
* Node.js ≥ 16
* (Optional) [Ollama](https://ollama.com) for model execution
* Local models such as `qwen2:1.5b`, `deepseek-coder:1.3b`

---

### 1. Clone and Setup

```bash
git clone https://github.com/YanxiangDu2023/Secure-AI-Chatbot.git
cd Secure-AI-Chatbot
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start API server
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

> Optional modules: `pymupdf`, `python-magic`, `langchain`, `ollama`, `llama-index`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install --legacy-peer-deps
npm start
```

---

### 4. Running Models with Ollama (Optional)

```bash
ollama pull qwen2:1.5b
ollama run qwen2:1.5b
```

---

## Project Structure

```
Secure-AI-Chatbot/
├── backend/
│   ├── app/
│   └── routes/
├── frontend/
│   └── src/
│       └── assets/screenshots/
└── README.md
```

---

## Security Notice

All chat logs, user data, and uploaded files are processed and stored locally. This system does **not** rely on any external APIs or cloud services, ensuring complete data privacy.


---

### ✅ To Do:

* [ ] Add role-based user permissions
* [ ] Support private vector store indexing
* [ ] Deployable as a Docker container

