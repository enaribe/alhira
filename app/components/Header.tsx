import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="fixed w-full h-[88px] left-0 top-0 bg-white border-b border-[#D7E3ED] z-50">
      <div className="h-full max-w-[1440px] w-full mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="relative h-22 w-32 md:w-36 lg:w-40">
          <Image
            src="/images/logohira.png"
            alt="Logo Alhira"
            fill
            className="object-contain"
            priority
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <a href="/#accueil" className="text-[#0F3A42] font-grange text-sm lg:text-base font-extrabold hover:text-[#489EAF] transition-colors">
            Accueil
          </a>
          <a href="/#formations" className="text-[#0F3A42] font-grange text-sm lg:text-base font-extrabold hover:text-[#489EAF] transition-colors">
            Nos formations
          </a>
          <a href="/#contact" className="text-[#0F3A42] font-grange text-sm lg:text-base font-extrabold hover:text-[#489EAF] transition-colors">
            Contact
          </a>
          <Link 
            href="#" 
            className="bg-white border border-[#489EAF] text-[#489EAF] px-6 lg:px-10 py-2 rounded-lg font-grange text-sm lg:text-base font-extrabold hover:bg-[#489EAF] hover:text-white transition-colors"
          >
            Espace Etudiant
          </Link>
        </nav>

        {/* Menu burger pour mobile */}
        <button className="md:hidden p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0F3A42]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;