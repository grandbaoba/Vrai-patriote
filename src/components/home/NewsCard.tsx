import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, MessageSquare, Heart, Video } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  thumbnail: string;
  authorName: string;
  publishedAt: string;
  commentsCount: number;
  likesCount: number;
  isVideo?: boolean;
};

export const NewsCard = ({ news }: { news: NewsItem; key?: string | number }) => {
  return (
    <Card className="frosted-glass news-card-hover overflow-hidden h-full group">
      <Link to={`/article/${news.id}`} className="block h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden border-b border-white/5">
          <img 
            src={news.thumbnail} 
            alt={news.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <Badge className="absolute top-3 left-3 bg-primary border-none text-white font-black uppercase text-[9px] tracking-widest px-2 py-0.5 rounded">
            {news.category}
          </Badge>
          {news.isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
              <div className="bg-primary/90 p-3 rounded-full text-white shadow-xl backdrop-blur-sm border border-white/20">
                <Video className="h-6 w-6" />
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-5 flex-grow flex flex-col gap-3">
          <h3 className="font-sans font-black text-sm leading-snug line-clamp-2 text-white group-hover:text-primary transition-colors tracking-tight">
            {news.title}
          </h3>
          <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">
            {news.excerpt}
          </p>
          <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold text-white/40 tracking-widest uppercase">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><User className="h-3 w-3 opacity-50" /> {news.authorName}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3 opacity-50" /> {news.commentsCount}</span>
              <span className="flex items-center gap-1"><Heart className="h-3 w-3 opacity-50" /> {news.likesCount}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
