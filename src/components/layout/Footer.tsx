import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Smartphone as WhatsApp, Send, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/ui/Logo.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer className="bg-[#000810] text-white pt-20 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="flex flex-col gap-8">
          <Logo className="h-12" />
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            VRAI PATRIOTE est votre source d'information indépendante et professionnelle. 
            Nous nous engageons à fournir des informations vérifiées et pertinentes au cœur de la nation.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, WhatsApp, Send].map((Icon, i) => (
              <Button key={i} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-primary border border-white/10 transition-all">
                <Icon className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary">Catégories</h4>
          <ul className="flex flex-col gap-4">
            {['Actualités', 'Politique', 'Société', 'Économie', 'Sport', 'Vidéos'].map(item => (
              <li key={item}><Link to={`/category/${item.toLowerCase()}`} className="text-white/60 hover:text-primary hover:translate-x-1 transition-all inline-block font-medium">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary">Informations</h4>
          <ul className="flex flex-col gap-4">
            {['À Propos', 'Contactez-nous', 'Confidentialité', 'Conditions'].map(item => (
              <li key={item}><Link to="#" className="text-white/60 hover:text-primary hover:translate-x-1 transition-all inline-block font-medium">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary">Newsletter</h4>
          <p className="text-white/50 text-sm mb-6 leading-relaxed">Rejoignez la communauté des patriotes et recevez l'essentiel de l'info.</p>
          <div className="flex flex-col gap-3">
            <Input 
              type="email" 
              placeholder="votre@email.com" 
              className="h-12 bg-white/5 border-white/10 text-white rounded-xl px-4 focus-visible:ring-primary"
            />
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all">
              JE M'ABONNE
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 uppercase tracking-[0.3em]">
        <p>© {new Date().getFullYear()} VRAI PATRIOTE - L'information au cœur de la nation</p>
        <div className="flex gap-8">
           <span>Design & Dev by VP Media Lab</span>
        </div>
      </div>
    </footer>
  );
};
