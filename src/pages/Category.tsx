import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HeroSlider } from '@/components/home/HeroSlider';
import { NewsCard, NewsItem } from '@/components/home/NewsCard';
import { Newspaper, ChevronRight } from 'lucide-react';

const MOCK_DATA: NewsItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `cat-news-${i}`,
  title: "Une information importante pour la catégorie sélectionnée",
  excerpt: "Les détails de l'actualité qui touche cette section spécifique de notre portail d'information patriotique.",
  category: "Sélection",
  thumbnail: `https://picsum.photos/seed/cat${i}/600/400`,
  authorName: "Rédaction VP",
  publishedAt: "Aujourd'hui",
  commentsCount: 5,
  likesCount: 22,
}));

export const Category = () => {
  const { id } = useParams();
  const categoryName = (id || "Actualités").charAt(0).toUpperCase() + (id || "actualites").slice(1);

  return (
    <div className="flex flex-col gap-12 pb-20">
      <div className="bg-secondary/50 backdrop-blur-xl py-12 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-primary mb-6">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/40">{categoryName}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
            {categoryName}
          </h1>
          <p className="mt-6 text-white/50 max-w-2xl text-lg md:text-xl font-medium tracking-tight">
            Toutes les informations relatives à la section {categoryName}. Restez informé des enjeux nationaux avec l'excellence VP.
          </p>
        </div>
      </div>

      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {MOCK_DATA.map(news => (
            <NewsCard key={news.id} news={{ ...news, category: categoryName }} />
          ))}
        </div>
      </section>
    </div>
  );
};
