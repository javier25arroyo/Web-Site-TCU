# Web Site TCU

A modern web application built with Astro framework, optimized for performance and ready for deployment on Netlify or Vercel.

## 📋 Prerequisites

### Node.js Version Requirements

⚠️ **Important:** This project requires **Node.js version 20.12.0 or higher** and **npm version 10.0.0 or higher**.

#### Verify your Node.js version:
```bash
node --version  # Should output v20.12.0 or higher
npm --version   # Should output 10.0.0 or higher
```

#### Installing the correct Node.js version:

**Option 1: Using NVM (Node Version Manager) - Recommended**
```bash
# For Unix/macOS:
nvm install 20.12.2
nvm use 20.12.2

# For Windows (using nvm-windows):
nvm install 20.12.2
nvm use 20.12.2
```

**Option 2: Direct Download**
- Download Node.js v20.12.2 or higher from [nodejs.org](https://nodejs.org/)
- Choose the LTS version for stability

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Web-Site-TCU
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321/`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## 📦 Project Structure

```text
Web-Site-TCU/
├── .nvmrc              # Node version specification for NVM
├── netlify.toml        # Netlify deployment configuration
├── vercel.json         # Vercel deployment configuration
├── package.json        # Project dependencies and scripts
├── astro.config.mjs    # Astro configuration
├── dist/               # Production build output (generated)
├── node_modules/       # Dependencies (generated)
├── public/             # Static assets
│   └── favicon.svg
├── src/                # Source code
│   ├── assets/         # Images and other assets
│   │   └── astro.svg
│   ├── components/     # Reusable components
│   │   └── Welcome.astro
│   ├── layouts/        # Page layouts
│   │   └── Layout.astro
│   └── pages/          # Route pages
│       └── index.astro
└── README.md           # This file
```

## 🚢 Deployment

### Deploy to Netlify

#### Option 1: Git-based deployment (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect your repository
5. Deploy settings are pre-configured in `netlify.toml`
6. Click "Deploy site"

#### Option 2: Manual deployment
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --dir=dist --prod
```

### Deploy to Vercel

#### Option 1: Git-based deployment (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Vercel](https://vercel.com/)
3. Click "New Project"
4. Import your repository
5. Deploy settings are pre-configured in `vercel.json`
6. Click "Deploy"

#### Option 2: CLI deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## 🔧 Configuration Files

### `.nvmrc`
Specifies Node.js version for NVM users. Run `nvm use` to switch to the correct version.

### `netlify.toml`
Contains Netlify deployment configuration:
- Build command and publish directory
- Node.js version specification
- Redirect rules
- Security headers

### `vercel.json`
Contains Vercel deployment configuration:
- Build settings
- Rewrite rules
- Cache and security headers

### `package.json`
Includes `engines` field specifying required Node.js and npm versions.

## ⚡ Performance Optimizations

This project is configured with:
- Static asset caching (1 year cache for `/assets/*`)
- Security headers (X-Frame-Options, CSP, etc.)
- Optimized build output
- Fast refresh in development

## 🐛 Troubleshooting

### Common Issues

**Issue: Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Issue: Wrong Node.js version**
```bash
# Check current version
node --version

# Switch using NVM
nvm use 20.12.2
```

**Issue: Build fails on deployment**
- Ensure Node.js version matches requirements (20.12.0+)
- Check that all dependencies are listed in `package.json`
- Verify build command in deployment settings

## 📚 Resources

- [Astro Documentation](https://docs.astro.build/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js Documentation](https://nodejs.org/docs/)

## 📄 License

[Add your license information here]

## 👥 Contributors

[Add contributor information here]
