import Image from 'next/image';

interface ProgramHeaderProps {
  title: string;
  description: string;
}

const ProgramHeader: React.FC<ProgramHeaderProps> = ({ title, description }) => {
  return (
    <header className="relative h-[200px] md:h-[255px] rounded-3xl overflow-hidden shadow-lg">
      <Image
        src="/images/bgprogram.png"
        alt={`Arrière-plan de l'en-tête du programme ${title}`}
        fill
        className="object-cover"
      />
      <div className="relative z-10 flex flex-col justify-center h-full p-6 md:p-12 text-white">
        <h1 className="text-3xl md:text-5xl font-bold font-grange">{title}</h1>
        <p className="mt-2 md:mt-4 text-base md:text-xl max-w-lg">
          {description}
        </p>
      </div>
    </header>
  );
};

export default ProgramHeader; 