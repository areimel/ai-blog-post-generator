# Branding Configuration System

This project uses a centralized branding configuration system that allows you to easily customize the app's text content, metadata, and visual elements without modifying the source code.

## Configuration File

The main configuration is stored in `branding.json` at the root of the project. This file contains:

### App Information
- `app.name`: The main application name
- `app.tagline`: The subtitle/tagline displayed under the main title
- `app.description`: A longer description for internal use

### Metadata Configuration
- `metadata.title`: The browser title (shown in tabs)
- `metadata.description`: Meta description for SEO
- `metadata.keywords`: SEO keywords
- `metadata.author`: Content author
- `metadata.ogTitle`: Open Graph title for social sharing
- `metadata.ogDescription`: Open Graph description for social sharing
- `metadata.ogImage`: Open Graph image URL
- `metadata.twitterCard`: Twitter card type
- `metadata.themeColor`: Browser theme color
- `metadata.favicon`: Favicon URL

### UI Text Elements
- `ui.header.title`: Main header title
- `ui.header.subtitle`: Header subtitle
- `ui.footer.text`: Footer text
- `ui.loading.message`: Loading state message

### Icon Configuration
- `icon.component`: The icon component name (currently uses FeatherIcon)
- `icon.className`: CSS classes for the icon styling

## How It Works

1. The `useBranding()` hook loads the configuration from `branding.json` at runtime
2. The `MetaHead` component dynamically updates the document `<head>` with metadata
3. The main `App` component uses the branding configuration for all text content
4. Loading and error states are handled gracefully

## Customization

To customize the branding:

1. Edit `branding.json` with your desired content
2. Update any referenced image URLs (favicon, og:image, etc.)
3. The changes will take effect immediately on page refresh

## Adding New Branding Elements

To add new configurable elements:

1. Add the new fields to `branding.json`
2. Update the `BrandingConfig` interface in `hooks/useBranding.ts`
3. Use the new fields in your components via the `branding` object

## File Dependencies

- `branding.json` - Main configuration file
- `hooks/useBranding.ts` - React hook for loading configuration
- `components/MetaHead.tsx` - Component for dynamic head metadata
- `App.tsx` - Main app component using the branding

## Notes

- The branding configuration is loaded asynchronously
- A loading state is shown while the configuration loads
- Error handling is provided if the configuration fails to load
- All text content is now externalized and easily customizable 