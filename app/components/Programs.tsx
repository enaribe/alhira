import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Programs = () => {
  const programs = [
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
      description: "Jurisprudence islamique approfondie, usul al-fiqh, étude des piliers de l'Islam, hadith et tawhid pour étudiants confirmés.",
      color: "#0F3A42"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-[#0F3A42] font-grange font-extrabold text-4xl md:text-5xl lg:text-[48px] mb-2 text-center">
          Nos programmes d'enseignement
        </h2>
        <div className="flex justify-center">
          <svg width="443" height="210" viewBox="0 0 443 210" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M201.062 105.219L204.971 101.311L208.879 105.219L204.971 109.127L201.062 105.219Z" fill="#0F3A42" strokeWidth="1"/>
            <path d="M0 104.937L194.547 102.61L197.748 105.811L194.573 108.985L0 104.937Z" fill="#0F3A42" strokeWidth="1"/>
            <path d="M234.523 105.093L237.738 101.879L443 104.937L237.733 108.302L234.523 105.093Z" fill="#0F3A42" strokeWidth="1"/>
            <path d="M223.391 105.219L227.299 101.311L231.207 105.219L227.299 109.127L223.391 105.219Z" fill="#0F3A42" strokeWidth="1"/>
            <path d="M220.084 105.254C220.084 107.433 218.318 109.199 216.14 109.199C213.961 109.199 212.195 107.433 212.195 105.254C212.195 103.076 213.961 101.31 216.14 101.31C218.318 101.31 220.084 103.076 220.084 105.254Z" fill="#0F3A42" strokeWidth="1"/>
          </svg>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="relative box-border w-[370px] h-[457px] border border-[#D7E3ED] rounded-[25px] bg-white overflow-hidden flex flex-col mx-auto"
              style={{minWidth: 370, minHeight: 457}}
            >
              {/* Bandeau supérieur */}
              <div className="relative w-full h-[213px] bg-[#0F3A42] rounded-t-[25px] overflow-hidden">
                {/* Motif décoratif */}
                <div className="absolute left-[64px] top-[16px] opacity-30 pointer-events-none">
                  {/* Remplacez ce SVG par votre motif réel */}
                  <svg width="246" height="186" viewBox="0 0 246 186" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.3">
                    <path d="M134.026 128.043H127.719V133.51L123.094 138.135L127.719 142.76V149.067H134.026L138.652 153.693L143.277 149.067H148.743V142.76L153.368 138.135L148.743 133.51V128.043H143.277L138.652 123.418L134.026 128.043Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M164.301 128.043H157.993V133.51L153.368 138.135L157.993 142.76V149.067H164.301L168.926 153.693L173.551 149.067H179.018V142.76L183.643 138.135L179.018 133.51V128.043H173.551L168.926 123.418L164.301 128.043Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M194.576 128.043H188.269V133.51L183.644 138.135L188.269 142.76V149.067H194.576L199.201 153.693L203.827 149.067H209.293V142.76L213.918 138.135L209.293 133.51V128.043H203.827L199.201 123.418L194.576 128.043Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M224.85 128.043H218.543V133.51L213.918 138.135L218.543 142.76V149.067H224.85L229.476 153.693L234.101 149.067H239.567V142.76L244.193 138.135L239.567 133.51V128.043H234.101L229.476 123.418L224.85 128.043Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M134.026 158.318H127.719V163.784L123.094 168.409L127.719 173.035V179.342H134.026L138.652 183.967L143.277 179.342H148.743V173.035L153.368 168.409L148.743 163.784V158.318H143.277L138.652 153.692L134.026 158.318Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M164.301 158.318H157.993V163.784L153.368 168.409L157.993 173.035V179.342H164.301L168.926 183.967L173.551 179.342H179.018V173.035L183.643 168.409L179.018 163.784V158.318H173.551L168.926 153.692L164.301 158.318Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M194.576 158.318H188.269V163.784L183.644 168.409L188.269 173.035V179.342H194.576L199.201 183.967L203.827 179.342H209.293V173.035L213.918 168.409L209.293 163.784V158.318H203.827L199.201 153.692L194.576 158.318Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M224.85 158.318H218.543V163.784L213.918 168.409L218.543 173.035V179.342H224.85L229.476 183.967L234.101 179.342H239.567V173.035L244.193 168.409L239.567 163.784V158.318H234.101L229.476 153.692L224.85 158.318Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M134.026 67.1751H127.719V72.6414L123.094 77.2667L127.719 81.892V88.1992H134.026L138.652 92.8245L143.277 88.1992H148.743V81.892L153.368 77.2667L148.743 72.6414V67.1751H143.277L138.652 62.5498L134.026 67.1751Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M164.301 67.1751H157.993V72.6414L153.368 77.2667L157.993 81.892V88.1992H164.301L168.926 92.8245L173.551 88.1992H179.018V81.892L183.643 77.2667L179.018 72.6414V67.1751H173.551L168.926 62.5498L164.301 67.1751Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M194.576 67.1751H188.269V72.6414L183.644 77.2667L188.269 81.892V88.1992H194.576L199.201 92.8245L203.827 88.1992H209.293V81.892L213.918 77.2667L209.293 72.6414V67.1751H203.827L199.201 62.5498L194.576 67.1751Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M224.85 67.1751H218.543V72.6414L213.918 77.2667L218.543 81.892V88.1992H224.85L229.476 92.8245L234.101 88.1992H239.567V81.892L244.193 77.2667L239.567 72.6414V67.1751H234.101L229.476 62.5498L224.85 67.1751Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M134.026 97.4495H127.719V102.916L123.094 107.541L127.719 112.166V118.474H134.026L138.652 123.099L143.277 118.474H148.743V112.166L153.368 107.541L148.743 102.916V97.4495H143.277L138.652 92.8242L134.026 97.4495Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M164.301 97.4495H157.993V102.916L153.368 107.541L157.993 112.166V118.474H164.301L168.926 123.099L173.551 118.474H179.018V112.166L183.643 107.541L179.018 102.916V97.4495H173.551L168.926 92.8242L164.301 97.4495Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M194.576 97.4495H188.269V102.916L183.644 107.541L188.269 112.166V118.474H194.576L199.201 123.099L203.827 118.474H209.293V112.166L213.918 107.541L209.293 102.916V97.4495H203.827L199.201 92.8242L194.576 97.4495Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M224.85 97.4495H218.543V102.916L213.918 107.541L218.543 112.166V118.474H224.85L229.476 123.099L234.101 118.474H239.567V112.166L244.193 107.541L239.567 102.916V97.4495H234.101L229.476 92.8242L224.85 97.4495Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M134.026 6.6253H127.719V12.0916L123.094 16.7169L127.719 21.3422V27.6494H134.026L138.652 32.2747L143.277 27.6494H148.743V21.3422L153.368 16.7169L148.743 12.0916V6.6253H143.277L138.652 2L134.026 6.6253Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M164.301 6.6253H157.993V12.0916L153.368 16.7169L157.993 21.3422V27.6494H164.301L168.926 32.2747L173.551 27.6494H179.018V21.3422L183.643 16.7169L179.018 12.0916V6.6253H173.551L168.926 2L164.301 6.6253Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M194.576 6.6253H188.269V12.0916L183.644 16.7169L188.269 21.3422V27.6494H194.576L199.201 32.2747L203.827 27.6494H209.293V21.3422L213.918 16.7169L209.293 12.0916V6.6253H203.827L199.201 2L194.576 6.6253Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M224.85 6.6253H218.543V12.0916L213.918 16.7169L218.543 21.3422V27.6494H224.85L229.476 32.2747L234.101 27.6494H239.567V21.3422L244.193 16.7169L239.567 12.0916V6.6253H234.101L229.476 2L224.85 6.6253Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M134.026 36.8997H127.719V42.366L2.00293 46.9913L6.62823 51.6166V57.9238H134.026L17.5608 62.5491L22.1861 57.9238H27.6523V51.6166L32.2776 46.9913L27.6523 42.366V36.8997H22.1861L17.5608 32.2744L12.9355 36.8997Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M43.2099 36.8997H36.9026V42.366L32.2773 46.9913L36.9026 51.6166V57.9238H43.2099L47.8352 62.5491L52.4605 57.9238H57.9267V51.6166L62.552 46.9913L57.9267 42.366V36.8997H52.4605L47.8352 32.2744L43.2099 36.8997Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M73.4843 36.8997H67.1771V42.366L62.5518 46.9913L67.1771 51.6166V57.9238H73.4843L78.1096 62.5491L82.7349 57.9238H88.2011V51.6166L92.8264 46.9913L88.2011 42.366V36.8997H82.7349L78.1096 32.2744L73.4843 36.8997Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    <path d="M103.76 36.8997H97.4524V42.366L92.8271 46.9913L97.4524 51.6166V57.9238H103.76L108.385 62.5491L113.01 57.9238H118.477V51.6166L123.102 46.9913L118.477 42.366V36.8997H113.01L108.385 32.2744L103.76 36.8997Z" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                    </g>
                  </svg>

                </div>
                {/* Badge niveau */}
                <span className="absolute top-4 right-6 bg-white text-[#B65D73] font-grange font-extrabold text-base px-4 py-1 rounded-xl shadow">
                  {program.level}
                </span>
                {/* Icône livre */}
                <div className="absolute left-[15px] top-[14px] w-[39px] h-[25px]">
                  {/* Remplacez ce SVG par votre icône */}
                  <Image 
                    src="/images/book.png"
                    width={39}
                    height={25}
                    alt="Icône livre"
                    
                  />

                </div>
              </div>
              {/* Contenu principal */}
              <div className="flex-1 flex flex-col px-7 pt-6 pb-0">
                <h3 className="font-grange font-extrabold text-[24px] leading-[30px] text-[#0F3A42] mb-2">
                  {program.title}
                </h3>
                <p className="font-opensans text-[#0F3A42] text-[14px] leading-[26px] mb-8">
                  {program.description}
                </p>
                <div className="flex justify-center mb-4">
                  <Link
                    href={`/programmes/${program.level.toLowerCase()}`}
                    className="w-[311px] h-[46px] flex items-center justify-center bg-[#489EAF] text-white font-grange text-lg font-extrabold rounded-[10px] hover:bg-[#357e8e] transition-colors"
                  >
                    Détails du programme
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
        </div>
        


        <div className="flex flex-col md:flex-row gap-8 mt-8 px-7">
          {/* Carte Niveau Supérieur */}
          <div className="relative box-border w-full md:w-1/2 h-auto border border-[#D7E3ED] rounded-[25px] overflow-hidden flex flex-col md:flex-row shadow-lg"> {/* Ajout de shadow-lg pour un effet similaire à l'image */}

            {/* Colonne Gauche (Sombre avec motif et icône) */}
            <div className="relative md:w-[35%] w-full bg-[#0F3A42] p-5 flex flex-col items-start"> {/* Ajustez md:w-[35%] au besoin. p-5 pour le padding interne. */}
              {/* Motif décoratif */}
              {/* REMPLACEZ CECI par votre SVG ou composant Image pour le motif */}
              {/* Exemple avec un SVG placeholder (le motif réel est plus complexe, basé sur l'image) */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="object-cover">
                  <defs>
                    <pattern id="motifNiveauSup" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="scale(0.7)">
                      {/* Ceci est un placeholder très simplifié du motif. Vous devrez utiliser votre propre SVG. */}
                      <path d="M30,0 L35.18,14.82 L50,19.1 L35.18,23.36 L30,38.18 L24.82,23.36 L10,19.1 L24.82,14.82 Z" fill="rgba(255,255,255,0.1)"/>
                      <circle cx="10" cy="10" r="3" fill="rgba(255,255,255,0.05)"/>
                      <circle cx="50" cy="50" r="3" fill="rgba(255,255,255,0.05)"/>
                      <circle cx="10" cy="50" r="2" fill="rgba(255,255,255,0.05)"/>
                      <circle cx="50" cy="10" r="2" fill="rgba(255,255,255,0.05)"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#motifNiveauSup)" />
                </svg>
              </div>

              {/* Icône livre (Blanche) */}
              <div className="relative z-10 w-[39px] h-[25px] mb-auto"> {/* mb-auto pour pousser vers le bas si autre contenu ajouté plus tard */}
                <Image
                  src="/images/book.png" // Assurez-vous que ce chemin pointe vers une icône de livre BLANCHE
                  width={39}
                  height={25}
                  alt="Icône livre"
                />
              </div>
              {/* Espace pour s'assurer que la colonne a une hauteur minimale si le contenu de droite est court, ou pour l'esthétique */}
              <div className="mt-auto invisible md:min-h-[150px]"></div> {/* Ajuster min-h ou supprimer si non nécessaire */}
            </div>

            {/* Colonne Droite (Contenu Principal Blanc) */}
            <div className="flex-1 flex flex-col px-7 py-6 bg-white">
              <h3 className="font-grange font-extrabold text-[24px] leading-[30px] text-[#0F3A42] mb-4">
                Niveau supérieur
              </h3>
              <ul className="list-disc pl-5 text-[#0F3A42] text-[14px] leading-[26px] space-y-1"> {/* space-y-1 pour un léger espacement entre les li */}
                <li>Faculté de la science du Coran</li>
                <li>Faculté Tawhid</li>
                <li>Faculté de la jurisprudence islamique (fiqh)</li>
                <li>Faculté siirah (histoire du prophète Mouhamed PSL)</li>
                <li>Faculté hadith</li>
              </ul>
            </div>
          </div>

          {/* Carte Classe Spéciales */}
          <div className="relative box-border w-full md:w-1/2 h-auto border border-[#D7E3ED] rounded-[25px] bg-white overflow-hidden flex flex-col shadow-lg"> {/* Ajout de shadow-lg */}

            {/* Section supérieure pour l'icône et l'espacement */}
            {/* L'icône est maintenant positionnée absolument par rapport à la carte globale */}
            

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col px-6 pt-8 pb-6 bg-white border border-[#D7E3ED] rounded-[25px] relative shadow-lg">
              {/* Icône livre en haut à droite */}
              <div className="absolute right-6 top-6 w-9 h-6">
                <Image
                  src="/images/bookdark.png"
                  width={36}
                  height={24}
                  alt=""
                />
              </div>
              
              <h3 className="font-grange font-extrabold text-2xl text-[#489EAF] mb-4">
                Classe spéciales <span className="text-[#0F3A42]">3 Mois</span>
              </h3>

              <div className="space-y-4 text-[#0F3A42]">
                <div className="space-y-2">
                  <p className="font-semibold">
                    Classe spéciale de mémorisation
                  </p>
                  <p className="text-sm leading-relaxed">
                    Du Coran, encadrée par des enseignants qualifiés, avec un programme structuré de mémorisation et de révision
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">
                    Classe spéciale de langue arabe
                  </p>
                  <p className="text-sm leading-relaxed">
                    Destinée à toute personne ayant les prérequis d'intégrer cette classe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
