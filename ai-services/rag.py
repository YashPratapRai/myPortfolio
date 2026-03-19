# =========================
# 0. LOAD ENV VARIABLES
# =========================
from dotenv import load_dotenv
import os
import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(BASE_DIR, ".env")

load_dotenv(dotenv_path=env_path)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("Loaded API KEY:", GROQ_API_KEY)  # debug


# =========================
# 1. LOAD TEXT FILE
# =========================
def load_text_file(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"{file_path} not found")

    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


# =========================
# 2. SPLIT TEXT
# =========================
from langchain_text_splitters import RecursiveCharacterTextSplitter

def split_text(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )
    return splitter.split_text(text)


# =========================
# 3. CREATE VECTOR DB
# =========================
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

def create_vector_db(chunks):
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    db = FAISS.from_texts(chunks, embeddings)
    return db


# =========================
# 4. RETRIEVAL
# =========================
def retrieve_docs(db, query):
    return db.similarity_search(query, k=5)


# =========================
# 5. GROQ API
# =========================
def ask_groq(prompt):
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY not found in .env")

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {
                "role": "system",
                "content": """You are Yash Pratap Rai, a software developer.

STRICT RULES:
- Answer ONLY from the given context
- Do NOT make up anything
- If answer not found, say: "I haven't worked on that yet"
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    try:
        res = requests.post(url, headers=headers, json=data)

        if res.status_code != 200:
            print("GROQ Error:", res.text)
            return "Error from AI service"

        return res.json()["choices"][0]["message"]["content"]

    except Exception as e:
        return f"Error: {str(e)}"


# =========================
# 6. LAZY LOAD RAG (IMPORTANT 🔥)
# =========================
db = None

file_path = os.path.join(BASE_DIR, "uploads", "knowledge.txt")

def init_rag():
    global db

    if db is None:
        print("Loading RAG pipeline...")

        text = load_text_file(file_path)
        chunks = split_text(text)
        db = create_vector_db(chunks)

        print("RAG ready ✅")


# =========================
# 7. MAIN FUNCTION
# =========================
def get_answer(query):
    init_rag()  # 🔥 load only when needed

    docs = retrieve_docs(db, query)

    context = "\n".join([doc.page_content for doc in docs])

    prompt = f"""
You are Yash Pratap Rai.

STRICT RULES:
- Answer ONLY from context
- If not found, say "I haven't worked on that yet"

Context:
{context}

Question:
{query}

Answer:
"""

    return ask_groq(prompt)