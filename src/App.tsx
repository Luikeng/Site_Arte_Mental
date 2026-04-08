/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
/// <reference types="vite/client" />
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MessageCircle, 
  ChevronRight, 
  Star, 
  Monitor, 
  Users, 
  Zap,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

// --- Components ---

const ScrollReveal = ({ children, delay = 0, direction = 'up', intensity = 40 }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right', intensity?: number, key?: React.Key }) => {
  const directions = {
    up: { y: intensity },
    down: { y: -intensity },
    left: { x: intensity },
    right: { x: -intensity }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction], scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Custom cubic-bezier for a "premium" feel
      }}
    >
      {children}
    </motion.div>
  );
};

const getAssetUrl = (name: string) => {
  const base = (import.meta as any).env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanName = name.startsWith('/') ? name.slice(1) : name;
  return `${cleanBase}${cleanName}`;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Atendimentos', href: '#servicos' },
    { name: 'Apresentação', href: '#apresentacao' },
    { name: 'Dúvidas', href: '#duvidas' },
    { name: 'Avaliações', href: '#avaliacoes' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-detail/50 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-display font-bold text-brand-secondary tracking-wider">
          Arte Mental.
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-brand-text hover:text-brand-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-secondary" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg border-b border-brand-detail overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-brand-text"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-start md:items-center pt-20 overflow-hidden bg-brand-bg">
      {/* Desktop Background (md+) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img 
          src={getAssetUrl("hero-desktop.jpg")} 
          alt="Geisson Oleques" 
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="sync"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/geisson-hero/1920/1080";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/80 via-brand-bg/10 to-transparent"></div>
      </div>

      {/* Mobile Background (sm only) */}
      <div className="md:hidden absolute inset-0 z-0">
        <img 
          src={getAssetUrl("hero-mobile.jpg")} 
          alt="Geisson Oleques" 
          className="w-full h-full object-cover object-[right_bottom]"
          fetchPriority="high"
          decoding="sync"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/seed/geisson-mobile/800/1200";
          }}
        />
        {/* Gradient from top to ensure text readability, fading out quickly */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/70 via-brand-bg/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="up" intensity={50}>
            <div className="text-center md:text-left pt-6 md:pt-0">
              <span className="text-brand-primary font-body uppercase tracking-[0.2em] text-xs mb-4 block">
                Comunicação Ativa e Descontraída
              </span>
              <h1 className="text-4xl md:text-6xl mb-4 text-brand-secondary leading-tight">
                Psicólogo<br />Geisson Oleques
              </h1>
              <p className="text-base text-brand-text/80 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Olá! Sou Geisson Oleques. Apresento aqui meu trabalho para que você decida, com calma, se deseja iniciar sua terapia.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a 
                  href="https://api.whatsapp.com/send?phone=5551992749130&text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta!" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-secondary text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                  Fale comigo <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Spacer to keep text at top/left and image visible at bottom/right */}
          <div className="h-[40vh] md:h-auto"></div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-brand-accent/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Foto do Profissional */}
          <ScrollReveal direction="left" intensity={60}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white relative z-10">
                <img 
                  src={getAssetUrl("perfil.jpg")} 
                  alt="Geisson Oleques - Psicólogo" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/psychologist/800/1000";
                  }}
                />
              </div>
              {/* Elemento decorativo atrás da foto */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-primary/30 rounded-[2rem] z-0"></div>
            </div>
          </ScrollReveal>

          {/* Texto de Apresentação */}
          <ScrollReveal direction="right" intensity={60} delay={0.2}>
            <div>
              <span className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-4 block">
                Conheça seu terapeuta
              </span>
              <h2 className="text-4xl md:text-5xl mb-8 text-brand-secondary leading-tight">
                Uma terapia onde o silêncio não é a regra.
              </h2>
              
              <div className="space-y-6 text-brand-text/90">
                <p className="text-lg leading-relaxed">
                  Olá! Sou <strong>Geisson Oleques (CRP 07/35759)</strong>. Acredito que a terapia deve ser um espaço de troca real, por isso minha abordagem é <strong>ativa e dinâmica</strong>.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0"></div>
                    <span><strong>Abordagem Sistêmica:</strong> Especializando em sistemas familiares para entender suas relações de forma profunda.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0"></div>
                    <span><strong>Compromisso com seu tempo:</strong> Valorizo a pontualidade para que você aproveite cada minuto da sua sessão.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0"></div>
                    <span><strong>Flexibilidade:</strong> Atendimento Online (Google Meet) ou Presencial em São Leopoldo (RS).</span>
                  </li>
                </ul>

                <p className="text-lg italic text-brand-secondary/80 pt-4">
                  "Meu objetivo é que você se sinta à vontade para construir, junto comigo, um processo de cuidado que faça sentido para a sua história."
                </p>

                <div className="pt-6">
                  <a 
                    href="https://api.whatsapp.com/send?phone=5551992749130&text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta!" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-4 transition-all"
                  >
                    Agendar primeira sessão <ChevronRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Atendimentos',
      description: 'Através de uma conversa descontraída, olhamos para suas questões e necessidades pessoais de forma ampla e dinâmica. Aqui teu terapeuta não é muito fã do silêncio nas sessões.',
      icon: <img src={getAssetUrl("conversa.svg")} alt="Ícone Conversa" className="h-28 w-auto object-contain" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
    },
    {
      title: 'Ansiedade e Depressão',
      description: 'Um diagnóstico é importante, mas ele não define você. Aqui, vamos descobrir juntos como compreender, lidar e seguir em frente após um diagnóstico em saúde mental.',
      icon: <img src={getAssetUrl("mao.svg")} alt="Ícone Mão" className="h-28 w-auto object-contain" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
    },
    {
      title: 'Acompanhamento',
      description: 'Nem toda terapia se baseia em resolver problemas ou buscar um diagnóstico. Às vezes, o que se procura é apenas um acompanhamento, por motivos e em momentos que só você pode decidir.',
      icon: <img src={getAssetUrl("cafe.svg")} alt="Ícone Café" className="h-28 w-auto object-contain" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
    }
  ];

  return (
    <section id="servicos" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-brand-secondary">Terapia online ou presencial</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.15} direction="up" intensity={30}>
              <div className="bg-white p-10 rounded-3xl border border-brand-detail/30 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center text-center h-full">
                <div className="mb-8 h-32 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl mb-4 text-brand-secondary">{service.title}</h3>
                <p className="text-brand-text/70 leading-relaxed">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: 'Quanto custa uma sessão?', a: 'O valor de cada sessão é 220 R$. O pagamento pode ser por cartão ou transferência bancária. Caso prefira utilizar outro meio de pagamento, estou à disposição para alinhar a melhor opção.' },
    { q: 'As sessões online são sigilosas?', a: 'Sim, as sessões online são completamente sigilosas e seguem as diretrizes da Lei Geral de Proteção de Dados (LGPD), garantindo a privacidade e a segurança das informações compartilhadas. Normalmente, utilizo o Google Meet.' },
    { q: 'Qual a abordagem teórica?', a: 'Minha trajetória acadêmica e profissional teve diversas fases, mas hoje me concentro no estudo da Abordagem Sistêmica Familiar, com a qual me identifico. No entanto, minhas leituras e práticas podem refletir elementos de diferentes áreas do conhecimento.' },
    { q: 'Os atendimentos são apenas particulares?', a: 'Sim, os atendimentos são exclusivamente particulares. No entanto, muitos pacientes conseguem obter reembolso pelas sessões junto aos seus planos de saúde, dependendo das particularidades e condições específicas de cada contrato.' },
    { q: 'Como funcionam os atendimentos?', a: 'As sessões têm duração média de 50 minutos, ocorrem com frequência mínima semanal e são iniciadas pontualmente no horário agendado.' },
    { q: 'Posso tirar outras dúvidas antes de agendar?', a: 'Estou à disposição para esclarecer quaisquer dúvidas antes do agendamento. Faço questão de entrar em contato previamente para me apresentar e garantir que todas as questões sejam devidamente esclarecidas.' },
  ];

  return (
    <section id="duvidas" className="py-24 bg-brand-accent/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-brand-secondary">Dúvidas comuns</h2>
        </ScrollReveal>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction="up" intensity={20}>
              <details className="group bg-white rounded-2xl border border-brand-detail/50 overflow-hidden">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-brand-secondary list-none">
                  {faq.q}
                  <ChevronRight className="text-brand-primary transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6 text-brand-text/80 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const InstagramFeed = () => {
  const posts = [
    { 
      id: 1, 
      url: "tdah.jpg", 
      link: "https://www.instagram.com/geissonoleques/p/DJR0YA8ReLA/",
      title: "TDAH em adultos"
    },
    { 
      id: 2, 
      url: "conviver.jpg", 
      link: "https://www.instagram.com/geissonoleques/p/ClhjzL3LzaO/",
      title: "Conviver com você mesmo"
    },
    { 
      id: 3, 
      url: "remedio.jpg", 
      link: "https://www.instagram.com/geissonoleques/p/CdoQ7rfsY6L/",
      title: "Medicação psiquiátrica"
    },
    { 
      id: 4, 
      url: "dependencia.jpg", 
      link: "https://www.instagram.com/geissonoleques/p/CZsOIhZPH5L/",
      title: "Dependência Emocional"
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <ScrollReveal direction="up">
            <Instagram className="mx-auto text-brand-primary mb-4" size={40} />
            <h2 className="text-3xl md:text-4xl mb-4 text-brand-secondary tracking-tight">Conteúdos no Instagram</h2>
            <a 
              href="https://instagram.com/geissonoleques" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl font-medium text-brand-primary hover:underline"
            >
              @geissonoleques
            </a>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1} direction="up" intensity={30}>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-square rounded-2xl overflow-hidden group shadow-md border border-brand-detail/20"
              >
                <img 
                  src={getAssetUrl(post.url)} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-brand-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <Instagram className="text-white mb-2" size={24} />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">{post.title}</span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-brand-text/60 mb-6">Informação e reflexão sobre saúde mental e relações.</p>
            <a 
              href="https://instagram.com/geissonoleques" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-accent/50 text-brand-secondary px-8 py-3 rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all shadow-sm"
            >
              Ver mais no perfil <ChevronRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contato" className="bg-brand-secondary text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl mb-8 text-white">Agende sua sessão</h2>
        <p className="mb-12 text-white/80 max-w-xl mx-auto">
          Se você sente que é hora de começar (ou retomar) a terapia, podemos conversar sem compromisso para entender o que faz sentido neste momento da sua vida.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center gap-2">
            <Phone className="text-brand-primary mb-2" size={24} />
            <p className="font-bold">WhatsApp</p>
            <a href="https://api.whatsapp.com/send?phone=5551992749130&text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta!" className="text-white/70 hover:text-brand-primary transition-colors">
              +55 51 99274-9130
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Mail className="text-brand-primary mb-2" size={24} />
            <p className="font-bold">E-mail</p>
            <a href="mailto:geisson.oleques@gmail.com" className="text-white/70 hover:text-brand-primary transition-colors">
              geisson.oleques@gmail.com
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Instagram className="text-brand-primary mb-2" size={24} />
            <p className="font-bold">Instagram</p>
            <a href="https://instagram.com/geissonoleques" className="text-white/70 hover:text-brand-primary transition-colors">
              @geissonoleques
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-sm text-white/40">
          <p className="mb-2">Geisson Oleques - CRP 07/35759</p>
          <p className="mb-4">Saúde da mente, corpo e relações</p>
          <p>© 2024 Arte Mental. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-primary/30">
      <Navbar />
      <Hero />
      <Services />
      <About />
      
      {/* Presentation Section */}
      <section id="apresentacao" className="py-24 bg-brand-secondary">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl mb-8 text-white">Apresentação</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-12">
              Eu sempre achei que escolher um psicólogo é uma questão de afinidade. Por isso, neste vídeo, eu me apresento e conto um pouco sobre o meu trabalho terapêutico.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" intensity={80} delay={0.2}>
            <div className="max-w-[400px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black/20 flex items-center justify-center border border-white/10">
               {/* Placeholder for YouTube Embed */}
               <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/rXN8j0qpmpI" 
                  title="Apresentação Geisson Oleques"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
               ></iframe>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="mt-12">
              <a 
                href="https://api.whatsapp.com/send?phone=5551992749130&text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-brand-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                Agende seu horário
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQ />
      <InstagramFeed />

      {/* Testimonials */}
      <section id="avaliacoes" className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl text-center mb-8 text-brand-secondary">Avaliações dos Pacientes</h2>
            <p className="text-center text-brand-text/60 max-w-2xl mx-auto mb-16">
              Qualquer pessoa pode fazer um site e publicar uma opinião. Por isso, uso a Doctoralia para receber avaliações autênticas.
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal direction="left" intensity={40} delay={0.1}>
              <div className="bg-brand-accent/20 p-8 rounded-3xl border border-brand-detail/20 shadow-sm h-full">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="italic text-brand-text/80 mb-6">
                  "Busquei a ajuda do Geisson, inicialmente para ansiedade e timidez, mas estou aprendendo tudo sobre mim, ele é super calmo, atencioso, ouvinte, e nos faz se sentir bem, a vontade nas consultas."
                </p>
                <p className="text-sm font-bold text-brand-secondary">— Paciente via Doctoralia</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" intensity={40} delay={0.2}>
              <div className="bg-brand-accent/20 p-8 rounded-3xl border border-brand-detail/20 shadow-sm h-full">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="italic text-brand-text/80 mb-6">
                  "Me senti com um amigo de longa data e que estava o atualizando dos acontecimentos. Minha primeira experiência com um terapeuta e eu amei!"
                </p>
                <p className="text-sm font-bold text-brand-secondary">— Paciente via Doctoralia</p>
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal direction="up" delay={0.4}>
            <div className="text-center mt-12">
              <a 
                href="https://www.doctoralia.com.br/geisson-oleques/psicologo/sao-leopoldo#profile-reviews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-primary font-bold hover:underline flex items-center justify-center gap-2"
              >
                Ver todas as avaliações na Doctoralia <ChevronRight size={18} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp */}
      <a 
        href="https://api.whatsapp.com/send?phone=5551992749130&text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20consulta!" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Agendar consulta pelo WhatsApp"
        className="fixed bottom-8 right-8 z-50 bg-brand-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center gap-0 group-hover:gap-2 group min-w-[56px] min-h-[56px]"
      >
        <MessageCircle size={24} className="flex-shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">
          Agendar Sessão
        </span>
      </a>
    </div>
  );
}
