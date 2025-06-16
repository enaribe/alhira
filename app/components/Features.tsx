import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Programme structuré",
      description: "Nos cursus sont méticuleusement conçus pour offrir une progression cohérente dans l'apprentissage des sciences islamiques.",
      icon: (
        <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.2027 1.5V6.2999M10.4033 1.5V6.2999" stroke="#0F3A42" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 26.0846C2 15.6274 2 10.3987 5.00503 7.15004C8.01005 3.90137 12.8466 3.90137 22.5196 3.90137H27.0795C36.7525 3.90137 41.5891 3.90137 44.5941 7.15004C47.5991 10.3987 47.5991 15.6274 47.5991 26.0846V27.3172C47.5991 37.7745 47.5991 43.0031 44.5941 46.2519C41.5891 49.5004 36.7525 49.5004 27.0795 49.5004H22.5196C12.8466 49.5004 8.01005 49.5004 5.00503 46.2519C2 43.0031 2 37.7745 2 27.3172V26.0846Z" stroke="#0F3A42" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.20068 15.9004H46.3998" stroke="#0F3A42" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M31.9983 36.1421C30.6416 38.3937 28.1728 39.8997 25.3524 39.8997C21.0702 39.8997 17.5986 36.4282 17.5986 32.1459C17.5986 29.3255 19.1046 26.8567 21.3562 25.5" stroke="#0F3A42" stroke-width="3" stroke-linecap="round"/>
          <path d="M29.6035 27.8994H29.6257" stroke="#0F3A42" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      )
    },
    {
      title: "Enseignants qualifiés",
      description: "Nos professeurs sont des experts reconnus dans leurs domaines, formés dans les plus prestigieuses institutions islamiques.",
      icon: (
        <svg width="42" height="49" viewBox="0 0 42 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.5417 35.541H7.52083C4.47176 35.541 2 38.0128 2 41.0618C2 44.1109 4.47176 46.5827 7.52083 46.5827H39.5417" stroke="#0F3A42" stroke-width="3" stroke-linecap="round"/>
          <path d="M39.5413 46.5827C36.4923 46.5827 34.0205 44.1109 34.0205 41.0618C34.0205 38.0128 36.4923 35.541 39.5413 35.541" stroke="#0F3A42" stroke-width="3" stroke-linecap="round"/>
          <path d="M27.2495 22.2914C26.0011 24.3633 23.7294 25.749 21.1341 25.749C17.1938 25.749 13.9995 22.5547 13.9995 18.6144C13.9995 16.0191 15.3852 13.7475 17.4572 12.499" stroke="#0F3A42" stroke-width="3" stroke-linecap="round"/>
          <path d="M24.083 15.666H24.1028" stroke="#0F3A42" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 41.0619V10.1452C2 5.87648 5.46047 2.41602 9.72917 2.41602H31.8125C36.0812 2.41602 39.5417 5.87648 39.5417 10.1452V35.541" stroke="#0F3A42" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      )
    },
    {
      title: "Flexibilité d'apprentissage",
      description: "Choisissez entre des cours en présentiel ou en ligne selon votre emploi du temps et vos contraintes géographiques.",
      icon: (
        <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 26.9763C2 41.3489 13.6512 53 28.0237 53C39.8501 53 49.8337 45.1114 53 34.309C49.186 37.0802 44.4927 38.7144 39.4179 38.7144C26.6421 38.7144 16.2856 28.3579 16.2856 15.5822C16.2856 10.5073 17.9199 5.81399 20.6909 2C9.88863 5.16627 2 15.1501 2 26.9763Z" stroke="#0F3A42" stroke-width="3" stroke-linejoin="round"/>
          <path d="M30.8553 18.1053C24.3487 10.0526 35.4477 6.02632 38.2358 2C41.0244 6.02632 52.1233 10.0526 45.6168 18.1053M30.8553 18.1053H45.6168M30.8553 18.1053V36.8947M45.6168 18.1053V36.8947" stroke="#0F3A42" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>


      )
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-[#fff]">
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
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Nouveau composant pour la carte avec SVG en fond
const FeatureCard = ({ icon, title, description }) => (
  <div style={{ width: 374, height: 485, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {/* SVG en fond */}
    <svg
      width="374"
      height="485"
      viewBox="0 0 376 489"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
    >
      <path
        d="M87.8934 426.548C21.9619 427.259 2.49301 399.286 1 385.21V103.79C7.44981 68.9414 61.6164 61.7109 87.8934 62.4517C94.612 34.0039 127.309 35.3374 149.704 27.7809C167.62 21.7357 182.551 8.07481 187.776 2C211.515 26.8919 229.879 28.6699 258.545 35.3374C281.478 40.6714 287.808 55.6361 288.107 62.4518C354.038 61.7406 373.507 89.7143 375 103.79V385.21C368.55 420.059 314.384 427.289 288.107 426.548C281.388 454.996 248.691 453.663 226.296 461.219C208.38 467.264 193.45 480.925 188.224 487C164.485 462.108 146.121 460.33 117.455 453.663C94.5224 448.329 88.192 433.364 87.8934 426.548Z"
        fill="#489EAF"
        stroke="#0F3A42"
        strokeWidth="2"
      />
    </svg>
    {/* Contenu centré */}
    <div style={{
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1
    }}>
      <div style={{
        width: 89,
        height: 89,
        background: '#F2F4F6',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: 'Grange',
        fontWeight: 800,
        fontSize: 28,
        color: '#0F3A42',
        textAlign: 'center',
        marginBottom: 20,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: 'Open Sans',
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '26px',
        color: '#FFFFFF',
        textAlign: 'center',
        width: 291,
      }}>
        {description}
      </p>
    </div>
  </div>
);

export default Features;