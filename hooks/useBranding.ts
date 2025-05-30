import { useState, useEffect } from 'react';

// Define the branding configuration interface
export interface BrandingConfig {
  app: {
    name: string;
    tagline: string;
    description: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string;
    author: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
    themeColor: string;
    favicon: string;
  };
  ui: {
    header: {
      title: string;
      subtitle: string;
    };
    footer: {
      text: string;
    };
    loading: {
      message: string;
    };
  };
  icon: {
    component: string;
    className: string;
  };
}

// Custom hook to load branding configuration
export const useBranding = () => {
  const [branding, setBranding] = useState<BrandingConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBranding = async () => {
      try {
        // Load the branding configuration from the JSON file
        const response = await fetch('/branding.json');
        if (!response.ok) {
          throw new Error('Failed to load branding configuration');
        }
        const brandingData: BrandingConfig = await response.json();
        setBranding(brandingData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error loading branding');
        console.error('Error loading branding:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBranding();
  }, []);

  return { branding, isLoading, error };
}; 