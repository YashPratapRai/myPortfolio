from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware   # 👈 ADD HERE
from rag import get_answer

app = FastAPI()

# 👇 ADD CORS RIGHT AFTER app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # later replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 request model
class Query(BaseModel):
    query: str

@app.get("/")
def home():
    return {"message": "AI Service Running 🚀"}

@app.post("/chat")
def chat(data: Query):
    try:
        answer = get_answer(data.query)
        return {"response": answer}
    except Exception as e:
        return {"error": str(e)}