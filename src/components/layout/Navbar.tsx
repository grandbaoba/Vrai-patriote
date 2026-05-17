import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Bell, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/Logo.tsx';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { toast } from 'sonner';

const NAV_LINKS = [
  { name: 'Accueil', path: '/' },
  { name: 'Actualités', path: '/category/actualites' },
  { name: 'Politique', path: '/category/politique' },
  { name: 'Société', path: '/category/societe' },
  { name: 'Sécurité', path: '/category/securite' },
  { name: 'Économie', path: '/category/economie' },
  { name: 'Sport', path: '/category/sport' },
  { name: 'Vidéos', path: '/category/videos' },
];

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const user = auth?.currentUser;

  const handleLogin = async () => {
    if (!isFirebaseConfigured) {
      toast.error("Firebase n'est pas configuré. Veuillez ajouter vos clés API dans les paramètres.");
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Connexion réussie !");
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error("Erreur de connexion: " + (error.message || "Inconnue"));
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-secondary backdrop-blur-xl shrink-0">
      <div className="bg-primary py-2 px-8 flex items-center gap-4 shrink-0 overflow-hidden">
        <span className="bg-white text-primary text-[10px] font-black px-2 py-0.5 rounded uppercase shrink-0">Breaking News</span>
        <div className="text-sm font-medium italic opacity-95 animate-marquee whitespace-nowrap overflow-hidden flex items-center gap-10">
           <span>Dernière minute : Le gouvernement annonce un nouveau plan pour l'investissement technologique national</span>
           <span>•</span>
           <span>Sécurité : Renforcement des patrouilles aux frontières</span>
           <span>•</span>
           <span>Sport : Les aigles s'imposent en finale continentale</span>
        </div>
      </div>

      <nav className="container mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden text-white" />} nativeButton={true}>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle><Logo className="h-8" /></SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="text-lg font-medium hover:text-brand-primary transition-colors py-2 border-b"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/">
            <Logo className="h-10 md:h-12" />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-sm font-semibold hover:text-brand-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className={`relative flex items-center transition-all duration-500 ${isSearchOpen ? 'w-48 md:w-64' : 'w-10'}`}>
            <Input 
              type="text" 
              placeholder="Rechercher..." 
              className={`pr-10 h-9 bg-white/5 border-white/10 rounded-full text-xs transition-opacity duration-300 focus-visible:ring-primary ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 h-9 w-10 text-white/70 hover:text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="relative text-white/70 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full"></span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full overflow-hidden" />} nativeButton={true}>
                <img src={user.photoURL || ""} alt={user.displayName || ""} className="h-8 w-8 rounded-full border border-white/20" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="frosted-glass backdrop-blur-2xl border-white/10 text-white">
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="hover:bg-white/10 cursor-pointer" onClick={() => navigate('/profile')}>Profil</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10 cursor-pointer" onClick={() => navigate('/admin')}>Dashboard Admin</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="hover:bg-white/10 cursor-pointer text-red-400" onClick={handleLogout}>Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={handleLogin} className="bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs px-6 rounded-lg transition-all">
               S'abonner
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
