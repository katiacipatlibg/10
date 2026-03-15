import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Sparkles, User } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: '¡Hola! Soy tu asistente de estudio. ¿En qué te puedo ayudar hoy con el tema "Construyendo equidad"?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      const contents = newMessages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: 'Eres un asistente educativo experto en el tema "Construyendo equidad. Actividades para el diálogo y la colaboración entre la escuela y las familias." Tu tono debe ser amigable, motivador y claro, como una princesa sabia que ayuda a estudiar. Responde de forma concisa y útil.',
        }
      });
      
      setMessages((prev) => [...prev, { role: 'model', content: response.text || 'Lo siento, no pude procesar eso.' }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages((prev) => [...prev, { role: 'model', content: 'Hubo un error al conectar con el asistente. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-800 font-serif">Asistente de Estudio</h2>
          <p className="text-blue-600 text-sm">Resuelve tus dudas sobre equidad y educación</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
              )}>
                {msg.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl",
                msg.role === 'user' 
                  ? "bg-pink-600 text-white rounded-tr-sm" 
                  : "bg-gray-50 border border-gray-100 text-gray-800 rounded-tl-sm"
              )}>
                <div className={cn("prose prose-sm max-w-none", msg.role === 'user' && "prose-invert")}>
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Sparkles size={20} />
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-800 rounded-tl-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta aquí..."
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors text-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-md"
            >
              <Send size={20} className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
