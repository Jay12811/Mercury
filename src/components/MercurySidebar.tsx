import { useState } from "react";
import { ShieldCheck, Settings, Info, Briefcase } from "lucide-react";
import AuraVisualizer from "./AuraVisualizer";
import QuickActions from "./QuickActions";
import ChatInterface from "./ChatInterface";
import SessionSettings from "./SessionSettings";
import { Message, SessionSettings as SessionSettingsType } from "../types";
import { getMercuryResponse } from "../services/mercuryAI";

export default function MercurySidebar() {
  const [settings, setSettings] = useState<SessionSettingsType>({
    country: "India",
    committee: "DISEC",
    agenda: "Sustainable Development Goals"
  });
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Ready for the session, Delegate? I'm **Mercury**. Whether it's a clutch GSL speech or a strategic Point of Order, I've got your back. \n\nHow can I help you lead the floor today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const response = await getMercuryResponse([...messages, userMsg], settings);
    
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMsg]);
  };

  const handleQuickAction = (id: string) => {
    switch (id) {
      case 'what-now':
        handleSendMessage("What do I say now? The Chair just asked for motions.");
        break;
      case 'draft-speech':
        handleSendMessage(`Draft a 60-second GSL speech for my delegation (${settings.country}) on the current agenda.`);
        break;
      case 'translate':
        handleSendMessage("Simplify what the Chair just said: 'The floor is now open for secondary motions to table the debate.'");
        break;
      case 'alliance':
        handleSendMessage(`Based on my country (${settings.country}), who should I ally with in ${settings.committee}?`);
        break;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#030307] border-l border-white/5 shadow-2xl relative overflow-hidden z-10 selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] -z-10 animate-neural-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] -z-10" />

      {/* Settings Modal Overlay */}
      {showSettings && (
        <SessionSettings 
          settings={settings} 
          onUpdate={setSettings} 
          onClose={() => setShowSettings(false)} 
        />
      )}

      {/* Header */}
      <header className="px-8 pt-8 pb-4 flex items-center justify-between relative overflow-hidden group">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-md opacity-20 animate-pulse" />
            <div className="relative w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-cyan-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <ShieldCheck size={22} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-[-0.04em] text-white font-display uppercase">Mercury</h1>
            <p className="text-[7px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-0.5">Elite Intelligence Unit</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSettings(true)}
            className="group/btn relative text-[9px] font-bold text-cyan-400/80 border border-cyan-400/20 px-3 py-1.5 rounded-lg bg-cyan-400/5 tracking-wider hover:bg-cyan-400/10 transition-all flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            <Briefcase size={10} /> Mission Brief
          </button>
        </div>
      </header>

      {/* Visualizer & Quick Actions Area */}
      <div className="px-6 py-2">
        <AuraVisualizer 
          isListening={isListening} 
          isTyping={isTyping} 
          onToggleVoice={() => setIsListening(!isListening)} 
        />
        <QuickActions onAction={handleQuickAction} />
      </div>

      {/* Chat Area */}
      <main className="flex-1 min-h-0">
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          isListening={isListening}
          setIsListening={setIsListening}
        />
      </main>

      {/* Footer / Status */}
      <footer className="px-6 py-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-600 font-medium uppercase tracking-tighter">
        <span>Identity: Delegate Sidekick</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live Connection Stable
        </span>
      </footer>
    </div>
  );
}
