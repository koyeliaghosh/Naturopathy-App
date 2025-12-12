import React from 'react';
import { UserProfile, Language } from '../types';
import { UI_LABELS, SUPPORTED_LANGUAGES } from '../constants';
import { MapPin, User, Activity, Scale, Ruler } from 'lucide-react';

interface ProfileFormProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  setProfile,
  onSubmit,
  isLoading,
}) => {
  const labels = UI_LABELS[profile.language];

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    if (profile.weight && profile.height) {
      const w = parseFloat(profile.weight);
      const h = parseFloat(profile.height) / 100;
      if (!isNaN(w) && !isNaN(h) && h > 0) {
        return (w / (h * h)).toFixed(1);
      }
    }
    return null;
  };

  const bmi = calculateBMI();

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
      <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-emerald-800 flex items-center gap-2">
          <User className="w-5 h-5" />
          {labels.profileStep}
        </h2>
        
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-emerald-700">Language:</label>
            <select
                value={profile.language}
                onChange={(e) => handleChange('language', e.target.value as Language)}
                className="bg-white border border-emerald-300 text-emerald-800 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2 outline-none"
            >
                {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                    {lang}
                </option>
                ))}
            </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Age & Gender */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{labels.age}</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                placeholder="e.g. 45"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{labels.gender}</label>
              <select
                value={profile.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="">Select</option>
                <option value="Male">{labels.male}</option>
                <option value="Female">{labels.female}</option>
                <option value="Other">{labels.other}</option>
              </select>
            </div>
          </div>

          {/* BMI Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Scale className="w-4 h-4 text-emerald-500" />
                    {labels.weight}
                </label>
                <input
                  type="number"
                  value={profile.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder="kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Ruler className="w-4 h-4 text-emerald-500" />
                    {labels.height}
                </label>
                <input
                  type="number"
                  value={profile.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                  placeholder="cm"
                />
              </div>
            </div>
            {bmi && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center animate-fade-in">
                    <span className="text-emerald-800 text-sm font-medium">{labels.bmi}: </span>
                    <span className="text-emerald-700 font-bold text-lg">{bmi}</span>
                </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-emerald-500" />
            {labels.location}
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
            placeholder="e.g. Kolkata, West Bengal"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Activity className="w-4 h-4 text-emerald-500" />
            {labels.condition}
          </label>
          <textarea
            value={profile.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors h-32 resize-none"
            placeholder={labels.conditionPlaceholder}
          />
        </div>

        {/* Action Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading || !profile.condition || !profile.age}
          className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 transform 
            ${isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.01] active:scale-[0.99]'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {labels.loading}
            </div>
          ) : (
            labels.submit
          )}
        </button>
      </div>
    </div>
  );
};
