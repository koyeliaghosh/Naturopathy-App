import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ProfileForm } from './components/ProfileForm';
import { ResponseView } from './components/ResponseView';
import { UserProfile, HealthResponse } from './types';
import { UI_LABELS } from './constants';
import { getGeminiHealthAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    weight: '',
    height: '',
    gender: '',
    location: '',
    condition: '',
    language: 'English',
  });

  const [response, setResponse] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!profile.age || !profile.condition) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getGeminiHealthAdvice(profile);
      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setError(null);
  };

  const labels = UI_LABELS[profile.language];

  return (
    <Layout title={labels.title} subtitle={labels.subtitle}>
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <span>⚠️</span>
            {error}
        </div>
      )}

      {!response ? (
        <ProfileForm 
          profile={profile} 
          setProfile={setProfile} 
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      ) : (
        <ResponseView 
          response={response} 
          language={profile.language}
          onReset={handleReset}
        />
      )}
    </Layout>
  );
};

export default App;
