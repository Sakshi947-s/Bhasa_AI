import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/documents")
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: "Documents", value: documents.length.toString(), icon: Files, color: "text-blue-400" },
    { label: "Translations", value: (documents.length * 2).toString(), icon: Languages, color: "text-orange-400" }, // Simulated stat
    { label: "Voice AI", value: documents.length.toString(), icon: Mic, color: "text-purple-400" }, // Simulated stat
    { label: "AI Insights", value: (documents.length * 4).toString(), icon: Zap, color: "text-cyan-400" }, // Simulated stat
  ];

  const handleDocClick = (docId: string, filename: string) => {
    localStorage.setItem("current_document_id", docId);
    localStorage.setItem("current_filename", filename);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-1">Welcome back, Sakshi</h1>
          <p className="text-slate-400">What would you like to bridge today?</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 border-white/5">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="bg-transparent border-none outline-none text-sm w-48 text-white placeholder:text-slate-500"
            />
          </div>
          <Link href="/dashboard/uploads">
            <button className="bg-secondary text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-secondary/20 transition-all active:scale-95">
              <Plus size={20} />
              New Upload
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-3xl border-white/5 group hover:border-white/20 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-blue-400/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <TrendingUp size={16} className="text-emerald-400 opacity-50" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-blue-100/70 text-sm font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Upload Zone */}
        <div className="lg:col-span-2 space-y-6">
          <Link href="/dashboard/uploads" className="block">
            <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 transition-transform group-hover:scale-110">
                <Upload size={120} />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Instant AI Scan</h2>
                <p className="text-slate-300 mb-8 max-w-md">
                  Drop your PDF, Image or DOCX here to instantly detect language and generate a smart summary.
                </p>
                
                <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-12 flex flex-col items-center justify-center gap-4 hover:border-secondary/50 hover:bg-secondary/5 transition-all cursor-pointer group/upload">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover/upload:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg">Click or drag & drop</p>
                    <p className="text-sm text-slate-400">PDF, JPG, PNG, DOCX up to 25MB</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Recent Activity */}
          <div className="glass p-8 rounded-[2.5rem] border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Documents</h2>
              <Link href="/dashboard/summaries" className="text-sm text-secondary font-bold hover:underline flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-10 opacity-40 italic">Loading documents...</div>
              ) : documents.length === 0 ? (
                <div className="text-center py-10 text-blue-100/30">No recent documents</div>
              ) : (
                documents.slice(0, 5).map((doc, i) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-blue-400/5 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-400/5 flex items-center justify-center text-blue-100/50 group-hover:text-white transition-colors">
                        <FileText size={24} />
                      </div>
                      <div>
                        <Link 
                          href="/dashboard/analysis" 
                          onClick={() => handleDocClick(doc.id, doc.name)}
                          className="font-bold group-hover:text-secondary transition-colors"
                        >
                          {doc.name}
                        </Link>
                        <div className="flex items-center gap-3 text-xs text-blue-100/40 mt-1">
                          <span className="flex items-center gap-1"><Clock size={12} /> Just now</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-400/5 uppercase tracking-tighter">{doc.language}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-blue-100/50 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest text-[8px]">
                        Processed
                      </span>
                      <Link 
                        href="/dashboard/analysis" 
                        onClick={() => handleDocClick(doc.id, doc.name)}
                        className="text-blue-100/40 hover:text-white transition-colors"
                      >
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - AI Modes & Tips */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border-white/5 bg-linear-to-br from-white/5 to-transparent">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-secondary" />
              AI Insight of the Day
            </h3>
            <p className="text-sm text-blue-100/50 leading-relaxed mb-4">
              Did you know? You can ask BhashaBridge to explain complex medical jargon in local dialects like Chhattisgarhi or Bhojpuri.
            </p>
            <button className="text-xs font-bold text-secondary hover:underline">Learn more</button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold px-2">Popular Modes</h3>
            <QuickModeCard 
              title="Medical" 
              icon={<FileText size={18} />} 
              color="bg-blue-500/20 text-blue-400"
            />
            <QuickModeCard 
              title="Legal" 
              icon={<FileText size={18} />} 
              color="bg-slate-700/50 text-blue-100/50"
            />
            <QuickModeCard 
              title="Farmer" 
              icon={<FileText size={18} />} 
              color="bg-emerald-500/20 text-emerald-400"
            />
          </div>

          {/* Help Card */}
          <div className="glass p-6 rounded-3xl border-white/5 bg-secondary/5 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-xs text-blue-100/50 mb-4">
                Our AI assistant is here to guide you through the translation process.
              </p>
              <button className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-xl text-xs font-bold transition-all">
                Talk to Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickModeCard({ title, icon, color }: { title: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="flex items-center justify-between p-4 glass rounded-2xl border-white/5 hover:border-white/20 transition-all cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <span className="font-bold text-sm">{title} Mode</span>
      </div>
      <ArrowRight size={16} className="text-blue-100/30 group-hover:text-white transition-colors" />
    </div>
  );
}
