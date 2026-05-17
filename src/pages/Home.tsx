import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { NewsCard, NewsItem } from '@/components/home/NewsCard';
import { Button } from '@/components/ui/button';
import { TrendingUp, Newspaper, Video, Flame, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const MOCK_LATEST: NewsItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `latest-${i}`,
  title: [
    "Sécurité : Déploiement massif dans les zones frontalières",
    "Société : Pourquoi l'éducation est au cœur des débats",
    "Vidéos : Exclusivité VP - Reportage au cœur de la capitale",
    "Sport : Le derby national promet des étincelles ce weekend",
    "Économie : Le prix du carburant reste stable malgré la crise",
    "Politique : Le nouveau projet de loi divise l'opinion",
    "Sécurité : Innovations technologiques pour la police nationale",
    "Culture : Le festival annuel célèbre nos racines patriotes"
  ][i % 8],
  excerpt: "Une analyse profonde des derniers événements qui marquent le pays. Les acteurs clés s'expriment sur les défis à venir.",
  category: ["Sécurité", "Société", "Vidéos", "Sport", "Économie", "Politique", "Sécurité", "Culture"][i % 8],
  thumbnail: `https://picsum.photos/seed/news${i}/600/400`,
  authorName: "Équipe VP",
  publishedAt: "Il y a 1h",
  commentsCount: Math.floor(Math.random() * 50),
  likesCount: Math.floor(Math.random() * 200),
  isVideo: i % 4 === 2
}));

const MOCK_POPULAR: NewsItem[] = MOCK_LATEST.slice(0, 4).map(item => ({ ...item, id: `pop-${item.id}` }));

export const Home = () => {
  return (
    <div className="flex flex-col gap-12 pb-20">
      <HeroSlider />

      <section className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Dernières Actualités</h2>
          </div>
          <Button variant="ghost" render={<Link to="/category/actualites" className="flex items-center gap-2" />} nativeButton={false} className="text-primary font-black hover:bg-primary/10 tracking-widest text-xs uppercase">
            Tout voir <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_LATEST.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </section>

      <div className="bg-[#001F3F]/50 backdrop-blur-xl py-20 border-y border-white/5">
        <section className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Vidéos à la Une</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {MOCK_LATEST.filter(n => n.category === "Vidéos").slice(0, 3).map(news => (
              <div key={news.id} className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-video bg-black shadow-2xl border border-white/5">
                <img 
                  src={news.thumbnail} 
                  alt={news.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary/90 p-5 rounded-full text-white shadow-2xl scale-90 group-hover:scale-100 transition-all backdrop-blur-md border border-white/20">
                    <Video className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-primary text-[9px] font-black px-2 py-0.5 rounded uppercase mb-3 inline-block tracking-widest">{news.category}</span>
                  <h3 className="font-black text-lg md:text-xl leading-snug tracking-tight">{news.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-white/5">
              <div className="w-1.5 h-8 bg-primary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Le Mur de l'Info</h2>
            </div>
            <div className="flex flex-col gap-8">
              {MOCK_POPULAR.map((news, idx) => (
                <div key={news.id} className="flex flex-col md:flex-row gap-6 md:gap-8 group frosted-glass p-4 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                  <div className="relative h-48 w-full md:w-64 flex-shrink-0 overflow-hidden rounded-xl border border-white/5">
                    <img src={news.thumbnail} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs h-8 w-8 flex items-center justify-center rounded-lg font-black shadow-xl">
                      0{idx + 1}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <span className="text-primary text-[10px] font-black uppercase tracking-widest">{news.category}</span>
                    <h3 className="font-black text-xl md:text-2xl line-clamp-2 leading-tight text-white group-hover:text-primary transition-colors tracking-tighter">
                      <Link to={`/article/${news.id}`}>{news.title}</Link>
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-2 leading-relaxed font-medium">
                      {news.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-[10px] text-white/30 font-black tracking-widest uppercase">
                       <span>PUBLIÉ PAR {news.authorName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-10">
            <div className="bg-secondary/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 flex-grow shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black uppercase tracking-tighter">TENDANCES</h3>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>
              <div className="space-y-10">
                {[
                  "Réforme de la sécurité : les nouvelles mesures entrent en vigueur dès lundi.",
                  "Football : L'équipe nationale se qualifie pour les quarts de finale mondiaux.",
                  "Innovation : Une startup locale lève 50 millions pour l'énergie solaire.",
                  "Culture : Le festival des arts attend 200 000 visiteurs."
                ].map((text, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl font-black text-white/5 group-hover:text-primary transition-colors tracking-tighter leading-none">0{i+1}</span>
                      <div>
                        <h4 className="text-sm font-bold leading-tight mb-2 text-white/80 group-hover:text-primary transition-colors">{text}</h4>
                        <span className="text-[10px] text-white/30 font-black uppercase tracking-widest">Actu • 15k lectures</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full py-6 mt-10 border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors text-white/50">
                Voir tout le classement
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-center flex flex-col justify-center items-center relative overflow-hidden shadow-2xl group">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
               <h3 className="text-2xl font-black mb-3 tracking-tighter">VRAI PATRIOTE</h3>
               <p className="text-white/70 text-sm mb-8 leading-relaxed font-medium">Rejoignez l'éveil des consciences nationales.</p>
               <Button className="bg-white text-secondary px-8 h-12 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform">
                 Connexion
               </Button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
