import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { NewsItem } from './NewsCard';

const MOCK_HERO: NewsItem[] = [
  {
    id: '1',
    title: "VRAI PATRIOTE : L'actualité nationale décryptée par nos experts",
    excerpt: "Découvrez les enjeux majeurs qui façonnent l'avenir de notre nation avec nos analyses exclusives.",
    category: "Politique",
    thumbnail: "https://picsum.photos/seed/patriote1/1600/900",
    authorName: "Rédaction VP",
    publishedAt: "Il y a 2h",
    commentsCount: 12,
    likesCount: 56
  },
  {
    id: '2',
    title: "Économie : Les nouveaux moteurs de la croissance locale",
    excerpt: "Comment les initiatives régionales transforment durablement le paysage économique du pays.",
    category: "Économie",
    thumbnail: "https://picsum.photos/seed/patriote2/1600/900",
    authorName: "Jean Dupont",
    publishedAt: "Il y a 5h",
    commentsCount: 8,
    likesCount: 34
  },
  {
    id: '3',
    title: "Sport : Les athlètes nationaux brillent sur la scène mondiale",
    excerpt: "Retour sur les performances exceptionnelles de nos champions lors des derniers championnats.",
    category: "Sport",
    thumbnail: "https://picsum.photos/seed/patriote3/1600/900",
    authorName: "Marc Sport",
    publishedAt: "Il y a 10h",
    commentsCount: 45,
    likesCount: 120
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % MOCK_HERO.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % MOCK_HERO.length);
  const prev = () => setCurrent((prev) => (prev - 1 + MOCK_HERO.length) % MOCK_HERO.length);

  return (
    <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={MOCK_HERO[current].thumbnail} 
            alt={MOCK_HERO[current].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] scale-110 active:scale-100"
            style={{ transform: 'scale(1.05)' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 text-white">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="flex flex-col gap-6 max-w-4xl"
            >
              <span className="bg-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-2 w-fit">
                {MOCK_HERO[current].category} • {MOCK_HERO[current].publishedAt}
              </span>
              <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter">
                {MOCK_HERO[current].title}
              </h1>
              <p className="text-white/70 text-lg md:text-2xl line-clamp-2 max-w-3xl font-medium tracking-tight">
                {MOCK_HERO[current].excerpt}
              </p>
              <div className="flex items-center gap-6 mt-4">
                <Button render={<Link to={`/article/${MOCK_HERO[current].id}`} />} nativeButton={false} className="bg-primary hover:bg-primary/90 text-white font-black h-14 px-10 text-base rounded-xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40">
                  LIRE L'ARTICLE
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 right-12 flex gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prev}
          className="h-12 w-12 rounded-xl frosted-glass text-white hover:bg-primary hover:border-primary transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={next}
          className="h-12 w-12 rounded-xl frosted-glass text-white hover:bg-primary hover:border-primary transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden lg:flex flex-col gap-6">
        {MOCK_HERO.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-1 transition-all duration-500 rounded-full ${current === idx ? 'h-16 bg-primary' : 'h-4 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};
