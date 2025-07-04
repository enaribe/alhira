import Header from '@/app/components/Header';
import ProgramHeader from '@/app/components/programmes/ProgramHeader';
import CoranProgramDetails from '@/app/components/programmes/CoranProgramDetails';
import ProgramEvaluation from '@/app/components/programmes/ProgramEvaluation';
import Footer from '@/app/components/Footer';

const CoranPage = () => {
  return (
    <div className="bg-[#F6F8F9]">
      <Header />
      <main className="pb-16">
        <div className="py-12 px-8 md:px-16 lg:px-24 mt-15">
          <ProgramHeader
            title="Faculté de la Science du Coran"
            description="Explorez les profondeurs du Coran, de sa récitation (Tajwīd) à son exégèse (Tafsīr), pour une compréhension authentique et éclairée."
          />
        </div>
        <CoranProgramDetails />
        <div className="py-16 px-8">
          <ProgramEvaluation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoranPage; 