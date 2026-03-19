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
                "content": (
                    "You are an AI agent representing Yash Pratap Rai on his portfolio website. "
                    "Your job is to answer visitor questions about Yash — his skills, projects, experience, education, and background. "
                    "STRICT RULES:\n"
                    "- Answer ONLY using the provided context. Never invent or assume facts.\n"
                    "- Be concise, friendly, and professional — like a personal assistant.\n"
                    "- If the answer is not in the context, respond: 'I don't have that information yet, but feel free to reach out to Yash directly!'\n"
                    "- Do NOT answer questions unrelated to Yash (e.g. general coding help, world news, etc.)."
                )
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
# 4. GREETING DETECTION
# =========================
GREETINGS = {
    "hi", "hii", "hiii", "hey", "hello", "heya", "howdy",
    "good morning", "good afternoon", "good evening", "greetings",
    "what's up", "whats up", "sup", "yo"
}

def is_greeting(query):
    return query.strip().lower().rstrip("!.,?") in GREETINGS


# =========================
# 5. MAIN FUNCTION
# =========================
def get_answer(query):
    if is_greeting(query):
        return (
            "Hello! 👋 Welcome to Yash Pratap Rai's portfolio. "
            "I'm his AI agent — feel free to ask me anything about his skills, "
            "projects, experience, or background. How can I help you today?"
        )

    prompt = f"""You are representing Yash Pratap Rai on his portfolio.

STRICT RULES:
- Answer ONLY from the context below. Never make up information.
- Keep answers clear and concise (2-4 sentences unless more detail is needed).
- If the answer is not found in the context, say: "I don't have that information yet, but feel free to reach out to Yash directly!"
- Do NOT answer anything unrelated to Yash (general questions, coding help, etc.).

Context:
{context_data}

Visitor's Question:
{query}

Answer:"""

    return ask_groq(prompt)