import { useEffect } from 'react';
import { BrandingConfig } from '../hooks/useBranding';

interface MetaHeadProps {
  branding: BrandingConfig;
}

// Component to dynamically update document head metadata
export const MetaHead: React.FC<MetaHeadProps> = ({ branding }) => {
  useEffect(() => {
    // Update document title
    document.title = branding.metadata.title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };

    // Update standard meta tags
    updateMetaTag('description', branding.metadata.description);
    updateMetaTag('keywords', branding.metadata.keywords);
    updateMetaTag('author', branding.metadata.author);
    
    // Update Open Graph meta tags
    updateMetaTag('', branding.metadata.ogTitle, 'og:title');
    updateMetaTag('', branding.metadata.ogDescription, 'og:description');
    updateMetaTag('', branding.metadata.ogImage, 'og:image');
    updateMetaTag('', 'website', 'og:type');
    
    // Update Twitter Card meta tags
    updateMetaTag('twitter:card', branding.metadata.twitterCard);
    updateMetaTag('twitter:title', branding.metadata.ogTitle);
    updateMetaTag('twitter:description', branding.metadata.ogDescription);
    updateMetaTag('twitter:image', branding.metadata.ogImage);
    
    // Update theme color
    updateMetaTag('theme-color', branding.metadata.themeColor);
    
    // Update favicon
    updateLinkTag('icon', branding.metadata.favicon);
    
    // Add apple-touch-icon for better mobile support
    updateLinkTag('apple-touch-icon', '/apple-touch-icon.png');
    
    // Add canonical URL (you might want to make this dynamic based on current route)
    updateLinkTag('canonical', window.location.href);
    
  }, [branding]);

  // This component doesn't render anything visible
  return null;
}; 