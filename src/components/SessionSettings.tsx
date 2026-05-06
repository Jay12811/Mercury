import { useState, FormEvent } from "react";
import { Globe, BookOpen, MessageSquare, X, Check } from "lucide-react";
import { motion } from "motion/react";
import { SessionSettings as SessionSettingsType } from "../types";

interface SessionSettingsProps {
  settings: SessionSettingsType;
  onUpdate: (settings: SessionSettingsType) => void;
  onClose: () => void;
}

export default function SessionSettings({ settings, onUpdate, onClose }: SessionSettingsProps) {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm glass-morphism rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)]"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Globe size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-display uppercase leading-none">Mission Brief</h2>
                <p className="text-[8px] text-slate-500 uppercase tracking-[0.2em] mt-1 font-bold">Identity Configuration</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full" /> Delegation
                </label>
                <input
                  value={formData.country}
                  onChange={e => setFormData(p => ({ ...p, country: e.target.value }))}
                  placeholder="e.g. France"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cyan-500/30 transition-all text-white placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full" /> Committee
                </label>
                <input
                  value={formData.committee}
                  onChange={e => setFormData(p => ({ ...p, committee: e.target.value }))}
                  placeholder="e.g. DISEC"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cyan-500/30 transition-all text-white placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full" /> Agenda
                </label>
                <textarea
                  value={formData.agenda}
                  onChange={e => setFormData(p => ({ ...p, agenda: e.target.value }))}
                  placeholder="Main topic of debate..."
                  rows={2}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cyan-500/30 transition-all text-white placeholder:text-slate-700 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 uppercase text-xs tracking-widest mt-4"
            >
              <Check size={16} /> Deploy Brief
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-[9px] text-slate-600 leading-relaxed italic text-center">
            Briefing data optimizes speech drafting and strategy.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
