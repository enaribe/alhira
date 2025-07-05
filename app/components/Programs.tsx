"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Types
interface ClassData {
  id: number;
  type: 'class' | 'modalite';
  title: string;
  badge?: string;
  badgeColor?: string;
  icon: string;
  label?: string;
  description?: string;
  duration?: string;
  inscription?: string;
  inscriptionLabel?: string;
  inscriptionPrice?: string;
  mensualiteLabel?: string;
  mensualitePrice?: string;
  manuel?: boolean;
  button?: string;
  bg?: string;
}

interface ProgramData {
  level: string;
  title: string;
  description: string;
  color: string;
}

interface NiveauCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  inscriptionUrl: string;
}

interface SpecialClassCardProps {
  classe: ClassData;
}

interface ModaliteCardProps {
  data: ClassData;
  buttonText?: string;
  buttonLink?: string;
}

// SVG Components
const IslamicCardSVG = ({ width, height, viewBox, className }: { width: string; height: string; viewBox: string; className?: string }) => (
  <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M301.157 68.0442C370.085 67.2555 390.439 98.2798 392 113.891V389C392 402.807 380.807 414 367 414H26C12.1929 414 1 402.807 1 389V113.891C7.74299 75.2416 64.3717 67.2226 91.8431 68.0442C98.8671 36.494 133.05 37.9729 156.463 29.5924C175.194 22.888 190.803 7.73729 196.266 1C221.084 28.6064 240.283 30.5783 270.252 37.9729C294.227 43.8886 300.845 60.4853 301.157 68.0442Z" fill="white" stroke="#D7E3ED"/>
  </svg>
);

const NiveauCardSVG = ({ className }: { className?: string }) => (
  <svg width="337" height="450" viewBox="0 0 337 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M258.168 68.0442C317.224 67.2555 334.663 98.2798 336 113.891V424C336 437.807 324.807 449 311 449H26C12.1929 449 1 437.807 1 424V113.891C6.77724 75.2416 55.2954 67.2226 78.8323 68.0442C84.8503 36.494 114.138 37.9729 134.198 29.5924C150.246 22.888 163.619 7.73729 168.299 1C189.563 28.6064 206.012 30.5783 231.689 37.9729C252.23 43.8886 257.9 60.4853 258.168 68.0442Z" fill="white" stroke="#D7E3ED"/>
  </svg>
);

const SuperiorLevelSVG = ({ className }: { className?: string }) => (
  <svg width="100%" height="100%" viewBox="0 0 216 244" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none">
    <path d="M165.28 49.0721C203.006 48.5066 214.146 70.7517 215 81.945V218C215 231.807 203.807 243 190 243H26C12.1929 243 1 231.807 1 218V81.945C4.69054 54.2328 35.6842 48.483 50.7198 49.0721C54.5641 26.4499 73.2731 27.5104 86.0874 21.5013C96.3389 16.6941 104.882 5.83078 107.872 1C121.455 20.7944 131.963 22.2083 148.365 27.5104C161.487 31.752 165.109 43.6522 165.28 49.0721Z" fill="white" stroke="#D7E3ED"/>
  </svg>
);

const BookIcon = () => (
  <svg width="82" height="70" viewBox="0 0 82 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M75.4902 9.97464L72.7806 5.68202C71.2805 3.30547 70.5304 2.1172 69.5478 2.00733C68.5651 1.89745 67.4681 3.02512 65.274 5.28046C58.1827 12.5697 51.0914 11.4928 44.0001 24.5995C36.9089 11.4928 29.8176 12.5697 22.7263 5.28046C20.5322 3.02512 19.4352 1.89745 18.4525 2.00733C17.4699 2.1172 16.7198 3.30547 15.2197 5.68202L12.5101 9.97464C11.4633 11.6331 10.9398 12.4624 11.0814 13.3352C11.2229 14.208 11.9778 14.8059 13.4877 16.0019L38.9451 36.1673C41.379 38.0953 42.5959 39.0592 44.0001 39.0592C45.4043 39.0592 46.6213 38.0953 49.0552 36.1673L74.5126 16.0019C76.0225 14.8059 76.7774 14.208 76.9189 13.3352C77.0605 12.4624 76.537 11.6331 75.4902 9.97464Z" stroke="#0F3A42" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M85.1771 22.5874L19.294 71.9997V52.6645M2.82324 22.5874L68.7063 71.9997V52.6645" stroke="#0F3A42" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="flex-shrink-0">
    <circle cx="11" cy="11" r="10" stroke="#0F3A42" strokeWidth="2"/>
    <path d="M11 6v5l3 3" stroke="#0F3A42" strokeWidth="2"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 35 35" fill="none">
    <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="#B65D73"/>
    <path d="M17.0818 27.5001C18.2089 27.5001 19.1227 26.5864 19.1227 25.4593C19.1227 24.3322 18.2089 23.4185 17.0818 23.4185C15.9547 23.4185 15.041 24.3322 15.041 25.4593C15.041 26.5864 15.9547 27.5001 17.0818 27.5001Z" fill="#B65D73"/>
    <path d="M13 11.5816C13 9.32857 14.8286 7.5 17.0816 7.5C19.3347 7.5 21.1633 9.32857 21.1633 11.5816C21.1633 13.8347 19.3347 21.7857 17.0816 21.7857C14.8286 21.7857 13 13.8347 13 11.5816Z" fill="#B65D73"/>
  </svg>
);

// Components
const BackgroundImage = ({ src, alt, className }: { src: string; alt?: string; className?: string }) => (
  <div className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${className || ''}`}>
    <img src={src} alt={alt || ""} className="w-full h-full object-cover" />
  </div>
);

const SectionTitle = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <h2 className={`font-grange font-extrabold text-center ${className || ''}`} style={style}>
    {children}
  </h2>
);

const NiveauCard = ({ icon, title, description, inscriptionUrl }: NiveauCardProps) => (
  <div className="relative w-[337px] h-[450px] flex items-center justify-start bg-transparent">
    <NiveauCardSVG className="absolute top-0 left-0 z-0" />
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 p-8 pt-10 box-border">
      {/* SVG décoratif */}
      <div className="w-[88px] h-[74px] mb-0 flex justify-center items-center">
        {/* <BookIcon /> */}
      </div>
      {/* Icône */}
      <div className="w-[82px] h-[70px] mb-2.5 flex justify-center items-center">
        {icon}
      </div>
      {/* Titre */}
      <h3 className="font-grange font-extrabold text-lg md:text-xl leading-6 text-[#0F3A42] mb-3.5 w-full text-center">
        {title}
      </h3>
      {/* Description */}
      <p className="font-opensans font-normal text-sm leading-[26px] text-[#0F3A42] mb-6 w-full text-center max-w-[260px]">
        {description}
      </p>
      {/* Bouton */}
      <a
        href={inscriptionUrl}
        className="mt-auto w-full max-w-[274px] h-[46px] flex items-center justify-center bg-[#489EAF] rounded-[10px] text-white font-grange font-extrabold text-base leading-5 no-underline text-center mb-2 box-border hover:bg-[#357e8e] transition-colors"
      >
        S'inscrire
      </a>
    </div>
  </div>
);

const SuperiorLevelCard = ({ title }: { title: string }) => (
  <div className="relative w-[216px] h-[244px] flex items-center justify-center group transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
    <SuperiorLevelSVG className="absolute top-0 left-0 w-full h-full z-0 transition-shadow duration-300 group-hover:drop-shadow-lg" />
    <span className="relative z-10 font-grange font-extrabold text-[#103951] text-lg xl:text-xl leading-6 text-center px-4 py-2 break-words hyphens-auto mt-10">
      {title}
    </span>
  </div>
);

const SpecialClassCard = ({ classe }: SpecialClassCardProps) => (
  <div className="relative w-[391px] h-[413px] flex flex-col items-center justify-between overflow-hidden">
    <IslamicCardSVG 
      width="391" 
      height="413" 
      viewBox="0 0 393 415" 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" 
    />
    
    {/* Header avec icône et badge - descendu plus bas */}
    <div className="flex flex-row justify-between items-center w-[326px] h-[26px] mt-[80px] mb-4 z-10">
      <img src={classe.icon} alt="" className="w-[35px] h-[22px] mt-4" />
      {classe.badge && (
        <span className="font-grange font-extrabold text-lg leading-[26px] text-[#B65D73] mt-4">
          {classe.badge}
        </span>
      )}
    </div>
    
    {/* Contenu principal */}
    <div className="flex flex-col items-start gap-4 w-[304px] z-10">
      <h3 className="font-grange font-extrabold text-lg md:text-xl leading-[28px] text-[#0F3A42] mb-0">
        {classe.title}
      </h3>
      <p className="font-opensans text-[15px] leading-[25px] text-[#0F3A42] font-normal mb-0">
        {classe.description}
      </p>
      
      {/* Durée */}
      {classe.duration && (
        <div className="flex flex-row items-center gap-[11px] w-[304px] h-[22px]">
          <ClockIcon />
          <span className="font-grange font-extrabold text-lg leading-[16px] text-[#0F3A42]">
            {classe.duration}
          </span>
        </div>
      )}
    </div>
    
    {/* Bouton */}
    <div className="w-full flex justify-center mb-8 z-10">
      <Link href={classe.label === 'Langue arabe' ? '/programmes/arabe' : '/inscription-tests'} className="w-[90%] h-[46px] bg-[#489EAF] rounded-[10px] flex items-center justify-center font-grange font-extrabold text-lg leading-[12px] text-white hover:bg-[#357e8e] transition-colors no-underline">
        {classe.inscription || 'S\'inscrire'}
      </Link>
    </div>
  </div>
);

const ModaliteCard = ({ data, buttonText, buttonLink }: ModaliteCardProps) => (
  <div className="relative w-[391px] h-[413px] flex flex-col items-center justify-between overflow-hidden">
    <IslamicCardSVG 
      width="391" 
      height="413" 
      viewBox="0 0 393 415" 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" 
    />
    
    {/* Header avec icône - descendu plus bas */}
    <div className="flex flex-row justify-between items-center w-[326px] h-[26px] mt-[80px] mb-4 z-10">
      {/* <img src={data.icon} alt="" className="w-[35px] h-[22px] mt-4" /> */}
    </div>
    
    {/* Contenu principal */}
    <div className="flex flex-col items-start gap-4 w-[304px] z-10">
      <h3 className="font-grange font-extrabold text-lg md:text-xl leading-[28px] text-[#0F3A42] mb-0">
        {data.title}
      </h3>
      
      <div className="mb-2">
        <span className="font-grange font-extrabold text-[#103951]">{data.inscriptionLabel}: </span>
        <span className="text-[#489EAF] font-grange font-extrabold">{data.inscriptionPrice}</span>
      </div>
      
      <div className="mb-2">
        <span className="font-grange font-extrabold text-[#103951]">{data.mensualiteLabel}: </span>
        <span className="text-[#489EAF] font-grange font-extrabold">{data.mensualitePrice}</span>
      </div>
      
      {data.manuel && (
        <div className="flex items-center gap-2 mt-4 mb-4">
          <LocationIcon />
          <span className="font-grange font-extrabold text-[#B65D73]">Manuel offert</span>
        </div>
      )}
    </div>
    
    {/* Bouton */}
    <div className="w-full flex justify-center mb-8 z-10">
      <Link href={buttonLink || "/inscription-tests"} className="w-[90%] h-[46px] bg-[#489EAF] rounded-[10px] flex items-center justify-center font-grange font-extrabold text-lg leading-[12px] text-white hover:bg-[#357e8e] transition-colors no-underline">
        {buttonText || data.button || 'S\'inscrire'}
      </Link>
    </div>
  </div>
);

const Programs = () => {
  // Data
  const programs: ProgramData[] = [
    {
      level: "Débutant",
      title: "Niveau 1 (Débutant)",
      description: "Initiation à la lecture du Coran, bases de la jurisprudence islamique (fiqh) et introduction à l'exégèse (tafsir).",
      color: "#B65D73"
    },
    {
      level: "Intermédiaire",
      title: "Niveau 2 (Intermédiaire)",
      description: "Approfondissement du fiqh, étude du jeûne et de la zakat, perfectionnement de la lecture du Coran et règles de tajwid.",
      color: "#489EAF"
    },
    {
      level: "Avancé",
      title: "Niveau 3 (Avancé)",
      description: "Approfondissement de la lecture du coran (avancé), Jurisprudence islamique approfondie, usul al-fiqh, étude des piliers de l'Islam, hadith et tawhid pour étudiants confirmés.",
      color: "#0F3A42"
    }
  ];

  const createModaliteCard = (title: string = "Modalité des classes spéciales"): ClassData => ({
    id: 99,
    type: 'modalite',
    title,
    icon: "/images/bookdark.png",
    bg: "bg-white",
    inscriptionLabel: "Inscription",
    inscriptionPrice: "25 000",
    mensualiteLabel: "Mensualité",
    mensualitePrice: "20 000",
    manuel: true,
    button: "S'inscrire"
  });

  // Classes de mémorisation
  const memorisationClasses: ClassData[] = [
    {
      id: 1,
      type: 'class',
      title: "Classe Abubakr As-Sidikh",
      badge: "hifz 1",
      badgeColor: "#B65D73",
      icon: "/images/bookdark.png",
      label: "Mémorisation du coran",
      description: "De la sourate Ad-Duha (93) á An-Nas (114) - 2 heures par semaine",
      duration: "18 semaines",
    },
    {
      id: 2,
      type: 'class',
      title: "Classe Oumar ibn khatab",
      badge: "hifz 2",
      badgeColor: "#B65D73",
      icon: "/images/bookdark.png",
      label: "Mémorisation du coran",
      description: "De la sourate A'la (87) á Ad-Duha (93) - 2 heures par semaine",
      duration: "18 semaines",
    },
    {
      id: 3,
      type: 'class',
      title: "Classe Ousthmân ibn Affân",
      badge: "hifz 3",
      badgeColor: "#B65D73",
      icon: "/images/bookdark.png",
      label: "Mémorisation du coran",
      description: "De la sourate An-Naba (78) á Al-A'la (87) - 2 heures par semaine",
      duration: "18 semaines",
    },
    {
      id: 4,
      type: 'class',
      title: "Classe Ali ibn Talib",
      badge: "hifz 4",
      badgeColor: "#B65D73",
      icon: "/images/bookdark.png",
      label: "Mémorisation du coran",
      description: "Sourate Yasin (36) - Formation de 26 heures répartie sur 13 semaines (2h par semaine)",
      duration: "18 semaines",
    }
  ];

  // Classes de tafsir
  const tafsirClasses: ClassData[] = [
    {
      id: 11,
      type: 'class',
      title: "Tafsir ou Exegese du saint coran",
      badge: "",
      badgeColor: "#489EAF",
      icon: "/images/bookdark.png",
      label: "Tafsir du Coran",
      description: "De la sourate A' La (87) á An-Nas (114) - 2 heures par semaine.",
      duration: "9 semaines",
    },
    {
      id: 12,
      type: 'class',
      title: "Tafsir ou Exegese du saint coran",
      badge: "",
      badgeColor: "#489EAF",
      icon: "/images/bookdark.png",
      label: "Tafsir du Coran",
      description: "De la sourate la caverne (18) - 2 heures par semaine",
      duration: "10 semaines",
    }
  ];

  // Classes de langue arabe
  const langueArabeClasses: ClassData[] = [
    {
      id: 21,
      type: 'class',
      title: "Niveau 1",
      badge: "",
      badgeColor: "#0F3A42",
      icon: "/images/bookdark.png",
      label: "Langue arabe",
      description: "Ce programme hebdomadaire est basé sur la série «الدروس اللغوية » pour le niveau Débutant.",
      duration: "14 semaines",
      inscription: "Voir le programme"
    },
    {
      id: 22,
      type: 'class',
      title: "Niveau 2",
      badge: "",
      badgeColor: "#0F3A42",
      icon: "/images/bookdark.png",
      label: "Langue arabe",
      description: "Ce programme hebdomadaire est basé sur la série «الدروس اللغوية » pour le niveau intermédiaire.",
      duration: "14 semaines",
      inscription: "Voir le programme"
    },
    {
      id: 23,
      type: 'class',
      title: "Niveau 3",
      badge: "",
      badgeColor: "#0F3A42",
      icon: "/images/bookdark.png",
      label: "Langue arabe",
      description: "Programme de Langue Arabe (2h/semaine) Ce programme hebdomadaire est basé sur la série «الدروس اللغوية» - niveau avancé.",
      duration: "14 semaines",
      inscription: "Voir le programme"
    }
  ];

  // Toutes les classes combinées
  const allSpecialClasses: ClassData[] = [
    ...memorisationClasses,
    ...tafsirClasses,
    ...langueArabeClasses,
    createModaliteCard()
  ];

  const superiorLevelFaculties = [
    { name: "Science du Coran", href: "/programmes/coran" },
    { name: "Tawhid", href: "/programmes/tawhid" },
    { name: "Hadith", href: "/programmes/hadith" },
    { name: "Jurisprudence islamique (Fiqh)", href: "/programmes/fiqh" },
    { name: "Siirah (Histoire du Prophète ﷺ)", href: "/programmes/siirah" }
  ];

  return (
    <div className='relative'>
      {/* Titre principal */}
      <SectionTitle className="relative z-10 text-[#0F3A42] text-3xl md:text-4xl lg:text-5xl mb-16 mt-16">
          Nos programmes d'enseignement
      </SectionTitle>

      {/* Section Niveaux classiques */}
      <motion.section 
        className="relative py-20 px-4 md:px-6 lg:px-8 bg-white overflow-x-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <BackgroundImage src="/images/nclassic.png" />
        
        <SectionTitle 
          className="relative z-10 text-white text-2xl md:text-3xl lg:text-4xl mb-12" 
          style={{ lineHeight: '1.1' }}
        >
          Niveaux classiques
        </SectionTitle>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8">
          {programs.map((program, idx) => (
            <NiveauCard
              key={idx}
              icon={<BookIcon />}
              title={program.title}
              description={program.description}
              inscriptionUrl="/inscription-tests"
            />
          ))}
        </div>
      </motion.section>

      {/* Section Niveau supérieur */}
      <motion.section 
        className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[573px] flex flex-col items-center justify-center overflow-hidden mt-8 md:mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        {/* Image de fond responsive */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img src="/images/nclassic2.png" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Conteneur principal avec padding approprié */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16">
          <SectionTitle 
            className="text-white text-2xl md:text-3xl lg:text-4xl mb-6 sm:mb-8 md:mb-12" 
            style={{lineHeight: '1.1'}}
          >
            Niveau supérieur
          </SectionTitle>
          
          {/* Cartes facultés - Responsive avec padding */}
          <div className="w-full max-w-[1155px] mx-auto mb-6 sm:mb-8 md:mb-12">
            {/* Version mobile et tablette : Grille */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
              {superiorLevelFaculties.map((faculty, idx) => (
                <Link href={faculty.href} key={idx} className="relative w-full max-w-[280px] sm:max-w-[320px] h-[200px] sm:h-[220px] md:h-[240px] flex items-center justify-center mx-auto no-underline">
                  <SuperiorLevelSVG className="absolute top-0 left-0 w-full h-full z-0" />
                  <span className="relative z-10 font-grange font-extrabold text-[#103951] text-xs sm:text-sm md:text-base leading-4 sm:leading-5 md:leading-6 text-center px-4 sm:px-6 py-3 sm:py-4 break-words hyphens-auto">
                    {faculty.name}
                  </span>
                </Link>
              ))}
            </div>
            
            {/* Version desktop : Ligne horizontale */}
            <div className="hidden lg:flex flex-row items-center justify-center gap-[21px]">
              {superiorLevelFaculties.map((faculty, idx) => (
                <Link href={faculty.href} key={idx} className="no-underline">
                  <SuperiorLevelCard title={faculty.name} />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Boutons responsive avec espacement */}
          <div className="w-full max-w-[587px] mx-auto px-2 sm:px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-[26px]">
              <Link href="/inscription-tests" className="w-full sm:w-[279px] h-[44px] md:h-[48px] border border-white rounded-[8px] md:rounded-[10px] flex items-center justify-center font-grange font-extrabold text-sm sm:text-base md:text-lg text-white transition hover:bg-white hover:text-[#0F3A42] no-underline">
                En savoir plus
              </Link>
              <Link href="/inscription-tests" className="w-full sm:w-[282px] h-[44px] md:h-[48px] bg-[#489EAF] rounded-[8px] md:rounded-[10px] flex items-center justify-center font-grange font-extrabold text-sm sm:text-base md:text-lg text-white transition hover:bg-[#357e8e] no-underline">
                S'inscrire maintenant
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section Classes spéciales - Séparées par catégories */}
      <motion.section 
        className="relative w-full py-16 md:py-24 bg-[#F2F4F6] flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
      >
        <SectionTitle className="text-[#0F3A42] text-3xl md:text-4xl lg:text-5xl mb-16">
          Classes spéciales
        </SectionTitle>
        
        {/* Section Mémorisation du coran */}
        <div className="w-full max-w-7xl px-4 mb-16">
          <div className="w-full mb-12">
            <div className="w-full flex flex-row justify-center items-center px-6 py-2 bg-white/10 border border-[#D7E3ED] rounded-t-[25px]">
              <h3 className="font-grange font-extrabold text-[#0F3A42] text-lg md:text-xl lg:text-2xl text-center">
                Mémorisation du coran
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {memorisationClasses.map((classe) => (
              <SpecialClassCard key={classe.id} classe={classe} />
            ))}
            <ModaliteCard key="memorisation-modalite" data={createModaliteCard("Modalité des classes spéciales")} />
          </div>
        </div>

        {/* Section Tafsir */}
        <div className="w-full max-w-7xl px-4 mb-16">
          <div className="w-full mb-12">
            <div className="w-full flex flex-row justify-center items-center px-6 py-2 bg-white/10 border border-[#D7E3ED] rounded-t-[25px]">
              <h3 className="font-grange font-extrabold text-[#0F3A42] text-lg md:text-xl lg:text-2xl text-center">
                Tafsir
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {tafsirClasses.map((classe) => (
              <SpecialClassCard key={classe.id} classe={classe} />
            ))}
            <ModaliteCard key="tafsir-modalite" data={createModaliteCard("Modalité des classes spéciales")} />
          </div>
        </div>

        {/* Section Langue arabe */}
        <div className="w-full max-w-7xl px-4">
          <div className="w-full mb-12">
            <div className="w-full flex flex-row justify-center items-center px-6 py-2 bg-white/10 border border-[#D7E3ED] rounded-t-[25px]">
              <h3 className="font-grange font-extrabold text-[#0F3A42] text-lg md:text-xl lg:text-2xl text-center">
                Langue arabe
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {langueArabeClasses.map((classe) => (
              <SpecialClassCard key={classe.id} classe={classe} />
            ))}
            <ModaliteCard 
              key="langue-arabe-modalite" 
              data={createModaliteCard("Modalité des classes spéciales")}
              buttonText="Voir le programme"
              buttonLink="/programmes/arabe"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Programs;
