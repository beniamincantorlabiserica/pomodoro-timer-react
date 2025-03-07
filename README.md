# 🍅 Pomodoro Timer

A beautiful, feature-rich Pomodoro Timer application built with React, TailwindCSS, and DaisyUI.

[Live Demo](https://pomodoro.beniamin.io)

## ✨ Features

- **Clean, modern UI** with responsive design that works on all device sizes
- **Full Pomodoro Technique implementation** with work sessions, short breaks, and long breaks
- **Customizable timer durations** for work sessions and breaks
- **Task management system** to track what you're working on
- **Pomodoro tracking** per task with visual indicators
- **Audio alerts** when timers complete
- **Beautiful themes** via DaisyUI integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/beniamincantorlabiserica/pomodoro-timer-react.git
   cd pomodoro-timer
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📋 How to Use

### Basic Timer Controls

- **Start**: Begin the timer countdown
- **Pause**: Temporarily stop the timer
- **Reset**: Reset the current timer to its starting value
- **Work**: Switch to Work mode (default: 25 minutes)
- **Short Break**: Switch to Short Break mode (default: 5 minutes)
- **Long Break**: Switch to Long Break mode (default: 15 minutes)

### Settings

Click the **Settings** button to customize:
- Work duration
- Short break duration
- Long break duration

Changes will be applied after clicking "Save Settings".

### Task Management

1. Add tasks using the input field in the Task Manager section
2. Select a task to focus on during your Pomodoro session
3. Mark tasks as complete using the checkbox
4. Track Pomodoros spent on each task with the "+" button
5. Remove tasks using the "✕" button

## 💻 Technical Details

### Built With

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Component library for Tailwind CSS

### Project Structure

```
pomodoro-timer/
├── public/
├── src/
│   ├── components/
│   │   └── PomodoroTimer.jsx   # Main component
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles & theme configuration
├── index.html
├── package.json
└── vite.config.js
```

## 🔄 The Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a "pomodoro," from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student.

### Basic Process:

1. Decide on the task to be done
2. Set the timer for 25 minutes (one pomodoro)
3. Work on the task until the timer rings
4. Take a short break (5 minutes)
5. After four pomodoros, take a longer break (15-30 minutes)

## 🎨 Customizing Themes

This app uses DaisyUI for theming. To change the theme:

1. Open `index.css`
2. Find or add the theme configuration:
   ```css
   @plugin "daisyui" {
     /* Change "light" to any theme name from DaisyUI */
     themes: lofi --default, forest --prefersdark;
   }
   ```

Available themes include: light, dark, cupcake, bumblebee, emerald, corporate, synthwave, retro, cyberpunk, valentine, halloween, garden, forest, aqua, lofi, pastel, fantasy, wireframe, black, luxury, dracula, cmyk, autumn, business, acid, lemonade, night, coffee, winter.

## 📱 PWA Support

This app can be installed as a Progressive Web App on supported devices. When visiting the deployed application, you'll be prompted to "Add to Home Screen" on mobile devices or "Install" on desktop browsers.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Francesco Cirillo](https://francescocirillo.com/) for creating the Pomodoro Technique
- All the open-source libraries and tools that made this project possible

---

Made with ❤️ by Beniamin Avramita
