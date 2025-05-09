Secure AI Chatbot
Secure AI Chatbot is a locally deployed, offline-capable chatbot system developed using React and FastAPI. It provides user registration and login, streaming conversations, and optional secure file processing, making it suitable for internal use by government agencies, NGOs, or organizations with strict data security and privacy requirements.

Features
User Authentication: Supports secure user registration and login with session-based access.

Streaming Chat Interface: Real-time conversation with streaming model responses, including an optional "thinking phase".

Offline File Analysis (Optional): Enables secure document-based question answering using local file parsing and retrieval-augmented generation (RAG).

Customizable Interface: Clean, modern UI styled with institutional branding; includes dark mode.

Multilingual Support: Supports over 29 languages including Arabic.

Local LLM Integration: Supports running LLMs such as Qwen or DeepSeek through Ollama without reliance on external APIs or internet.

Data Isolation: All interactions, files, and chat history are stored and processed locally.

Architecture Overview
Component	Technology
Frontend	React, TypeScript, TailwindCSS
Backend	FastAPI, Uvicorn, SQLite
AI Model Layer	Ollama, LangChain (optional)
Storage	SQLite3, Local filesystem

Installation and Setup
Prerequisites
Python 3.9 or higher

Node.js 16 or higher

(Optional) Ollama installed locally for LLM execution

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/YanxiangDu2023/Secure-AI-Chatbot.git
cd Secure-AI-Chatbot
2. Backend Setup
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start backend server
uvicorn app.main:app --host 127.0.0.1 --port 8000
If you plan to use document-based answering, ensure the following Python packages are installed:
pymupdf, python-magic, langchain, llama-index, ollama, etc.

3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install --legacy-peer-deps
npm start
4. (Optional) Running a Local Language Model
bash
Copy
Edit
ollama pull qwen2:1.5b
ollama run qwen2:1.5b
Use Qwen for multilingual content and document analysis.
Use DeepSeek for logical tasks requiring reasoning and intermediate “thinking phase” output.

Usage
Navigate to http://localhost:3000

Register a new account or log in

Start a new conversation or continue from previous sessions

Upload documents (if enabled) for content-aware interactions

Project Structure
bash
Copy
Edit
Secure-AI-Chatbot/
├── backend/           # FastAPI backend
│   └── app/           # Core logic and API routes
├── frontend/          # React client application
│   └── src/
└── README.md
Data Privacy Notice
This system is designed for local use in secured environments.
No data is sent to third-party services. All operations and storage remain fully offline.
External deployment is not recommended unless appropriate safeguards are implemented.

