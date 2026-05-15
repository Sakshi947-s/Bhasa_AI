import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import { 
  FileText, 
  Languages, 
  MessageSquare, 
  Mic, 
  ShieldCheck, 
  Zap,
  Globe,
  Stethoscope,
  Scale,
  GraduationCap,
  Sprout
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins mb-4">Powerful AI Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Everything you need to break the language barrier and understand complex documents instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileText className="text-accent-blue" />}
              title="Smart Summarization"
              description="Get the gist of long documents in simple, easy-to-understand language."
            />
            <FeatureCard 
              icon={<Languages className="text-secondary" />}
              title="Regional Translation"
              description="Translate to Hindi, Bengali, Tamil, Telugu, Marathi, and 15+ Indian languages."
            />
            <FeatureCard 
              icon={<Mic className="text-accent-purple" />}
              title="Voice Explanation"
              description="Listen to your document being explained to you in your native dialect."
            />
            <FeatureCard 
              icon={<MessageSquare className="text-accent-cyan" />}
              title="Chat with Document"
              description="Ask questions and get instant answers based on the document content."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-emerald-500" />}
              title="AI Risk Detector"
              description="Automatically detect hidden fees, risky clauses, or medical warnings."
            />
            <FeatureCard 
              icon={<Zap className="text-amber-500" />}
              title="Instant Processing"
              description="High-speed OCR and translation powered by state-of-the-art AI models."
            />
          </div>
        </div>
      </section>

      {/* AI Modes Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins mb-4">Specialized AI Modes</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Tailored experiences for different domains to provide the most relevant insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModeCard 
              icon={<Stethoscope size={32} />}
              title="Medical Mode"
              description="Explain prescriptions & simplify medical reports."
              color="from-blue-500 to-cyan-400"
            />
            <ModeCard 
              icon={<Scale size={32} />}
              title="Legal Mode"
              description="Detect risky clauses & simplify agreements."
              color="from-slate-700 to-slate-900"
            />
            <ModeCard 
              icon={<GraduationCap size={32} />}
              title="Student Mode"
              description="Summarize research papers & generate notes."
              color="from-purple-500 to-pink-500"
            />
            <ModeCard 
              icon={<Sprout size={32} />}
              title="Farmer Mode"
              description="Explain government schemes & subsidy documents."
              color="from-emerald-500 to-teal-400"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass rounded-[3rem] p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary/5 to-secondary/5 -z-10" />
            <h2 className="text-4xl font-bold font-poppins mb-6">Ready to Bridge the Language Gap?</h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Join thousands of Indians who are using BhashaBridge AI to understand complex documents effortlessly.
            </p>
            <button className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all">
              Get Started for Free
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-secondary to-accent-purple flex items-center justify-center text-white">
              <Globe size={18} />
            </div>
            <span className="text-xl font-bold font-poppins">BhashaBridge AI</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Contact Us</a>
          </div>
          <p className="text-sm text-slate-400">© 2026 BhashaBridge AI. Made with ❤️ for India.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass p-8 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function ModeCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <div className={`relative overflow-hidden p-8 rounded-[2rem] text-white bg-linear-to-br ${color} group cursor-pointer hover:shadow-2xl transition-all`}>
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform">
        {icon}
      </div>
      <div className="relative z-10 mt-12">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
