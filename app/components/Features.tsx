import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Programme structuré",
      description: "Nos cursus sont méticuleusement conçus pour offrir une progression cohérente dans l'apprentissage des sciences islamiques.",
      icon: (
        <svg width="43" height="41" viewBox="0 0 43 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.5703 15.3926L25.9072 16.4287H40.1816L29.5146 24.1787L28.6328 24.8193L28.9697 25.8555L33.0439 38.3936L22.3779 30.6445L21.4961 30.0039L20.6143 30.6445L9.94727 38.3945L14.0225 25.8555L14.3594 24.8193L13.4775 24.1787L2.81055 16.4287H17.085L17.4219 15.3926L21.4961 2.85352L25.5703 15.3926Z" stroke="#103951" strokeWidth="3"/>
        </svg>

      )
    },
    {
      title: "Enseignants qualifiés",
      description: "Nos professeurs sont des experts reconnus dans leurs domaines, formés dans les plus prestigieuses institutions islamiques.",
      icon: (
        <svg width="34" height="46" viewBox="0 0 34 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31.7001 41C31.7001 42.6569 30.3569 44 28.7001 44H5C3.34315 44 2 42.6569 2 41V5C2 3.34315 3.34315 2 5 2H15.6081C16.4034 2 17.1661 2.31579 17.7287 2.87796L30.8207 15.961C31.3837 16.5237 31.7001 17.2871 31.7001 18.0831V41Z" stroke="#103951" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.8501 2V16.8398H31.7001" stroke="#103951" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.35999 24.5801H23.36" stroke="#103951" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
          <path d="M9.35999 31.5801H16.36" stroke="#103951" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"/>
        </svg>

      )
    },
    {
      title: "Flexibilité d'apprentissage",
      description: "Choisissez entre des cours en présentiel ou en ligne selon votre emploi du temps et vos contraintes géographiques.",
      icon: (
        <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.1264 2H5.52076C3.57311 2 2 3.58236 2 5.52064V42.4792C2 44.4269 3.58247 46 5.52076 46H24.1264C26.0741 46 27.6471 44.4175 27.6471 42.4792V5.52064C27.6471 3.573 26.0647 2 24.1264 2Z" stroke="#42586B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.9319 39.2529C15.8729 39.2529 16.6329 40.0121 16.6331 40.9531C16.6331 41.8943 15.873 42.6543 14.9319 42.6543C13.9909 42.6542 13.2317 41.8942 13.2317 40.9531C13.2318 40.0122 13.9909 39.2531 14.9319 39.2529Z" fill="#42586B" stroke="#42586B"/>
        </svg>

      )
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-[#F2F4F6]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#0F3A42] font-grange font-extrabold text-4xl md:text-5xl lg:text-[54px] mb-4">
            Pourquoi choisir<br className="md:hidden" /> Al Hira
          </h2>
          <p className="text-[#0F3A42] font-opensans text-lg max-w-2xl mx-auto">
            Nous offrons une expérience d'apprentissage complète axée sur la qualité et l'excellence académique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border border-[#D7E3ED] rounded-[32px] p-8 shadow-[0_4px_24px_0_rgba(16,57,81,0.06)] flex flex-col transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="bg-[#F2F4F6] w-20 h-20 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-[#0F3A42] font-grange font-extrabold text-2xl md:text-[26px] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#0F3A42] font-opensans text-base md:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;