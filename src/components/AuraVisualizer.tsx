import { motion, AnimatePresence } from "motion/react";

interface AuraVisualizerProps {
  isListening: boolean;
  isTyping: boolean;
  onToggleVoice: () => void;
}

export default function AuraVisualizer({ isListening, isTyping, onToggleVoice }: AuraVisualizerProps) {
  return (
    <div 
      onClick={onToggleVoice}
      className={`relative flex items-center justify-center h-14 mb-6 cursor-pointer group rounded-2xl transition-all duration-500 overflow-hidden ${
        isListening ? 'bg-cyan-500/10 shadow-[0_0_40px_rgba(34,211,238,0.1)]' : 'hover:bg-white/5'
      }`}
      title={isListening ? "Stop Listening" : "Global Voice Assistant"}
    >
      {/* Background organic glow */}
      <motion.div
        animate={{
          opacity: isListening ? [0.1, 0.2, 0.1] : 0,
          scale: isListening ? [1, 1.3, 1] : 0.8,
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-cyan-400 blur-3xl -z-10"
      />

      <div className="flex items-center justify-center gap-1 px-4 w-full">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: isListening 
                ? [8, 36, 14, 48, 10, 32, 12, 42, 8][i % 9] 
                : isTyping 
                  ? [4, 14, 6, 18, 4, 12, 5, 16, 4][i % 9]
                  : [2, 6, 2, 8, 2, 5, 2, 7, 2][i % 9],
              opacity: isListening ? 1 : 0.3,
            }}
            transition={{
              duration: isListening ? 0.5 : 2,
              repeat: Infinity,
              delay: i * 0.03,
              ease: "easeInOut",
            }}
            className={`w-0.5 rounded-full transition-colors duration-500 ${
              isListening 
                ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]' 
                : 'bg-slate-700 group-hover:bg-cyan-500/50'
            }`}
          />
        ))}
      </div>
      
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-1 text-[7px] font-bold text-cyan-400 uppercase tracking-[0.3em] pointer-events-none"
          >
            Mercury Active
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
