# =========================
# 0. LOAD ENV VARIABLES
# =========================
from dotenv import load_dotenv
import os
import requests

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


# =========================
# 1. LOAD TEXT FILE
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(BASE_DIR, "uploads", "knowledge.txt")

def load_text_file(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"{file_path} not found")

    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


# =========================
# 2. LOAD CONTEXT ONCE
# =========================
context_data = load_text_file(file_path)


# =========================
# 3. GROQ API
# =========================
def ask_groq(prompt):
    if not GROQ_API_KEY:
        return "API key not configured properly"

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
# 4. MAIN FUNCTION
# =========================
def get_answer(query):
    prompt = f"""
You are Yash Pratap Rai.

STRICT RULES:
- Answer ONLY from context
- If not found, say "I haven't worked on that yet"

Context:
{context_data}

Question:
{query}

Answer:
"""

    return ask_groq(prompt)