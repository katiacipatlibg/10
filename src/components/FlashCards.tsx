import { useState } from 'react';
import { motion } from 'motion/react';
import { flashcards } from '../data';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function FlashCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-pink-800 mb-2 font-serif">Tarjetas de Estudio</h2>
        <p className="text-pink-600">Construyendo Equidad ({currentIndex + 1} de {flashcards.length})</p>
      </div>

      <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border-4 border-pink-200 p-8 flex flex-col items-center justify-center text-center">
            <div className="absolute top-4 right-4 text-pink-300">
              <RotateCcw size={24} />
            </div>
            <h3 className="text-3xl font-bold text-pink-700 font-serif mb-4">{currentCard.concept}</h3>
            <p className="text-pink-400 text-sm uppercase tracking-widest font-semibold">Toca para voltear</p>
          </div>

          {/* Back */}
          <div 
            className="absolute w-full h-full backface-hidden bg-pink-50 rounded-3xl shadow-xl border-4 border-pink-300 p-8 flex flex-col items-center justify-center text-center"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="absolute top-4 right-4 text-pink-400">
              <RotateCcw size={24} />
            </div>
            <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed">
              {currentCard.definition}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prevCard}
          className="p-4 rounded-full bg-white shadow-md text-pink-600 hover:bg-pink-100 hover:scale-110 transition-all"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextCard}
          className="p-4 rounded-full bg-white shadow-md text-pink-600 hover:bg-pink-100 hover:scale-110 transition-all"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
