"use client"
import React, { useState, useRef, useCallback } from 'react';

interface AudioRecorderProps {
  onAudioRecorded: (audioFile: File) => void;
  currentAudio: File | null;
  className?: string;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onAudioRecorded, 
  currentAudio, 
  className = "" 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      
      // Demander l'accès au microphone
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;
      
      // Créer le MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      // Événements du MediaRecorder
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([blob], `enregistrement-${Date.now()}.webm`, {
          type: 'audio/webm'
        });
        
        // Créer une URL pour la lecture
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        
        // Notifier le parent
        onAudioRecorded(audioFile);
        
        // Nettoyer le stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
      
      // Démarrer l'enregistrement
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Démarrer le timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (err) {
      console.error('Erreur lors du démarrage de l\'enregistrement:', err);
      setError('Impossible d\'accéder au microphone. Vérifiez vos autorisations.');
    }
  }, [onAudioRecorded]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isRecording]);

  const deleteRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordingTime(0);
    onAudioRecorded(null as any); // Reset l'audio dans le parent
  }, [audioUrl, onAudioRecorded]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Nettoyer les ressources à la destruction du composant
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className={`bg-white border border-[#D7E3ED] rounded-[15px] p-6 ${className}`}>
      <h4 className="text-[#0F3A42] font-grange font-bold text-lg mb-4">
        Enregistrement Audio
      </h4>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-600 font-opensans text-sm">{error}</p>
        </div>
      )}
      
      <div className="space-y-4">
        {!isRecording && !audioUrl && !currentAudio && (
          <button
            onClick={startRecording}
            className="flex items-center justify-center gap-3 w-full bg-[#489EAF] hover:bg-[#3A7A87] text-white font-grange font-bold py-3 px-6 rounded-[10px] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            Commencer l'enregistrement
          </button>
        )}
        
        {isRecording && (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[#0F3A42] font-grange font-bold text-lg">
                Enregistrement en cours...
              </span>
            </div>
            
            <div className="text-[#489EAF] font-opensans text-xl font-bold">
              {formatTime(recordingTime)}
            </div>
            
            <button
              onClick={stopRecording}
              className="bg-red-500 hover:bg-red-600 text-white font-grange font-bold py-3 px-6 rounded-[10px] transition-colors"
            >
              Arrêter l'enregistrement
            </button>
          </div>
        )}
        
        {(audioUrl || currentAudio) && (
          <div className="space-y-4">
            <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-[10px] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#0F3A42] font-grange font-bold">
                  {currentAudio ? currentAudio.name : `Enregistrement (${formatTime(recordingTime)})`}
                </span>
                <button
                  onClick={deleteRecording}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Supprimer l'enregistrement"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {audioUrl && (
                <audio 
                  controls 
                  className="w-full"
                  preload="metadata"
                >
                  <source src={audioUrl} type="audio/webm" />
                  Votre navigateur ne supporte pas l'élément audio.
                </audio>
              )}
            </div>
            
            <button
              onClick={startRecording}
              className="w-full bg-[#8698A7] hover:bg-[#6B7D8A] text-white font-grange font-bold py-2 px-4 rounded-[10px] transition-colors text-sm"
            >
              Enregistrer à nouveau
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-[#E8F4F8] rounded-[10px]">
        <p className="text-[#0F3A42] font-opensans text-xs">
          💡 <strong>Conseil :</strong> Assurez-vous d'être dans un environnement calme pour un enregistrement de qualité.
        </p>
      </div>
    </div>
  );
};

export default AudioRecorder; 