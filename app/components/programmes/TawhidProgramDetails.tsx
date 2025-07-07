import React from 'react';

const Level1 = () => (
    <div className="bg-white rounded-2xl border border-[#D7E2ED] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F3A42] text-white flex items-center p-5 px-10 gap-6">
          <h3 className="text-2xl font-bold">Niveau 1 : debutant</h3>
          <div className="flex items-center gap-2 text-sm border border-white/80 px-4 py-1 rounded-full bg-white/10">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 4.5V9L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Durée : 6 mois</span>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="bg-[#F2F4F6] p-4 rounded-lg">
            <p className="font-bold text-sm text-[#0F3A42]">Bases du tawḥīd et des piliers de la foi.</p>
          </div>

          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-5 md:p-8 space-y-5">
            <div>
              <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Les fondements de la croyance islamique</h4>
              <p className="text-[#0F3A42] font-medium mt-1">Définition de la ʿaqīdah et du tawḥīd</p>
            </div>
            <div className="bg-[#0F3A42]/[0.06] border border-[#0F3A42] rounded-lg p-5">
              <h5 className="font-bold text-[#0F3A42] mb-2">Les 3 catégories du tawḥīd :</h5>
              <ul className="list-disc list-inside text-[#0F3A42] space-y-1 font-bold text-sm">
                <li>Tawḥīd ar-Rubūbiyyah (unicité d'Allah dans Sa seigneurie)</li>
                <li>Tawḥīd al-Ulūhiyyah (unicité dans l'adoration)</li>
                <li>Tawḥīd al-Asmāʾ wa al-Ṣifāt (unicité dans les noms et attributs)</li>
              </ul>
            </div>
            <div className="bg-[#0F3A42]/[0.06] border border-[#0F3A42] rounded-lg p-5">
              <h5 className="font-bold text-[#0F3A42] mb-2">Les 6 piliers de la foi :</h5>
              <ul className="list-disc list-inside text-[#0F3A42] space-y-1 font-bold text-sm">
                <li>Foi en Allah</li>
                <li>En Ses anges</li>
                <li>En Ses livres</li>
                <li>En Ses messagers</li>
                <li>Au Jour dernier</li>
                <li>Au destin bon ou mauvais</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-7 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-4">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Étude de textes</h4>
            <p className="text-[#0F3A42] font-medium text-base">
              Lecture commentée du petit livre : Al-Uṣūl ath-Thalātha (Les Trois Fondements)
              <br/>
              Vocabulaire de la ʿaqīdah : īmān, kufr, shirk, nifāq
            </p>
          </div>
          
          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-4">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Activités</h4>
            <p className="text-[#0F3A42] font-medium text-base">
              Schémas de foi • Mémorisation des définitions
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-b from-white to-[#EBF2F3] border-t border-[#D7E2ED] py-3 text-center">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeJR9IpREgaYC6NM4RzC1ch2q0azYbC40RfEVx_fY7omZclLg/viewform?usp=dialog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-grange text-xl text-[#489EAF] hover:underline cursor-pointer"
          >
            S'inscrire au programme
          </a>
        </div>
    </div>
);

const Level2 = () => (
    <div className="bg-white rounded-2xl border border-[#D7E2ED] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F3A42] text-white flex items-center p-5 px-10 gap-6">
          <h3 className="text-2xl font-bold">Niveau 2 : Intermediaire</h3>
          <div className="flex items-center gap-2 text-sm border border-white/80 px-4 py-1 rounded-full bg-white/10">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 4.5V9L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Durée : 6 mois</span>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="bg-[#F2F4F6] p-4 rounded-lg">
            <p className="font-bold text-sm text-[#0F3A42]">Détails sur les déviations et la foi correcte.</p>
          </div>

          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-6">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Approfondissement de la ʿaqīdah</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Preuves du tawḥīd dans le Coran et la Sunnah</li>
                <li>Les différents types de shirk (mineur, majeur, caché)</li>
                <li>Les signes de l'hypocrisie (nifāq)</li>
                <li>Les dangers de l'innovation dans la religion (bidʿah)</li>
                <li>La foi (īmān) selon Ahl as-Sunnah wal-Jamāʿah</li>
            </ul>
          </div>
          
          <div className="mt-6 bg-[#0F3A42]/[0.06] border border-[#0F3A42] rounded-xl p-7 md:p-9 space-y-4">
            <h4 className="font-grange font-extrabold text-xl text-[#489EAF]">Projet</h4>
            <p className="text-[#0F3A42] font-medium text-sm">
                Exposés sur des sujets d'actualité liés à la croyance
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-b from-white to-[#EBF2F3] border-t border-[#D7E2ED] py-3 text-center">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeJR9IpREgaYC6NM4RzC1ch2q0azYbC40RfEVx_fY7omZclLg/viewform?usp=dialog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-grange text-xl text-[#489EAF] hover:underline cursor-pointer"
          >
            S'inscrire au programme
          </a>
        </div>
    </div>
);

const Level3 = () => (
    <div className="bg-white rounded-2xl border border-[#D7E2ED] shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F3A42] text-white flex items-center p-5 px-10 gap-6">
          <h3 className="text-2xl font-bold">Niveau 3 : Avancé</h3>
          <div className="flex items-center gap-2 text-sm border border-white/80 px-4 py-1 rounded-full bg-white/10">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 4.5V9L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Durée : 6 mois</span>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="bg-[#F2F4F6] p-4 rounded-lg">
            <p className="font-bold text-sm text-[#0F3A42]">Consolidation doctrinale et réfutation argumentée.</p>
          </div>

          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-6">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Points profonds de croyance</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Les noms et attributs d'Allah : sens, règles, principes de compréhension</li>
                <li>Le destin (al-qadar) et ses niveaux</li>
                <li>Le jugement sur les actes : kufr mineur / majeur</li>
                <li>Les critères de la secte vs Ahl as-Sunnah</li>
                <li>Les causes d'apostasie (nawāqid al-islām)</li>
            </ul>
          </div>
          
          <div className="mt-6 bg-[#0F3A42]/[0.06] border border-[#0F3A42] rounded-xl p-7 md:p-9 space-y-4">
            <h4 className="font-grange font-extrabold text-xl text-[#489EAF]">Projet</h4>
            <p className="text-[#0F3A42] font-medium text-sm">
                Exposés sur des sujets d'actualité liés à la croyance
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-b from-white to-[#EBF2F3] border-t border-[#D7E2ED] py-3 text-center">
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeJR9IpREgaYC6NM4RzC1ch2q0azYbC40RfEVx_fY7omZclLg/viewform?usp=dialog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-grange text-xl text-[#489EAF] hover:underline cursor-pointer"
          >
            S'inscrire au programme
          </a>
        </div>
    </div>
);


const TawhidProgramDetails = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <Level1 />
      <Level2 />
      <Level3 />
    </div>
  );
};

export default TawhidProgramDetails; 