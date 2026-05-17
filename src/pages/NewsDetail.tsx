import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, User, MessageSquare, Heart, Share2, 
  Facebook, Twitter, Smartphone as WhatsApp, Send,
  ChevronRight, ThumbsUp, Reply
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NewsDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  // Simulation de données
  const article = {
    title: "Le nouveau plan de développement national : Un tournant historique pour l'économie",
    category: "Politique",
    author: "Jean-Pierre Patriote",
    date: "17 Mai 2026",
    image: "https://picsum.photos/seed/detail/1200/600",
    content: `
      Le gouvernement a dévoilé ce matin les grandes lignes du nouveau plan de développement stratégique pour la décennie à venir. Ce projet ambitieux, baptisé "Vision Patriotique 2036", vise à transformer radicalement les infrastructures et le tissu industriel du pays.

      Selon les premiers rapports, plus de 500 milliards seront investis dans des secteurs clés tels que l'énergie renouvelable, l'éducation technologique et la modernisation des réseaux de transport. "C'est un moment historique pour notre nation," a déclaré le Premier Ministre lors de la conférence de presse.

      Les experts économiques accueillent cette nouvelle avec un optimisme prudent, soulignant que la réussite de ce plan dépendra largement de la transparence dans son exécution et de la mobilisation de tous les acteurs sociaux.

      L'objectif est clair : réduire la dépendance aux exportations de matières premières et créer un environnement propice à l'innovation locale. Les petites et moyennes entreprises (PME) seront au cœur de cette stratégie, avec des facilités de crédit et un accompagnement technique renforcé.

      Nous suivrons de près l'évolution de ce dossier majeur pour l'avenir de tous les citoyens.
    `,
    comments: [
      { id: 'c1', author: 'Marie Claire', photo: '', text: 'Enfin un projet concret pour la jeunesse ! Espérons que les délais soient respectés.', date: 'Il y a 1h', likes: 12 },
      { id: 'c2', author: 'Paul Martin', photo: '', text: "Et qu'en est-il du secteur agricole ? Il semble oublié dans ce plan.", date: 'Il y a 30 min', likes: 5 }
    ]
  };

  return (
    <div className="pb-32 bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-primary mb-10">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/category/${article.category.toLowerCase()}`} className="hover:text-white transition-colors">{article.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/30 line-clamp-1">{article.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <span className="bg-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter mb-10 text-white">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 mb-12 text-[10px] text-white/40 font-black uppercase tracking-[0.2em] border-y py-6 border-white/5">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-white/10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-[8px] text-white">JP</AvatarFallback>
                </Avatar>
                <span className="text-white/80">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 opacity-50" />
                <span>Publié le {article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 opacity-50" />
                <span>{article.comments.length} Commentaires</span>
              </div>
            </div>

            <div className="aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl border border-white/5 bg-secondary/20">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed font-medium mb-20 tracking-tight">
              {article.content.split('\n').map((para, i) => para.trim() && (
                <p key={i} className="mb-8">{para.trim()}</p>
              ))}
            </div>

            {/* Interaction Bar */}
            <div className="flex items-center justify-between border-y py-10 border-white/5 mb-20">
              <div className="flex items-center gap-6">
                <Button 
                  variant={liked ? "default" : "outline"} 
                  onClick={() => setLiked(!liked)}
                  className={`h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${liked ? 'bg-primary border-primary' : 'border-white/10 hover:bg-white/5'}`}
                >
                  <ThumbsUp className={`h-5 w-5 mr-2 ${liked ? 'fill-white' : ''}`} /> 
                  J'AIME
                </Button>
                <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 font-black text-xs uppercase tracking-widest">
                  <Share2 className="h-5 w-5 mr-2" /> 
                  PARTAGER
                </Button>
              </div>
              <div className="hidden md:flex items-center gap-4">
                {[Facebook, Twitter, WhatsApp].map((Icon, i) => (
                  <Button key={i} variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all">
                    <Icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <section id="comments">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-1.5 h-8 bg-primary rounded-full" />
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                  RÉACTIONS ({article.comments.length})
                </h3>
              </div>

              <div className="flex flex-col gap-10 mb-20">
                {article.comments.map(c => (
                  <div key={c.id} className="flex gap-6 frosted-glass p-6 rounded-3xl border-white/5">
                    <Avatar className="h-12 w-12 border border-white/10 shrink-0">
                      <AvatarImage src={c.photo} />
                      <AvatarFallback className="bg-secondary text-white text-xs">{c.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-3 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm uppercase tracking-widest text-primary">{c.author}</span>
                        <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">{c.date}</span>
                      </div>
                      <p className="text-white/80 text-base leading-relaxed font-medium italic">
                        "{c.text}"
                      </p>
                      <div className="flex items-center gap-8 mt-2">
                        <button className="flex items-center gap-2 text-[9px] font-black text-white/40 hover:text-primary transition-colors tracking-widest uppercase">
                          <ThumbsUp className="h-3.5 w-3.5" /> {c.likes} ACCORDS
                        </button>
                        <button className="flex items-center gap-2 text-[9px] font-black text-white/40 hover:text-primary transition-colors tracking-widest uppercase">
                          <Reply className="h-3.5 w-3.5" /> RÉPONDRE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-secondary/30 backdrop-blur-3xl p-10 rounded-[2rem] border border-white/5 shadow-2xl">
                <h4 className="font-black mb-8 text-xl tracking-tighter uppercase">EXPRIMEZ VOTRE PATRIOTISME</h4>
                <div className="flex flex-col gap-6">
                  <Textarea 
                    placeholder="Qu'en pensez-vous ? Répondez avec l'élégance d'un véritable patriote..." 
                    className="min-h-[160px] bg-white/5 border-white/10 text-white rounded-2xl resize-none p-6 text-base tracking-tight focus-visible:ring-primary"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button className="h-14 px-12 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-2xl shadow-primary/30 transition-all active:scale-95">
                      PUBLIER L'AVIS
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-12">
            <div className="bg-gradient-to-br from-primary to-secondary p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-125 duration-700" />
               <h3 className="font-black text-2xl mb-4 tracking-tighter relative z-10 italic">VRAI PATRIOTE</h3>
               <p className="text-white/70 text-sm mb-10 relative z-10 leading-relaxed font-bold tracking-tight">Restez connecté à l'éveil des consciences nationales. Rejoignez notre revue exclusive.</p>
               <Button className="w-full h-14 bg-white text-secondary font-black uppercase text-xs tracking-widest hover:bg-white/90 transition-all rounded-2xl relative z-10">
                 S'INSCRIRE À LA REVUE
               </Button>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h4 className="text-lg font-black uppercase tracking-tighter">SUR LE MÊME SUJET</h4>
              </div>
              <div className="flex flex-col gap-8">
                {[1, 2, 3].map(i => (
                  <Link key={i} to={`/article/related-${i}`} className="flex gap-6 group cursor-pointer group">
                    <div className="h-20 w-20 flex-shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-secondary/50">
                      <img src={`https://picsum.photos/seed/rel${i}/200/200`} alt="Related" className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <h5 className="font-black text-sm leading-snug text-white/80 group-hover:text-primary transition-colors line-clamp-2 tracking-tight">Pourquoi cette nouvelle réforme impactera votre quotidien dès demain</h5>
                      <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">IL Y A 2 JOURS</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sticky top-32">
               <div className="frosted-glass p-4 rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://picsum.photos/seed/ad2/400/600" alt="Publicité" className="w-full h-auto rounded-2xl opacity-80" referrerPolicy="no-referrer" />
                  <p className="text-[10px] text-center text-white/20 font-black uppercase py-4 tracking-[0.3em] leading-none">ESPACE PUBLICITAIRE</p>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const Newspaper = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
);
