import React, { useState, useCallback, useEffect } from 'react';
import { InputForm } from './components/InputForm';
import { BlogPostDisplay } from './components/BlogPostDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorAlert } from './components/ErrorAlert';
import { MetaHead } from './components/MetaHead';
import { FeatherIcon } from './components/icons/FeatherIcon';
import { generateBlogPost } from './services/geminiService';
import { useBranding } from './hooks/useBranding';
import { Tone, Style, Audience, BlogPostRequest } from './types';
import { 
  DEFAULT_POST_LENGTH, 
  TONE_OPTIONS, 
  STYLE_OPTIONS, 
  AUDIENCE_OPTIONS,
  PERSONA_PRESET_OPTIONS,
  CUSTOM_PERSONA_KEY
} from './constants';

const App: React.FC = () => {
  // Load branding configuration
  const { branding, isLoading: brandingLoading, error: brandingError } = useBranding();

  const [topic, setTopic] = useState<string>('');
  const [selectedPersonaPresetKey, setSelectedPersonaPresetKey] = useState<string>(CUSTOM_PERSONA_KEY);
  const [personaInputText, setPersonaInputText] = useState<string>(''); // This will hold the text for the persona textarea

  const [tone, setTone] = useState<Tone>(TONE_OPTIONS[0].value);
  const [style, setStyle] = useState<Style>(STYLE_OPTIONS[0].value);
  const [length, setLength] = useState<number>(DEFAULT_POST_LENGTH);
  const [audience, setAudience] = useState<Audience>(AUDIENCE_OPTIONS[0].value);

  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedPreset = PERSONA_PRESET_OPTIONS.find(p => p.key === selectedPersonaPresetKey);
    if (selectedPreset && selectedPreset.key !== CUSTOM_PERSONA_KEY) {
      setPersonaInputText(selectedPreset.value);
    } else if (selectedPreset && selectedPreset.key === CUSTOM_PERSONA_KEY) {
      // If "Custom" is selected, clear the text area to allow fresh input,
      // or retain current custom text if that's preferred (current: clears it).
      // If you want to retain, remove the next line or store custom text separately.
      setPersonaInputText(''); 
    }
  }, [selectedPersonaPresetKey]);

  const handleGeneratePost = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for your blog post.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPost('');

    const request: BlogPostRequest = { 
      topic, 
      persona: personaInputText.trim() ? personaInputText.trim() : undefined, 
      tone, 
      style, 
      length, 
      audience 
    };

    try {
      const post = await generateBlogPost(request);
      setGeneratedPost(post);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setGeneratedPost(''); 
    } finally {
      setIsLoading(false);
    }
  }, [topic, personaInputText, tone, style, length, audience]);

  // Show loading state while branding is loading
  if (brandingLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-slate-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error state if branding failed to load
  if (brandingError || !branding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Configuration Error</h1>
          <p className="text-slate-300">Failed to load application configuration: {brandingError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-slate-100 p-4 md:p-8 font-sans">
      {/* Dynamic head metadata */}
      <MetaHead branding={branding} />
      
      <header className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center space-x-3">
          <FeatherIcon className={branding.icon.className} />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
            {branding.ui.header.title}
          </h1>
        </div>
        <p className="text-slate-400 mt-2 text-lg">{branding.ui.header.subtitle}</p>
      </header>

      <main className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <section id="input-section" className="bg-slate-800/70 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8 ring-1 ring-slate-700">
          <InputForm
            topic={topic}
            setTopic={setTopic}
            selectedPersonaPresetKey={selectedPersonaPresetKey}
            setSelectedPersonaPresetKey={setSelectedPersonaPresetKey}
            personaInputText={personaInputText}
            setPersonaInputText={setPersonaInputText}
            tone={tone}
            setTone={setTone}
            style={style}
            setStyle={setStyle}
            length={length}
            setLength={setLength}
            audience={audience}
            setAudience={setAudience}
            onSubmit={handleGeneratePost}
            isLoading={isLoading}
          />
        </section>

        <section id="output-section" className="bg-slate-800/70 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8 ring-1 ring-slate-700 flex flex-col min-h-[400px] md:min-h-0">
          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
          {isLoading && (
            <div className="flex-grow flex flex-col items-center justify-center">
              <LoadingSpinner />
              <p className="mt-4 text-sky-300">{branding.ui.loading.message}</p>
            </div>
          )}
          {!isLoading && !error && (
            <BlogPostDisplay post={generatedPost} />
          )}
        </section>
      </main>
      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>{branding.ui.footer.text}</p>
      </footer>
    </div>
  );
};

export default App;
