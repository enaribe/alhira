"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [tests, setTests] = useState<TestInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState<TestInscription | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterNiveau, setFilterNiveau] = useState<string>('tous');
  const [filterStatut, setFilterStatut] = useState<string>('tous');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérification de l'authentification
  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth === 'true') {
        setIsAuthenticated(true);
        fetchTests();
      } else {
        router.push('/admin-login');
      }
    };

    checkAuth();
  }, [router]);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    router.push('/admin-login');
  };

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
    if (!test.reponses) {
      return (
        <div className="bg-white rounded-[20px] p-8 border border-[#D7E3ED] text-center">
          <p className="text-[#8698A7] font-opensans">Aucune réponse enregistrée</p>
        </div>
      );
    }

    if (test.niveau === 'debutant') {
      return (
        <div className="space-y-8">
          {/* Section Test de Lecture Arabe */}
          <div className="bg-white rounded-[20px] p-8 border border-[#D7E3ED] shadow-[0_4px_24px_0_rgba(16,57,81,0.06)]">
            <div className="mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Test de Lecture Arabe
              </h3>
              <div className="w-16 h-1 bg-[#489EAF] rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Lettres arabes connues
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {test.reponses.lettresConnues?.length ? test.reponses.lettresConnues.join(" - ") : "Aucune lettre sélectionnée"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Syllabes simples
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {test.reponses.syllabesSimples && typeof test.reponses.syllabesSimples === 'object' ? 
                    Object.entries(test.reponses.syllabesSimples).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] flex items-center justify-between">
                        <span className="text-[#0F3A42] font-grange font-bold text-lg">{key}:</span>
                        <span className="text-[#8698A7] font-opensans">{String(value) || "Non répondu"}</span>
                      </div>
                    )) : (
                      <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] text-center">
                        <span className="text-[#8698A7] font-opensans">Non répondu</span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Section Test de Fiqh */}
          <div className="bg-white rounded-[20px] p-8 border border-[#D7E3ED] shadow-[0_4px_24px_0_rgba(16,57,81,0.06)]">
            <div className="mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Test de Fiqh - Niveau Débutant
              </h3>
              <div className="w-16 h-1 bg-[#B65D73] rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Étapes du Wudu sélectionnées
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.etapesWudu?.length ? test.reponses.etapesWudu.join(", ") : "Aucune étape sélectionnée"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Ordre correct du Wudu
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {test.reponses.ordreWudu && typeof test.reponses.ordreWudu === 'object' ? 
                    Object.entries(test.reponses.ordreWudu).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] flex items-center justify-between">
                        <span className="text-[#0F3A42] font-grange font-bold capitalize">{key}:</span>
                        <span className="text-[#8698A7] font-opensans">{String(value) || "Non répondu"}</span>
                      </div>
                    )) : (
                      <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] text-center">
                        <span className="text-[#8698A7] font-opensans">Non répondu</span>
                      </div>
                    )}
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Nombre de prières obligatoires
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED]">
                  <p className="text-[#0F3A42] font-opensans text-lg">
                    {test.reponses.prieresObligatoires || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Association des 5 prières avec leurs moments
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {test.reponses.associationPrieres && typeof test.reponses.associationPrieres === 'object' ? 
                    Object.entries(test.reponses.associationPrieres).map(([key, value]) => (
                      <div key={key} className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] flex items-center justify-between">
                        <span className="text-[#0F3A42] font-grange font-bold capitalize">{key}:</span>
                        <span className="text-[#8698A7] font-opensans">{String(value) || "Non associé"}</span>
                      </div>
                    )) : (
                      <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] text-center">
                        <span className="text-[#8698A7] font-opensans">Non répondu</span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (test.niveau === 'intermediaire') {
      return (
        <div className="space-y-8">
          {/* Section Questions de Tajwid */}
          <div className="bg-white rounded-[20px] p-8 border border-[#D7E3ED] shadow-[0_4px_24px_0_rgba(16,57,81,0.06)]">
            <div className="mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Questions de Tajwid
              </h3>
              <div className="w-16 h-1 bg-[#489EAF] rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Règle Tajwid
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.tajwidRule1 || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Technique appliquée
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.tajwidTechnique1 || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Règle du Noun
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.tajwidNoun1 || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Mots avec Ghunna sélectionnés
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.ghunnaWords?.length ? test.reponses.ghunnaWords.join(", ") : "Aucun mot sélectionné"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Questions de Fiqh */}
          <div className="bg-white rounded-[20px] p-8 border border-[#D7E3ED] shadow-[0_4px_24px_0_rgba(16,57,81,0.06)]">
            <div className="mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Questions de Fiqh
              </h3>
              <div className="w-16 h-1 bg-[#B65D73] rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Ablutions invalides sélectionnées
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.ablutionInvalides?.length ? test.reponses.ablutionInvalides.join(", ") : "Aucune sélection"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Différence entre Fard et Sunnah
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.fardSunnahDifference || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Obligations (Fard) du Wudu
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.fardWudu?.length ? test.reponses.fardWudu.join(", ") : "Aucune sélection"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Conditions de validité de la prière
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.conditionsPriere?.length ? test.reponses.conditionsPriere.join(", ") : "Aucune sélection"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Jugement en cas d'oubli d'un pilier
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.oubliPilier || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Différence entre Pilier et Sunnah
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.pilierSunnaDifference || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Prières surérogatoires
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.prieresSupererogatoires || "Non répondu"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (test.niveau === 'avance') {
      return (
        <div className="space-y-8">
          {/* Section Règles du Tajwid Avancé */}
          <div className="bg-white rounded-[20px] p-8 border border-[#D7E3ED] shadow-[0_4px_24px_0_rgba(16,57,81,0.06)]">
            <div className="mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Règles du Tajwid Avancé
              </h3>
              <div className="w-16 h-1 bg-[#489EAF] rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Types d'Idghâm
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.idghamTypes || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Différence entre Idghâm avec et sans Ghunna
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.idghamDifference || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Exemple d'Idghâm Mutamâthil
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.idghamMutamatil || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Lettres de clarification (Idhhâr)
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.idhharLetters || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Exemples d'Idhhâr
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.idhharExamples || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Règle appliquée dans "مَن آمَنَ"
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.manAmanaRule || "Non répondu"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Fiqh - Questions Avancées */}
          <div className="bg-white rounded-[20px] p-8 border border-[#D7E3ED] shadow-[0_4px_24px_0_rgba(16,57,81,0.06)]">
            <div className="mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Fiqh - Questions Avancées
              </h3>
              <div className="w-16 h-1 bg-[#B65D73] rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Obligations du Woudou'
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.wudouObligations || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Différence entre Sunnah et Fard dans le Woudou'
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.wudouSunnaFard || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Jugement du doute dans l'ablution
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.wudouDoubt || "Non répondu"}
                  </p>
                </div>
              </div>

              <div className="bg-[#F2F4F6] rounded-[15px] p-6">
                <label className="block text-[#0F3A42] font-grange font-bold text-sm mb-3">
                  Excuse permanente (العذر الدائم)
                </label>
                <div className="bg-white rounded-[10px] p-4 border border-[#D7E3ED] min-h-[60px]">
                  <p className="text-[#0F3A42] font-opensans">
                    {test.reponses.permanentExcuse || "Non répondu"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-[20px] p-8 border border-[#D7E3ED] text-center">
        <p className="text-[#8698A7] font-opensans">Format de réponses non reconnu</p>
      </div>
    );
  };

  // Affichage de chargement pendant la vérification d'authentification
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#F2F4F6] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#489EAF] mx-auto mb-4"></div>
            <p className="text-[#8698A7] font-opensans">Vérification de l'authentification...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F2F4F6] pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mt-20 mb-16 relative">
            {/* Bouton de déconnexion */}
            <div className="absolute top-0 right-0">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-grange font-bold py-2 px-4 rounded-[15px] transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
            
            <h1 className="text-[#0F3A42] font-grange text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-[#8698A7] font-opensans text-lg md:text-xl max-w-2xl mx-auto">
              Gestion complète des inscriptions et réponses des candidats
            </p>
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

          {/* Liste des candidats */}
          <div className="w-full">
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
                      onClick={() => {
                        setSelectedTest(test);
                        setShowModal(true);
                      }}
                      className="p-4 rounded-[15px] border cursor-pointer transition-all hover:shadow-md border-[#D7E3ED] hover:border-[#B8D4E3] hover:bg-[#F8F9FA]"
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

          {/* Modal moderne pour les détails du candidat */}
          {showModal && selectedTest && (
            <div 
              className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fadeIn"
              onClick={() => {
                setShowModal(false);
                setSelectedTest(null);
              }}
            >
              <div 
                className="bg-white rounded-[30px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-slideIn relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Bouton de fermeture en haut à droite */}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedTest(null);
                  }}
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" className="text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* En-tête du modal */}
                <div className="bg-[#0F3A42] px-8 py-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-grange font-bold text-2xl mb-2">
                        Détails du candidat
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-grange font-bold">
                          {getNiveauLabel(selectedTest.niveau)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-grange font-bold ${
                          selectedTest.statut === 'Validé' ? 'bg-green-500' : 
                          selectedTest.statut === 'Rejeté' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}>
                          {selectedTest.statut}
                        </span>
                                              </div>
                      </div>
                    </div>
                </div>

                {/* Contenu du modal */}
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Informations personnelles */}
                    <div className="lg:col-span-1">
                      <div className="bg-[#F2F4F6] rounded-[20px] p-6 mb-6">
                        <h3 className="font-grange font-bold text-[#0F3A42] text-lg mb-4">
                          Informations personnelles
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="font-grange font-bold text-[#489EAF] text-sm block mb-1">Nom complet</label>
                            <p className="text-[#0F3A42] font-opensans">
                              {selectedTest.nom} {selectedTest.prenom || ''}
                            </p>
                          </div>
                          <div>
                            <label className="font-grange font-bold text-[#489EAF] text-sm block mb-1">Téléphone</label>
                            <p className="text-[#0F3A42] font-opensans">{selectedTest.numero}</p>
                          </div>
                          {selectedTest.adresseMail && (
                            <div>
                              <label className="font-grange font-bold text-[#489EAF] text-sm block mb-1">Email</label>
                              <p className="text-[#0F3A42] font-opensans">{selectedTest.adresseMail}</p>
                            </div>
                          )}
                          {selectedTest.localite && (
                            <div>
                              <label className="font-grange font-bold text-[#489EAF] text-sm block mb-1">Localité</label>
                              <p className="text-[#0F3A42] font-opensans">{selectedTest.localite}</p>
                            </div>
                          )}
                          {selectedTest.objectifsApprentissage && (
                            <div>
                              <label className="font-grange font-bold text-[#489EAF] text-sm block mb-1">Objectifs</label>
                              <p className="text-[#0F3A42] font-opensans text-sm">{selectedTest.objectifsApprentissage}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Fichiers */}
                      {(selectedTest.document || selectedTest.audio) && (
                        <div className="bg-[#F2F4F6] rounded-[20px] p-6 mb-6">
                          <h3 className="font-grange font-bold text-[#0F3A42] text-lg mb-4">Fichiers</h3>
                          <div className="space-y-3">
                            {selectedTest.document && (
                              <a
                                href={selectedTest.document}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-white p-3 rounded-[10px] text-[#489EAF] hover:text-[#357e8e] transition"
                              >
                                <svg width="20" height="20" fill="none" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2m8 0V2a2 2 0 00-2-2H8a2 2 0 00-2 2v2m8 0h2a2 2 0 012 2v8a2 2 0 01-2 2h-2" />
                                </svg>
                                Document PDF
                              </a>
                            )}
                            {selectedTest.audio && (
                              <div className="bg-white p-3 rounded-[10px]">
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
                      <div className="bg-[#F2F4F6] rounded-[20px] p-6">
                        <h3 className="font-grange font-bold text-[#0F3A42] text-lg mb-4">Actions</h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            {selectedTest.statut !== 'Validé' && (
                              <button
                                onClick={() => {
                                  updateStatut(selectedTest.id, 'Validé');
                                  setShowModal(false);
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white font-grange font-bold py-2 px-3 rounded-[10px] transition text-sm"
                              >
                                ✓ Valider
                              </button>
                            )}
                            {selectedTest.statut !== 'Rejeté' && (
                              <button
                                onClick={() => {
                                  updateStatut(selectedTest.id, 'Rejeté');
                                  setShowModal(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white font-grange font-bold py-2 px-3 rounded-[10px] transition text-sm"
                              >
                                ✗ Rejeter
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              deleteTest(selectedTest.id);
                              setShowModal(false);
                            }}
                            className="w-full bg-[#B65D73] hover:bg-[#8d4257] text-white font-grange font-bold py-2 px-4 rounded-[10px] transition"
                          >
                            🗑️ Supprimer
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Réponses détaillées */}
                    <div className="lg:col-span-2">
                      {selectedTest.testFormat === 'interactive' ? (
                        <div>
                          <h3 className="font-grange font-bold text-[#0F3A42] text-xl mb-6">
                            Réponses détaillées
                          </h3>
                          {renderReponses(selectedTest)}
                        </div>
                      ) : (
                        <div className="bg-[#F2F4F6] rounded-[20px] p-8 text-center">
                          <div className="bg-[#D7E3ED] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <svg width="32" height="32" fill="none" stroke="currentColor" className="text-[#8698A7]">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="text-[#8698A7] font-opensans">
                            Test au format classique - Voir le document PDF pour les réponses
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminDashboard; 