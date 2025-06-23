"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Vérification des identifiants
    if (credentials.username === 'alhira' && credentials.password === 'institutalhira2025') {
      // Stocker la session dans localStorage
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUser', credentials.username);
      
      // Rediriger vers le dashboard
      router.push('/admin-dashboard');
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F2F4F6] flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Card de connexion */}
          <div className="bg-white rounded-[30px] p-8 shadow-[0_4px_24px_0_rgba(16,57,81,0.06)] border border-[#D7E3ED]">
            {/* En-tête */}
            <div className="text-center mb-8">
              <div className="bg-[#0F3A42] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" fill="none" stroke="currentColor" className="text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2a3 3 0 106 0v-2m-6 0V9a3 3 0 116 0v6m-6 0h6m6-6v6a3 3 0 01-3 3H9a3 3 0 01-3-3V9a3 3 0 013-3h6a3 3 0 013 3z" />
                </svg>
              </div>
              <h1 className="text-[#0F3A42] font-grange text-2xl md:text-3xl font-extrabold leading-tight mb-2">
                Connexion Administrateur
              </h1>
              <p className="text-[#8698A7] font-opensans">
                Accédez au tableau de bord administrateur
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Message d'erreur */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-[15px] p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 font-opensans text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Champ nom d'utilisateur */}
              <div>
                <label htmlFor="username" className="block text-[#0F3A42] font-grange font-bold text-sm mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#D7E3ED] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#489EAF] focus:border-transparent font-opensans bg-[#F8FAFB]"
                  placeholder="Entrez votre nom d'utilisateur"
                />
              </div>

              {/* Champ mot de passe */}
              <div>
                <label htmlFor="password" className="block text-[#0F3A42] font-grange font-bold text-sm mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#D7E3ED] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#489EAF] focus:border-transparent font-opensans bg-[#F8FAFB]"
                  placeholder="Entrez votre mot de passe"
                />
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F3A42] hover:bg-[#0d2f36] text-white font-grange font-extrabold py-3 px-6 rounded-[15px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>


          </div>

          {/* Lien retour */}
          <div className="text-center mt-6">
            <a 
              href="/" 
              className="text-[#489EAF] hover:text-[#357e8e] font-opensans text-sm transition-colors"
            >
              ← Retour à l'accueil
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminLogin; 