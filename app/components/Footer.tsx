import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F3A42] text-white py-10 px-4">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-0">
        {/* Bloc gauche : images + description */}
        <div className="flex flex-col items-start gap-6 min-w-[320px] max-w-[348px]">
          <div className="flex flex-row items-center gap-4">
            <Image src="/images/book.png" alt="Logo 1" width={156} height={99} className="w-[120px] h-auto" />
            <Image src="/images/alhirat.png" alt="Logo 2" width={156} height={99} className="w-[120px] h-auto" />
          </div>
          <p className="font-opensans text-[12px] leading-[24px] mt-2">
            Institut Al Hira est un établissement d&apos;enseignement supérieur spécialisé dans les sciences islamiques, offrant un parcours éducatif complet du niveau débutant jusqu&apos;au niveau supérieur.
          </p>
        </div>
        {/* Bloc droit : 3 colonnes */}
        <div className="flex flex-col sm:flex-row gap-10 lg:gap-[54px] w-full max-w-[600px] mt-8 lg:mt-0">
          {/* Colonne 1 */}
          <div className="flex flex-col gap-[13px] min-w-[84px]">
            <span className="font-grange font-extrabold text-[24px] leading-[14px]">Rejoindre</span>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">Faire le test</Link>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">S&apos;inscrire</Link>
          </div>
          {/* Colonne 2 */}
          <div className="flex flex-col gap-[14px] min-w-[147px]">
            <span className="font-grange font-extrabold text-[24px] leading-[14px]">Nos programmes</span>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">Niveau 1 (Débutant)</Link>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">Niveau 2 (Intermédiaire)</Link>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">Niveau 3 (Avancé)</Link>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">Mémorisation du Coran</Link>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">Classe de langue arabe</Link>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">Niveau supérieur</Link>
          </div>
          {/* Colonne 3 */}
          <div className="flex flex-col gap-[18px] min-w-[109px]">
            <span className="font-grange font-extrabold text-[24px] leading-[20px]">Ressources</span>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">Bibliothèque</Link>
            <Link href="#" className="font-opensans text-[13px] leading-[33px] hover:underline">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;