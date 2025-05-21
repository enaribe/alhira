"use client"
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

// Supprimez le tableau testsFictifs

const AdminTests = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch("/api/inscription-test");
        const data = await res.json();
        setTests(data);
      } catch (err) {
        // Gérer l'erreur si besoin
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const validerTest = (id: number) => {
    setTests((prev) =>
      prev.map((test) =>
        test.id === id ? { ...test, statut: "Validé" } : test
      )
    );
  };

  const supprimerTest = (id: number) => {
    setTests((prev) => prev.filter((test) => test.id !== id));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F2F4F6] flex flex-col items-center pt-8 pb-6 px-2">
        <div className="w-full max-w-5xl">
          <div className="flex items-center justify-center gap-4 mt-20 mb-10">
            <div className="bg-[#489EAF] rounded-full p-3 shadow-lg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#fff" />
                <path d="M10 22V10H22V22H10Z" stroke="#489EAF" strokeWidth="2" />
                <path d="M14 14H18V18H14V14Z" stroke="#489EAF" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-[#0F3A42] font-grange text-xl md:text-2xl lg:text-3xl font-extrabold leading-[30px] text-center">
              Administration des tests d'inscription
            </h1>
          </div>
          <section className="w-full bg-white border border-[#D7E3ED] rounded-[30px] mx-auto px-2 md:px-8 py-8 flex flex-col items-center shadow-[0_4px_24px_0_rgba(16,57,81,0.06)]">
            <div className="overflow-x-auto w-full">
              {loading ? (
                <div className="text-center py-8">Chargement...</div>
              ) : (
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-[#F2F4F6]">
                      <th className="py-3 px-2 rounded-l-2xl text-[#0F3A42] font-grange font-bold text-base">Nom</th>
                      <th className="py-3 px-2 text-[#0F3A42] font-grange font-bold text-base">Prénom</th>
                      <th className="py-3 px-2 text-[#0F3A42] font-grange font-bold text-base">Numéro</th>
                      <th className="py-3 px-2 text-[#0F3A42] font-grange font-bold text-base">Niveau</th>
                      <th className="py-3 px-2 text-[#0F3A42] font-grange font-bold text-base">Document</th>
                      <th className="py-3 px-2 text-[#0F3A42] font-grange font-bold text-base">Audio</th>
                      <th className="py-3 px-2 text-[#0F3A42] font-grange font-bold text-base">Statut</th>
                      <th className="py-3 px-2 rounded-r-2xl text-[#0F3A42] font-grange font-bold text-base">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test) => (
                      <tr
                        key={test.id}
                        className="bg-white hover:bg-[#F2F4F6] transition rounded-2xl shadow-sm"
                      >
                        <td className="py-3 px-2 rounded-l-2xl font-opensans">{test.nom}</td>
                        <td className="py-3 px-2 font-opensans">{test.prenom}</td>
                        <td className="py-3 px-2 font-opensans">{test.numero}</td>
                        <td className="py-3 px-2 font-opensans">{test.niveau}</td>
                        
                        
                        <td className="py-3 px-2">
                          <a
                            href={test.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#489EAF] underline font-grange hover:text-[#357e8e] transition"
                          >
                            Ouvrir
                          </a>
                        </td>
                        <td className="py-3 px-2">
                          <audio controls src={test.audio} style={{ width: "120px" }}>
                            Votre navigateur ne supporte pas la lecture audio.
                          </audio>
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-3 py-1 rounded-full font-grange text-sm ${
                              test.statut === "Validé"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {test.statut || "En attente"}
                          </span>
                        </td>
                        <td className="py-3 px-2 flex gap-2 rounded-r-2xl">
                          {test.statut !== "Validé" && (
                            <button
                              className="bg-[#489EAF] hover:bg-[#357e8e] text-white font-grange font-bold px-3 py-1 rounded-lg transition"
                              onClick={() => validerTest(test.id)}
                            >
                              Valider
                            </button>
                          )}
                          <button
                            className="bg-[#B65D73] hover:bg-[#8d4257] text-white font-grange font-bold px-3 py-1 rounded-lg transition"
                            onClick={() => supprimerTest(test.id)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AdminTests;