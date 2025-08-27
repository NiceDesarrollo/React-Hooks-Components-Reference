# React + Vite + Docker Project

A modern React development environment using Vite and Docker to avoid Node.js version conflicts.

## Features

- ⚡️ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Latest React with hooks and concurrent features
- 🔷 **TypeScript** - Type safety and better developer experience
- 🐳 **Docker** - Consistent development environment
- 📦 **Hot Module Replacement** - Instant updates during development
- 🎨 **Modern CSS** - Clean, responsive design

## Prerequisites

- Docker Desktop installed and running
- Git (for version control)

## Quick Start

1. **Clone or download this project**

2. **Start the development environment:**
   ```bash
   docker-compose up --build
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

4. **Start coding:**
   - Edit files in the `src/` directory
   - Changes will automatically reload in the browser
   - No need to restart the container

## Available Scripts

### Using Docker (Recommended)
```bash
# Start development server
docker-compose up

# Start in background
docker-compose up -d

# Stop the server
docker-compose down

# Rebuild container (if dependencies change)
docker-compose up --build

# View logs
docker-compose logs -f
```

### Using Local Node.js (if you have it installed)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Structure

```
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Component styles
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Development Workflow

1. **Make changes** to your React components in `src/`
2. **Save files** - Vite will automatically reload the browser
3. **Test your changes** in the browser
4. **Commit your code** when ready

## Adding Dependencies

### Using Docker (Recommended)
```bash
# Add a new dependency
docker-compose exec frontend npm install package-name

# Add a dev dependency
docker-compose exec frontend npm install --save-dev package-name
```

### Using Local Node.js
```bash
npm install package-name
npm install --save-dev package-name
```

## Customization

### Changing the Port
Edit `docker-compose.yml`:
```yaml
ports:
  - "3000:5173"  # Change 3000 to your preferred port
```

### Adding Environment Variables
Create a `.env` file:
```env
VITE_API_URL=http://localhost:8000
VITE_APP_TITLE=My React App
```

### Modifying Vite Configuration
Edit `vite.config.ts` to add plugins, aliases, or other configurations.

## Troubleshooting

### Container won't start
```bash
# Check if port 5173 is already in use
docker-compose down
docker-compose up --build
```

### Changes not reflecting
- Ensure you're editing files in the mounted volume
- Check that the container is running: `docker-compose ps`
- Restart the container: `docker-compose restart`

### Performance issues on Windows/Mac
The Docker setup includes polling configuration for better file watching on Windows and macOS.

## Production Build

To create a production build:

```bash
# Using Docker
docker-compose exec frontend npm run build

# Using local Node.js
npm run build
```

The build output will be in the `dist/` directory.

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Docker Documentation](https://docs.docker.com/)

## License

This project is open source and available under the [MIT License](LICENSE).
