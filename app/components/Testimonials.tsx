import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Fatima B.",
      role: "Étudiante en Niveau 2",
      image: "/images/testimonial-1.jpg",
      quote: "L'Institut Al Hira a transformé ma compréhension des sciences islamiques. La pédagogie est exceptionnelle et les professeurs toujours disponibles pour répondre aux questions. La flexibilité des cours en ligne m'a permis de concilier études et vie professionnelle."
    },
    {
      name: "Fatima B.",
      role: "Étudiante en Niveau 2",
      image: "/images/testimonial-1.jpg",
      quote: "L'Institut Al Hira a transformé ma compréhension des sciences islamiques. La pédagogie est exceptionnelle et les professeurs toujours disponibles pour répondre aux questions. La flexibilité des cours en ligne m'a permis de concilier études et vie professionnelle."
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

        <div className="flex flex-col gap-6 md:flex-row md:gap-8 items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white border border-[#D7E3ED] rounded-[25px] w-full max-w-[563px] h-auto md:h-[268px] flex flex-col justify-between p-5 sm:p-8 relative"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-[#F2F4F6] border border-[#D7E3ED] flex items-center justify-center overflow-hidden mr-3 sm:mr-4">
                  {/* Ajoute l'image si besoin */}
                </div>
                <div>
                  <h3 className="text-[#103951] font-grange font-extrabold text-base sm:text-[20px] leading-[23px]">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#103951] font-grange text-base sm:text-[20px] leading-[23px]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <blockquote className="text-[#103951] font-opensans text-sm sm:text-[14px] leading-[22px] sm:leading-[24px] font-normal">
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