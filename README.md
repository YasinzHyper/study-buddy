# StudyBuddy 📚

A modern, offline-first study planner and productivity app built with Next.js, Tailwind CSS, and ShadCN UI components. StudyBuddy helps students organize their learning schedule, track study goals, and maintain focus with the Pomodoro technique.

## ✨ Features

### 🎯 Core Functionality
- **Smart Scheduling**: Create and manage your study schedule with ease
- **Goal Tracking**: Set and monitor your learning objectives with progress visualization
- **Pomodoro Timer**: Stay focused with customizable study sessions (25-minute default)
- **Weekly Progress Charts**: Visualize your study patterns and productivity trends
- **Local Storage**: All data persists locally - no login required, works offline

### 🎨 Modern UI/UX
- **Beautiful Gradients**: Eye-catching blue gradient theme throughout the app
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **ShadCN Components**: Professional, accessible UI components
- **Tailwind CSS**: Utility-first styling for consistent design

### 📊 Analytics & Insights
- **Study Statistics**: Track total sessions, completion rates, and average session length
- **Weekly Progress**: Visual charts showing daily study time distribution
- **Goal Completion**: Monitor progress towards your learning objectives
- **Session History**: Detailed record of all your study sessions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.6
- **UI Components**: ShadCN UI + Radix UI
- **Testing**: Jest + React Testing Library
- **Storage**: Local Storage (offline-first)
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd study-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
study-buddy/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page with dashboard
│   │   ├── schedule/        # Schedule management
│   │   ├── plan/           # Goal planning
│   │   ├── study/          # Pomodoro timer & tasks
│   │   └── settings/       # App preferences
│   ├── components/         # Reusable UI components
│   │   └── ui/            # ShadCN components
│   └── lib/               # Utilities & storage
│       ├── storage.ts     # Local storage management
│       └── utils.ts       # Helper functions
├── public/                # Static assets
├── jest.config.js         # Jest configuration
├── tailwind.config.ts     # Tailwind CSS config
└── components.json        # ShadCN configuration
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🐳 Docker

Build and run with Docker:
```bash
# Build the image
docker build -t study-buddy .

# Run the container
docker run -p 3000:3000 study-buddy
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Deploy automatically** - Vercel will detect Next.js and configure everything
3. **Environment variables** - No additional configuration needed (uses local storage)

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📱 Usage Guide

### Getting Started
1. **Home Dashboard**: View your study statistics and quick access to all features
2. **Schedule**: Add study sessions, classes, and deadlines
3. **Plan**: Create and track learning goals
4. **Study**: Use the Pomodoro timer for focused study sessions
5. **Settings**: Customize your experience and manage data

### Key Features
- **Offline-First**: All data is stored locally in your browser
- **No Login Required**: Start using immediately without account creation
- **Data Export/Import**: Backup and restore your study data
- **Dark Mode**: Toggle theme based on your preference
- **Responsive**: Works on all devices and screen sizes

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

### Adding New Features
1. Create components in `src/components/`
2. Add pages in `src/app/`
3. Update storage utilities in `src/lib/storage.ts`
4. Add tests for new functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives

---

**Happy Studying! 📚✨**
