import React, { useState, useEffect } from 'react';

function PomodoroTimer() {
  // Timer states
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', or 'longBreak'
  const [cycles, setCycles] = useState(0);
  
  // Settings
  const [workTime, setWorkTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  
  // Task tracking
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [newTaskInput, setNewTaskInput] = useState('');
  
  // Set up timer
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            clearInterval(interval);
            playAlarmSound();
            handleTimerComplete();
          } else {
            // Decrement minutes, reset seconds
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          // Decrement seconds
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);
  
  // Play sound when timer completes
  const playAlarmSound = () => {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  // Handle timer completion
  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      // Completed work session
      const newCycles = cycles + 1;
      setCycles(newCycles);
      
      if (newCycles % 4 === 0) {
        // After 4 work sessions, take a long break
        setMode('longBreak');
        setMinutes(longBreakTime);
      } else {
        // Take a short break
        setMode('shortBreak');
        setMinutes(shortBreakTime);
      }
    } else {
      // Completed break session, back to work
      setMode('work');
      setMinutes(workTime);
    }
    
    setSeconds(0);
  };
  
  // Timer controls
  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(workTime);
    } else if (mode === 'shortBreak') {
      setMinutes(shortBreakTime);
    } else {
      setMinutes(longBreakTime);
    }
    setSeconds(0);
  };
  
  // Mode switching
  const switchToWork = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(workTime);
    setSeconds(0);
  };
  
  const switchToShortBreak = () => {
    setIsActive(false);
    setMode('shortBreak');
    setMinutes(shortBreakTime);
    setSeconds(0);
  };
  
  const switchToLongBreak = () => {
    setIsActive(false);
    setMode('longBreak');
    setMinutes(longBreakTime);
    setSeconds(0);
  };
  
  // Save settings
  const saveSettings = () => {
    setShowSettings(false);
    
    // Update current timer if needed
    if (mode === 'work') {
      setMinutes(workTime);
    } else if (mode === 'shortBreak') {
      setMinutes(shortBreakTime);
    } else {
      setMinutes(longBreakTime);
    }
    setSeconds(0);
  };
  
  // Task management
  const addTask = () => {
    if (newTaskInput.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        name: newTaskInput, 
        completed: false, 
        pomodoros: 0 
      }]);
      setNewTaskInput('');
    }
  };
  
  const selectTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setCurrentTask(task ? task.name : '');
  };
  
  const completeTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
  };
  
  const incrementPomodoro = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, pomodoros: task.pomodoros + 1 } 
        : task
    ));
  };
  
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    if (tasks.find(t => t.id === taskId)?.name === currentTask) {
      setCurrentTask('');
    }
  };
  
  // Format time display
  const formatTime = () => {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 max-w-3xl flex-grow">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Pomodoro Timer</h1>
          
          {/* Current task display */}
          <div className="text-lg">
            {currentTask ? `Working on: ${currentTask}` : 'No task selected'}
          </div>
          
          {/* Timer display */}
          <div className={`text-9xl font-bold my-6 ${
            mode === 'work' ? 'text-red-500' : 
            mode === 'shortBreak' ? 'text-green-500' : 'text-blue-500'
          }`}>
            {formatTime()}
          </div>
          
          {/* Mode indicators */}
          <div className="flex space-x-4 mb-6">
            <button 
              className={`btn ${mode === 'work' ? 'btn-primary' : 'btn-outline'}`}
              onClick={switchToWork}
            >
              Work
            </button>
            <button 
              className={`btn ${mode === 'shortBreak' ? 'btn-primary' : 'btn-outline'}`}
              onClick={switchToShortBreak}
            >
              Short Break
            </button>
            <button 
              className={`btn ${mode === 'longBreak' ? 'btn-primary' : 'btn-outline'}`}
              onClick={switchToLongBreak}
            >
              Long Break
            </button>
          </div>
          
          {/* Timer controls */}
          <div className="flex space-x-4 mb-6">
            {!isActive ? (
              <button className="btn btn-success" onClick={startTimer}>Start</button>
            ) : (
              <button className="btn btn-warning" onClick={pauseTimer}>Pause</button>
            )}
            <button className="btn btn-error" onClick={resetTimer}>Reset</button>
            <button 
              className="btn btn-info" 
              onClick={() => setShowSettings(!showSettings)}
            >
              Settings
            </button>
          </div>
          
          {/* Progress display */}
          <div className="text-lg">
            Completed Cycles: {cycles}
          </div>
        </div>
        
        {/* Settings modal */}
        {showSettings && (
          <div className="card bg-base-200 shadow-xl mb-8 p-6">
            <h2 className="text-xl font-bold mb-4">Timer Settings</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Work Duration (minutes)</span>
              </label>
              <input 
                type="number" 
                className="input input-bordered w-full max-w-xs" 
                value={workTime}
                onChange={(e) => setWorkTime(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              
              <label className="label mt-2">
                <span className="label-text">Short Break Duration (minutes)</span>
              </label>
              <input 
                type="number" 
                className="input input-bordered w-full max-w-xs" 
                value={shortBreakTime}
                onChange={(e) => setShortBreakTime(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              
              <label className="label mt-2">
                <span className="label-text">Long Break Duration (minutes)</span>
              </label>
              <input 
                type="number" 
                className="input input-bordered w-full max-w-xs" 
                value={longBreakTime}
                onChange={(e) => setLongBreakTime(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              
              <button className="btn btn-primary mt-4" onClick={saveSettings}>
                Save Settings
              </button>
            </div>
          </div>
        )}
        
        {/* Task manager */}
        <div className="card bg-base-200 shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">Task Manager</h2>
          
          {/* Add task */}
          <div className="flex mb-4">
            <input 
              type="text" 
              className="input input-bordered flex-grow mr-2" 
              placeholder="Add a new task..."
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button className="btn btn-primary" onClick={addTask}>Add</button>
          </div>
          
          {/* Task list */}
          <div className="overflow-y-auto max-h-80">
            {tasks.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No tasks yet. Add one above!
              </div>
            ) : (
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li 
                    key={task.id} 
                    className={`flex items-center justify-between p-3 rounded-lg 
                      ${task.completed ? 'bg-base-300 text-opacity-60' : 'bg-base-100'}
                      ${currentTask === task.name ? 'border-l-4 border-primary' : ''}
                    `}
                  >
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="checkbox mr-3" 
                        checked={task.completed} 
                        onChange={() => completeTask(task.id)}
                      />
                      <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="badge mr-2">{task.pomodoros} 🍅</span>
                      <button 
                        className="btn btn-xs btn-circle mr-1" 
                        onClick={() => incrementPomodoro(task.id)}
                      >
                        +
                      </button>
                      <button 
                        className="btn btn-xs btn-primary mr-1" 
                        onClick={() => selectTask(task.id)}
                      >
                        Select
                      </button>
                      <button 
                        className="btn btn-xs btn-error btn-circle" 
                        onClick={() => removeTask(task.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
        <div>
          <p>Made with ❤️ by Beniamin Avramita</p>
        </div>
      </footer>
    </div>
  );
}

export default PomodoroTimer;