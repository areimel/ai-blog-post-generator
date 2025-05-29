
import React from 'react';
import { Tone, Style, Audience } from '../types';
import { 
  TONE_OPTIONS, 
  STYLE_OPTIONS, 
  AUDIENCE_OPTIONS, 
  PERSONA_PRESET_OPTIONS,
  CUSTOM_PERSONA_KEY
} from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  selectedPersonaPresetKey: string;
  setSelectedPersonaPresetKey: (key: string) => void;
  personaInputText: string;
  setPersonaInputText: (text: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  style: Style;
  setStyle: (style: Style) => void;
  length: number;
  setLength: (length: number) => void;
  audience: Audience;
  setAudience: (audience: Audience) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  topic,
  setTopic,
  selectedPersonaPresetKey,
  setSelectedPersonaPresetKey,
  personaInputText,
  setPersonaInputText,
  tone,
  setTone,
  style,
  setStyle,
  length,
  setLength,
  audience,
  setAudience,
  onSubmit,
  isLoading,
}) => {
  const inputLabelClass = "block text-sm font-medium text-sky-300 mb-1";
  const baseInputClass = "w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 transition-colors duration-150";
  const selectClass = `${baseInputClass} appearance-none`;

  const isPersonaTextareaReadOnly = selectedPersonaPresetKey !== CUSTOM_PERSONA_KEY;

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      <div>
        <label htmlFor="topic" className={inputLabelClass}>
          Blog Post Topic
        </label>
        <textarea
          id="topic"
          rows={3}
          className={`${baseInputClass} min-h-[80px]`}
          placeholder="e.g., The Future of Renewable Energy"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={isLoading}
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="personaPreset" className={inputLabelClass}>
          Persona Preset
        </label>
        <select
          id="personaPreset"
          className={selectClass}
          value={selectedPersonaPresetKey}
          onChange={(e) => setSelectedPersonaPresetKey(e.target.value)}
          disabled={isLoading}
        >
          {PERSONA_PRESET_OPTIONS.map((option) => (
            <option key={option.key} value={option.key} className="bg-slate-700 text-slate-100">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="persona" className={inputLabelClass}>
          Persona Description {selectedPersonaPresetKey === CUSTOM_PERSONA_KEY ? '(Write your own)' : '(From preset - read-only)'}
        </label>
        <textarea
          id="persona"
          rows={4}
          className={`${baseInputClass} min-h-[100px] ${isPersonaTextareaReadOnly ? 'bg-slate-600 cursor-not-allowed' : ''}`}
          placeholder={
            selectedPersonaPresetKey === CUSTOM_PERSONA_KEY 
            ? "e.g., A witty tech enthusiast, a seasoned historian..."
            : "This persona is defined by the selected preset."
          }
          value={personaInputText}
          onChange={(e) => {
            if (!isPersonaTextareaReadOnly) {
              setPersonaInputText(e.target.value);
            }
          }}
          readOnly={isPersonaTextareaReadOnly}
          disabled={isLoading} // Overall disable if form is loading
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="tone" className={inputLabelClass}>
            Tone
          </label>
          <select
            id="tone"
            className={selectClass}
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            disabled={isLoading}
          >
            {TONE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-700 text-slate-100">
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="style" className={inputLabelClass}>
            Style
          </label>
          <select
            id="style"
            className={selectClass}
            value={style}
            onChange={(e) => setStyle(e.target.value as Style)}
            disabled={isLoading}
          >
            {STYLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-700 text-slate-100">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="audience" className={inputLabelClass}>
            Target Audience
          </label>
          <select
            id="audience"
            className={selectClass}
            value={audience}
            onChange={(e) => setAudience(e.target.value as Audience)}
            disabled={isLoading}
          >
            {AUDIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-700 text-slate-100">
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="length" className={inputLabelClass}>
            Approx. Length (words)
          </label>
          <input
            type="number"
            id="length"
            className={baseInputClass}
            value={length}
            onChange={(e) => setLength(Math.max(50, parseInt(e.target.value, 10) || 0))}
            min="50"
            step="50"
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out group"
        aria-label="Generate Blog Post"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2 text-yellow-300 group-hover:scale-110 transition-transform" />
            Generate Blog Post
          </>
        )}
      </button>
    </form>
  );
};
