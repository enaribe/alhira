"use client"
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

interface TestInscription {
  id: number;
  nom: string;
  prenom?: string;
  numero: string;
  niveau: string;
  adresseMail?: string;
  localite?: string;
  objectifsApprentissage?: string;
  document?: string;
  audio?: string;
  testFormat: string;
  reponses?: any;
  statut: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [tests, setTests] = useState<TestInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState<TestInscription | null>(null);
  const [filterNiveau, setFilterNiveau] = useState<string>('tous');
  const [filterStatut, setFilterStatut] = useState<string>('tous');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await fetch("/api/inscription-test");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setTests(data);
      } else {
        setTests([]);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des tests:", err);
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatut = async (id: number, newStatut: string) => {
    try {
      const res = await fetch(`/api/inscription-test/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut: newStatut })
      });
      
      if (res.ok) {
        setTests(prev => prev.map(test => 
          test.id === id ? { ...test, statut: newStatut } : test
        ));
        if (selectedTest && selectedTest.id === id) {
          setSelectedTest({ ...selectedTest, statut: newStatut });
        }
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
    }
  };

  const deleteTest = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce test ?")) return;
    
    try {
      const res = await fetch(`/api/inscription-test/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTests(prev => prev.filter(test => test.id !== id));
        if (selectedTest && selectedTest.id === id) {
          setSelectedTest(null);
        }
      }
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesNiveau = filterNiveau === 'tous' || test.niveau === filterNiveau;
    const matchesStatut = filterStatut === 'tous' || test.statut === filterStatut;
    const matchesSearch = !searchTerm || 
      test.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.numero.includes(searchTerm) ||
      (test.adresseMail && test.adresseMail.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesNiveau && matchesStatut && matchesSearch;
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Validé': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejeté': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getNiveauColor = (niveau: string) => {
    switch (niveau) {
      case 'debutant': return 'bg-blue-500';
      case 'intermediaire': return 'bg-[#489EAF]';
      case 'avance': return 'bg-[#B65D73]';
      case 'superieur': return 'bg-purple-500';
      case 'speciales': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getNiveauLabel = (niveau: string) => {
    switch (niveau) {
      case 'debutant': return 'Débutant';
      case 'intermediaire': return 'Intermédiaire';
      case 'avance': return 'Avancé';
      case 'superieur': return 'Supérieur';
      case 'speciales': return 'Spéciales';
      default: return niveau;
    }
  };

  const renderReponses = (test: TestInscription) => {
    if (!test.reponses) return <div className="text-gray-500">Aucune réponse enregistrée</div>;

    if (test.niveau === 'debutant') {
      return (
        <div className="space-y-6">
          {/* Partie Arabe */}
          <div className="bg-blue-50 rounded-[20px] p-6 border border-blue-200">
            <h4 className="font-grange font-bold text-[#0F3A42] text-lg mb-4 flex items-center gap-2">
              📝 Test de Lecture Arabe
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-grange font-bold text-blue-600">Lettres connues :</span>
                <p className="text-gray-700 mt-1 text-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {test.reponses.lettresConnues?.length ? test.reponses.lettresConnues.join(" - ") : "Aucune"}
                </p>
              </div>
              <div>
                <span className="font-grange font-bold text-blue-600">Syllabes simples :</span>
                                 <div className="text-gray-700 mt-1 space-y-1">
                   {test.reponses.syllabesSimples && typeof test.reponses.syllabesSimples === 'object' ? 
                     Object.entries(test.reponses.syllabesSimples).map(([key, value]) => (
                       <div key={key} className="flex gap-2">
                         <span className="font-bold">{key}:</span>
                         <span>{String(value) || "Non répondu"}</span>
                       </div>
                     )) : <span>Non répondu</span>}
                 </div>
              </div>
            </div>
          </div>

          {/* Partie Fiqh */}
          <div className="bg-[#F8F4E8] rounded-[20px] p-6 border border-[#E3D4B8]">
            <h4 className="font-grange font-bold text-[#0F3A42] text-lg mb-4 flex items-center gap-2">
              🕌 Test de Fiqh - Niveau Débutant
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Étapes du Wudu :</span>
                <p className="text-gray-700 mt-1">
                  {test.reponses.etapesWudu?.length ? test.reponses.etapesWudu.join(", ") : "Aucune"}
                </p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Ordre du Wudu :</span>
                                 <div className="text-gray-700 mt-1 space-y-1">
                   {test.reponses.ordreWudu && typeof test.reponses.ordreWudu === 'object' ? 
                     Object.entries(test.reponses.ordreWudu).map(([key, value]) => (
                       <div key={key} className="flex gap-2">
                         <span className="font-bold">{key}:</span>
                         <span>{String(value) || "Non répondu"}</span>
                       </div>
                     )) : <span>Non répondu</span>}
                 </div>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Prières obligatoires :</span>
                <p className="text-gray-700 mt-1">{test.reponses.prieresObligatoires || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Association des prières :</span>
                                 <div className="text-gray-700 mt-1 space-y-1">
                   {test.reponses.associationPrieres && typeof test.reponses.associationPrieres === 'object' ? 
                     Object.entries(test.reponses.associationPrieres).map(([key, value]) => (
                       <div key={key} className="flex gap-2">
                         <span className="font-bold capitalize">{key}:</span>
                         <span>{String(value) || "Non associé"}</span>
                       </div>
                     )) : <span>Non répondu</span>}
                 </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (test.niveau === 'intermediaire') {
      return (
        <div className="space-y-6">
          {/* Questions Tajwid */}
          <div className="bg-[#E8F4F8] rounded-[20px] p-6 border border-[#B8D4E3]">
            <h4 className="font-grange font-bold text-[#0F3A42] text-lg mb-4 flex items-center gap-2">
              📖 Questions de Tajwid
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Règle Tajwid :</span>
                <p className="text-gray-700 mt-1">{test.reponses.tajwidRule1 || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Technique :</span>
                <p className="text-gray-700 mt-1">{test.reponses.tajwidTechnique1 || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Noun :</span>
                <p className="text-gray-700 mt-1">{test.reponses.tajwidNoun1 || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Mots Ghunna :</span>
                <p className="text-gray-700 mt-1">
                  {test.reponses.ghunnaWords?.length ? test.reponses.ghunnaWords.join(", ") : "Aucun"}
                </p>
              </div>
            </div>
          </div>

          {/* Questions Fiqh */}
          <div className="bg-[#F8F4E8] rounded-[20px] p-6 border border-[#E3D4B8]">
            <h4 className="font-grange font-bold text-[#0F3A42] text-lg mb-4 flex items-center gap-2">
              ⚖️ Questions de Fiqh
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Ablutions invalides :</span>
                <p className="text-gray-700 mt-1">
                  {test.reponses.ablutionInvalides?.length ? test.reponses.ablutionInvalides.join(", ") : "Aucune"}
                </p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Différence Fard/Sunnah :</span>
                <p className="text-gray-700 mt-1">{test.reponses.fardSunnahDifference || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Fard du Wudu :</span>
                <p className="text-gray-700 mt-1">
                  {test.reponses.fardWudu?.length ? test.reponses.fardWudu.join(", ") : "Aucun"}
                </p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Conditions de la prière :</span>
                <p className="text-gray-700 mt-1">
                  {test.reponses.conditionsPriere?.length ? test.reponses.conditionsPriere.join(", ") : "Aucune"}
                </p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Oubli d'un pilier :</span>
                <p className="text-gray-700 mt-1">{test.reponses.oubliPilier || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Différence Pilier/Sunnah :</span>
                <p className="text-gray-700 mt-1">{test.reponses.pilierSunnaDifference || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Prières surérogatoires :</span>
                <p className="text-gray-700 mt-1">{test.reponses.prieresSupererogatoires || "Non répondu"}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (test.niveau === 'avance') {
      return (
        <div className="space-y-6">
          {/* Questions Tajwid Avancé */}
          <div className="bg-[#E8F4F8] rounded-[20px] p-6 border border-[#B8D4E3]">
            <h4 className="font-grange font-bold text-[#0F3A42] text-lg mb-4 flex items-center gap-2">
              📖 Règles du Tajwid Avancé
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Types d'Idghâm :</span>
                <p className="text-gray-700 mt-1">{test.reponses.idghamTypes || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Différence Idghâm :</span>
                <p className="text-gray-700 mt-1">{test.reponses.idghamDifference || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Idghâm Mutamâthil :</span>
                <p className="text-gray-700 mt-1">{test.reponses.idghamMutamatil || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Lettres Idhhâr :</span>
                <p className="text-gray-700 mt-1">{test.reponses.idhharLetters || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Exemples Idhhâr :</span>
                <p className="text-gray-700 mt-1">{test.reponses.idhharExamples || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#489EAF]">Règle "من آمن" :</span>
                <p className="text-gray-700 mt-1">{test.reponses.manAmanaRule || "Non répondu"}</p>
              </div>
            </div>
          </div>

          {/* Questions Fiqh Avancé */}
          <div className="bg-[#F8F4E8] rounded-[20px] p-6 border border-[#E3D4B8]">
            <h4 className="font-grange font-bold text-[#0F3A42] text-lg mb-4 flex items-center gap-2">
              ⚖️ Fiqh - Questions Avancées
            </h4>
            <div className="space-y-3">
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Obligations du Woudou :</span>
                <p className="text-gray-700 mt-1">{test.reponses.wudouObligations || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Sunnah vs Fard Woudou :</span>
                <p className="text-gray-700 mt-1">{test.reponses.wudouSunnaFard || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Doute dans l'ablution :</span>
                <p className="text-gray-700 mt-1">{test.reponses.wudouDoubt || "Non répondu"}</p>
              </div>
              <div>
                <span className="font-grange font-bold text-[#B65D73]">Excuse permanente :</span>
                <p className="text-gray-700 mt-1">{test.reponses.permanentExcuse || "Non répondu"}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div className="text-gray-500">Format de réponses non reconnu</div>;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F2F4F6] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* En-tête */}
          <div className="flex items-center justify-center gap-4 mt-20 mb-10">
            <div className="bg-gradient-to-br from-[#489EAF] to-[#357e8e] rounded-full p-4 shadow-lg">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M8 32V8H32V32H8Z" stroke="#fff" strokeWidth="2.5" />
                <path d="M12 12H28V28H12V12Z" stroke="#fff" strokeWidth="2" />
                <circle cx="20" cy="16" r="2" fill="#fff" />
                <path d="M16 22H24" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 26H22" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-[#0F3A42] font-grange text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                Tableau de Bord Administrateur
              </h1>
              <p className="text-[#8698A7] font-opensans text-lg mt-2 mb-4">
                Gestion complète des inscriptions et réponses des candidats
              </p>
              <div className="flex justify-center">
                <span className="bg-gradient-to-r from-[#489EAF] to-[#357e8e] text-white font-grange font-bold px-6 py-3 rounded-[15px] flex items-center gap-2">
                  <svg width="20" height="20" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                  </svg>
                  Tableau de Bord Administrateur
                </span>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_24px_0_rgba(16,57,81,0.06)] border border-[#D7E3ED]">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg width="24" height="24" fill="none" stroke="currentColor" className="text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-grange font-bold text-[#0F3A42]">{tests.length}</p>
                  <p className="text-[#8698A7] font-opensans text-sm">Total Candidats</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_24px_0_rgba(16,57,81,0.06)] border border-[#D7E3ED]">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-3">
                  <svg width="24" height="24" fill="none" stroke="currentColor" className="text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-grange font-bold text-[#0F3A42]">
                    {tests.filter(t => t.statut === 'Validé').length}
                  </p>
                  <p className="text-[#8698A7] font-opensans text-sm">Validés</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_24px_0_rgba(16,57,81,0.06)] border border-[#D7E3ED]">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 rounded-full p-3">
                  <svg width="24" height="24" fill="none" stroke="currentColor" className="text-yellow-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-grange font-bold text-[#0F3A42]">
                    {tests.filter(t => t.statut === 'En attente').length}
                  </p>
                  <p className="text-[#8698A7] font-opensans text-sm">En attente</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0_4px_24px_0_rgba(16,57,81,0.06)] border border-[#D7E3ED]">
              <div className="flex items-center gap-3">
                <div className="bg-[#489EAF] bg-opacity-20 rounded-full p-3">
                  <svg width="24" height="24" fill="none" stroke="currentColor" className="text-[#489EAF]">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-grange font-bold text-[#0F3A42]">
                    {tests.filter(t => t.testFormat === 'interactive').length}
                  </p>
                  <p className="text-[#8698A7] font-opensans text-sm">Tests Interactifs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des candidats */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[30px] p-8 shadow-[0_4px_24px_0_rgba(16,57,81,0.06)] border border-[#D7E3ED]">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Rechercher par nom, numéro ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 border border-[#D7E3ED] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#489EAF] focus:border-transparent font-opensans"
                    />
                  </div>
                  <select
                    value={filterNiveau}
                    onChange={(e) => setFilterNiveau(e.target.value)}
                    className="px-4 py-3 border border-[#D7E3ED] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#489EAF] font-opensans"
                  >
                    <option value="tous">Tous les niveaux</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                    <option value="superieur">Supérieur</option>
                    <option value="speciales">Spéciales</option>
                  </select>
                  <select
                    value={filterStatut}
                    onChange={(e) => setFilterStatut(e.target.value)}
                    className="px-4 py-3 border border-[#D7E3ED] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#489EAF] font-opensans"
                  >
                    <option value="tous">Tous les statuts</option>
                    <option value="En attente">En attente</option>
                    <option value="Validé">Validé</option>
                    <option value="Rejeté">Rejeté</option>
                  </select>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#489EAF] mx-auto"></div>
                      <p className="text-[#8698A7] mt-2">Chargement...</p>
                    </div>
                  ) : filteredTests.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-[#8698A7]">Aucun candidat trouvé</p>
                    </div>
                  ) : (
                    filteredTests.map((test) => (
                      <div
                        key={test.id}
                        onClick={() => setSelectedTest(test)}
                        className={`p-4 rounded-[15px] border cursor-pointer transition-all hover:shadow-md ${
                          selectedTest?.id === test.id
                            ? 'border-[#489EAF] bg-[#E8F4F8]'
                            : 'border-[#D7E3ED] hover:border-[#B8D4E3]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-grange font-bold text-[#0F3A42] text-lg">
                                {test.nom}
                              </h3>
                              <span className={`${getNiveauColor(test.niveau)} text-white px-2 py-1 rounded-full text-xs font-grange font-bold`}>
                                {getNiveauLabel(test.niveau)}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-grange font-bold border ${getStatutColor(test.statut)}`}>
                                {test.statut}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-[#8698A7]">
                              <span>📱 {test.numero}</span>
                              {test.adresseMail && <span>✉️ {test.adresseMail}</span>}
                              {test.localite && <span>📍 {test.localite}</span>}
                              <span>🕒 {new Date(test.createdAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                          <div className="text-[#489EAF]">
                            <svg width="20" height="20" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Détails du candidat sélectionné */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[30px] p-8 shadow-[0_4px_24px_0_rgba(16,57,81,0.06)] border border-[#D7E3ED] sticky top-8">
                {selectedTest ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-grange font-bold text-[#0F3A42] text-xl">
                        Détails du candidat
                      </h2>
                      <button
                        onClick={() => setSelectedTest(null)}
                        className="text-[#8698A7] hover:text-[#0F3A42] transition"
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Informations personnelles */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="font-grange font-bold text-[#489EAF] text-sm">Nom complet</label>
                        <p className="text-[#0F3A42] font-opensans">
                          {selectedTest.nom} {selectedTest.prenom || ''}
                        </p>
                      </div>
                      <div>
                        <label className="font-grange font-bold text-[#489EAF] text-sm">Numéro de téléphone</label>
                        <p className="text-[#0F3A42] font-opensans">{selectedTest.numero}</p>
                      </div>
                      {selectedTest.adresseMail && (
                        <div>
                          <label className="font-grange font-bold text-[#489EAF] text-sm">Email</label>
                          <p className="text-[#0F3A42] font-opensans">{selectedTest.adresseMail}</p>
                        </div>
                      )}
                      {selectedTest.localite && (
                        <div>
                          <label className="font-grange font-bold text-[#489EAF] text-sm">Localité</label>
                          <p className="text-[#0F3A42] font-opensans">{selectedTest.localite}</p>
                        </div>
                      )}
                      {selectedTest.objectifsApprentissage && (
                        <div>
                          <label className="font-grange font-bold text-[#489EAF] text-sm">Objectifs d'apprentissage</label>
                          <p className="text-[#0F3A42] font-opensans">{selectedTest.objectifsApprentissage}</p>
                        </div>
                      )}
                    </div>

                    {/* Fichiers */}
                    {(selectedTest.document || selectedTest.audio) && (
                      <div className="mb-6">
                        <h3 className="font-grange font-bold text-[#0F3A42] mb-3">Fichiers</h3>
                        <div className="space-y-2">
                          {selectedTest.document && (
                            <a
                              href={selectedTest.document}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-[#489EAF] hover:text-[#357e8e] transition"
                            >
                              <svg width="16" height="16" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2m8 0V2a2 2 0 00-2-2H8a2 2 0 00-2 2v2m8 0h2a2 2 0 012 2v8a2 2 0 01-2 2h-2" />
                              </svg>
                              Document PDF
                            </a>
                          )}
                          {selectedTest.audio && (
                            <div>
                              <p className="text-[#8698A7] text-sm mb-2">Enregistrement audio :</p>
                              <audio controls className="w-full">
                                <source src={selectedTest.audio} type="audio/mpeg" />
                                Votre navigateur ne supporte pas la lecture audio.
                              </audio>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3 mb-6">
                      <h3 className="font-grange font-bold text-[#0F3A42]">Actions</h3>
                      <div className="flex gap-2">
                        {selectedTest.statut !== 'Validé' && (
                          <button
                            onClick={() => updateStatut(selectedTest.id, 'Validé')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-grange font-bold py-2 px-4 rounded-[10px] transition"
                          >
                            ✓ Valider
                          </button>
                        )}
                        {selectedTest.statut !== 'Rejeté' && (
                          <button
                            onClick={() => updateStatut(selectedTest.id, 'Rejeté')}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-grange font-bold py-2 px-4 rounded-[10px] transition"
                          >
                            ✗ Rejeter
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => deleteTest(selectedTest.id)}
                        className="w-full bg-[#B65D73] hover:bg-[#8d4257] text-white font-grange font-bold py-2 px-4 rounded-[10px] transition"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>

                    {/* Réponses détaillées */}
                    {selectedTest.testFormat === 'interactive' && (
                      <div>
                        <h3 className="font-grange font-bold text-[#0F3A42] text-lg mb-4">
                          Réponses détaillées
                        </h3>
                        <div className="max-h-[400px] overflow-y-auto">
                          {renderReponses(selectedTest)}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-[#F2F4F6] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg width="32" height="32" fill="none" stroke="currentColor" className="text-[#8698A7]">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-[#8698A7] font-opensans">
                      Sélectionnez un candidat pour voir ses détails
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard; 