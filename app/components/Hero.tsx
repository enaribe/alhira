import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] pt-20 md:pt-28 pb-8 md:pb-16 px-2 md:px-6 lg:px-8 flex items-center bg-[#F2F4F6]">
      {/* Desktop/tablet version with image */}
      <div className="w-full md:w-[95%] mx-auto relative rounded-2xl overflow-hidden hidden sm:block">
        <Image 
          src="/images/svgs/bg.svg"
          alt="hero"
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="px-4 md:px-12 py-8 md:py-0 max-w-2xl -mt-8 md:-mt-12 ml-4 md:ml-8">
            <h1 className="text-white font-grange font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[46px] leading-tight sm:leading-snug md:leading-[56px] lg:leading-[63px] tracking-[0%] mb-3 md:mb-5">
              Découvrez l'excellence dans les sciences islamiques
            </h1>
            <p className="text-white/90 font-opensans text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-5 md:mb-7 max-w-xl">
              Institut Al Hira vous accompagne dans votre parcours d'apprentissage avec des programmes adaptés à tous les niveaux, dispensés par des enseignants qualifiés.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link 
                href="/inscription-tests"
                className="bg-[#489EAF] text-white font-grange text-sm md:text-base font-extrabold py-2 md:py-2.5 px-5 md:px-7 rounded-lg text-center hover:bg-[#3A8A9B] transition-colors"
              >
                S'inscrire aux tests
              </Link>
              <Link 
                href="/#formations"
                className="border border-white text-white font-grange text-sm md:text-base font-extrabold py-2 md:py-2.5 px-5 md:px-7 rounded-lg text-center hover:bg-white/10 transition-colors"
              >
                Découvrir nos programmes
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile version with solid color */}
      <div className="w-full mx-auto rounded-2xl overflow-hidden block sm:hidden bg-[#0F3A42] py-10 px-4 flex items-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-white font-grange font-extrabold text-2xl leading-tight mb-3">
            Découvrez l'excellence dans les sciences islamiques
          </h1>
          <p className="text-white/90 font-opensans text-sm leading-relaxed mb-5 max-w-xl">
            Institut Al Hira vous accompagne dans votre parcours d'apprentissage avec des programmes adaptés à tous les niveaux, dispensés par des enseignants qualifiés.
          </p>
          <div className="flex flex-col gap-3">
            <Link 
              href="/inscription-tests"
              className="bg-[#489EAF] text-white font-grange text-sm font-extrabold py-2 px-5 rounded-lg text-center hover:bg-[#3A8A9B] transition-colors"
            >
              S'inscrire aux tests
            </Link>
            <Link 
              href="/#formations"
              className="border border-white text-white font-grange text-sm font-extrabold py-2 px-5 rounded-lg text-center hover:bg-white/10 transition-colors"
            >
              Découvrir nos programmes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;