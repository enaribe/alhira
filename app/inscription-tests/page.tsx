"use client"
import React, { useState } from "react";
import Header from "../components/Header";

const niveaux = [
  { label: "Niveau 1 (Débutant)", value: "debutant" },
  { label: "Niveau 2 (Intermédiaire)", value: "intermediaire" },
  { label: "Niveau 3 (Avancé)", value: "avance" },
  { label: "Niveau supérieur", value: "superieur" },
  { label: "Classe spéciales", value: "speciales" },
];

const TestNiveau = () => {
  const [selected, setSelected] = useState("debutant");
  const [showTest, setShowTest] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pour les champs du formulaire
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [numero, setNumero] = useState("");
  const [audio, setAudio] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nom || !prenom || !numero || !document || !audio) {
      setMessage("Veuillez remplir tous les champs et charger les fichiers.");
      return;
    }
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("numero", numero);
    formData.append("niveau", selected);
    formData.append("document", document);
    formData.append("audio", audio);

    setLoading(true);
    try {
      const res = await fetch("/api/inscription-test", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setMessage("Votre test a bien été soumis !");
        // Réinitialiser le formulaire si besoin
      } else {
        setMessage("Erreur lors de la soumission.");
      }
    } catch (err) {
      setMessage("Erreur lors de la soumission.");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F2F4F6] flex flex-col items-center pt-8 pb-6 px-2">
        <h1 className="text-[#0F3A42] font-grange text-2xl md:text-4xl lg:text-5xl font-extrabold leading-[30px] text-center mt-20 mb-10">
          Teste de niveau
        </h1>
        {!showTest ? (
          <section className="w-full max-w-4xl bg-white border border-[#D7E3ED] rounded-[30px] mx-auto px-2 md:px-8 py-6 flex flex-col items-center shadow-sm">
            <p className="text-[#8698A7] text-sm md:text-base mb-6 text-center">
              Selectionner votre niveau
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mb-4">
              {niveaux.map((niveau) => (
                <button
                  key={niveau.value}
                  className={`flex items-center justify-center border rounded-[20px] h-[64px] text-base md:text-lg font-grange font-bold transition-all ${
                    selected === niveau.value
                      ? "border-[#0F3A42] text-[#0F3A42] bg-white"
                      : "border-[#D7E3ED] text-[#8698A7] bg-white"
                  }`}
                  onClick={() => setSelected(niveau.value)}
                >
                  {niveau.label}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full max-w-xs mx-auto bg-[#489EAF] hover:bg-[#357d8c] text-white text-base md:text-lg rounded-[10px] py-2 md:py-3 transition"
              onClick={() => setShowTest(true)}
            >
              Faire le test de niveau
            </button>
          </section>
        ) : (
          <section className="relative w-full max-w-[1122px] bg-white border border-[#D7E3ED] rounded-[30px] mx-auto px-2 md:px-8 py-4 md:py-8 flex flex-col shadow-sm min-h-[600px]">
            <div className="flex items-center gap-4 mb-8">
              <button
                className="bg-[#489EAF] text-white px-4 py-2 rounded-lg font-grange font-extrabold text-sm md:text-base hover:bg-[#357d8c] transition"
                onClick={() => setShowTest(false)}
              >
                Retour
              </button>
              
            </div>
            <div className="flex flex-col md:flex-row h-full w-full">
              {/* Colonne gauche : Niveau et instructions */}
              <div className="flex flex-col w-full md:w-[45%] pl-0 md:pl-6 pt-2 mb-6 md:mb-0">
                <span className="text-[#0F3A42] font-grange font-bold text-xl sm:text-2xl md:text-[28px] mb-4">
                  {niveaux.find((n) => n.value === selected)?.label}
                </span>
                <div className="border border-[#D7E3ED] rounded-[2px] w-full h-[200px] sm:h-[300px] md:h-[545px] mt-2 bg-white"></div>
              </div>
              {/* Colonne droite : Formulaire */}
              <div className="flex flex-col w-full md:w-[55%] pl-0 md:pl-6 pr-0 md:pr-6 pt-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                  <span className="text-black font-grange font-bold text-base md:text-[16px]">
                    Instruction
                  </span>
                  <span className="text-[#8698A7] font-grange font-bold text-lg sm:text-xl md:text-[28px]">
                    {niveaux.find((n) => n.value === selected)?.label}
                  </span>
                </div>
                <form className="flex flex-col gap-4 mt-4 md:mt-8" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-[#0F3A42] font-grange font-bold text-sm md:text-base mb-1">
                      Votre nom
                    </label>
                    <input
                      type="text"
                      className="text-black w-full h-[40px] md:h-[46px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[15px] px-3 md:px-4 text-sm md:text-base"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F3A42] font-grange font-bold text-sm md:text-base mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="text-black w-full h-[40px] md:h-[46px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[15px] px-3 md:px-4 text-sm md:text-base"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F3A42] font-grange font-bold text-sm md:text-base mb-1">
                      Votre numéro avec whatsapp
                    </label>
                    <input
                      type="text"
                      className="text-black w-full h-[40px] md:h-[46px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[15px] px-3 md:px-4 text-sm md:text-base"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F3A42] font-grange font-bold text-sm md:text-base mb-1">
                      Charger un document
                    </label>
                    <div className="w-full h-[60px] md:h-[77px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[15px] flex items-center justify-center">
                      <label htmlFor="document-upload" className="text-[#489EAF] font-grange font-bold cursor-pointer text-sm md:text-base">
                        Charger votre document
                        <input
                          id="document-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          className="hidden"
                          onChange={(e) =>
                            setDocument(e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </label>
                      {document && (
                        <span className="ml-4 text-[#0F3A42] font-opensans text-xs md:text-sm">
                          {document.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#0F3A42] font-grange font-bold text-sm md:text-base mb-1">
                      Charger un audio
                    </label>
                    <div className="w-full h-[60px] md:h-[77px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[15px] flex items-center justify-center">
                      <label className="text-[#489EAF] font-grange font-bold cursor-pointer text-sm md:text-base">
                        Charger votre audio
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={(e) =>
                            setAudio(e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </label>
                      {audio && (
                        <span className="ml-4 text-[#0F3A42] font-opensans text-xs md:text-sm">
                          {audio.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full max-w-full md:max-w-[413px] mx-auto bg-[#489EAF] hover:bg-[#357d8c] text-white text-base md:text-lg font-grange font-bold rounded-[15px] py-2 md:py-3 mt-4 transition"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                        Chargement...
                      </span>
                    ) : (
                      "Soumettre"
                    )}
                  </button>
                  {message && (
                    <div className="text-center text-red-500 mt-2">{message}</div>
                  )}
                </form>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default TestNiveau;