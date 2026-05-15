# Bhasa AI

A comprehensive AI-powered platform for language processing, analysis, and translation. Bhasa AI combines a modern Next.js frontend with a robust Python backend to provide intelligent language services.

## 🌟 Features

- **Chat Interface**: Real-time AI conversations and interactions
- **Document Analysis**: Intelligent analysis of uploaded documents
- **Voice Processing**: Voice-to-text and audio analysis capabilities
- **Translation Services**: Multi-language translation powered by AI
- **Document Summarization**: Automatic generation of document summaries
- **Customizable Settings**: User preferences and configuration management
- **File Management**: Upload and manage documents seamlessly
- **Responsive Dashboard**: Modern, intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React 18+)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm

### Backend
- **Language**: Python 3.8+
- **Framework**: Flask/FastAPI (check requirements.txt)
- **Model Integration**: AI model loading and management
- **API Server**: RESTful API architecture

## 📁 Project Structure

```
bhasa/
├── backend/
│   ├── main.py              # Main application entry point
│   ├── list_models.py       # AI model listing and management
│   ├── utils.py             # Utility functions
│   ├── requirements.txt      # Python dependencies
│   └── uploads/             # User uploaded files
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                 # Landing page
│   │   │   ├── layout.tsx               # Root layout
│   │   │   ├── globals.css              # Global styles
│   │   │   └── dashboard/
│   │   │       ├── page.tsx             # Dashboard home
│   │   │       ├── layout.tsx           # Dashboard layout
│   │   │       ├── chat/                # Chat interface
│   │   │       ├── analysis/            # Document analysis
│   │   │       ├── translations/        # Translation services
│   │   │       ├── voice/               # Voice processing
│   │   │       ├── summaries/           # Document summaries
│   │   │       ├── uploads/             # File management
│   │   │       └── settings/            # User settings
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   └── Sidebar.tsx          # Dashboard navigation
│   │   │   └── landing/
│   │   │       ├── Navbar.tsx           # Navigation bar
│   │   │       └── Hero.tsx             # Hero section
│   │   └── lib/
│   │       └── utils.ts                 # Frontend utilities
│   ├── public/                          # Static assets
│   ├── package.json                     # Dependencies
│   ├── next.config.ts                   # Next.js configuration
│   ├── tsconfig.json                    # TypeScript configuration
│   └── README.md                        # Frontend-specific docs
├── test_doc.txt                         # Test documentation
└── README.md                            # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (for frontend)
- Python 3.8+ and pip (for backend)
- Git

### Installation

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - **Windows**:
   ```bash
   venv\Scripts\activate
   ```
   - **Mac/Linux**:
   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the backend server:
```bash
python main.py
```

The backend API should now be running (typically on `http://localhost:5000` or similar).

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file for environment variables (if needed):
```bash
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Run the development server:
```bash
npm run dev
```

The frontend should now be accessible at `http://localhost:3000`.

## 📝 Usage

### Development

**Frontend Development:**
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

**Backend Development:**
```bash
cd backend
python main.py       # Start development server
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
Deploy using your preferred method (Docker, Heroku, AWS, etc.)

## 🔄 API Endpoints

The backend provides RESTful API endpoints for:

- `/api/chat` - Chat interactions
- `/api/analyze` - Document analysis
- `/api/translate` - Translation services
- `/api/summarize` - Text summarization
- `/api/voice` - Voice processing
- `/api/models` - Available models listing
- `/api/upload` - File upload handling

(See backend/main.py for detailed endpoint documentation)

## 🗂️ File Upload

Users can upload documents through the **Uploads** section in the dashboard. Uploaded files are stored in the `backend/uploads/` directory.

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Bhasa AI
```

### Backend Configuration

Edit backend settings in `backend/main.py` or create a config file for production.

## 📦 Dependencies

### Frontend Dependencies
- Next.js, React, TypeScript, ESLint, PostCSS
- See `frontend/package.json` for complete list

### Backend Dependencies
- See `backend/requirements.txt` for Python packages

## 🧪 Testing

(Add testing instructions as your test suite develops)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate documentation.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For issues, questions, or suggestions, please:
- Open an issue on GitHub
- Contact the development team
- Check existing documentation in the codebase

## 👥 Authors

- **Sakshi947-s** - Initial development and maintenance

## 🔮 Future Enhancements

- [ ] Enhanced AI model fine-tuning
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Multi-language UI support
- [ ] User authentication and authorization
- [ ] Document versioning
- [ ] API rate limiting and security improvements

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Python Documentation](https://docs.python.org/)

---

**Last Updated**: May 15, 2026

Made with ❤️ by the Bhasa AI Team
