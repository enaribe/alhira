import Header from '@/app/components/Header';
import ProgramHeader from '@/app/components/programmes/ProgramHeader';
import HadithProgramDetails from '@/app/components/programmes/HadithProgramDetails';
import HadithProgramEvaluation from '@/app/components/programmes/HadithProgramEvaluation';
import Footer from '@/app/components/Footer';

const HadithPage = () => {
  return (
    <div className="bg-[#F6F8F9]">
      <Header />
      <main className="pb-16">
        <div className="py-12 px-8 md:px-16 lg:px-24 mt-15">
          <ProgramHeader
            title="Faculté du Hadith"
            description="Étudiez la science de la tradition prophétique, de l'authentification des hadiths à leur compréhension profonde."
          />
        </div>
        <div className="px-8">
            <HadithProgramDetails />
        </div>
        <div className="py-16 px-8">
          <HadithProgramEvaluation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HadithPage; 