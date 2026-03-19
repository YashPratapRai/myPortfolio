from fastapi import FastAPI
from rag import get_answer

app = FastAPI()

@app.get("/")
def home():
    return {"message": "AI Service Running 🚀"}

@app.get("/chat")
def chat(query: str):
    try:
        answer = get_answer(query)
        return {"response": answer}
    except Exception as e:
        return {"error": str(e)}