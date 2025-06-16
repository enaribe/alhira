"use client"
import React from "react";
import Image from "next/image";

const CTA = () => {
  return (
    <section className="w-full flex justify-center items-center py-8 md:py-12 px-2 bg-[#F8FAFB]">
      <div className="relative w-full max-w-[1210px] h-auto border border-[#D7E3ED] rounded-[20px] md:rounded-[30px] flex flex-col lg:flex-row items-center justify-between overflow-hidden px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        {/* Image de fond */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/cta.png"
            alt="Fond CTA"
            fill
            className="object-cover rounded-[20px] md:rounded-[30px]"
            priority
          />
        </div>
        
        {/* Logo livre en haut à gauche */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <Image src="/images/book.png" alt="Logo livre" width={36} height={36} className="md:w-12 md:h-12" />
        </div>
        
        {/* Partie gauche : texte et boutons */}
        <div className="flex-1 flex flex-col justify-center items-start z-10 ml-0 md:ml-3 lg:ml-5 text-center lg:text-left">
          <h2 className="font-grange font-extrabold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-6 w-full lg:w-auto">
            Prêt à commencer votre<br className="hidden lg:block" />
            <span className="lg:hidden"> </span>parcours éducatif&nbsp;?
          </h2>
          <p className="font-opensans text-white text-[12px] sm:text-[13px] md:text-[14px] leading-[20px] md:leading-[26px] mb-6 md:mb-8 max-w-full lg:max-w-[455px] px-2 lg:px-0">
            Les inscriptions sont ouvertes pour la prochaine session. Participez à nos tests de niveau pour intégrer la formation adaptée à vos connaissances.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full lg:w-auto">
            <button 
              onClick={() => window.location.href = '/inscription-tests'}
              className="bg-[#489EAF] hover:bg-[#357d8c] text-white font-grange font-extrabold text-[14px] md:text-[16px] rounded-[8px] md:rounded-[10px] px-[20px] md:px-[30px] py-[8px] md:py-[10px] transition w-full sm:w-auto"
            >
              S'inscrire aux tests
            </button>
            <button 
              onClick={() => window.location.href = '/inscription-tests'}
              className="border border-white text-white font-grange font-extrabold text-[14px] md:text-[16px] rounded-[8px] md:rounded-[10px] px-[20px] md:px-[30px] py-[8px] md:py-[10px] transition hover:bg-white hover:text-[#0F3A42] w-full sm:w-auto">
              S'inscrire aux tests
            </button>
          </div>
        </div>
        
        {/* Partie droite : illustration - masquée sur mobile pour optimiser l'espace */}
        <div className="hidden lg:flex flex-1 justify-center items-center mt-10 lg:mt-0 z-10">
          <div className="relative w-[280px] xl:w-[380px] h-[250px] xl:h-[340px]">
             
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;