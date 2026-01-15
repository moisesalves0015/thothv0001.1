
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../types';

const ChatLab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Olá! Eu sou Lumina, sua assistente de IA avançada. Tenho acesso a informações em tempo real via Google Search. Como posso ajudar você hoje?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "Sinto muito, não consegui gerar uma resposta.";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const urls = groundingChunks
        .filter(chunk => chunk.web)
        .map(chunk => ({ uri: chunk.web?.uri || '', title: chunk.web?.title || 'Fonte' }));

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: Date.now(),
        groundingUrls: urls.length > 0 ? urls : undefined
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Erro no chat:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Erro: Encontrei um problema ao conectar. Por favor, tente novamente.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Chat Inteligente</h2>
          <p className="text-sm text-gray-500">Gemini 3 Flash • Busca Ativada</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono text-emerald-500">ONLINE</span>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 ${
              msg.role === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'glass text-gray-200'
            }`}>
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                {msg.content}
              </div>
              
              {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  <p className="text-xs font-semibold opacity-60 flex items-center gap-1">
                    <i className="fa-solid fa-link"></i> FONTES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {msg.groundingUrls.map((url, idx) => (
                      <a 
                        key={idx} 
                        href={url.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-1 bg-white/5 hover:bg-white/20 rounded border border-white/10 transition-colors"
                      >
                        {url.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              <div className={`text-[10px] mt-2 opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass rounded-2xl p-4 flex gap-2">
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
              <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-800 bg-[#030712]/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte qualquer coisa... (ex: 'Qual a cotação do Google hoje?')"
            className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-4 pl-6 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-200 placeholder-gray-500"
          />
          <div className="absolute right-2 top-2 flex gap-1">
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors shadow-lg shadow-blue-600/20"
            >
              <i className="fa-solid fa-paper-plane mr-2"></i>
              Enviar
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-3 uppercase tracking-widest">
          Desenvolvido com Gemini 3 Flash & Google Search
        </p>
      </div>
    </div>
  );
};

export default ChatLab;
