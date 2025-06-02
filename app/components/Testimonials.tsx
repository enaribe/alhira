import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mohamed",
      role: "Étudiant en Niveau Intermédiaire",
      image: "/images/testimonial-1.jpg",
      quote: "« Je cherchais depuis longtemps un institut qui combine rigueur académique et spiritualité, sans être trop théorique ni trop superficiel. Alhamdulillah, j'ai trouvé cet équilibre ici. Les cours sont bien structurés, les enseignants sont compétents et bienveillants, et surtout, on sent que l'objectif est de nous rapprocher sincèrement d'Allah. Même en travaillant à plein temps, j'arrive à suivre les cours grâce à la flexibilité du format. Je recommande cet institut à toute personne sérieuse dans sa quête de savoir islamique. »"
    },
    {
      name: "Amina",
      role: "Étudiante en Niveau avancé",
      image: "/images/testimonial-1.jpg",
      quote: "« Cet institut a été une véritable lumière dans mon parcours. Grâce à la clarté des explications et au suivi pédagogique, j'ai pu progresser rapidement, non seulement en fiqh et en aqida, mais aussi dans mon comportement quotidien. Ce que j'apprécie le plus, c'est l'attention portée à la purification de l'âme et à la mise en pratique des connaissances. Les examens m'ont permis de mesurer mes progrès et de rester motivée. Qu'Allah récompense toute l'équipe ! »"
    },
    {
      name: "Hassan",
      role: "Étudiante en Niveau avancé",
      image: "/images/testimonial-1.jpg",
      quote: "« Je pensais qu'à mon âge, il serait trop tard pour commencer à apprendre les sciences islamiques. Mais l'institut m'a prouvé le contraire. Les enseignants prennent le temps d'expliquer, ils sont patients et motivants. Même si je n'ai pas fait d'études religieuses auparavant, j'ai pu comprendre des bases solides en aqida, fiqh et tajwid. C'est une grande fierté pour moi de pouvoir lire le Coran avec les bonnes règles et de mieux pratiquer ma religion. J'encourage toutes les personnes âgées comme moi à ne pas hésiter. »"
    }
  ];

  return (
    <section className="py-10 px-2 md:py-20 md:px-6 lg:px-8 bg-[#F8FAFB]">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-[#0F3A42] font-grange font-extrabold text-3xl sm:text-4xl md:text-[48px] lg:text-[64px] leading-tight mb-6 md:mb-10 text-center">
          Ce que disent nos étudiants
        </h2>
        <p className="text-[#0F3A42] text-center text-sm md:text-[14px] leading-[20px] md:leading-[16px] font-opensans font-medium mb-8 md:mb-16 max-w-[321px] mx-auto">
          Découvrez les témoignages de ceux qui ont suivi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-[1200px] mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white border border-[#D7E3ED] rounded-[25px] w-full max-w-[563px] h-auto flex flex-col p-5 sm:p-8 relative mx-auto"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-[#F2F4F6] border border-[#D7E3ED] flex items-center justify-center overflow-hidden mr-3 sm:mr-4">
                  {/* Ajoute l'image si besoin */}
                </div>
                <div>
                  <h3 className="text-[#103951] font-grange font-extrabold text-base sm:text-[18px] leading-[23px]">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#103951] font-grange text-sm sm:text-[16px] leading-[20px]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <blockquote className="text-[#103951] font-opensans text-sm sm:text-[14px] leading-[20px] sm:leading-[22px] font-normal">
                {testimonial.quote}
              </blockquote>
              {/* Pour l'icône livre, ajoute ici si besoin */}
            </div>
          ))}
        </div>

        
      </div>
      
    </section>
  );
};

export default Testimonials;