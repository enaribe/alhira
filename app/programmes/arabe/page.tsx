import Header from '@/app/components/Header';
import ProgramHeader from '@/app/components/programmes/ProgramHeader';
import ArabeProgramDetails from '@/app/components/programmes/ArabeProgramDetails';
import ArabeProgramEvaluation from '@/app/components/programmes/ArabeProgramEvaluation';
import Footer from '@/app/components/Footer';

const ArabePage = () => {
  return (
    <div className="bg-[#F6F8F9]">
      <Header />
      <main className="pb-16">
        <div className="py-12 px-8 md:px-16 lg:px-24 mt-15">
          <ProgramHeader
            title="Faculté de la Langue Arabe"
            description="De l'alphabet à l'éloquence, un parcours complet pour maîtriser la langue du Coran et de la tradition islamique."
          />
        </div>
        <ArabeProgramDetails />
        <div className="py-16 px-8">
          <ArabeProgramEvaluation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArabePage; 