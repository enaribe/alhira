import Header from '@/app/components/Header';
import ProgramHeader from '@/app/components/programmes/ProgramHeader';
import FiqhProgramDetails from '@/app/components/programmes/FiqhProgramDetails';
import FiqhProgramEvaluation from '@/app/components/programmes/FiqhProgramEvaluation';
import Footer from '@/app/components/Footer';

const FiqhPage = () => {
  return (
    <div className="bg-[#F6F8F9]">
      <Header />
      <main className="pb-16">
        <div className="py-12 px-8 md:px-16 lg:px-24 mt-15">
          <ProgramHeader
            title="Faculté de la Jurisprudence Islamique"
            description="Maîtrisez les fondements du Fiqh, de la pratique quotidienne aux questions contemporaines, pour une application juste et éclairée de la Loi."
          />
        </div>
        <FiqhProgramDetails />
        <div className="py-16 px-8">
          <FiqhProgramEvaluation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FiqhPage; 