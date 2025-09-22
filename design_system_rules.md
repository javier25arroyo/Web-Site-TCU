# Design System Rules for Astro Project

## Design System Structure

### 1. Token Definitions
- **Location**: No design tokens are currently defined in the project.
- **Format/Structure**: When implemented, tokens should follow a structured format like CSS custom properties or JavaScript objects.
- **Transformation Systems**: None currently in place. Consider using tools like Style Dictionary for token transformation.

### 2. Component Library
- **Location**: Components are defined in `src/components/`
- **Architecture**: Astro components (.astro files) with optional TypeScript support
- **Documentation**: No component documentation system currently in place. Consider adding Storybook or similar.

### 3. Frameworks & Libraries
- **UI Frameworks**: Astro (server-side rendering framework)
- **Styling Libraries**: None specified - can use vanilla CSS, Tailwind CSS, or CSS-in-JS solutions
- **Build System**: Astro's built-in build system (Vite-based)

### 4. Asset Management
- **Storage**: Assets stored in `public/` (static) and `src/assets/` (processed by Astro)
- **Optimization**: Astro automatically optimizes assets during build
- **CDN**: No CDN configuration currently

### 5. Icon System
- **Storage**: No icons currently in the project
- **Import/Usage**: When added, icons can be imported as SVG components or image files
- **Naming Convention**: Use kebab-case for icon names (e.g., `chevron-down.svg`)

### 6. Styling Approach
- **CSS Methodology**: Scoped CSS in Astro components, or global styles in `src/styles/`
- **Global Styles**: Can be added in `src/layouts/Layout.astro` or separate CSS files
- **Responsive Design**: Use CSS media queries or Astro's responsive utilities

### 7. Project Structure
- **Overall Organization**:
  - `src/pages/`: Page components (file-based routing)
  - `src/components/`: Reusable UI components
  - `src/layouts/`: Layout components
  - `src/assets/`: Processed assets
  - `public/`: Static assets
- **Feature Organization**: Group related components in subdirectories under `src/components/`

## Integration Guidelines for Figma Designs

### Component Generation
- Use Astro components for UI elements
- Prefer scoped CSS for component-specific styles
- Use TypeScript for type safety

### Token Implementation
- Define design tokens as CSS custom properties in a global stylesheet
- Example:
  ```css
  :root {
    --color-primary: #007acc;
    --spacing-sm: 0.5rem;
    --font-size-base: 1rem;
  }
  ```

### Asset Handling
- Place static assets in `public/`
- Import processed assets in components: `import logo from '../assets/logo.svg'`

### Responsive Design
- Use CSS Grid/Flexbox for layouts
- Implement mobile-first approach
- Test across different screen sizes

## Code Patterns

### Component Example
```astro
---
// src/components/Button.astro
export interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const { variant = 'primary', size = 'md' } = Astro.props;
---

<button class={`btn btn-${variant} btn-${size}`}>
  <slot />
</button>

<style>
  .btn {
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-family: inherit;
    transition: background-color 0.2s;
  }
  
  .btn-primary {
    background-color: var(--color-primary);
    color: white;
  }
  
  .btn-secondary {
    background-color: var(--color-secondary);
    color: var(--color-text);
  }
  
  .btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
  .btn-md { padding: 0.75rem 1.5rem; font-size: 1rem; }
  .btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
</style>
```

### Layout Usage
```astro
---
// src/layouts/Layout.astro
import '../styles/global.css';
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{Astro.props.title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

This document should be updated as the design system evolves and more components/libraries are added to the project.