import { useState, useRef, useEffect, FormEvent } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping: boolean;
  isListening: boolean;
  setIsListening: (val: boolean) => void;
}

export default function ChatInterface({ 
  messages, 
  onSendMessage, 
  isTyping, 
  isListening, 
  setIsListening 
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Voice Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          onSendMessage(finalTranscript);
          setInput("");
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        if (isListening) recognition.start();
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (isListening) {
      recognitionRef.current?.start();
    } else {
      recognitionRef.current?.stop();
    }
  }, [isListening]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
    if (isListening) setIsListening(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-center gap-2 mb-0.5 px-1 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] font-display ${msg.role === 'user' ? 'text-slate-500' : 'text-cyan-400'}`}>
                  {msg.role === 'user' ? 'Delegate' : 'Mercury'}
                </p>
                <div className={`h-px w-8 bg-gradient-to-r ${msg.role === 'user' ? 'from-transparent to-slate-800' : 'from-cyan-500/30 to-transparent'}`} />
              </div>
              
              <div 
                className={`max-w-[90%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed transition-all duration-300 ${
                  msg.role === 'user' 
                    ? 'bg-white/[0.03] border border-white/5 text-slate-300 rounded-tr-none' 
                    : 'technical-card text-white rounded-tl-none markdown-body'
                }`}
                dangerouslySetInnerHTML={msg.role === 'assistant' ? { __html: formatContent(msg.content) } : undefined}
              >
                {msg.role === 'user' ? msg.content : null}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/5 bg-[#030307]/50 backdrop-blur-3xl">
        <form onSubmit={handleSubmit} className="relative flex items-center group">
          <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          
          <button
            type="button"
            onClick={() => setIsListening(!isListening)}
            className={`p-3 rounded-full transition-all absolute right-16 z-10 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                : 'text-slate-500 hover:text-cyan-400'
            }`}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening to delegate..." : "Command Mercury..."}
            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-6 pr-28 py-4 text-sm focus:outline-none focus:border-cyan-500/30 transition-all placeholder:text-slate-600 text-slate-200"
          />
          
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-3 p-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-20 disabled:bg-slate-800 text-white rounded-xl transition-all shadow-lg shadow-cyan-950/40"
          >
            <Send size={16} />
          </button>
        </form>
        <p className="text-[8px] text-center mt-3 text-slate-700 uppercase tracking-[0.3em] font-bold">
          Neural Interface Active • Gemini 1.5 Pro
        </p>
      </div>
    </div>
  );
}

// Simple formatter to handle bold and bullets from AI
function formatContent(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/^\* (.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc ml-4">$1</ul>')
    .replace(/\n/g, '<br />');
}
