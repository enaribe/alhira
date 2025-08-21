"use client"
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import AudioRecorder from "../components/AudioRecorder";

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

  // Effet pour détecter le paramètre de niveau dans l'URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const niveauParam = urlParams.get('niveau');
      if (niveauParam && ['debutant', 'intermediaire', 'avance'].includes(niveauParam)) {
        setSelected(niveauParam);
        
        // Faire défiler vers la section des niveaux après un court délai
        setTimeout(() => {
          const niveauxSection = document.querySelector('[data-niveaux-section]');
          if (niveauxSection) {
            niveauxSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, []);

  // États pour les nouveaux tests (niveau 2 et 3)
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    // Partie 1 - Audio
    audioFile: null as File | null,
    
    // NIVEAU 2 - Test de Fiqh
    ablutionInvalides: [] as string[],
    fardSunnahDifference: "",
    fardWudu: [] as string[],
    conditionsPriere: [] as string[],
    oubliPilier: "",
    pilierSunnaDifference: "",
    prieresSupererogatoires: "",
    
    // NIVEAU 3 - Tajwid Avancé
    // Étape 2 - Règles du Tajwid
    idghamTypes: "", // Question 1: Types d'idghâm
    idghamDifference: "", // Question 2: Différence idghâm avec/sans ghunna
    idghamMutamatil: "", // Question 3: Exemple idghâm mutamâthilayn
    idhharLetters: "", // Question 4: Lettres de clarification
    idhharExamples: "", // Question 5: Exemples d'idhhâr
    manAmanaRule: "", // Question 6: Règle dans مَن آمَنَ
    ikhfaDefinition: "", // Question 7: Définition ikhfâ'
    ikhfaExamples: "", // Question 8: Exemples ikhfâ' avec ghunna
    iqlabLetter: "", // Question 9: Lettre qui provoque l'iqlâb
    maddDifference: "", // Question 10: Différence madd tabi'î et lâzim
    // Question 12: Nombre de harakât
    maddTabiiHarakat: "",
    maddMufassilHarakat: "",
    maddMuttasilHarakat: "",
    maddLazimHarakat: "",
    
    // Étape 3 - Fiqh Avancé
    wudouObligations: "", // Question 1: Obligations du woudou'
    wudouSunnaFard: "", // Question 2: Différence sunna/farḍ
    wudouDoubt: "", // Question 3: Jugement du doute
    permanentExcuse: "", // Question 4: Excuse permanente
    
    // Questions Tajwid anciennes (compatibilité niveau 2)
    tajwidRule1: "",
    tajwidTechnique1: "",
    tajwidNoun1: "",
    ghunnaWords: [] as string[],
    
    // NIVEAU 1 - Test débutant
    lettresConnues: [] as string[],
    syllabesSimples: {
      ba: "",
      ja: "",
      rou: "",
      sa: "",
      khi: ""
    },
    etapesWudu: [] as string[],
    ordreWudu: {
      essuyer: "",
      laverMains: "",
      laverVisage: "",
      laverPieds: "",
      intention: ""
    },
    prieresObligatoires: "",
    associationPrieres: {
      fajr: "",
      dhuhr: "",
      asr: "",
      maghrib: "",
      isha: ""
    }
  });

  // Champs pour l'étape finale des nouveaux tests
  const [nom, setNom] = useState("");
  const [numero, setNumero] = useState("");
  const [adresseMail, setAdresseMail] = useState("");
  const [localite, setLocalite] = useState("");
  const [objectifsApprentissage, setObjectifsApprentissage] = useState("");
  const [message, setMessage] = useState("");

  // Fonction de soumission du formulaire pour les nouveaux tests interactifs
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation pour les tests niveau 1, 2 et 3
    const isLevel1 = selected === "debutant";
    const isLevel2 = selected === "intermediaire";
    const isLevel3 = selected === "avance";
    
    if (!nom || !numero || !adresseMail || !localite) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    
    // Audio requis pour niveau 1 et 2
    if ((isLevel1 || isLevel2) && !answers.audioFile) {
      setMessage("Veuillez charger votre enregistrement audio.");
      return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("numero", numero);
    formData.append("adresseMail", adresseMail);
    formData.append("localite", localite);
    formData.append("objectifsApprentissage", objectifsApprentissage);
    formData.append("niveau", selected);
    if (answers.audioFile) {
      formData.append("audioFile", answers.audioFile);
    }
    // Test de Fiqh données
    formData.append("ablutionInvalides", JSON.stringify(answers.ablutionInvalides));
    formData.append("fardSunnahDifference", answers.fardSunnahDifference);
    formData.append("fardWudu", JSON.stringify(answers.fardWudu));
    formData.append("conditionsPriere", JSON.stringify(answers.conditionsPriere));
    formData.append("oubliPilier", answers.oubliPilier);
    formData.append("pilierSunnaDifference", answers.pilierSunnaDifference);
    formData.append("prieresSupererogatoires", answers.prieresSupererogatoires);
    // Anciennes données Tajwid
    formData.append("tajwidRule1", answers.tajwidRule1);
    formData.append("tajwidTechnique1", answers.tajwidTechnique1);
    formData.append("tajwidNoun1", answers.tajwidNoun1);
    formData.append("ghunnaWords", JSON.stringify(answers.ghunnaWords));
    
    // Données spécifiques niveau 1
    if (isLevel1) {
      formData.append("lettresConnues", JSON.stringify(answers.lettresConnues));
      formData.append("syllabesSimples", JSON.stringify(answers.syllabesSimples));
      formData.append("etapesWudu", JSON.stringify(answers.etapesWudu));
      formData.append("ordreWudu", JSON.stringify(answers.ordreWudu));
      formData.append("prieresObligatoires", answers.prieresObligatoires);
      formData.append("associationPrieres", JSON.stringify(answers.associationPrieres));
    }
    
    // Données spécifiques niveau 3
    if (isLevel3) {
      // Étape 2 - Règles du Tajwid niveau 3
      formData.append("idghamTypes", answers.idghamTypes);
      formData.append("idghamDifference", answers.idghamDifference);
      formData.append("idghamMutamatil", answers.idghamMutamatil);
      formData.append("idhharLetters", answers.idhharLetters);
      formData.append("idhharExamples", answers.idhharExamples);
      formData.append("manAmanaRule", answers.manAmanaRule);
      formData.append("ikhfaDefinition", answers.ikhfaDefinition);
      formData.append("ikhfaExamples", answers.ikhfaExamples);
      formData.append("iqlabLetter", answers.iqlabLetter);
      formData.append("maddDifference", answers.maddDifference);
      formData.append("maddTabiiHarakat", answers.maddTabiiHarakat);
      formData.append("maddMufassilHarakat", answers.maddMufassilHarakat);
      formData.append("maddMuttasilHarakat", answers.maddMuttasilHarakat);
      formData.append("maddLazimHarakat", answers.maddLazimHarakat);
      
      // Étape 3 - Fiqh niveau 3
      formData.append("wudouObligations", answers.wudouObligations);
      formData.append("wudouSunnaFard", answers.wudouSunnaFard);
      formData.append("wudouDoubt", answers.wudouDoubt);
      formData.append("permanentExcuse", answers.permanentExcuse);
    }

    setLoading(true);
    try {
      const res = await fetch("/api/inscription-test", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
          const levelName = isLevel1 ? "niveau 1" : isLevel2 ? "niveau 2" : "niveau 3";
          setMessage(`Votre test de ${levelName} a bien été soumis !`);
        // Reset du formulaire
        setNom("");
        setNumero("");
        setAdresseMail("");
        setLocalite("");
        setObjectifsApprentissage("");
                  setAnswers({
            audioFile: null,
            ablutionInvalides: [],
            fardSunnahDifference: "",
            fardWudu: [],
            conditionsPriere: [],
            oubliPilier: "",
            pilierSunnaDifference: "",
            prieresSupererogatoires: "",
            idghamTypes: "",
            idghamDifference: "",
            idghamMutamatil: "",
            idhharLetters: "",
            idhharExamples: "",
            manAmanaRule: "",
            ikhfaDefinition: "",
            ikhfaExamples: "",
            iqlabLetter: "",
            maddDifference: "",
            maddTabiiHarakat: "",
            maddMufassilHarakat: "",
            maddMuttasilHarakat: "",
            maddLazimHarakat: "",
            wudouObligations: "",
            wudouSunnaFard: "",
            wudouDoubt: "",
            permanentExcuse: "",
            tajwidRule1: "",
            tajwidTechnique1: "",
            tajwidNoun1: "",
            ghunnaWords: [],
            lettresConnues: [],
            syllabesSimples: {
              ba: "",
              ja: "",
              rou: "",
              sa: "",
              khi: ""
            },
            etapesWudu: [],
            ordreWudu: {
              essuyer: "",
              laverMains: "",
              laverVisage: "",
              laverPieds: "",
              intention: ""
            },
            prieresObligatoires: "",
            associationPrieres: {
              fajr: "",
              dhuhr: "",
              asr: "",
              maghrib: "",
              isha: ""
            }
          });
        setCurrentStep(1);
      } else {
        const error = await res.json();
        setMessage(error.error || "Erreur lors de la soumission.");
      }
    } catch (err) {
      setMessage("Erreur lors de la soumission.");
    }
    setLoading(false);
  };

  // Gestion des réponses ghunna
  const handleGhunnaChange = (word: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      ghunnaWords: checked 
        ? [...prev.ghunnaWords, word]
        : prev.ghunnaWords.filter(w => w !== word)
    }));
  };

  // Gestion des réponses Fiqh
  const handleAblutionInvalidesChange = (option: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      ablutionInvalides: checked 
        ? [...prev.ablutionInvalides, option]
        : prev.ablutionInvalides.filter(o => o !== option)
    }));
  };

  const handleFardWuduChange = (option: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      fardWudu: checked 
        ? [...prev.fardWudu, option]
        : prev.fardWudu.filter(o => o !== option)
    }));
  };

  const handleConditionsPriereChange = (option: string, checked: boolean) => {
    setAnswers(prev => ({
      ...prev,
      conditionsPriere: checked 
        ? [...prev.conditionsPriere, option]
        : prev.conditionsPriere.filter(o => o !== option)
    }));
  };

  // Navigation entre les étapes
  const nextStep = () => {
    const maxSteps = selected === "avance" ? 4 : 3;
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Rendu du nouveau test niveau 2
  const renderNewLevel2Test = () => {
  return (
      <section className="relative w-full max-w-[1122px] bg-white border border-[#D7E3ED] rounded-[30px] mx-auto px-2 md:px-8 py-4 md:py-8 flex flex-col shadow-sm min-h-[600px]">
        {/* En-tête avec retour et titre */}
        <div className="bg-[#0F3A42] text-white rounded-t-[20px] -mx-2 md:-mx-8 -mt-4 md:-mt-8 px-6 py-4 mb-8">
          <div className="flex items-center gap-4">
                <button
              className="text-white hover:text-gray-300 transition"
              onClick={() => setShowTest(false)}
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
                </button>
            <h2 className="font-grange font-bold text-xl md:text-2xl">
              Test de Niveau 2 - Lecture Arabe & Fiqh
            </h2>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#0F3A42] font-grange font-bold text-sm">
              Étape {currentStep} sur 3
            </span>
            <span className="text-[#8698A7] font-grange font-bold text-sm">
              {currentStep === 1 ? 'Test de Lecture Arabe' : currentStep === 2 ? 'Test de Fiqh' : 'Terminé'}
            </span>
          </div>
          <div className="w-full bg-[#F2F4F6] rounded-full h-2">
            <div 
              className="bg-[#489EAF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Contenu des étapes */}
        {currentStep === 1 && (
          <div className="flex-1">
            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-6 mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Test de Lecture Arabe (avec Tajwid)
              </h3>
              <p className="text-[#8698A7] font-opensans text-sm mb-6">
                Évaluer la fluidité de la lecture et la compréhension des règles du tajwid
              </p>

              <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-4">
                  Partie 1 : Lecture à voix haute <span className="text-[#489EAF]">(10 points)</span>
                </h4>
                <p className="text-[#0F3A42] font-opensans text-sm mb-6">
                  Instruction : Lis les versets suivants à voix haute
                </p>

                {/* Sourate Al-Fâtihah */}
                <div className="mb-8">
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Sourate Al-Fâtihah (1:1-7)
                  </h5>
                  <div className="bg-white border border-[#D7E3ED] rounded-[10px] p-6 text-right leading-10">
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ <span className="text-[#489EAF] text-sm">(1)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ <span className="text-[#489EAF] text-sm">(2)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      الرَّحْمَٰنِ الرَّحِيمِ <span className="text-[#489EAF] text-sm">(3)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      مَالِكِ يَوْمِ الدِّينِ <span className="text-[#489EAF] text-sm">(4)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ <span className="text-[#489EAF] text-sm">(5)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ <span className="text-[#489EAF] text-sm">(6)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl" dir="rtl">
                      صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ <span className="text-[#489EAF] text-sm">(7)</span>
                    </p>
                  </div>
                </div>

                {/* Sourate Al-Ikhlass */}
                <div className="mb-8">
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Sourate Al-Ikhlass
                  </h5>
                  <div className="bg-white border border-[#D7E3ED] rounded-[10px] p-6 text-right leading-10">
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      قُلْ هُوَ اللَّهُ أَحَدٌ <span className="text-[#489EAF] text-sm">(1)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      اللَّهُ الصَّمَدُ <span className="text-[#489EAF] text-sm">(2)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl mb-2" dir="rtl">
                      لَمْ يَلِدْ وَلَمْ يُولَدْ <span className="text-[#489EAF] text-sm">(3)</span>
                    </p>
                    <p className="text-[#0F3A42] text-xl" dir="rtl">
                      وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ <span className="text-[#489EAF] text-sm">(4)</span>
                    </p>
                  </div>
                </div>

                {/* Enregistrement audio */}
                <AudioRecorder
                  onAudioRecorded={(audioFile) => setAnswers(prev => ({
                    ...prev,
                    audioFile: audioFile
                  }))}
                  currentAudio={answers.audioFile}
                  className="mb-6"
                />

                {/* Critères d'évaluation */}
                <div>
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-3">
                    Critères d'évaluation :
                  </h5>
                  <ul className="text-[#0F3A42] font-opensans text-sm space-y-1 list-disc list-inside">
                    <li>Respect des voyelles (harakât) et techniques d'arrêt</li>
                    <li>Maîtrise des prolongations (madd) ou allongement</li>
                    <li>Respect de la ghunna et les règles du noun sâkinah et du tanwine</li>
                  </ul>
                </div>

                {/* Questions sur les règles du Tajwid */}
                <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-6 mt-6">
                  <h4 className="text-[#0F3A42] font-grange font-bold text-xl mb-6">
                    Questions sur les règles du Tajwid <span className="text-[#489EAF]">(10 points)</span>
                  </h4>

                  {/* Question 1 */}
                  <div className="mb-8">
                    <h5 className="text-[#0F3A42] font-grange font-bold text-lg mb-4">
                      Question 1 : Règles du Tajwid
                    </h5>

                    <div className="space-y-6">
                      <div>
                        <p className="text-[#0F3A42] font-opensans text-sm mb-2" dir="rtl">
                          مِنْ شَرِّ الْوَسْوَاسِ ←
                        </p>
                        <label className="block text-[#0F3A42] font-opensans text-sm mb-2">
                          Quelle est la règle utilisée sur le م et la technique d'arrêt ?
                        </label>
                        <textarea
                          className="w-full h-[60px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 py-2 text-sm text-black resize-none"
                          value={answers.tajwidRule1}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            tajwidRule1: e.target.value
                          }))}
                          placeholder="Votre réponse..."
                        />
                      </div>

                      <div>
                        <p className="text-[#0F3A42] font-opensans text-sm mb-2" dir="rtl">
                          فَسَيَكْفِيكَهُمُ اللَّهُ ←
                        </p>
                        <label className="block text-[#0F3A42] font-opensans text-sm mb-2">
                          Quelle est la technique d'arrêt utilisée ?
                        </label>
                        <textarea
                          className="w-full h-[60px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 py-2 text-sm text-black resize-none"
                          value={answers.tajwidTechnique1}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            tajwidTechnique1: e.target.value
                          }))}
                          placeholder="Votre réponse..."
                        />
                      </div>

                      <div>
                        <p className="text-[#0F3A42] font-opensans text-sm mb-2" dir="rtl">
                          قُلْ أَعُوذُ بِرَبِّ النَّاسِ ←
                        </p>
                        <label className="block text-[#0F3A42] font-opensans text-sm mb-2">
                          Quelle est la règle utilisée dans le Noun de النَّاسِ ?
                        </label>
                        <textarea
                          className="w-full h-[60px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 py-2 text-sm text-black resize-none"
                          value={answers.tajwidNoun1}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            tajwidNoun1: e.target.value
                          }))}
                          placeholder="Votre réponse..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div>
                    <h5 className="text-[#0F3A42] font-grange font-bold text-lg mb-4">
                      Question 2 : Coche les mots où il faut appliquer le « ghunna »
                    </h5>

                    <div className="space-y-3">
                      {["تُمَّ", "إِنَّا", "مِنْ شَرِّ", "كِتَابٌ", "التَّمِيمُ الْعَلِيمُ"].map((word, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`ghunna-${index}`}
                            className="w-4 h-4 text-[#489EAF] bg-[#F2F4F6] border-[#D7E3ED] rounded focus:ring-[#489EAF]"
                            checked={answers.ghunnaWords.includes(word)}
                            onChange={(e) => handleGhunnaChange(word, e.target.checked)}
                          />
                          <label
                            htmlFor={`ghunna-${index}`}
                            className="text-[#0F3A42] font-opensans text-base cursor-pointer"
                            dir="rtl"
                          >
                            {word}
                          </label>
                        </div>
              ))}
            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex-1">
            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Test de Fiqh (Jurisprudence islamique) <span className="text-[#489EAF]">- 20 points</span>
              </h3>
              <p className="text-[#8698A7] font-opensans text-sm mb-8">
                Test de positionnement niveau 2 en jurisprudence islamique
              </p>

              <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                  Partie 1 : Les ablutions <span className="text-black" dir="rtl">(الوضوء)</span> - 10 points
                </h4>

                {/* Question 1 */}
                <div className="mb-8">
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Question 1 : Coche les conditions qui rendent les ablutions invalides
                  </h5>
                  <div className="space-y-3">
                    {[
                      "Saigner du nez abondamment",
                      "Dormir profondément sans appui",
                      "Manger de la viande du chameau",
                      "Vomir volontairement une grande quantité",
                      "Touche accidentelle entre homme et femme",
                      "Laisser son gaz"
                    ].map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`ablution-${index}`}
                          className="w-4 h-4 text-[#489EAF] bg-[#F2F4F6] border-[#D7E3ED] rounded focus:ring-[#489EAF]"
                          checked={answers.ablutionInvalides.includes(option)}
                          onChange={(e) => handleAblutionInvalidesChange(option, e.target.checked)}
                        />
                        <label
                          htmlFor={`ablution-${index}`}
                          className="text-[#0F3A42] font-opensans text-sm cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="mb-8">
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Question 2 : Explique la différence entre fard et sunnah dans le wudu. Donne un exemple pour chacun.
                  </h5>
                  <textarea
                    className="w-full h-[100px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 py-2 text-sm text-black resize-none"
                    value={answers.fardSunnahDifference}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      fardSunnahDifference: e.target.value
                    }))}
                    placeholder="Votre réponse..."
                  />
                </div>

                {/* Question 3 */}
                <div className="mb-8">
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Question 3 : Coche les fard (obligations) du wudu selon la majorité des savants
                  </h5>
                  <div className="space-y-3">
                    {[
                      "Laver la bouche",
                      "Laver le visage",
                      "Laver les bras jusqu'aux coudes",
                      "Essuyer la tête",
                      "Laver les pieds",
                      "Dire la basmala"
                    ].map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`fard-wudu-${index}`}
                          className="w-4 h-4 text-[#489EAF] bg-[#F2F4F6] border-[#D7E3ED] rounded focus:ring-[#489EAF]"
                          checked={answers.fardWudu.includes(option)}
                          onChange={(e) => handleFardWuduChange(option, e.target.checked)}
                        />
                        <label
                          htmlFor={`fard-wudu-${index}`}
                          className="text-[#0F3A42] font-opensans text-sm cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question 4 */}
                <div className="mb-8">
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Question 4 : Quelles sont les conditions <span className="text-black" dir="rtl">(شروط)</span> de validité de la prière ? (10 points)
                  </h5>
                  <div className="space-y-3">
                    {[
                      "Être majeur",
                      "Avoir les ablutions",
                      "Se couvrir les parties intimes",
                      "Se tourner vers la qibla",
                      "Commencer par le takbir",
                      "Payer la zakat"
                    ].map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`conditions-priere-${index}`}
                          className="w-4 h-4 text-[#489EAF] bg-[#F2F4F6] border-[#D7E3ED] rounded focus:ring-[#489EAF]"
                          checked={answers.conditionsPriere.includes(option)}
                          onChange={(e) => handleConditionsPriereChange(option, e.target.checked)}
                        />
                        <label
                          htmlFor={`conditions-priere-${index}`}
                          className="text-[#0F3A42] font-opensans text-sm cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question 5 */}
                <div className="mb-8">
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Question 5 : En cas d'oubli d'un pilier de la prière (ex : le ruku'), que doit faire le fidèle ?
                  </h5>
                  <div className="space-y-3">
                    {[
                      "Continuer la prière",
                      "Ajouter une prosternation de l'oubli à la fin",
                      "Revenir immédiatement à l'étape oubliée",
                      "Refaire toute la prière"
                    ].map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="radio"
                          id={`oubli-pilier-${index}`}
                          name="oubli-pilier"
                          className="w-4 h-4 text-[#489EAF] bg-[#F2F4F6] border-[#D7E3ED] focus:ring-[#489EAF]"
                          checked={answers.oubliPilier === option}
                          onChange={() => setAnswers(prev => ({
                            ...prev,
                            oubliPilier: option
                          }))}
                        />
                        <label
                          htmlFor={`oubli-pilier-${index}`}
                          className="text-[#0F3A42] font-opensans text-sm cursor-pointer"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question 6 */}
                <div className="mb-8">
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Question 6 : Quelle est la différence entre un pilier <span className="text-black" dir="rtl">(ركن)</span> et une sunna <span className="text-black" dir="rtl">(سنة)</span> de la prière ? Donne un exemple de chaque.
                  </h5>
                  <textarea
                    className="w-full h-[100px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 py-2 text-sm text-black resize-none"
                    value={answers.pilierSunnaDifference}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      pilierSunnaDifference: e.target.value
                    }))}
                    placeholder="Votre réponse..."
                  />
                </div>

                {/* Question 7 */}
                <div>
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-4">
                    Question 7 : Quelles sont les prières surérogatoires (nawafil) associées aux 5 prières obligatoires ? Donnes-en 2.
                  </h5>
                  <textarea
                    className="w-full h-[100px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 py-2 text-sm text-black resize-none"
                    value={answers.prieresSupererogatoires}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      prieresSupererogatoires: e.target.value
                    }))}
                    placeholder="Votre réponse..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex-1 flex flex-col">
            <div className="flex flex-row items-center justify-center gap-6 mb-8">
              <h3 className="text-[#489EAF] font-grange font-bold text-2xl">
                Test Terminé !
              </h3>
              <p className="text-[#0F3A42] font-opensans text-sm leading-6 flex-1 max-w-lg">
                Merci d'avoir passé le test de niveau intermédiaire de l'Institut Al Hira.
                Nous analyserons vos réponses et vous contacterons sous peu avec vos résultats détaillés.
              </p>
            </div>

            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-8 max-w-2xl mx-auto w-full">
              <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                Vos informations de contact
              </h4>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                      Adresse mail
                    </label>
                    <input
                      type="email"
                      className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                      value={adresseMail}
                      onChange={(e) => setAdresseMail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Localité
                  </label>
                  <input
                    type="text"
                    className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                    value={localite}
                    onChange={(e) => setLocalite(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Objectifs d'apprentissage (optionnel)
                  </label>
                  <textarea
                    className="w-full h-[120px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                    value={objectifsApprentissage}
                    onChange={(e) => setObjectifsApprentissage(e.target.value)}
                    placeholder="Décrivez vos objectifs d'apprentissage..."
                  />
                </div>

                <div className="bg-[#E8F4F8] border border-[#B8D4E3] rounded-[10px] p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="text-[#489EAF] text-lg mt-0.5">🔒</div>
                    <div>
                      <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-1">
                        Confidentialité
                      </p>
                      <p className="text-[#0F3A42] font-opensans text-xs leading-5">
                        Vos informations personnelles seront utilisées uniquement pour vous contacter concernant vos résultats et nos programmes. Nous ne les partagerons jamais avec des tiers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {currentStep > 1 && (
            <button
              className="bg-[#8698A7] hover:bg-[#6b7a87] text-white font-grange font-bold px-6 py-3 rounded-[15px] transition"
              onClick={prevStep}
            >
              Précédent
            </button>
          )}
          {currentStep < 3 ? (
            <button
              className="bg-[#489EAF] hover:bg-[#357e8e] text-white font-grange font-bold px-8 py-3 rounded-[15px] transition ml-auto flex items-center gap-2"
              onClick={nextStep}
            >
              Suivant
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#489EAF] hover:bg-[#357e8e] text-white font-grange font-bold px-8 py-3 rounded-[15px] transition ml-auto flex items-center gap-2"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Envoi en cours..." : "Terminer"}
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            </button>
          )}
        </div>

        {message && (
          <div className="text-center text-red-500 mt-4 font-opensans text-sm">
            {message}
          </div>
        )}
      </section>
    );
  };

  // Rendu du nouveau test niveau 3
  const renderNewLevel3Test = () => {
    return (
          <section className="relative w-full max-w-[1122px] bg-white border border-[#D7E3ED] rounded-[30px] mx-auto px-2 md:px-8 py-4 md:py-8 flex flex-col shadow-sm min-h-[600px]">
        {/* En-tête avec retour et titre */}
        <div className="bg-[#0F3A42] text-white rounded-t-[20px] -mx-2 md:-mx-8 -mt-4 md:-mt-8 px-6 py-4 mb-8">
          <div className="flex items-center gap-4">
              <button
              className="text-white hover:text-gray-300 transition"
                onClick={() => setShowTest(false)}
              >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
              </button>
            <h2 className="font-grange font-bold text-xl md:text-2xl">
              Test de Niveau 3 - Lecture du Coran et Tajwid Avancé
            </h2>
            </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#0F3A42] font-grange font-bold text-sm">
              Étape {currentStep} sur 4
                </span>
            <span className="text-[#8698A7] font-grange font-bold text-sm">
              {currentStep === 1 ? 'Lecture du Coran' : currentStep === 2 ? 'Règles du Tajwid' : currentStep === 3 ? 'Fiqh' : 'Terminé'}
            </span>
          </div>
          <div className="w-full bg-[#F2F4F6] rounded-full h-2">
            <div 
              className="bg-[#489EAF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Contenu des étapes */}
        {currentStep === 1 && (
          <div className="flex-1">
            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-6 mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Partie 1 : Lecture à haute voix
              </h3>
              <p className="text-[#8698A7] font-opensans text-sm mb-6">
                Objectif : Évaluer la fluidité, la précision, et la maîtrise avancée des règles de tajwid
              </p>

              <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-6">
                  Consigne : Lire un passage du Coran
                </p>

                {/* Question 1 - Récitation de la Sourate */}
                <div className="mb-8">
                  <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-4">
                    Question 1 : Récitation du Coran <span className="text-[#489EAF]">(5 points)</span>
                  </h4>
                  
                  {/* Titre Sourate */}
                  <div className="bg-[#E8F0F2] border border-[#C5D7DC] rounded-[10px] p-3 text-center mb-6">
                    <p className="text-[#489EAF] font-opensans font-bold text-base" dir="rtl">
                      سورة مريم - الآيات ٥٨ إلى ٦٥
                    </p>
                  </div>

                  {/* Sourate Maryam - Versets */}
                  <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[10px] p-6 text-right leading-relaxed mb-6">
                    <p className="text-[#0F3A42] text-lg mb-4" dir="rtl">
                      إِلَّا مَن تَابَ وَآمَنَ وَعَمِلَ صَالِحًا فَأُولَٰئِكَ يَدْخُلُونَ الْجَنَّةَ وَلَا يُظْلَمُونَ شَيْئًا <span className="text-[#489EAF] text-sm">(٥٩)</span>
                    </p>
                    <p className="text-[#0F3A42] text-lg mb-4" dir="rtl">
                      جَنَّاتِ عَدْنٍ الَّتِي وَعَدَ الرَّحْمَٰنُ عِبَادَهُ بِالْغَيْبِ ۚ إِنَّهُ كَانَ وَعْدُهُ مَأْتِيًّا <span className="text-[#489EAF] text-sm">(٦٠)</span>
                    </p>
                    <p className="text-[#0F3A42] text-lg mb-4" dir="rtl">
                      لَّا يَسْمَعُونَ فِيهَا لَغْوًا إِلَّا سَلَامًا ۖ وَلَهُمْ رِزْقُهُمْ فِيهَا بُكْرَةً وَعَشِيًّا <span className="text-[#489EAF] text-sm">(٦١)</span>
                    </p>
                    <p className="text-[#0F3A42] text-lg mb-4" dir="rtl">
                      تِلْكَ الْجَنَّةُ الَّتِي نُورِثُ مِنْ عِبَادِنَا مَن كَانَ تَقِيًّا <span className="text-[#489EAF] text-sm">(٦٢)</span>
                    </p>
                    <p className="text-[#0F3A42] text-lg mb-4" dir="rtl">
                      وَمَا نَتَنَزَّلُ إِلَّا بِأَمْرِ رَبِّكَ ۖ لَهُ مَا بَيْنَ أَيْدِينَا وَمَا خَلْفَنَا وَمَا بَيْنَ ذَٰلِكَ ۚ وَمَا كَانَ رَبُّكَ نَسِيًّا <span className="text-[#489EAF] text-sm">(٦٣)</span>
                    </p>
                    <p className="text-[#0F3A42] text-lg" dir="rtl">
                      رَّبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا فَاعْبُدْهُ وَاصْطَبِرْ لِعِبَادَتِهِ ۚ هَلْ تَعْلَمُ لَهُ سَمِيًّا <span className="text-[#489EAF] text-sm">(٦٤)</span>
                    </p>
                  </div>

                  {/* Enregistrement audio pour la récitation */}
                  <AudioRecorder
                    onAudioRecorded={(audioFile) => setAnswers(prev => ({
                      ...prev,
                      audioFile: audioFile
                    }))}
                    currentAudio={answers.audioFile}
                    className="mb-6"
                  />

                  {/* Critères d'évaluation */}
                  <div className="bg-[#F0F7F8] border border-[#C5D7DC] rounded-[10px] p-4">
                    <h5 className="text-[#0F3A42] font-opensans font-bold text-sm mb-3">
                      Critères d'évaluation de la lecture du Coran :
                    </h5>
                    <ul className="text-[#0F3A42] font-opensans text-sm space-y-1 list-disc list-inside">
                      <li>Justesse de la prononciation (makhârij, sifât)</li>
                      <li>Respect des règles de tajwid (ghunna, idghâm, iqlâb, qalqala, etc.)</li>
                      <li>Fluidité et rythme de lecture</li>
                    </ul>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="mb-6">
                  <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                    2. Combien de types d'idghâm existe-t-il ? Nomme-les et donne un exemple pour chacun.
                  </p>
                  <textarea
                    className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                    value={answers.idghamTypes}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      idghamTypes: e.target.value
                    }))}
                    placeholder="Votre réponse..."
                  />
                </div>

                {/* Question 3 */}
                <div className="mb-8">
                  <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                    3. Donne un exemple de idghâm mutamâthilayn et explique sa règle.
                  </p>
                  <textarea
                    className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                    value={answers.idghamMutamatil}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      idghamMutamatil: e.target.value
                    }))}
                    placeholder="Votre réponse..."
                  />
                </div>

                {/* Critères d'évaluation */}
                <div className="bg-[#F0F7F8] border border-[#C5D7DC] rounded-[10px] p-4">
                  <h5 className="text-[#0F3A42] font-opensans font-bold text-sm mb-3">
                    Critères d'évaluation de la lecture du Coran :
                  </h5>
                  <ul className="text-[#0F3A42] font-opensans text-sm space-y-1 list-disc list-inside">
                    <li>Justesse de la prononciation (makhârij, sifât)</li>
                    <li>Respect des règles de tajwid (ghunna, idghâm, iqlâb, qalqala, etc.)</li>
                    <li>Fluidité et rythme de lecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex-1">
            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-6 mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Partie 2 : Règles du Tajwid - <span className="text-[#489EAF]">20 points</span>
              </h3>
              <p className="text-[#8698A7] font-opensans text-sm mb-8">
                Test de positionnement niveau 2 en jurisprudence islamique
              </p>

              <div className="space-y-8">
                {/* Section Assimilation */}
                <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                  <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                    Assimilation <span className="text-black" dir="rtl">(الإدغام)</span>
                  </h4>

                  {/* Question 1 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      1. Combien de types d'idghâm existe-t-il ? Nomme-les et donne un exemple pour chacun.
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.idghamTypes}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        idghamTypes: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 2 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      2. Quelle est la différence entre idghâm avec ghunna et idghâm sans ghunna ?
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.idghamDifference}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        idghamDifference: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 3 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      3. Donne un exemple de idghâm mutamâthilayn et explique sa règle.
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.idghamMutamatil}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        idghamMutamatil: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>
                </div>

                {/* Section Clarification */}
                <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                  <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                    Clarification <span className="text-black" dir="rtl">(الإظهار)</span>
                  </h4>

                  {/* Question 4 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      4. Quelle est la différence entre idghâm avec ghunna et idghâm sans ghunna ?
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.idghamDifference}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        idghamDifference: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 5 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      5. Quelles sont les lettres de la clarification ?
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.idhharLetters}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        idhharLetters: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 6 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      6. Donne des exemples de idhhâr dans le Coran.
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.idhharExamples}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        idhharExamples: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 7 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      7. Quelle est la règle de tajwid dans le mot <span dir="rtl" className="text-lg">مَن آمَنَ</span> ? Explique-la.
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.manAmanaRule}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        manAmanaRule: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>
                </div>

                {/* Section Dissimilation */}
                <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                  <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                    Dissimilation <span className="text-black" dir="rtl">(الإخفاء)</span>
                  </h4>

                  {/* Question 8 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      8. Qu'est-ce que l'ikhfâ' ? Citez ses lettres.
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.ikhfaDefinition}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        ikhfaDefinition: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 9 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      9. Donne deux exemples de ikhfâ' avec ghunna.
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.ikhfaExamples}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        ikhfaExamples: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 10 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      10. Quelle est la lettre qui provoque l'iqlâb ? Et quelle lettre est transformée ?
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.iqlabLetter}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        iqlabLetter: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>
                </div>

                {/* Section Les allongements */}
                <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                  <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                    Les allongements <span className="text-black" dir="rtl">(المدود)</span>
                  </h4>

                  {/* Question 11 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      11. Quelle est la différence entre madd tabi'î et madd lâzim ?
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.maddDifference}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        maddDifference: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 12 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      12. Combien de harakât pour chaque type de madd :
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                          Madd tabi'î:
                        </label>
                        <input
                          type="text"
                          className="w-full h-[40px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                          value={answers.maddTabiiHarakat}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            maddTabiiHarakat: e.target.value
                          }))}
                          placeholder="Nombre de harakât"
                        />
                      </div>

                      <div>
                        <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                          Madd mufassil:
                        </label>
                        <input
                          type="text"
                          className="w-full h-[40px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                          value={answers.maddMufassilHarakat}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            maddMufassilHarakat: e.target.value
                          }))}
                          placeholder="Nombre de harakât"
                        />
                      </div>

                      <div>
                        <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                          Madd muttasil:
                        </label>
                        <input
                          type="text"
                          className="w-full h-[40px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                          value={answers.maddMuttasilHarakat}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            maddMuttasilHarakat: e.target.value
                          }))}
                          placeholder="Nombre de harakât"
                        />
                      </div>

                      <div>
                        <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                          Madd lâzim:
                        </label>
                        <input
                          type="text"
                          className="w-full h-[40px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                          value={answers.maddLazimHarakat}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            maddLazimHarakat: e.target.value
                          }))}
                          placeholder="Nombre de harakât"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex-1">
            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-6 mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Partie 3 : Fiqh - <span className="text-[#489EAF]">20 points</span>
              </h3>
              <p className="text-[#8698A7] font-opensans text-sm mb-8">
                Test de positionnement niveau 2 en jurisprudence islamique
              </p>

              <div className="space-y-8">
                {/* Section Ablution */}
                <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                  <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                    Ablution <span className="text-black" dir="rtl">(الوضوء)</span>
                  </h4>

                  {/* Question 1 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      1. Quelles sont les obligations (farâ'id) du woudou' selon les quatre écoles ?
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.wudouObligations}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        wudouObligations: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                  </div>

                  {/* Question 2 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      2. Quelle est la différence entre sunna et farḍ dans le woudou' ? Donne 2 exemples pour chaque.
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.wudouSunnaFard}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        wudouSunnaFard: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                </div>

                  {/* Question 3 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      3. Quel est le jugement du doute dans l'ablution (par exemple : ai-je rompu mes ablutions ou pas ?) ?
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.wudouDoubt}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        wudouDoubt: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
              </div>

                  {/* Question 4 */}
                  <div className="mb-6">
                    <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-4">
                      4. Que doit faire une personne qui a une excuse permanente (comme l'incontinence ou les gaz continus) ?
                    </p>
                    <textarea
                      className="w-full h-[80px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                      value={answers.permanentExcuse}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        permanentExcuse: e.target.value
                      }))}
                      placeholder="Votre réponse..."
                    />
                </div>
                </div>


              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex-1 flex flex-col">
            <div className="flex flex-row items-center justify-center gap-6 mb-8">
              <h3 className="text-[#489EAF] font-grange font-bold text-2xl">
                Test Terminé !
              </h3>
              <p className="text-[#0F3A42] font-opensans text-sm leading-6 flex-1 max-w-lg">
                Merci d'avoir passé le test de niveau avancé de l'Institut Al Hira.
                Nous analyserons vos réponses et vous contacterons sous peu avec vos résultats détaillés.
              </p>
            </div>

            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-8 max-w-2xl mx-auto w-full">
              <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                Vos informations de contact
              </h4>

              <div className="grid grid-cols-1 gap-6">
                  <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Nom
                    </label>
                    <input
                      type="text"
                    className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    required
                    />
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                      Adresse mail
                    </label>
                    <input
                      type="email"
                      className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                      value={adresseMail}
                      onChange={(e) => setAdresseMail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Localité
                    </label>
                    <input
                      type="text"
                    className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                    value={localite}
                    onChange={(e) => setLocalite(e.target.value)}
                    required
                    />
                  </div>

                  <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Objectifs d'apprentissage (optionnel)
                    </label>
                  <textarea
                    className="w-full h-[120px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                    value={objectifsApprentissage}
                    onChange={(e) => setObjectifsApprentissage(e.target.value)}
                    placeholder="Décrivez vos objectifs d'apprentissage..."
                  />
                </div>

                <div className="bg-[#E8F4F8] border border-[#B8D4E3] rounded-[10px] p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="text-[#489EAF] text-lg mt-0.5">🔒</div>
                    <div>
                      <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-1">
                        Confidentialité
                      </p>
                      <p className="text-[#0F3A42] font-opensans text-xs leading-5">
                        Vos informations personnelles seront utilisées uniquement pour vous contacter concernant vos résultats et nos programmes. Nous ne les partagerons jamais avec des tiers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {currentStep > 1 && (
            <button
              className="bg-[#8698A7] hover:bg-[#6b7a87] text-white font-grange font-bold px-6 py-3 rounded-[15px] transition"
              onClick={prevStep}
            >
              Précédent
            </button>
          )}
          {currentStep < 4 ? (
            <button
              className="bg-[#489EAF] hover:bg-[#357e8e] text-white font-grange font-bold px-8 py-3 rounded-[15px] transition ml-auto flex items-center gap-2"
              onClick={nextStep}
            >
              Suivant
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#489EAF] hover:bg-[#357e8e] text-white font-grange font-bold px-8 py-3 rounded-[15px] transition ml-auto flex items-center gap-2"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Envoi en cours..." : "Terminer"}
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            </button>
          )}
        </div>

        {message && (
          <div className="text-center text-red-500 mt-4 font-opensans text-sm">
            {message}
          </div>
        )}
      </section>
    );
  };

  // Fonction de rendu pour le test niveau 1 (débutant)
  const renderNewLevel1Test = () => {
    // Lettres arabes du test
    const lettresArabes = ["ر", "ذ", "د", "خ", "ح", "ج", "ث", "ت", "ب", "ا", "ك", "ق", "ف", "غ", "ع", "ظ", "ط", "ض", "ص", "ش", "س", "ز", "ي", "و", "ه", "م", "ن", "ل"];

    // Options pour les étapes du wudu
    const etapesWuduOptions = [
      "Se laver les pieds",
      "Essuyer la tête et les oreilles", 
      "Se rincer la bouche",
      "Se laver le visage",
      "Se laver les mains jusqu'aux coudes",
      "la continuité dans le lavage",
      "L'ordre à respecter entre les différentes parties du corps"
    ];

    const handleLevel1ArrayChange = (field: string, value: string, checked: boolean) => {
      setAnswers(prev => ({
        ...prev,
        [field]: checked 
          ? [...(prev[field as keyof typeof prev] as string[]), value]
          : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
      }));
    };

    const handleLevel1NestedChange = (parent: string, field: string, value: string) => {
      setAnswers(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [field]: value
        }
      }));
    };

    const handleLevel1InputChange = (field: string, value: string) => {
      setAnswers(prev => ({
        ...prev,
        [field]: value
      }));
    };

    return (
      <section className="relative w-full max-w-[1122px] bg-white border border-[#D7E3ED] rounded-[30px] mx-auto px-2 md:px-8 py-4 md:py-8 flex flex-col shadow-sm min-h-[600px]">
        {/* En-tête avec retour et titre */}
        <div className="bg-[#0F3A42] text-white rounded-t-[20px] -mx-2 md:-mx-8 -mt-4 md:-mt-8 px-6 py-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              className="text-white hover:text-gray-300 transition"
              onClick={() => setShowTest(false)}
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <h2 className="font-grange font-bold text-xl md:text-2xl">
              Test de Niveau 1 - Lecture Arabe & Fiqh
            </h2>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#0F3A42] font-grange font-bold text-sm">
              Étape {currentStep} sur 3
            </span>
            <span className="text-[#8698A7] font-grange font-bold text-sm">
              {currentStep === 1 ? 'Test de Lecture Arabe' : currentStep === 2 ? 'Test de Fiqh' : 'Informations personnelles'}
            </span>
          </div>
          <div className="w-full bg-[#F2F4F6] rounded-full h-2">
            <div 
              className="bg-[#489EAF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Contenu des étapes */}
        {currentStep === 1 && (
          <div className="flex-1">
            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-6 mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Test de Lecture Arabe - Niveau Débutant
              </h3>
              <p className="text-[#8698A7] font-opensans text-sm mb-6">
                Test de Lecture des prés-requis en arabe (Lecture syllabique et lettres)
              </p>

              <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-4">
                  Partie 1 : Reconnaissance des lettres isolées <span className="text-[#489EAF]">(5 points)</span>
                </h4>
                <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-6">
                  Lis à haute voix ces lettres : /5pts
                </p>

                {/* Lettres arabes à lire */}
                <div className="bg-white border border-[#D7E3ED] rounded-[10px] p-6 text-center mb-6">
                  <div className="text-3xl leading-relaxed space-x-2 rtl mb-4 text-[#0F3A42]" style={{ fontFamily: 'Arial, sans-serif' }}>
                    ر - ذ - د - خ - ح - ج - ث - ت - ب - ا
                  </div>
                  <div className="text-3xl leading-relaxed space-x-2 rtl mb-4 text-[#0F3A42]" style={{ fontFamily: 'Arial, sans-serif' }}>
                    ك - ق - ف - غ - ع - ظ - ط - ض - ص - ش - س - ز
                  </div>
                  <div className="text-3xl leading-relaxed space-x-2 rtl text-[#0F3A42]" style={{ fontFamily: 'Arial, sans-serif' }}>
                    ل - م - ن - م - ه - و - ي
                  </div>
                </div>

                {/* Enregistrement audio */}
                <AudioRecorder
                  onAudioRecorded={(audioFile) => setAnswers(prev => ({
                    ...prev,
                    audioFile: audioFile
                  }))}
                  currentAudio={answers.audioFile}
                  className="mb-8"
                />

                {/* Question 1 */}
                <div className="mb-6">
                  <label className="block text-[#0F3A42] font-grange font-bold text-base mb-3">
                    Question 1 : Coche les lettres que tu connais. /5pts
                  </label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                    {lettresArabes.map((lettre, index) => (
                      <label key={index} className="flex items-center justify-center space-x-2 bg-white rounded-lg p-3 border border-[#D7E3ED] hover:border-[#489EAF] cursor-pointer min-h-[60px]">
                        <input
                          type="checkbox"
                          checked={answers.lettresConnues.includes(lettre)}
                          onChange={(e) => handleLevel1ArrayChange('lettresConnues', lettre, e.target.checked)}
                          className="form-checkbox text-[#489EAF]"
                        />
                        <span className="text-2xl text-[#0F3A42]" style={{ fontFamily: 'Arial, sans-serif' }}>{lettre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Partie 2 */}
                <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-4 mt-8">
                  Partie 2 : Reconnaissance des lettres avec voyelles courtes (fatha) <span className="text-[#489EAF]">(5 points)</span>
                </h4>
                <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-6">
                  Lis ces syllabes simples : /5pts
                </p>

                {/* Syllabes à lire */}
                <div className="bg-white border border-[#D7E3ED] rounded-[10px] p-6 text-center mb-6">
                  <div className="text-3xl leading-relaxed space-x-4 rtl mb-4 text-[#0F3A42]" style={{ fontFamily: 'Arial, sans-serif' }}>
                    بَ — دَ — نَ — ثَ — يَ
                  </div>
                  <div className="text-3xl leading-relaxed space-x-4 rtl text-[#0F3A42]" style={{ fontFamily: 'Arial, sans-serif' }}>
                    أَ — سَ — زَ — غَ — جَ
                  </div>
                </div>

                {/* Question 2 */}
                <div className="mb-6">
                  <label className="block text-[#0F3A42] font-grange font-bold text-base mb-3">
                    Question 2 : Écris le son de chaque syllabe : /5pts (0.5/par réponse juste)
                  </label>
                  
                  {[
                    { arabe: "بَ", son: "ba" },
                    { arabe: "جَ", son: "ja" }, 
                    { arabe: "رُ", son: "rou" },
                    { arabe: "سَ", son: "sa" },
                    { arabe: "خِ", son: "khi" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white rounded-lg p-4 border border-[#D7E3ED] mb-3">
                      <span className="text-2xl font-bold w-12 text-center text-[#0F3A42]" style={{ fontFamily: 'Arial, sans-serif' }}>{item.arabe}</span>
                      <span className="text-lg">→</span>
                      <input
                        type="text"
                        placeholder="Écris le son"
                        value={answers.syllabesSimples[item.son as keyof typeof answers.syllabesSimples]}
                        onChange={(e) => handleLevel1NestedChange('syllabesSimples', item.son, e.target.value)}
                        className="flex-1 h-[40px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 text-sm text-black"
                      />
                    </div>
                  ))}
                </div>

                {/* Critères d'évaluation */}
                  <div>
                  <h5 className="text-[#0F3A42] font-grange font-bold text-base mb-3">
                    Critères d'évaluation :
                  </h5>
                  <ul className="text-[#0F3A42] font-opensans text-sm space-y-1 list-disc list-inside">
                    <li>Reconnaissance correcte des lettres isolées</li>
                    <li>Prononciation des syllabes avec voyelles courtes</li>
                    <li>Fluidité de lecture pour le niveau débutant</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex-1">
            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-6 mb-6">
              <h3 className="text-[#0F3A42] font-grange font-bold text-xl mb-2">
                Test de Fiqh - Niveau 1
              </h3>
              <p className="text-[#8698A7] font-opensans text-sm mb-6">
                Connaissances de base sur les ablutions et la prière
              </p>

              <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[15px] p-6">
                {/* Partie 1: Les ablutions */}
                <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-4">
                  Partie 1 : Les ablutions (الوضوء) <span className="text-[#489EAF]">(20 points)</span>
                </h4>
                
                {/* Question 1 */}
                <div className="mb-8">
                  <label className="block text-[#0F3A42] font-grange font-bold text-base mb-3">
                    Question 1 : Coche les éléments qui font partie des étapes obligatoires du wudu (6pts)
                    </label>
                  <p className="text-[#8698A7] font-opensans text-sm mb-4">(6 bonnes réponses)</p>
                  <div className="space-y-3">
                    {etapesWuduOptions.map((etape, index) => (
                      <label key={index} className="flex items-center space-x-3 bg-white rounded-lg p-3 border border-[#D7E3ED] hover:border-[#489EAF] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={answers.etapesWudu.includes(etape)}
                          onChange={(e) => handleLevel1ArrayChange('etapesWudu', etape, e.target.checked)}
                          className="form-checkbox text-[#489EAF]"
                        />
                        <span className="text-[#0F3A42] font-opensans text-sm">{etape}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="mb-8">
                  <label className="block text-[#0F3A42] font-grange font-bold text-base mb-3">
                    Question 2 : Classe les étapes dans l'ordre (numérotez de 1 à 5) : /5pts
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: "intention", label: "Intention du wudu" },
                      { key: "essuyer", label: "Essuyer la tête" },
                      { key: "laverMains", label: "Laver les mains jusqu'aux coudes" },
                      { key: "laverVisage", label: "Laver le visage" },
                      { key: "laverPieds", label: "Laver les pieds" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 bg-white rounded-lg p-4 border border-[#D7E3ED]">
                        <input
                          type="number"
                          min="1"
                          max="5"
                          placeholder="№"
                          value={answers.ordreWudu[item.key as keyof typeof answers.ordreWudu]}
                          onChange={(e) => handleLevel1NestedChange('ordreWudu', item.key, e.target.value)}
                          className="w-16 h-[40px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 text-sm text-black text-center"
                        />
                        <span className="flex-1 text-[#0F3A42] font-opensans text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partie 2: La prière */}
                <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-4 mt-8">
                  Partie 2 : La prière (الصلاة)
                </h4>
                
                {/* Question 3 */}
                <div className="mb-8">
                  <label className="block text-[#0F3A42] font-grange font-bold text-base mb-3">
                    Question 3 : Combien de prières obligatoires y a-t-il chaque jour ? /4pts
                  </label>
                  <div className="space-y-3">
                    {["3", "4", "5"].map((nombre) => (
                      <label key={nombre} className="flex items-center space-x-3 bg-white rounded-lg p-3 border border-[#D7E3ED] hover:border-[#489EAF] cursor-pointer">
                        <input
                          type="radio"
                          name="prieresObligatoires"
                          value={nombre}
                          checked={answers.prieresObligatoires === nombre}
                          onChange={(e) => handleLevel1InputChange('prieresObligatoires', e.target.value)}
                          className="form-radio text-[#489EAF]"
                        />
                        <span className="text-[#0F3A42] font-opensans text-sm">{nombre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 4 */}
                <div className="mb-6">
                  <label className="block text-[#0F3A42] font-grange font-bold text-base mb-3">
                    Question 4 : Associe chaque prière à son moment : /5pts
                  </label>
                  <div className="space-y-4">
                    {[
                      { key: "fajr", nom: "Fajr" },
                      { key: "dhuhr", nom: "Dhuhr" },
                      { key: "asr", nom: "Asr" },
                      { key: "maghrib", nom: "Maghrib" },
                      { key: "isha", nom: "Isha" }
                    ].map((priere, index) => (
                      <div key={index} className="flex items-center gap-4 bg-white rounded-lg p-4 border border-[#D7E3ED]">
                        <span className="w-20 font-grange font-bold text-[#489EAF] text-sm">{priere.nom}</span>
                        <select
                          value={answers.associationPrieres[priere.key as keyof typeof answers.associationPrieres]}
                          onChange={(e) => handleLevel1NestedChange('associationPrieres', priere.key, e.target.value)}
                          className="flex-1 h-[40px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-3 text-sm text-black"
                        >
                          <option value="">Sélectionner le moment</option>
                          <option value="Après le coucher du soleil">Après le coucher du soleil</option>
                          <option value="Après midi">Après midi</option>
                          <option value="Avant le lever du soleil">Avant le lever du soleil</option>
                          <option value="Après le crépuscule">Après le crépuscule</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex-1">
            <div className="flex items-center justify-center gap-8 mb-8">
              <h3 className="text-[#489EAF] font-grange font-bold text-2xl">
                Test Terminé !
              </h3>
              <p className="text-[#0F3A42] font-opensans text-sm leading-6 max-w-lg">
                Merci d'avoir passé le test de niveau débutant de l'Institut Al Hira.
                Nous analyserons vos réponses et vous contacterons sous peu avec vos résultats détaillés.
              </p>
                    </div>

            <div className="bg-white border border-[#D7E3ED] rounded-[20px] p-8 max-w-2xl mx-auto w-full">
              <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-6">
                Vos informations de contact
              </h4>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                      Adresse mail
                    </label>
                    <input
                      type="email"
                      className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                      value={adresseMail}
                      onChange={(e) => setAdresseMail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Localité
                  </label>
                  <input
                    type="text"
                    className="w-full h-[48px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 text-sm text-black"
                    value={localite}
                    onChange={(e) => setLocalite(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#0F3A42] font-opensans font-bold text-sm mb-2">
                    Objectifs d'apprentissage (optionnel)
                  </label>
                  <textarea
                    className="w-full h-[120px] bg-[#F2F4F6] border border-[#D7E3ED] rounded-[10px] px-4 py-3 text-sm text-black resize-none"
                    value={objectifsApprentissage}
                    onChange={(e) => setObjectifsApprentissage(e.target.value)}
                    placeholder="Décrivez vos objectifs d'apprentissage..."
                  />
                </div>

                <div className="bg-[#E8F4F8] border border-[#B8D4E3] rounded-[10px] p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="text-[#489EAF] text-lg mt-0.5">🔒</div>
                    <div>
                      <p className="text-[#0F3A42] font-opensans font-bold text-sm mb-1">
                        Confidentialité
                      </p>
                      <p className="text-[#0F3A42] font-opensans text-xs leading-5">
                        Vos informations personnelles seront utilisées uniquement pour vous contacter concernant vos résultats et nos programmes. Nous ne les partagerons jamais avec des tiers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {currentStep > 1 && (
                  <button
              className="bg-[#8698A7] hover:bg-[#6b7a87] text-white font-grange font-bold px-6 py-3 rounded-[15px] transition"
              onClick={prevStep}
            >
              Précédent
            </button>
          )}
          {currentStep < 3 ? (
            <button
              className="bg-[#489EAF] hover:bg-[#357e8e] text-white font-grange font-bold px-8 py-3 rounded-[15px] transition ml-auto flex items-center gap-2"
              onClick={nextStep}
            >
              Suivant
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
                  </button>
          ) : (
            <button
              type="submit"
              className="bg-[#489EAF] hover:bg-[#357e8e] text-white font-grange font-bold px-8 py-3 rounded-[15px] transition ml-auto flex items-center gap-2"
              disabled={loading || !nom || !numero || !adresseMail || !localite}
              onClick={handleSubmit}
            >
              {loading ? "Envoi en cours..." : "Terminer"}
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            </button>
          )}
              </div>

        {message && (
          <div className={`text-center mt-4 p-3 rounded-lg font-opensans text-sm ${
            message.includes("bien été soumis") 
              ? "bg-green-100 text-green-700 border border-green-200" 
              : "text-red-500"
          }`}>
            {message}
            </div>
        )}
      </section>
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F2F4F6] flex flex-col items-center pt-8 pb-6 px-2">
        <h1 className="text-[#0F3A42] font-grange text-2xl md:text-4xl lg:text-5xl font-extrabold leading-[30px] text-center mt-20 mb-10">
          Test de niveau
        </h1>
        {!showTest ? (
          <section 
            data-niveaux-section
            className="w-full max-w-4xl bg-white border border-[#D7E3ED] rounded-[30px] mx-auto px-2 md:px-8 py-6 flex flex-col items-center shadow-sm"
          >
            <p className="text-[#8698A7] text-sm md:text-base mb-6 text-center">
              Selectionner votre niveau
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mb-4">
              {niveaux.map((niveau) => (
                <button
                  key={niveau.value}
                  className={`flex items-center justify-center border rounded-[20px] h-[64px] text-base md:text-lg font-grange font-bold transition-all ${
                    niveau.value === "superieur" || niveau.value === "speciales"
                      ? "border-[#D7E3ED] text-[#BBBDC0] bg-[#F8F9FA] cursor-not-allowed opacity-60"
                      : selected === niveau.value
                        ? "border-[#0F3A42] text-[#0F3A42] bg-white shadow-lg ring-2 ring-[#489EAF] ring-opacity-50"
                        : "border-[#D7E3ED] text-[#8698A7] bg-white"
                  }`}
                  onClick={() => {
                    if (niveau.value !== "superieur" && niveau.value !== "speciales") {
                      setSelected(niveau.value);
                    }
                  }}
                  disabled={niveau.value === "superieur" || niveau.value === "speciales"}
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
        ) : selected === "intermediaire" ? (
          renderNewLevel2Test()
        ) : selected === "avance" ? (
          renderNewLevel3Test()
        ) : selected === "debutant" ? (
          renderNewLevel1Test()
        ) : null}
      </main>
    </>
  );
};

export default TestNiveau;