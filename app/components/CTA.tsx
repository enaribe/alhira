"use client"
import React from "react";
import Image from "next/image";

const CTA = () => {
  return (
    <section className="w-full flex justify-center items-center py-12 px-2 bg-[#F8FAFB]">
      <div className="relative w-full max-w-[1210px] h-auto bg-[#0F3A42] border border-[#D7E3ED] rounded-[30px] flex flex-col lg:flex-row items-center justify-between overflow-hidden px-8 py-12">
        {/* Logo livre en haut à gauche */}
        <div className="absolute top-6 left-6">
          <Image src="/images/book.png" alt="Logo livre" width={48} height={48} />
        </div>
        {/* Partie gauche : texte et boutons */}
        <div className="flex-1 flex flex-col justify-center items-start z-10 ml-5">
          <h2 className="font-grange font-extrabold text-white text-[28px] md:text-[42px] leading-tight mb-6">
            Prêt à commencer votre<br />parcours éducatif&nbsp;?
          </h2>
          <p className="font-opensans text-white text-[14px] leading-[26px] mb-8 max-w-[455px]">
            Les inscriptions sont ouvertes pour la prochaine session. Participez à nos tests de niveau pour intégrer la formation adaptée à vos connaissances.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => window.location.href = '/inscription-tests'}
              className="bg-[#489EAF] hover:bg-[#357d8c] text-white font-grange font-extrabold text-[16px] rounded-[10px] px-[30px] py-[10px] transition"
            >
              S'inscrire aux tests
            </button>
            <button 
              onClick={() => window.location.href = '/inscription-tests'}
              className="border border-white text-white font-grange font-extrabold text-[16px] rounded-[10px] px-[30px] py-[10px] transition hover:bg-white hover:text-[#0F3A42]">
              S'inscrire aux tests
            </button>
          </div>
        </div>
        {/* Partie droite : illustration */}
        <div className="flex-1 flex justify-center items-center mt-10 lg:mt-0 z-0">
          <div className="relative w-[380px] h-[340px]">
            {/* Remplace les images ci-dessous par tes assets réels */}
            <Image
              src="/images/bois.png"
              alt="Illustration parcours éducatif"
              fill
              className="object-contain"
              priority
            />
            {/* Optionnel : motifs SVG ou décorations supplémentaires */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;