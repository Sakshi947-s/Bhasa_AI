import pdfplumber
import docx
import pytesseract
from PIL import Image
import io
from langdetect import detect
import os

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    
    # If no text extracted, try OCR
    if not text.strip():
        # This is a fallback for scanned PDFs
        # For simplicity, we just return empty for now, but in a real app we'd convert pages to images
        pass
    return text

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

def gemini_ocr(file_path):
    """Fallback OCR using Gemini's multi-modal capabilities"""
    import google.generativeai as genai
    model = genai.GenerativeModel('gemini-3-flash-preview')
    
    # Upload the file to Gemini if it's large, or just send bytes
    # For simplicity, we'll read bytes
    with open(file_path, "rb") as f:
        image_data = f.read()
    
    mime_type = "image/jpeg"
    if file_path.endswith(".png"): mime_type = "image/png"
    elif file_path.endswith(".pdf"): mime_type = "application/pdf"

    prompt = "Extract all text from this document accurately. Maintain the structure as much as possible."
    response = model.generate_content([
        prompt,
        {"mime_type": mime_type, "data": image_data}
    ])
    return response.text

def extract_text_from_image(file_path):
    # Try pytesseract first
    try:
        text = pytesseract.image_to_string(Image.open(file_path))
        if text.strip():
            return text
    except Exception as e:
        print(f"Local OCR Error: {e}")
    
    # Fallback to Gemini OCR
    try:
        return gemini_ocr(file_path)
    except Exception as e:
        print(f"Gemini OCR Error: {e}")
        return ""

def extract_text(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == '.pdf':
        text = extract_text_from_pdf(file_path)
        if not text.strip():
            # Scanned PDF - use Gemini OCR
            return gemini_ocr(file_path)
        return text
    elif ext in ['.doc', '.docx']:
        return extract_text_from_docx(file_path)
    elif ext in ['.jpg', '.jpeg', '.png']:
        return extract_text_from_image(file_path)
    else:
        return ""

def detect_language(text):
    try:
        return detect(text)
    except:
        return "en"
