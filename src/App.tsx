import { useState } from 'react';
import { BookOpen, Sparkles, GraduationCap, MessageCircle, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FlashCards from './components/FlashCards';
import Quiz from './components/Quiz';
import CaseStudies from './components/CaseStudies';
import Assistant from './components/Assistant';
import { cn } from './utils';

type Tab = 'flashcards' | 'quiz' | 'cases' | 'assistant';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('flashcards');

  const tabs = [
    { id: 'flashcards', label: 'Tarjetas', icon: BookOpen, color: 'text-pink-600', bg: 'bg-pink-100' },
    { id: 'quiz', label: 'Examen', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: 'cases', label: 'Casos', icon: Sparkles, color: 'text-violet-600', bg: 'bg-violet-100' },
    { id: 'assistant', label: 'Asistente', icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
  ] as const;

  return (
    <div className="min-h-screen bg-princess-pattern font-sans flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-pink-200 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute top-48 -left-24 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4 px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <Crown className="text-pink-500" size={32} />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 font-serif tracking-tight">
            Construyendo Equidad
          </h1>
          <Crown className="text-pink-500" size={32} />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Actividades para el diálogo y la colaboración entre la escuela y las familias.
        </p>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 max-w-4xl mx-auto w-full px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-white/50 backdrop-blur-md p-2 rounded-3xl shadow-sm border border-white/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl font-medium transition-all duration-300",
                  isActive 
                    ? `bg-white shadow-md ${tab.color} scale-105` 
                    : "text-gray-500 hover:bg-white/60 hover:text-gray-800"
                )}
              >
                <div className={cn("p-1.5 rounded-xl", isActive ? tab.bg : "bg-transparent")}>
                  <Icon size={20} />
                </div>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {activeTab === 'flashcards' && <FlashCards />}
            {activeTab === 'quiz' && <Quiz />}
            {activeTab === 'cases' && <CaseStudies />}
            {activeTab === 'assistant' && <Assistant />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Watermark */}
      <footer className="relative z-10 py-6 text-center mt-auto bg-white/30 backdrop-blur-sm border-t border-white/40">
        <div className="flex items-center justify-center gap-4 text-pink-800/60 font-medium tracking-widest uppercase text-sm">
          <span>👸 Princesa</span>
          <span>•</span>
          <span>Miss Karu</span>
          <span>•</span>
          <span>🧔‍♂️ 7 Enanos</span>
        </div>
      </footer>
    </div>
  );
}

