"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Languages, 
  Mic, 
  MessageSquare, 
  ArrowLeft, 
  Download, 
  Share2,
  AlertTriangle,
  Calendar,
  CreditCard,
  Stethoscope,
  Scale,
  GraduationCap,
  Sprout,
  ChevronRight,
  Play,
  Volume2,
  Send,
  Zap,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const modes = [
  { id: 'general', name: 'General', icon: FileText, color: 'text-blue-100/50', theme: 'from-slate-800 to-slate-900' },
  { id: 'medical', name: 'Medical', icon: Stethoscope, color: 'text-blue-400', theme: 'from-blue-600 to-blue-800' },
  { id: 'legal', name: 'Legal', icon: Scale, color: 'text-blue-100/40', theme: 'from-slate-700 to-slate-900' },
  { id: 'student', name: 'Student', icon: GraduationCap, color: 'text-purple-400', theme: 'from-purple-600 to-purple-800' },
  { id: 'farmer', name: 'Farmer', icon: Sprout, color: 'text-emerald-400', theme: 'from-emerald-600 to-emerald-800' },
];

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState("summary");
  const [currentMode, setCurrentMode] = useState(modes[0]);
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("Document");
  const [targetLang, setTargetLang] = useState("Hindi (हिन्दी)");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const docId = localStorage.getItem("current_document_id");
    const fname = localStorage.getItem("current_filename");
    if (docId) {
      setDocumentId(docId);
      setFilename(fname || "Document");
      fetchAnalysis(docId, currentMode.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAnalysis = async (docId: string, mode: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_id: docId, target_language: "English", mode }),
      });
      const data = await response.json();
      setAnalysisData(data);
    } catch (error) {
      console.error("Analysis fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (modeId: string) => {
    const mode = modes.find(m => m.id === modeId) || modes[0];
    setCurrentMode(mode);
    if (documentId) fetchAnalysis(documentId, modeId);
  };

  const handleTranslate = async (lang: string) => {
    setTargetLang(lang);
    if (!analysisData?.summary) return;
    
    setIsTranslating(true);
    try {
      const response = await fetch("http://localhost:8000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          text: analysisData.summary,
          target_lang: lang
        })
      });
      const data = await response.json();
      setTranslatedText(data.translated_text);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVoice = async () => {
    if (!analysisData?.summary || isPlaying) return;
    
    setIsPlaying(true);
    try {
      const response = await fetch("http://localhost:8000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          text: translatedText || analysisData.summary,
          lang: targetLang
        })
      });
      const data = await response.json();
      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
      audio.onended = () => setIsPlaying(false);
      audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'translation' && !translatedText && analysisData?.summary) {
      handleTranslate(targetLang);
    }
  }, [activeTab, analysisData]);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-6 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center text-secondary animate-spin">
          <Zap size={40} />
        </div>
        <h2 className="text-2xl font-bold">Analyzing your document...</h2>
        <p className="text-blue-100/40">Gemini is extracting insights and detecting risks</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-700">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/uploads" className="p-2 hover:bg-blue-400/5 rounded-xl transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-poppins">{filename}</h1>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-blue-100/50">Detected: <span className="text-white font-bold uppercase">{analysisData?.detected_language || "Detecting..."}</span></span>
              <span className="text-blue-100/50">Confidence: <span className="text-emerald-400 font-bold">{Math.round((analysisData?.confidence || 0) * 100)}%</span></span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-white/10 mx-2" />
          
          <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl border-white/5">
            <span className="text-[10px] font-bold text-blue-100/40 uppercase tracking-widest">Mode</span>
            <select 
              value={currentMode.id}
              onChange={(e) => handleModeChange(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-bold text-white cursor-pointer"
            >
              {modes.map(mode => (
                <option key={mode.id} value={mode.id} className="bg-slate-900">{mode.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="glass p-2.5 rounded-xl hover:bg-white/10 transition-all">
            <Share2 size={18} />
          </button>
          <button className="glass px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all font-bold text-sm">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        
        {/* Left Column - Summary & Translation */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col h-full">
            {/* Tab Navigation */}
            <div className="flex border-b border-white/10 p-2 gap-2">
              <button 
                onClick={() => setActiveTab("summary")}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'summary' ? 'bg-white/10 text-white' : 'text-blue-100/40 hover:text-blue-50/70'}`}
              >
                <FileText size={18} /> Summary
              </button>
              <button 
                onClick={() => setActiveTab("translation")}
                className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'translation' ? 'bg-white/10 text-white' : 'text-blue-100/40 hover:text-blue-50/70'}`}
              >
                <Languages size={18} /> Translation
              </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
              {activeTab === 'summary' ? (
                <div className="space-y-8">
                  {/* AI Generated Summary */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
                    <p className="text-blue-50/70 leading-relaxed text-lg">
                      {analysisData?.summary || "No summary available."}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  {analysisData?.highlights && analysisData.highlights.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="glass p-5 rounded-3xl bg-emerald-500/5 border-emerald-500/10">
                        <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                          <ChevronRight size={16} /> Key Terms
                        </h3>
                        <ul className="text-sm text-blue-100/50 space-y-2 list-disc list-inside">
                          {analysisData.highlights.map((h: string, i: number) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="glass p-5 rounded-3xl bg-secondary/5 border-secondary/10">
                        <h3 className="font-bold text-secondary mb-2 flex items-center gap-2">
                          <AlertTriangle size={16} /> Risk Alerts
                        </h3>
                        <ul className="text-sm text-blue-100/50 space-y-2 list-disc list-inside">
                          {analysisData.risks?.map((r: any, i: number) => (
                            <li key={i}>{r.text}</li>
                          )) || <li>No risks detected.</li>}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Interactive Cards */}
                  {analysisData?.insights && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-blue-100/50 text-sm uppercase tracking-wider">Critical Insights</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {analysisData.insights.map((insight: any, i: number) => (
                          <InsightCard 
                            key={i}
                            icon={insight.type === 'deadline' ? <Calendar className="text-blue-400" /> : <CreditCard className="text-amber-400" />}
                            label={insight.label}
                            value={insight.value}
                            type={insight.type}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <select className="bg-blue-400/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-secondary">
                        <option>English (Source)</option>
                      </select>
                      <ChevronRight size={16} className="text-blue-100/30" />
                      <select 
                        value={targetLang}
                        onChange={(e) => handleTranslate(e.target.value)}
                        className="bg-blue-400/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-secondary"
                      >
                        <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                        <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
                        <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
                        <option value="Telugu (తెలుగు)">Telugu (తెలుగు)</option>
                        <option value="Marathi (मराठी)">Marathi (मराठी)</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-secondary text-white">Formal</button>
                      <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-400/5 text-blue-100/50 hover:text-white">Simple</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-blue-100/40 uppercase tracking-widest">Original Summary</div>
                      <div className="glass p-6 rounded-3xl text-sm text-blue-100/50 leading-relaxed border-white/5">
                        {analysisData?.summary}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-secondary uppercase tracking-widest">Translated Text</div>
                      <div className="glass p-6 rounded-3xl text-sm text-white leading-relaxed border-secondary/20 bg-secondary/5 font-poppins min-h-[100px]">
                        {isTranslating ? (
                          <div className="flex items-center gap-2 text-blue-100/40">
                            <Loader2 size={16} className="animate-spin" /> Translating...
                          </div>
                        ) : (
                          translatedText || "Select a language to translate the summary."
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Voice & Chat */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          {/* Voice AI Panel */}
          <div className="glass p-6 rounded-[2.5rem] border-white/5 bg-linear-to-br from-accent-purple/10 to-transparent">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Mic size={18} className="text-accent-purple" />
              Voice AI Assistant
            </h3>
            <div className="flex flex-col items-center justify-center py-6 gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-purple/20 rounded-full blur-xl animate-pulse" />
                <button 
                  onClick={handlePlayVoice}
                  disabled={isPlaying}
                  className="relative w-20 h-20 rounded-full bg-linear-to-tr from-accent-purple to-pink-500 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group disabled:opacity-50"
                >
                  {isPlaying ? <Loader2 size={32} className="text-white animate-spin" /> : <Play size={32} className="text-white ml-1" />}
                </button>
              </div>
              <div className="text-center">
                <p className="font-bold text-sm mb-1">Explain this document</p>
                <p className="text-xs text-blue-100/40">Currently playing in {targetLang} (Male Voice)</p>
              </div>
              {/* Waveform Animation */}
              <div className="flex items-center gap-1 h-8">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 24, 4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-accent-purple/40 rounded-full"
                  />
                ))}
              </div>
              <div className="flex gap-4 w-full">
                <button className="flex-1 glass py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Volume2 size={14} /> Regional Voice
                </button>
              </div>
            </div>
          </div>

          {/* AI Chat Panel */}
          <ChatPanel documentId={documentId} filename={filename} />
        </div>
      </div>
    </div>
  );
}

function ChatPanel({ documentId, filename }: { documentId: string | null, filename: string }) {
  const [messages, setMessages] = useState<any[]>([
    { role: 'ai', text: `Hello! I've analyzed ${filename}. You can ask me anything about its contents.` }
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || !documentId || sending) return;
    
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setSending(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_id: documentId, message: userMsg, history: [] }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I encountered an error processing your request." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="glass flex-1 rounded-[2.5rem] border-white/5 flex flex-col overflow-hidden min-h-[400px]">
      <div className="p-6 border-b border-white/10">
        <h3 className="font-bold flex items-center gap-2">
          <MessageSquare size={18} className="text-accent-cyan" />
          Chat with Document
        </h3>
      </div>
      
      <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center text-accent-cyan shrink-0">
                <Zap size={16} />
              </div>
            )}
            <div className={`glass p-4 rounded-2xl border-white/5 ${msg.role === 'user' ? 'rounded-tr-none bg-secondary/5 border-secondary/20 text-white' : 'rounded-tl-none bg-blue-400/5'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center text-accent-cyan shrink-0">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="glass p-4 rounded-2xl rounded-tl-none border-white/5 bg-blue-400/5 italic text-blue-100/40">
              Gemini is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="glass px-4 py-3 rounded-2xl flex items-center gap-2 border-white/5">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..." 
            className="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder:text-blue-100/40"
          />
          <button type="submit" disabled={sending} className="text-secondary hover:scale-110 transition-transform disabled:opacity-50">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

function InsightCard({ icon, label, value, type }: { icon: React.ReactNode, label: string, value: string, type: 'deadline' | 'payment' | 'risk' }) {
  return (
    <div className="glass p-5 rounded-3xl border-white/5 hover:border-white/20 transition-all flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-2xl bg-blue-400/5 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-xs text-blue-100/40 font-bold uppercase tracking-wider">{label}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}

