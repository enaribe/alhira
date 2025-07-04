import ProgramHeader from '@/app/components/programmes/ProgramHeader';
import ProgramLevels from '@/app/components/programmes/ProgramLevels';
import ProgramEvaluation from '@/app/components/programmes/ProgramEvaluation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const SiirahPage = () => {
  return (
    <div className="bg-[#FBFBFB]">
      <Header />
      <main>
        <div className="py-12 px-8 md:px-16 lg:px-24 mt-15">
          <ProgramHeader 
            title="Faculté de la Siirah"
            description="Connaître la vie du Prophète ﷺ, son message, ses épreuves et ses victoires pour suivre son modèle dans tous les domaines."
          />
        </div>
        <ProgramLevels />
        <ProgramEvaluation />
        
      </main>
      <Footer />
    </div>
  );
};

export default SiirahPage; 