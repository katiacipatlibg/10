import { useState } from 'react';
import { motion } from 'motion/react';
import { cases } from '../data';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, RefreshCw, BookOpen } from 'lucide-react';
import { cn } from '../utils';

export default function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentCase = cases[currentIndex];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === currentCase.answer) {
      setScore((s) => s + 1);
    }
  };

  const nextCase = () => {
    if (currentIndex < cases.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const prevCase = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const resetCases = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-violet-800 font-serif flex items-center gap-3">
          <BookOpen className="text-violet-600" />
          Casos de Estudio
        </h2>
        <div className="text-violet-600 font-semibold bg-violet-100 px-4 py-2 rounded-full">
          Caso {currentIndex + 1} de {cases.length}
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-3xl shadow-xl border-2 border-violet-100 p-6 sm:p-8"
      >
        <div className="bg-violet-50 p-6 rounded-2xl mb-8 border border-violet-200">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed italic">
            "{currentCase.question}"
          </h3>
        </div>

        <div className="space-y-4">
          {currentCase.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentCase.answer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4",
                  !showResult && "border-violet-50 hover:border-violet-300 hover:bg-violet-50",
                  showResult && !isSelected && !isCorrect && "border-gray-100 opacity-50",
                  showCorrect && "border-green-500 bg-green-50 text-green-900",
                  showIncorrect && "border-red-500 bg-red-50 text-red-900"
                )}
              >
                <div className="mt-1">
                  {showCorrect ? (
                    <CheckCircle2 className="text-green-500" size={24} />
                  ) : showIncorrect ? (
                    <XCircle className="text-red-500" size={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-violet-200" />
                  )}
                </div>
                <span className="text-lg flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-between items-center"
          >
            <div className="text-lg font-medium text-gray-600">
              Puntuación: {score} / {currentIndex + 1}
            </div>
            <div className="flex gap-4">
              <button
                onClick={prevCase}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-100 text-violet-700 font-semibold hover:bg-violet-200 transition-colors disabled:opacity-50"
              >
                <ChevronLeft size={20} />
                Anterior
              </button>
              {currentIndex < cases.length - 1 ? (
                <button
                  onClick={nextCase}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors shadow-md"
                >
                  Siguiente
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={resetCases}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-md"
                >
                  <RefreshCw size={20} />
                  Reiniciar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
