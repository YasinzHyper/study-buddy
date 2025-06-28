"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  getStudyTasks, 
  addStudyTask, 
  deleteStudyTask, 
  getSessionHistory, 
  addSessionRecord,
  StudyTask,
  SessionRecord,
  getUserPreferences
} from "@/lib/storage";

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Focus on being productive instead of busy.",
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done.",
  "Don't watch the clock; do what it does. Keep going."
];

export default function Study() {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [timer, setTimer] = useState<number>(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<SessionRecord[]>([]);
  const [quote, setQuote] = useState<string>("");
  const [newTask, setNewTask] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTasks = getStudyTasks();
    const savedHistory = getSessionHistory();
    const preferences = getUserPreferences();
    
    setTasks(savedTasks);
    setSessionHistory(savedHistory);
    setTimer(preferences.defaultStudyDuration * 60);
  }, []);

  useEffect(() => {
    if (isRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, timer]);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [selectedTask]);

  const handleStartSession = () => {
    if (selectedTask) {
      setIsRunning(true);
    }
  };

  const handleEndSession = () => {
    setIsRunning(false);
    const initialTime = 25 * 60; // 25 minutes in seconds
    const sessionDuration = Math.max(0, Math.ceil((initialTime - timer) / 60)); // Calculate actual session duration in minutes
    console.log('Session ended:', { initialTime, timer, sessionDuration });
    const newRecord = addSessionRecord(selectedTask, sessionDuration);
    setSessionHistory([...sessionHistory, newRecord]);
    setSelectedTask("");
    setTimer(25 * 60);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newStudyTask = addStudyTask(newTask.trim());
      setTasks([...tasks, newStudyTask]);
      setNewTask("");
      setShowAddTask(false);
    }
  };

  const handleDeleteTask = (id: number) => {
    deleteStudyTask(id);
    setTasks(tasks.filter(task => task.id !== id));
    if (selectedTask === tasks.find(t => t.id === id)?.name) {
      setSelectedTask("");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="gradient-bg-soft rounded-2xl p-6 mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">Focused Study Sessions</h1>
          <p className="text-muted-foreground">Stay focused with the Pomodoro technique</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Task Selection */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="text-center gradient-text text-xl">Select a Task</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`px-4 py-3 rounded-lg cursor-pointer border transition-all duration-300 flex justify-between items-center ${
                    selectedTask === task.name 
                      ? "gradient-bg text-white border-primary shadow-lg" 
                      : "gradient-bg-soft hover:gradient-card-hover border-border"
                  }`}
                  onClick={() => setSelectedTask(task.name)}
                  tabIndex={0}
                  aria-pressed={selectedTask === task.name}
                >
                  <span className="font-medium">{task.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task.id);
                    }}
                    className={`${selectedTask === task.name ? 'text-white hover:text-red-200' : 'text-destructive hover:text-destructive'}`}
                  >
                    ×
                  </Button>
                </li>
              ))}
            </ul>
            
            {showAddTask ? (
              <div className="space-y-3">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter new task..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  className="gradient-border focus:ring-2 focus:ring-primary/20"
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddTask} size="sm" className="gradient-button">
                    Add
                  </Button>
                  <Button onClick={() => setShowAddTask(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => setShowAddTask(true)} 
                variant="outline" 
                className="w-full gradient-border hover:gradient-bg-soft"
              >
                + Add New Task
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Timer and Quote */}
        <div className="flex flex-col gap-8">
          <Card className="flex-1 gradient-card-hover">
            <CardHeader>
              <CardTitle className="text-center gradient-text text-xl">Pomodoro Timer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="text-6xl font-mono font-bold gradient-text-strong mb-4">{formatTime(timer)}</div>
              <div className="text-center mb-6">
                <div className="text-muted-foreground italic mb-2">💭</div>
                <div className="text-sm text-muted-foreground">{quote}</div>
              </div>
              {!isRunning ? (
                <Button
                  size="lg"
                  onClick={handleStartSession}
                  disabled={!selectedTask}
                  className={`w-full text-lg py-4 ${selectedTask ? 'gradient-button' : 'opacity-50'}`}
                >
                  {selectedTask ? '🚀 Start Session' : 'Select a task first'}
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={handleEndSession}
                  className="w-full text-lg py-4 gradient-bg-strong text-white hover:opacity-90"
                >
                  ⏹️ End Session
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Session History */}
          {sessionHistory.length > 0 && (
            <Card className="gradient-card-hover">
              <CardHeader>
                <CardTitle className="text-center gradient-text">Session History</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {sessionHistory.slice(-5).reverse().map((session) => (
                    <li key={session.id} className="px-4 py-3 rounded-lg gradient-bg-soft text-foreground flex justify-between items-center">
                      <span className="font-medium">{session.task}</span>
                      <span className="text-sm text-muted-foreground bg-white/50 px-2 py-1 rounded">
                        {session.duration} min
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {sessionHistory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">{sessionHistory.length}</div>
              <div className="text-sm text-muted-foreground">Total Sessions</div>
            </CardContent>
          </Card>
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">
                {sessionHistory.reduce((sum: number, session: SessionRecord) => sum + session.duration, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Minutes</div>
            </CardContent>
          </Card>
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">
                {sessionHistory.length > 0 ? Math.round(sessionHistory.reduce((sum: number, session: SessionRecord) => sum + session.duration, 0) / sessionHistory.length) : 0}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Session</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Weekly Progress Chart */}
      <Card className="gradient-card-hover">
        <CardHeader>
          <CardTitle className="gradient-text">Weekly Study Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {sessionHistory.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-end justify-between h-32 space-x-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (6 - i));
                  const dateStr = date.toISOString().split('T')[0];
                  const daySessions = sessionHistory.filter(session => 
                    session.completedAt.startsWith(dateStr)
                  );
                  const totalMinutes = daySessions.reduce((sum: number, session: SessionRecord) => sum + session.duration, 0);
                  
                  // Calculate max minutes for scaling
                  const maxMinutes = Math.max(...Array.from({ length: 7 }, (_, j) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (6 - j));
                    const dStr = d.toISOString().split('T')[0];
                    const sessions = sessionHistory.filter(s => s.completedAt.startsWith(dStr));
                    return sessions.reduce((sum: number, s: SessionRecord) => sum + s.duration, 0);
                  }));
                  
                  return (
                    <div key={dateStr} className="flex flex-col items-center flex-1">
                      <div className="text-xs text-muted-foreground mb-2">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div 
                        className="w-full gradient-progress rounded-t transition-all duration-300"
                        style={{ 
                          height: `${Math.max(10, totalMinutes > 0 ? (totalMinutes / maxMinutes) * 100 : 10)}%` 
                        }}
                      ></div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {totalMinutes}m
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Total study time this week: {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (6 - i));
                  const dateStr = date.toISOString().split('T')[0];
                  const daySessions = sessionHistory.filter(session => 
                    session.completedAt.startsWith(dateStr)
                  );
                  return daySessions.reduce((sum: number, session: SessionRecord) => sum + session.duration, 0);
                }).reduce((sum: number, minutes: number) => sum + minutes, 0)} minutes
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 gradient-bg-soft rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 gradient-text">No study sessions yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete your first study session to see your weekly progress!
              </p>
              <div className="flex items-end justify-between h-32 space-x-2 opacity-50">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (6 - i));
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div className="text-xs text-muted-foreground mb-2">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="w-full bg-muted rounded-t" style={{ height: '10px' }}></div>
                      <div className="text-xs text-muted-foreground mt-1">0m</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
