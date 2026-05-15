"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Moon, 
  CreditCard, 
  Shield, 
  ChevronRight,
  Zap
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold font-poppins mb-1">Settings</h1>
        <p className="text-slate-400">Configure your AI preferences and account details.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsItem icon={<User size={18} />} label="Profile Information" value="Sakshi Sharma" />
          <SettingsItem icon={<Lock size={18} />} label="Security & Password" />
          <SettingsItem icon={<Shield size={18} />} label="Privacy & Permissions" />
        </SettingsSection>

        {/* Preferences Section */}
        <SettingsSection title="AI Preferences">
          <SettingsItem icon={<Globe size={18} />} label="Default Target Language" value="Hindi (हिन्दी)" />
          <SettingsItem icon={<Zap size={18} />} label="AI Model" value="Gemini 1.5 Flash" />
          <SettingsItem icon={<Bell size={18} />} label="Notifications" value="Enabled" />
        </SettingsSection>

        {/* Appearance Section */}
        <SettingsSection title="Appearance">
          <SettingsToggle icon={<Moon size={18} />} label="Dark Mode" enabled={true} />
        </SettingsSection>

        {/* Billing Section */}
        <SettingsSection title="Billing">
          <SettingsItem icon={<CreditCard size={18} />} label="Subscription Plan" value="Pro Plus" />
        </SettingsSection>
      </div>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden">
      <div className="px-8 py-4 border-b border-white/10 bg-white/5">
        <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function SettingsItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="font-bold text-sm">{label}</div>
      </div>
      <div className="flex items-center gap-3">
        {value && <span className="text-xs text-secondary font-bold">{value}</span>}
        <ChevronRight size={16} className="text-slate-600" />
      </div>
    </div>
  );
}

function SettingsToggle({ icon, label, enabled }: { icon: React.ReactNode, label: string, enabled: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="font-bold text-sm">{label}</div>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-all ${enabled ? 'bg-secondary' : 'bg-slate-700'}`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : ''}`} />
      </div>
    </div>
  );
}
