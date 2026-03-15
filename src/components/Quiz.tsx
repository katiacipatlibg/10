import { useState } from 'react';
import { motion } from 'motion/react';
import { questions } from '../data';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import { cn } from '../utils';

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === currentQuestion.answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-pink-800 font-serif">Simulador de Examen</h2>
        <div className="text-pink-600 font-semibold bg-pink-100 px-4 py-2 rounded-full">
          Pregunta {currentIndex + 1} de {questions.length}
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-3xl shadow-xl border-2 border-pink-100 p-6 sm:p-8"
      >
        <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.answer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4",
                  !showResult && "border-pink-50 hover:border-pink-300 hover:bg-pink-50",
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
                    <div className="w-6 h-6 rounded-full border-2 border-pink-200" />
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
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200 transition-colors disabled:opacity-50"
              >
                <ChevronLeft size={20} />
                Anterior
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-colors shadow-md"
                >
                  Siguiente
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
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
