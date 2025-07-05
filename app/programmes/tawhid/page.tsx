import Header from '@/app/components/Header';
import ProgramHeader from '@/app/components/programmes/ProgramHeader';
import TawhidProgramDetails from '@/app/components/programmes/TawhidProgramDetails';
import TawhidProgramEvaluation from '@/app/components/programmes/TawhidProgramEvaluation';
import Footer from '@/app/components/Footer';

const TawhidPage = () => {
  return (
    <div className="bg-[#F6F8F9]">
      <Header />
      <main className="pb-16">
        <div className="py-12 px-8 md:px-16 lg:px-24 mt-15">
          <ProgramHeader
            title="Faculté de Tawhid"
            description="Explorez les fondements de la croyance islamique et le monothéisme pur."
          />
        </div>
        <div className="px-8">
            <TawhidProgramDetails />
        </div>
        <div className="py-16 px-8">
          <TawhidProgramEvaluation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TawhidPage; 