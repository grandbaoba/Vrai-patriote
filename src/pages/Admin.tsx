import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, Newspaper, Video, Image as ImageIcon, MessageSquare, 
  Users, Settings, LogOut, Plus, Search, Filter, 
  MoreHorizontal, Edit, Trash2, CheckCircle2, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';

// Components
const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === `/admin${path}` || (path === "" && location.pathname === "/admin");

  return (
    <div className="w-64 bg-secondary text-white flex flex-col h-screen fixed left-0 top-0 z-50 border-r border-white/5">
      <div className="p-8 pb-4">
        <Link to="/" className="flex flex-col gap-1">
          <span className="text-xl font-black tracking-tighter uppercase">VRAI PATRIOTE</span>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Dashboard Admin</span>
        </Link>
      </div>
      
      <nav className="flex-grow flex flex-col gap-1 p-4">
        {[
          { name: 'Vue d\'ensemble', icon: BarChart3, path: '' },
          { name: 'Articles', icon: Newspaper, path: '/posts' },
          { name: 'Vidéos', icon: Video, path: '/videos' },
          { name: 'Photos', icon: ImageIcon, path: '/photos' },
          { name: 'Commentaires', icon: MessageSquare, path: '/comments' },
          { name: 'Utilisateurs', icon: Users, path: '/users' },
        ].map((item) => (
          <Link 
            key={item.path} 
            to={`/admin${item.path}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isActive(item.path) ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        <Button variant="ghost" className="justify-start gap-3 text-gray-400 hover:text-white hover:bg-red-500/10">
          <Settings className="h-5 w-5" /> Paramètres
        </Button>
        <Button variant="ghost" className="justify-start gap-3 text-red-400 hover:text-red-500 hover:bg-red-500/10">
          <LogOut className="h-5 w-5" /> Déconnexion
        </Button>
      </div>
    </div>
  );
};

const Overview = () => {
  const data = [
    { name: 'Lundi', views: 400, comments: 24 },
    { name: 'Mardi', views: 300, comments: 13 },
    { name: 'Mercredi', views: 200, comments: 45 },
    { name: 'Jeudi', views: 278, comments: 39 },
    { name: 'Vendredi', views: 189, comments: 48 },
    { name: 'Samedi', views: 239, comments: 38 },
    { name: 'Dimanche', views: 349, comments: 43 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Visites Totales', value: '124,500', sub: '+12% ce mois', icon: Users, color: 'text-blue-500' },
          { label: 'Articles Publiés', value: '156', sub: '8 cette semaine', icon: Newspaper, color: 'text-green-500' },
          { label: 'Vidéos', value: '42', sub: '2 en attente', icon: Video, color: 'text-purple-500' },
          { label: 'Commentaires', value: '1,200', sub: '+85 nouveaux', icon: MessageSquare, color: 'text-orange-500' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm h-full">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <h4 className="text-3xl font-extrabold">{stat.value}</h4>
                <p className="text-xs font-medium text-green-500">{stat.sub}</p>
              </div>
              <div className={`p-4 rounded-2xl bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading font-extrabold">TRAFIC HEBDOMADAIRE</CardTitle>
            <CardDescription>Évolution des vues sur les 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                 />
                <Bar dataKey="views" fill="var(--color-brand-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading font-extrabold">INTERACTIONS</CardTitle>
            <CardDescription>Commentaires et réactions par jour</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="comments" stroke="#F97316" strokeWidth={4} dot={{ r: 4, fill: '#F97316', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const PostList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex gap-4 items-center flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Rechercher un article..." 
              className="pl-10 h-11 bg-gray-50 border-none focus-visible:ring-brand-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-11 gap-2 font-bold px-6 border-gray-200">
            <Filter className="h-4 w-4" /> FILTRER
          </Button>
        </div>
        <Link to="/admin/posts/new">
          <Button className="bg-brand-primary h-11 px-8 font-bold gap-2 shadow-lg shadow-brand-primary/20">
            <Plus className="h-5 w-5" /> NOUVEL ARTICLE
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 hover:bg-gray-50">
            <TableRow className="border-transparent">
              <TableHead className="font-bold text-xs uppercase tracking-widest py-6">Article</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-6">Catégorie</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-6">Statut</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-6">Date</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: 1, title: "Le nouveau plan de développement national...", category: "Politique", status: "published", date: "17 Mai 2026" },
              { id: 2, title: "Innovations technologiques pour la police...", category: "Sécurité", status: "draft", date: "16 Mai 2026" },
              { id: 3, title: "Le derby national promet des étincelles...", category: "Sport", status: "published", date: "15 Mai 2026" },
            ].map((post) => (
              <TableRow key={post.id} className="hover:bg-gray-50/50">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={`https://picsum.photos/seed/adm${post.id}/100/100`} alt="" className="h-full w-full object-cover" />
                    </div>
                    <span className="font-bold text-sm line-clamp-1">{post.title}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant="secondary" className="font-bold uppercase text-[10px]">{post.category}</Badge>
                </TableCell>
                <TableCell className="py-4">
                  {post.status === 'published' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold uppercase text-[10px] gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Publié
                    </Badge>
                  ) : (
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none font-bold uppercase text-[10px] gap-1">
                      <XCircle className="h-3 w-3" /> Brouillon
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="py-4 text-xs font-bold text-gray-500 uppercase">{post.date}</TableCell>
                <TableCell className="py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />} nativeButton={true}>
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem className="gap-2 font-bold cursor-pointer"><Edit className="h-4 w-4" /> Modifier</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 font-bold cursor-pointer text-red-500 focus:text-red-500"><Trash2 className="h-4 w-4" /> Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const NewPostForm = () => {
  const navigate = useNavigate();
  return (
    <Card className="max-w-4xl mx-auto border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-heading font-extrabold">PUBLIER UNE NOUVELLE INFORMATION</CardTitle>
        <CardDescription>Remplissez les champs ci-dessous pour publier un article, une photo ou une vidéo.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Titre de l'information</label>
            <Input placeholder="Entrez un titre percutant..." className="h-12 bg-gray-50 border-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Catégorie</label>
             <select className="h-12 bg-gray-50 border-none rounded-md px-3 font-medium focus:ring-2 focus:ring-brand-primary outline-none">
                <option>Actualités</option>
                <option>Politique</option>
                <option>Économie</option>
                <option>Vidéos</option>
                <option>Sport</option>
             </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Extrait / Description courte</label>
          <Textarea placeholder="Un bref résumé pour la page d'accueil..." className="min-h-[80px] bg-gray-50 border-none resize-none" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Contenu de l'article</label>
          <Textarea placeholder="Le corps de votre information..." className="min-h-[300px] bg-gray-50 border-none resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">URL de l'image (Thumbnail)</label>
            <Input placeholder="https://..." className="h-12 bg-gray-50 border-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-400">URL de la vidéo (Optionnel)</label>
            <Input placeholder="https://..." className="h-12 bg-gray-50 border-none" />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t">
          <Button className="bg-brand-primary h-12 px-10 font-bold shadow-lg shadow-brand-primary/20">PUBLIER MAINTENANT</Button>
          <Button variant="outline" className="h-12 px-8 font-bold border-gray-200" onClick={() => navigate('/admin/posts')}>ANNULER</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background flex text-white font-sans">
      <AdminSidebar />
      <div className="flex-grow pl-64">
        <header className="h-20 bg-secondary/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 flex items-center justify-between px-10">
          <h2 className="text-xl font-black uppercase tracking-tighter">Panneau de Contrôle</h2>
          <div className="flex items-center gap-6">
            <span className="text-xs font-black text-white/40 uppercase tracking-widest leading-none">Bonjour, <span className="text-primary italic">Admin VP</span></span>
            <Avatar className="h-10 w-10 border border-white/10 ring-2 ring-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-secondary text-white text-[10px] font-black">AV</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-10">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/new" element={<NewPostForm />} />
            {/* Fallback for other paths */}
            <Route path="*" element={<Overview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
