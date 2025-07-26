import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { UserInput, PerencanaanData } from '../types';
import { generateInitialPlan, generateLearningExperience, generateAssessmentAndMedia } from '../services/geminiService';
import { handleCopy, handleExportHTML } from '../utils/exportHelpers';
import { useAuth } from '../hooks/useAuth';

import PageHeader from '../components/Header';
import InputForm from '../components/InputForm';
import LoadingView from '../components/LoadingView';
import ResultsDisplay from '../components/ResultsDisplay';
import ActionButton from '../components/ActionButton';
import FinalActions from '../components/FinalActions';
import ResultCard from '../components/ResultCard';

enum AppStep {
  FORM,
  GENERATING_STEP_1,
  STEP_1_COMPLETE,
  GENERATING_STEP_2,
  STEP_2_COMPLETE,
  GENERATING_STEP_3,
  COMPLETE,
}

function Generator() {
  const { apiKey } = useAuth();
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.FORM);
  const [perencanaanData, setPerencanaanData] = useState<Partial<PerencanaanData> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setCurrentStep(AppStep.FORM);
    setPerencanaanData(null);
    setError(null);
  }, []);

  const handleGenerateStep1 = useCallback(async (userInput: UserInput) => {
    if (!apiKey) {
      setError("API Key tidak ditemukan. Silakan atur di halaman Pengaturan.");
      return;
    }
    setCurrentStep(AppStep.GENERATING_STEP_1);
    setError(null);

    try {
      const result = await generateInitialPlan(userInput, apiKey);
      const initialData: Partial<PerencanaanData> = {
        ...result,
        identitas: {
          ...result.identitas,
          namaSekolah: userInput.namaSekolah,
          namaGuru: userInput.namaGuru,
          mataPelajaran: userInput.mapel,
          kelasSemester: `${userInput.kelas} / ${userInput.semester}`,
          alokasiWaktu: `${userInput.alokasiWaktuJP} JP`
        },
        desainPembelajaran: {
          ...result.desainPembelajaran,
          tujuanPembelajaran: userInput.tujuanPembelajaran,
        },
        identifikasi: {
            ...result.identifikasi,
            dimensiProfilLulusan: userInput.selectedDimensi,
        }
      };
      setPerencanaanData(initialData);
      setCurrentStep(AppStep.STEP_1_COMPLETE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui');
      setCurrentStep(AppStep.FORM);
    }
  }, [apiKey]);

  const handleGenerateStep2 = useCallback(async () => {
    if (!perencanaanData?.identifikasi || !perencanaanData?.desainPembelajaran || !apiKey) return;
    setCurrentStep(AppStep.GENERATING_STEP_2);
    setError(null);

    try {
      const result = await generateLearningExperience(perencanaanData.identifikasi, perencanaanData.desainPembelajaran, apiKey);
      setPerencanaanData(prev => ({ ...prev, ...result }));
      setCurrentStep(AppStep.STEP_2_COMPLETE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui');
      setCurrentStep(AppStep.STEP_1_COMPLETE);
    }
  }, [perencanaanData, apiKey]);

  const handleGenerateStep3 = useCallback(async () => {
    if (!perencanaanData?.desainPembelajaran || !perencanaanData?.pengalamanBelajar || !apiKey) return;
    setCurrentStep(AppStep.GENERATING_STEP_3);
    setError(null);

    try {
      const result = await generateAssessmentAndMedia(perencanaanData.desainPembelajaran, perencanaanData.pengalamanBelajar, apiKey);
      setPerencanaanData(prev => ({ ...prev, ...result }));
      setCurrentStep(AppStep.COMPLETE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui');
      setCurrentStep(AppStep.STEP_2_COMPLETE);
    }
  }, [perencanaanData, apiKey]);

  const isLoading = [AppStep.GENERATING_STEP_1, AppStep.GENERATING_STEP_2, AppStep.GENERATING_STEP_3].includes(currentStep);

  return (
    <>
      <div className="flex justify-between items-start">
        <PageHeader 
          title="Generator Perencanaan"
          subtitle="Isi formulir di bawah ini untuk memulai membuat perencanaan pembelajaran."
        />
        {currentStep !== AppStep.FORM && !isLoading && (
           <button 
                onClick={resetState} 
                className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm text-slate-600 rounded-lg hover:bg-slate-200/70 transition-colors text-sm font-medium border border-slate-200 shadow-sm"
                title="Mulai dari awal"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
                Mulai Lagi
            </button>
        )}
      </div>
      
      {!apiKey ? (
        <ResultCard>
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-amber-500 mb-4"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <h2 className="text-xl font-semibold text-slate-700">API Key Belum Diatur</h2>
            <p className="text-slate-500 mt-2 mb-4">Anda perlu mengatur Google Gemini API Key Anda untuk dapat menggunakan generator.</p>
            <NavLink to="/settings" className="inline-block bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-purple-700">
              Buka Pengaturan
            </NavLink>
          </div>
        </ResultCard>
      ) : (
        <>
          {currentStep === AppStep.FORM && <InputForm onSubmit={handleGenerateStep1} error={error} />}
          {isLoading && <LoadingView />}
          
          {perencanaanData && <ResultsDisplay data={perencanaanData} />}
          
          <div id="next-generate-container" className="w-full max-w-4xl mx-auto mt-6">
            {currentStep === AppStep.STEP_1_COMPLETE && (
              <ActionButton 
                text="Lanjutkan: Buat Pengalaman Belajar" 
                onClick={handleGenerateStep2} 
                isLoading={isLoading} 
                isNextStep={true}
              />
            )}
            {currentStep === AppStep.STEP_2_COMPLETE && (
              <ActionButton 
                text="Lanjutkan: Buat Asesmen & Media" 
                onClick={handleGenerateStep3} 
                isLoading={isLoading} 
                isNextStep={true}
              />
            )}
            {currentStep === AppStep.COMPLETE && perencanaanData && (
              <FinalActions
                onCopy={() => handleCopy(perencanaanData as PerencanaanData)}
                onExport={() => handleExportHTML(perencanaanData as PerencanaanData)}
              />
            )}
            {error && currentStep !== AppStep.FORM && <p className="text-center mt-4 text-red-600 font-medium">{error}</p>}
          </div>
        </>
      )}
    </>
  );
}

export default Generator;
