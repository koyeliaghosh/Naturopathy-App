import React from 'react';
import ReactMarkdown from 'react-markdown';
import { HealthResponse, Language } from '../types';
import { UI_LABELS } from '../constants';
import { ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react';

interface ResponseViewProps {
  response: HealthResponse;
  language: Language;
  onReset: () => void;
}

export const ResponseView: React.FC<ResponseViewProps> = ({ response, language, onReset }) => {
  const labels = UI_LABELS[language];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Navigation */}
      <button 
        onClick={onReset}
        className="flex items-center text-emerald-700 font-medium hover:text-emerald-900 transition-colors mb-2"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        {labels.reset}
      </button>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
        <div className="bg-emerald-600 px-6 py-4 text-white">
          <h2 className="text-2xl font-bold">{labels.resultsStep}</h2>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="prose prose-emerald max-w-none 
            prose-headings:text-emerald-800 prose-headings:font-bold 
            prose-a:text-emerald-600 prose-strong:text-emerald-700
            prose-li:marker:text-emerald-500">
            <ReactMarkdown>{response.markdown}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Grounding Sources (Vendors/Articles) */}
      {response.sources.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                {labels.sources}
            </h3>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {response.sources.map((source, index) => (
              <a 
                key={index} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 rounded-lg border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
              >
                <p className="text-sm font-medium text-emerald-800 group-hover:underline truncate">
                  {source.title}
                </p>
                <p className="text-xs text-slate-500 truncate mt-1">
                  {source.uri}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3 text-yellow-800 text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>{labels.disclaimer}</p>
      </div>
    </div>
  );
};
