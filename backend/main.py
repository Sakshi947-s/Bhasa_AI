import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import google.generativeai as genai
from dotenv import load_dotenv
import shutil
import uuid
import logging
from utils import extract_text, detect_language

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-3-flash-preview')

app = FastAPI(title="BhashaBridge AI Backend")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for extracted text (use Redis/DB for production)
document_store: Dict[str, Dict] = {}

class AnalysisRequest(BaseModel):
    document_id: str
    target_language: str
    mode: str = "general"

@app.get("/documents")
async def list_documents():
    return [
        {
            "id": doc_id,
            "name": data["filename"],
            "language": data["language"],
            "length": len(data["text"])
        }
        for doc_id, data in document_store.items()
    ]

class ChatRequest(BaseModel):
    document_id: str
    message: str
    history: List[dict] = []

@app.get("/")
async def root():
    return {"message": "BhashaBridge AI API is running"}

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    # Generate unique ID for document
    doc_id = str(uuid.uuid4())
    
    # Save file locally for processing
    upload_dir = "uploads"
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
        
    file_path = os.path.join(upload_dir, f"{doc_id}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    logger.info(f"Uploaded filename: {file.filename}")
    
    # Extract text
    try:
        extracted_text = extract_text(file_path)
        logger.info(f"Extracted text preview: {extracted_text[:200]}...")
        
        if not extracted_text.strip():
            logger.warning("No text extracted from document.")
            
        detected_lang = detect_language(extracted_text) if extracted_text.strip() else "unknown"
        
        document_store[doc_id] = {
            "filename": file.filename,
            "text": extracted_text,
            "language": detected_lang,
            "path": file_path
        }
        
        return {
            "document_id": doc_id,
            "filename": file.filename,
            "status": "processed",
            "detected_language": detected_lang,
            "text_length": len(extracted_text)
        }
    except Exception as e:
        logger.error(f"Processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
async def analyze_document(request: AnalysisRequest):
    if request.document_id not in document_store:
        raise HTTPException(status_code=404, detail="Document not found")
    
    doc_data = document_store[request.document_id]
    text = doc_data["text"]
    
    if not text.strip():
        return {
            "summary": "No text could be extracted from this document to summarize.",
            "highlights": [],
            "risks": [],
            "detected_language": doc_data["language"],
            "confidence": 0.0
        }

    prompt = f"""
    Analyze the following document text and provide a detailed analysis in JSON format.
    Mode: {request.mode}
    Target Language for Summary: English
    
    Text:
    {text[:10000]}  # Limiting to 10k chars for Gemini Flash
    
    Required JSON structure:
    {{
        "summary": "A concise executive summary",
        "highlights": ["Key point 1", "Key point 2", ...],
        "risks": [
            {{"type": "Risk Level", "text": "Risk description"}},
            ...
        ],
        "insights": [
            {{"label": "Insight label", "value": "Insight value", "type": "deadline|payment|risk"}}
        ],
        "detected_language": "Detected language name",
        "confidence": 0.95
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        # Extract JSON from response (handling potential markdown)
        import json
        response_text = response.text
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()
        
        analysis = json.loads(response_text)
        logger.info(f"Summary response for {doc_data['filename']}: {analysis['summary'][:100]}...")
        return analysis
    except Exception as e:
        logger.error(f"AI Analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to analyze document with AI")

@app.post("/translate")
async def translate_text(text: str = Form(...), target_lang: str = Form(...)):
    prompt = f"Translate the following text into {target_lang}. Return only the translated text.\n\nText: {text}"
    try:
        response = model.generate_content(prompt)
        return {
            "translated_text": response.text.strip(),
            "language": target_lang
        }
    except Exception as e:
        logger.error(f"Translation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Translation failed")

@app.post("/chat")
async def chat_with_document(request: ChatRequest):
    if request.document_id not in document_store:
        raise HTTPException(status_code=404, detail="Document not found")
    
    doc_data = document_store[request.document_id]
    context = doc_data["text"][:15000]
    
    chat = model.start_chat(history=[])
    system_prompt = f"You are an AI assistant helping a user understand a document. Context: {context}\n\nAnswer the user's question based on the document."
    
    try:
        response = chat.send_message(f"{system_prompt}\n\nUser: {request.message}")
        return {
            "response": response.text,
            "source_nodes": ["Extracted from document"]
        }
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail="Chat failed")

@app.post("/tts")
async def text_to_speech(text: str = Form(...), lang: str = Form("en")):
    from gtts import gTTS
    import base64
    from io import BytesIO
    
    try:
        # Map some common language names to codes
        lang_map = {
            "Hindi (हिन्दी)": "hi",
            "Bengali (বাংলা)": "bn",
            "Tamil (தமிழ்)": "ta",
            "Telugu (తెలుగు)": "te",
            "Marathi (मराठी)": "mr",
            "English": "en"
        }
        lang_code = lang_map.get(lang, "en")
        
        tts = gTTS(text=text, lang=lang_code)
        fp = BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        
        audio_base64 = base64.b64encode(fp.read()).decode("utf-8")
        return {"audio": audio_base64}
    except Exception as e:
        logger.error(f"TTS error: {str(e)}")
        raise HTTPException(status_code=500, detail="TTS failed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
