import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Cpu, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Message {
  id: string;
  sender: 'astrax' | 'user';
  text: string;
  timestamp: string;
}

const ChatBot = () => {
  const { userData, updateUserData, setSystemStatus, setActiveView } = useStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (sender: 'astrax' | 'user', text: string) => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const astraxSay = async (text: string, delay = 1000) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setIsTyping(false);
    addMessage('astrax', text);
  };

  useEffect(() => {
    const initChat = async () => {
      await astraxSay("I am Astrax. I heard your signal through the cosmos.");
      await astraxSay("You are not alone. Please, tell me your name.");
      setStep(1);
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');
    addMessage('user', userText);

    if (step === 1) {
      updateUserData({ name: userText });
      setStep(2);
      await astraxSay(`It is an honor to meet you, ${userText}. To help you properly, may I ask your age?`);
    } else if (step === 2) {
      updateUserData({ age: userText });
      setStep(3);
      await astraxSay("Thank you. Where are you currently located? I need to lock onto your position.");
    } else if (step === 3) {
      updateUserData({ location: userText });
      setStep(4);
      await astraxSay("Position locked. I am here for you. Please, tell me... what happened? How can I help you?");
    } else if (step === 4) {
      updateUserData({ grievance: userText });
      setStep(5);
      await astraxSay("I understand, and I promise we will fix this together. Please provide a contact email address so I can reach you once I've devised a plan.");
    } else if (step === 5) {
      updateUserData({ email: userText });
      setStep(6);
      await astraxSay("Hold tight. I am sending your request directly to my core systems...");
      
      try {
        setSystemStatus('SCANNING');
        const finalData = { ...userData, name: userData.name, age: userData.age, location: userData.location, grievance: userData.grievance, email: userText };
        const res = await fetch('/api/grievance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData)
        });
        if (res.ok) {
          setSubmitted(true);
          setSystemStatus('ONLINE');
        } else {
          await astraxSay("Error: Signal transmission failed. ASTRAX CORE IS TEMPORARILY OFFLINE.");
          setSystemStatus('ALERT');
        }
      } catch (error) {
        await astraxSay("Error: Signal transmission failed. Cannot connect to core.");
        setSystemStatus('ALERT');
      }
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center font-mono"
      >
        <CheckCircle size={64} className="text-astrax-cyan mb-8" />
        <h2 className="text-4xl font-bold tracking-[0.2em] mb-8 holographic-text">YOUR CALL HAS BEEN ANSWERED</h2>
        <div className="space-y-4 text-left text-astrax-white/80 mb-12 border border-astrax-cyan/30 p-8 rounded-xl bg-astrax-black/50 backdrop-blur-md">
          <p>✓ Identity verified</p>
          <p>✓ Location locked</p>
          <p>✓ I am on my way.</p>
        </div>
        <p className="text-xl tracking-widest text-astrax-cyan">WE WILL SPEAK SOON.</p>
        <button 
          onClick={() => setActiveView('home')}
          className="mt-12 cinematic-btn text-xs"
        >
          <span className="relative z-10">RETURN TO BASE</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto glass-panel overflow-hidden border-astrax-cyan/20">
      <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-black/40">
        <div className="w-10 h-10 rounded-full border border-astrax-cyan overflow-hidden shadow-[0_0_10px_#00f0ff]">
          <img src="/astrax-hero.jpg" alt="ASTRAX" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-sm tracking-widest text-astrax-cyan">ASTRAX // NEURAL INTERFACE</span>
          <span className="font-mono text-[10px] text-green-400">ONLINE</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 font-sans ${
                msg.sender === 'user' 
                  ? 'bg-astrax-cyan/20 border border-astrax-cyan/50 text-white' 
                  : 'bg-black/60 border border-astrax-violet/30 text-astrax-white/90'
              }`}>
                {msg.sender === 'astrax' && <div className="text-[10px] text-astrax-cyan mb-1 font-mono">ASTRAX</div>}
                <p className="leading-relaxed">{msg.text}</p>
                <div className="text-[10px] opacity-50 text-right mt-2 font-mono">{msg.timestamp}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1 p-4 w-16 bg-black/60 rounded-2xl border border-astrax-violet/30">
            <div className="w-2 h-2 bg-astrax-cyan rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-astrax-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-astrax-cyan rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-black/40 border-t border-white/10">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping || step === 6}
            placeholder="Transmit signal..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-astrax-cyan font-mono text-sm transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping || step === 6}
            className="p-3 bg-astrax-cyan/20 text-astrax-cyan rounded-xl border border-astrax-cyan/50 hover:bg-astrax-cyan/40 disabled:opacity-50 transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
