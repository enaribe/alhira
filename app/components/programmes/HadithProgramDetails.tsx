import React from 'react';
import Image from 'next/image';

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
            <p className="font-bold text-sm text-[#0F3A42]">Apprentissage des hadiths fondamentaux avec explication simple.</p>
          </div>

          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-5 md:p-8 space-y-5">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Mémorisation et explication</h4>
            <p className="text-[#0F3A42] font-medium">Les 40 hadiths de l'imam an-Nawawi (version courte adaptée)</p>
            <div className="bg-[#0F3A42]/[0.06] border border-[#0F3A42] rounded-lg p-5">
              <h5 className="font-bold text-[#0F3A42] mb-2">Hadiths sur :</h5>
              <ul className="list-disc list-inside text-[#0F3A42] space-y-1 font-bold text-sm">
                <li>L'intention</li>
                <li>Le bon comportement</li>
                <li>La miséricorde</li>
                <li>Le respect des parents</li>
                <li>L'honnêteté et la sincérité</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-7 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-4">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Initiation à la science du ḥadīth</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Qu'est-ce qu'un hadith ?</li>
                <li>Différence entre hadith qudsi et hadith nabawi</li>
                <li>La chaîne de transmission (isnād) et le texte (matn)</li>
                <li>Brève introduction aux recueils : Bukhārī, Muslim, Abū Dāwūd...</li>
            </ul>
          </div>
          
          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-4">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Activités Pédagogiques</h4>
            <p className="text-[#0F3A42] font-medium text-base">
                Mémorisation + compréhension + application dans la vie • Cartes mentales • Mini exposés
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
          <h3 className="text-2xl font-bold">Niveau 2 : intermediaire</h3>
          <div className="flex items-center gap-2 text-sm border border-white/80 px-4 py-1 rounded-full bg-white/10">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 4.5V9L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Durée : 6 mois</span>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="bg-[#F2F4F6] p-4 rounded-lg">
            <p className="font-bold text-sm text-[#0F3A42]">Approfondissement dans le sens, l'authenticité et les classifications.</p>
          </div>

          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-6">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Étude thématique des hadiths</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Hadiths sur les piliers de l'islam et de la foi</li>
                <li>Le comportement du musulman</li>
                <li>Le dhikr et la prière</li>
                <li>La fraternité et la patience</li>
                <li>Hadiths sur la fin des temps</li>
            </ul>
          </div>
          
          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-6">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Notions de critique</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Différence entre ṣaḥīḥ, ḥasan et ḍaʿīf</li>
                <li>Comment les savants ont évalué les transmetteurs</li>
                <li>L'importance de la précision et de la mémoire (ḍabṭ)</li>
            </ul>
          </div>
          
          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-6">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Textes étudiés</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Sélections de Riyāḍ aṣ-Ṣāliḥīn</li>
                <li>Passages de Sahīh al-Bukhārī et Muslim avec explication simple</li>
            </ul>
          </div>
          
          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-7 md:p-9 space-y-4">
            <h4 className="font-grange font-extrabold text-xl text-[#489EAF]">Méthodologie</h4>
            <p className="text-[#0F3A42] font-medium text-sm">Comment utiliser un livre de hadith • Application d'un hadith dans la vie pratique</p>
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
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 4.5V9L12 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Durée : 6 mois</span>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="bg-[#F2F4F6] p-4 rounded-lg">
            <p className="font-bold text-sm text-[#0F3A42]">Introduction structurée à la science de l'hadith selon les sovants.</p>
          </div>

          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-6">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Sciences du hadith (ʿulūm al-ḥadīth)</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Classification des hadiths : mutawātir, āḥād</li>
                <li>Maqbūl (accepté) vs Mardūd (rejeté)</li>
                <li>Les défauts cachés (ʿilal), le hadith maʿlūl</li>
                <li>Types de coupures dans la chaîne : mursal, muʿḍal, munqaṭiʿ</li>
                <li>Le mensonge sur le Prophète ﷺ (hadith mawḍūʿ)</li>
            </ul>
          </div>
          
          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-6">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Étude critique</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Lecture commentée de passages de Nukhbat al-Fikar d'Ibn Hajar</li>
                <li>Sélections avancées de al-Adab al-Mufrad, Sunan d'Abū Dāwūd</li>
            </ul>
          </div>
          
          <div className="mt-6 bg-[#F2F4F6] border border-[#0F3A42] rounded-xl p-6 md:p-8 space-y-6">
            <h4 className="font-grange font-extrabold text-2xl text-[#489EAF]">Pratique</h4>
            <ul className="list-disc list-inside text-[#0F3A42] space-y-2 font-medium text-base pl-1 leading-8">
                <li>Rédaction de fiches de vérification d'un hadith</li>
                <li>Étude de chaînes (isnād) simples</li>
                <li>Travaux de groupe : classer des hadiths, identifier les faiblesses</li>
            </ul>
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

const HadithProgramDetails = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <Level1 />
      <Level2 />
      <Level3 />
    </div>
  );
};

export default HadithProgramDetails; 