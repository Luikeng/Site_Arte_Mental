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
  Instagram,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  ShieldCheck,
  Brain,
  Briefcase,
  ScrollText,
  ParkingCircle,
  Wallet,
  Calendar,
  ExternalLink,
} from 'lucide-react';

// --- Helpers ---

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
        ease: [0.21, 0.47, 0.32, 0.98]
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

const WHATSAPP_BASE = "https://api.whatsapp.com/send?phone=5551992749130";
const waMsg = (text: string) => `${WHATSAPP_BASE}&text=${encodeURIComponent(text)}`;

// --- Components ---

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
    { name: 'Atendimentos', href: '#servicos' },
    { name: 'Avaliações', href: '#avaliacoes' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Como chegar', href: '#como-chegar' },
    { name: 'Dúvidas', href: '#duvidas' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-detail/50 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-display font-bold text-brand-secondary tracking-wider">
          Arte Mental.
        </div>

        <div className="hidden md:flex space-x-7">
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

        <button
          className="md:hidden text-brand-secondary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

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
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/40 to-transparent to-40%"></div>
      </div>

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
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/30 from-0% to-transparent to-25%"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="up" intensity={50}>
            <div className="text-center md:text-left bg-brand-bg/85 md:bg-brand-bg/75 backdrop-blur-md md:backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl md:shadow-lg border border-white/40">
              <span className="text-brand-primary font-body uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3 md:mb-4 block">
                Psicólogo em São Leopoldo · Centro · CRP 07/35759 · desde 2019
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-6xl mb-3 md:mb-4 text-brand-secondary leading-tight [text-wrap:balance]">
                Uma terapia onde o silêncio <span className="text-brand-primary whitespace-nowrap">não é a regra.</span>
              </h1>
              <p className="text-sm md:text-lg text-brand-text/80 mb-4 md:mb-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Psicoterapia presencial no Centro de São Leopoldo. Foco em <strong>ansiedade</strong>, <strong>carreira</strong> e <strong>relações</strong> na vida adulta.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-6">
                {['Ansiedade', 'Carreira', 'Relações', 'Avaliação psicológica'].map((tag) => (
                  <span key={tag} className="bg-white/70 backdrop-blur-sm text-brand-secondary text-[11px] md:text-xs font-medium px-3 py-1 rounded-full border border-brand-detail/40">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4 md:mb-6 text-xs md:text-sm">
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-brand-detail/40">
                  <span className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </span>
                  <span className="font-bold text-brand-secondary">5,0</span>
                  <span className="text-brand-text/60">· 48 avaliações Doctoralia</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={waMsg("Oi, Geisson! Vi seu site e queria entender melhor antes de agendar. Pode ser?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-secondary text-white px-6 md:px-7 py-3 md:py-3.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Agendar primeira sessão <MessageCircle size={16} />
                </a>
              </div>

              <p className="text-xs md:text-sm text-brand-secondary/90 mt-3 md:mt-4 font-medium">
                Pague só após o primeiro atendimento — sem compromisso pra começar.
              </p>
            </div>
          </ScrollReveal>

          <div className="h-[50vh] md:h-auto"></div>
        </div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  const items = [
    {
      icon: <ParkingCircle className="text-brand-primary" size={28} />,
      title: "Estacionamento gratuito",
      sub: "Vagas livres na rua, sem parquímetro"
    },
    {
      icon: <Wallet className="text-brand-primary" size={28} />,
      title: "Pague após o atendimento",
      sub: "Sem compromisso financeiro pra começar"
    },
    {
      icon: <Calendar className="text-brand-primary" size={28} />,
      title: "Atendendo desde 2019",
      sub: "CRP 07/35759 · Sistêmica Familiar"
    },
  ];

  return (
    <section className="py-12 bg-brand-accent/40 border-y border-brand-detail/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1} direction="up" intensity={20}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-brand-secondary text-base">{item.title}</h3>
                  <p className="text-sm text-brand-text/70">{item.sub}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Brain className="text-brand-primary" size={48} strokeWidth={1.4} />,
      title: 'Adultos com ansiedade',
      description: 'Você sente que sua cabeça não desliga, evita situações ou se sente travado(a) por preocupações? A terapia ajuda a entender o ciclo da ansiedade e construir formas mais leves de viver.',
    },
    {
      icon: <Briefcase className="text-brand-primary" size={48} strokeWidth={1.4} />,
      title: 'Adultos jovens em transição de carreira',
      description: 'Primeiro emprego, mudança de área, dúvida sobre o que fazer da vida ou sensação de estar parado enquanto todos avançam. Um espaço pra pensar a sua carreira sem pressa.',
    },
    {
      icon: <ScrollText className="text-brand-primary" size={48} strokeWidth={1.4} />,
      title: 'Avaliação e diagnóstico em saúde mental',
      description: 'Avaliação psicológica para adultos com emissão de laudo formal. Útil para questões como TDAH, encaminhamento clínico, apresentação a empresa, escola ou perícia.',
    }
  ];

  return (
    <section id="servicos" className="py-24">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl text-center mb-4 text-brand-secondary">Atendimentos presenciais</h2>
          <p className="text-center text-brand-text/70 max-w-2xl mx-auto mb-16">
            Consultório no Centro de São Leopoldo. Sessões individuais de 50 minutos.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.15} direction="up" intensity={30}>
              <div className="bg-white p-10 rounded-3xl border border-brand-detail/30 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center text-center h-full">
                <div className="mb-8 h-20 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl mb-4 text-brand-secondary">{service.title}</h3>
                <p className="text-brand-text/70 leading-relaxed">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.3}>
          <p className="text-center text-brand-text/60 mt-12 max-w-3xl mx-auto text-sm italic">
            Atendimento dedicado a adultos e jovens adultos. Também atendo famílias, relacionamentos e dúvidas de carreira em geral.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Avaliacoes = () => {
  const testimonials = [
    {
      text: "Busquei a ajuda do Geisson, inicialmente para ansiedade e timidez, mas estou aprendendo tudo sobre mim, ele é super calmo, atencioso, ouvinte, e nos faz se sentir bem, à vontade nas consultas.",
      author: "Paciente · Doctoralia"
    },
    {
      text: "Me senti com um amigo de longa data e que estava o atualizando dos acontecimentos. Minha primeira experiência com um terapeuta e eu amei!",
      author: "Paciente · Doctoralia"
    },
  ];

  return (
    <section id="avaliacoes" className="py-24 bg-brand-accent/30">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-brand-detail/40 mb-6">
              <span className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </span>
              <span className="font-bold text-brand-secondary text-lg">5,0</span>
              <span className="text-brand-text/70">· 48 avaliações no Doctoralia</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-brand-secondary mb-4">Avaliações dos pacientes</h2>
            <p className="text-brand-text/60 max-w-2xl mx-auto">
              Avaliações reais e verificadas pela plataforma Doctoralia.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={idx} direction={idx === 0 ? 'left' : 'right'} intensity={40} delay={0.1 * (idx + 1)}>
              <div className="bg-white p-8 rounded-3xl border border-brand-detail/30 shadow-sm h-full">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="italic text-brand-text/80 mb-6 leading-relaxed">"{t.text}"</p>
                <p className="text-sm font-bold text-brand-secondary">— {t.author}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <a
              href="https://www.doctoralia.com.br/geisson-oleques/psicologo/sao-leopoldo#profile-reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all"
            >
              Ver todas as 48 avaliações no Doctoralia <ChevronRight size={18} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
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
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-primary/30 rounded-[2rem] z-0"></div>
            </div>
          </ScrollReveal>

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
                  Sou <strong>Geisson Oleques</strong>, psicólogo (CRP 07/35759), atendendo desde <strong>2019</strong>. Acredito que a terapia deve ser um espaço de troca real, por isso minha abordagem é <strong>ativa e dinâmica</strong>.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Brain className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                    <span><strong>Abordagem Sistêmica:</strong> trabalho com sistemas familiares e relacionais para entender suas questões em contexto, não isoladas.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                    <span><strong>Sigilo absoluto:</strong> tudo que é dito em sessão está protegido pelo Código de Ética da profissão e pela LGPD.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                    <span><strong>Pontualidade:</strong> sessões iniciam no horário marcado para você aproveitar cada minuto.</span>
                  </li>
                </ul>

                <p className="text-lg italic text-brand-secondary/80 pt-4">
                  "Meu objetivo é que você se sinta à vontade para construir, junto comigo, um processo de cuidado que faça sentido para a sua história."
                </p>

                <div className="pt-6">
                  <a
                    href={waMsg("Olá! Gostaria de saber mais sobre a abordagem antes de agendar.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-primary font-bold hover:gap-4 transition-all"
                  >
                    Conversar pelo WhatsApp <ChevronRight size={20} />
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

const Apresentacao = () => {
  return (
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
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/rXN8j0qpmpI"
              title="Apresentação Geisson Oleques"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-12">
            <a
              href={waMsg("Olá! Vi sua apresentação no site e gostaria de agendar.")}
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
  );
};

const ComoChegar = () => {
  return (
    <section id="como-chegar" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl text-center mb-4 text-brand-secondary">Como chegar</h2>
          <p className="text-center text-brand-text/70 max-w-2xl mx-auto mb-16">
            Consultório no Centro de São Leopoldo. Estacionamento público gratuito na rua.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 items-stretch max-w-6xl mx-auto">
          <ScrollReveal direction="left" intensity={40}>
            <div className="aspect-[4/3] md:aspect-auto md:h-full rounded-3xl overflow-hidden shadow-xl border border-brand-detail/30">
              <img
                src={getAssetUrl("consultorio.jpg")}
                alt="Consultório Arte Mental — Centro de São Leopoldo"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/consultorio/1200/900";
                }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" intensity={40} delay={0.15}>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-detail/30 h-full flex flex-col">
              <ul className="space-y-5 flex-1">
                <li className="flex items-start gap-4">
                  <MapPin className="text-brand-primary mt-1 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-bold text-brand-secondary mb-1">Endereço</p>
                    <p className="text-brand-text/80">
                      Rua Presidente Roosevelt, 103 — Sala 3<br />
                      Centro · São Leopoldo · RS<br />
                      CEP 93010-060
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <ParkingCircle className="text-brand-primary mt-1 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-bold text-brand-secondary mb-1">Estacionamento</p>
                    <p className="text-brand-text/80">Vagas públicas gratuitas na rua. Sem parquímetro na região.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Award className="text-brand-primary mt-1 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-bold text-brand-secondary mb-1">Sobre o espaço</p>
                    <p className="text-brand-text/80">Casarão histórico no Centro. Sala 3 — Interfone 3 na entrada.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="text-brand-primary mt-1 flex-shrink-0" size={22} />
                  <div>
                    <p className="font-bold text-brand-secondary mb-1">Horários de atendimento</p>
                    <p className="text-brand-text/80">Segunda a sexta · 9h às 20h</p>
                  </div>
                </li>
              </ul>

              <div className="pt-6 border-t border-brand-detail/30 mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Presidente+Roosevelt+103+Sala+3+Centro+S%C3%A3o+Leopoldo+RS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-secondary text-white px-5 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Abrir no Google Maps <ExternalLink size={14} />
                </a>
                <a
                  href={waMsg("Olá! Vou ao consultório no Centro de São Leopoldo. Quero agendar.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Agendar pelo WhatsApp <MessageCircle size={14} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: 'Quanto custa uma sessão?',
      a: 'O valor da sessão é R$ 220. Pagamento por cartão, transferência ou PIX. Caso prefira outra forma, alinhamos no contato inicial.'
    },
    {
      q: 'A primeira sessão é cobrada?',
      a: 'Sim, a primeira sessão é cobrada normalmente — não trabalho com sessão de avaliação gratuita. Mas o pagamento pode ser feito após o atendimento, sem compromisso financeiro antes de você me conhecer.'
    },
    {
      q: 'Como funciona o sigilo?',
      a: 'Tudo que é compartilhado em sessão é protegido pelo Código de Ética do Conselho Federal de Psicologia (CFP) e pela Lei Geral de Proteção de Dados (LGPD). Mesmo familiares próximos não têm acesso ao conteúdo das sessões.'
    },
    {
      q: 'Como funcionam os atendimentos?',
      a: 'Sessões individuais de 50 minutos, com frequência mínima semanal. Iniciam pontualmente no horário agendado.'
    },
    {
      q: 'Aceita reembolso de plano de saúde?',
      a: 'Os atendimentos são particulares, mas muitos pacientes obtêm reembolso parcial ou integral junto a planos de saúde — depende das condições do seu contrato.'
    },
    {
      q: 'Tem estacionamento próximo?',
      a: 'Sim. Há vagas públicas gratuitas na rua, sem parquímetro na região.'
    },
    {
      q: 'O consultório tem acessibilidade?',
      a: 'Não, o consultório fica em casarão histórico com acesso por escada — não há elevador ou rampa. Para pacientes que preferem não usar escada, ofereço sessões online via Google Meet.'
    },
    {
      q: 'Quem você atende?',
      a: 'Meu atendimento é dedicado a adultos e jovens adultos. Para questões envolvendo crianças ou idosos, recomendo buscar profissionais com especialização nesses públicos — eles vão poder ajudar melhor.'
    },
    {
      q: 'E se eu nunca fiz terapia antes?',
      a: 'A primeira sessão é exatamente pra isso — me apresentar, ouvir sua história, esclarecer como funciona e sentir se há afinidade. Sem julgamento e sem compromisso de continuar se não fizer sentido.'
    },
    {
      q: 'Você atende online também?',
      a: 'Sim, online via Google Meet também é possível, principalmente para pacientes em acompanhamento ou que preferem essa modalidade. As sessões online seguem o mesmo padrão de sigilo (LGPD).'
    },
    {
      q: 'Como funciona a avaliação e diagnóstico em saúde mental?',
      a: 'É um serviço pontual (não terapia continuada) para adultos. Inclui entrevistas, eventualmente testes psicológicos e emissão de laudo formal. Útil em casos como TDAH, encaminhamentos clínicos, ou apresentação a empresa, escola ou perícia.'
    },
    {
      q: 'Qual sua abordagem teórica?',
      a: 'Trabalho principalmente com a Abordagem Sistêmica Familiar — entendendo suas questões em contexto, não isoladas. Minhas leituras e práticas também incorporam elementos de outras escolas.'
    },
  ];

  return (
    <section id="duvidas" className="py-24 bg-brand-accent/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl text-center mb-16 text-brand-secondary">Dúvidas comuns</h2>
        </ScrollReveal>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05} direction="up" intensity={20}>
              <details className="group bg-white rounded-2xl border border-brand-detail/50 overflow-hidden">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-brand-secondary list-none">
                  {faq.q}
                  <ChevronRight className="text-brand-primary transition-transform group-open:rotate-90 flex-shrink-0 ml-4" />
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
            <a href={waMsg("Olá! Gostaria de agendar.")} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-primary transition-colors">
              +55 51 99274-9130
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="text-brand-primary mb-2" size={24} />
            <p className="font-bold">Consultório</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Rua Presidente Roosevelt, 103<br />
              Sala 3 · Centro · São Leopoldo/RS
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Instagram className="text-brand-primary mb-2" size={24} />
            <p className="font-bold">Instagram</p>
            <a href="https://instagram.com/geissonoleques" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-primary transition-colors">
              @geissonoleques
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-sm text-white/40">
          <p className="mb-2">Geisson Oleques · CRP 07/35759 · Atendendo desde 2019</p>
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
      <TrustStrip />
      <Services />
      <Avaliacoes />
      <About />
      <Apresentacao />
      <ComoChegar />
      <FAQ />
      <InstagramFeed />
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={waMsg("Olá! Gostaria de agendar.")}
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
