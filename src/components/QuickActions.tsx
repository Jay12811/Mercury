import { Zap, FileText, Languages, Users } from "lucide-react";
import { motion } from "motion/react";

interface QuickActionsProps {
  onAction: (id: string) => void;
}

const actions = [
  { id: 'what-now', label: 'Tactic', icon: Zap, color: 'text-amber-400', desc: 'Next move' },
  { id: 'draft-speech', label: 'Draft', icon: FileText, color: 'text-cyan-400', desc: 'GSL/Speech' },
  { id: 'translate', label: 'Decode', icon: Languages, color: 'text-emerald-400', desc: 'Chair Speak' },
  { id: 'alliance', label: 'Ally', icon: Users, color: 'text-indigo-400', desc: 'Strategy' },
];

export default function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-6">
      {actions.map((action) => (
        <motion.button
          key={action.id}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction(action.id)}
          className="group relative flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <action.icon className={`${action.color} mb-2 relative z-10`} size={18} />
          <span className="text-[8px] font-bold text-white uppercase tracking-widest relative z-10">{action.label}</span>
          <span className="text-[6px] text-slate-600 font-medium uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 text-center">{action.desc}</span>
        </motion.button>
      ))}
    </div>
  );
}
