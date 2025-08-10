import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from pymongo import MongoClient

# Load environment variables
load_dotenv()

app = FastAPI()

# MongoDB Atlas connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["quora_clone"]
collection = db["questions"]

# Embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

class QuestionRequest(BaseModel):
    question: str

@app.post("/add_question")
def add_question(data: QuestionRequest):
    embedding = model.encode([data.question])[0].tolist()
    collection.insert_one({
        "question": data.question,
        "embedding": embedding
    })
    return {"message": "Question added successfully"}

@app.post("/check_question")
def check_question(data: QuestionRequest):
    embedding = model.encode([data.question])[0].tolist()
    pipeline = [
        {
            "$vectorSearch": {
                "queryVector": embedding,
                "path": "embedding",
                "numCandidates": 100,
                "limit": 1,
                "index": "embedding_index"
            }
        }
    ]
    results = list(collection.aggregate(pipeline))
    if not results:
        return {"is_duplicate": False, "message": "No questions stored yet."}
    best_match = results[0]
    best_score = best_match["score"]
    threshold = 0.7
    return {
        "is_duplicate": best_score >= threshold,
        "best_match_question": best_match["question"],
        "similarity_score": best_score
    }
