// Local Storage Keys
const STORAGE_KEYS = {
  SCHEDULE: 'studybuddy_schedule',
  PLAN: 'studybuddy_plan',
  STUDY_TASKS: 'studybuddy_study_tasks',
  SESSION_HISTORY: 'studybuddy_session_history',
  USER_PREFERENCES: 'studybuddy_user_preferences',
  THEME: 'studybuddy_theme',
} as const;

// Types
export interface ScheduleItem {
  id: number;
  subject: string;
  date: string;
  time: string;
}

export interface PlanItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface StudyTask {
  id: number;
  name: string;
  createdAt: string;
}

export interface SessionRecord {
  id: number;
  task: string;
  duration: number; // in minutes
  completedAt: string;
}

export interface UserPreferences {
  defaultStudyDuration: number; // in minutes
  autoStartBreaks: boolean;
  notifications: boolean;
  soundEnabled: boolean;
}

// Generic storage functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage for key ${key}:`, error);
  }
};

// Schedule Management
export const getSchedule = (): ScheduleItem[] => {
  return getFromStorage(STORAGE_KEYS.SCHEDULE, [
    { id: 1, subject: "Data Structures", date: "2025-01-08", time: "10:00" },
    { id: 2, subject: "Algorithms", date: "2025-01-09", time: "14:00" },
    { id: 3, subject: "Operating Systems", date: "2025-01-10", time: "11:00" },
  ]);
};

export const saveSchedule = (schedule: ScheduleItem[]): void => {
  setToStorage(STORAGE_KEYS.SCHEDULE, schedule);
};

export const addScheduleItem = (item: Omit<ScheduleItem, 'id'>): ScheduleItem => {
  const schedule = getSchedule();
  const newItem: ScheduleItem = {
    ...item,
    id: Math.max(0, ...schedule.map(s => s.id)) + 1,
  };
  const updatedSchedule = [...schedule, newItem];
  saveSchedule(updatedSchedule);
  return newItem;
};

export const deleteScheduleItem = (id: number): void => {
  const schedule = getSchedule();
  const updatedSchedule = schedule.filter(item => item.id !== id);
  saveSchedule(updatedSchedule);
};

// Plan Management
export const getPlan = (): PlanItem[] => {
  return getFromStorage(STORAGE_KEYS.PLAN, [
    { 
      id: 1, 
      title: "Learn Data Structures", 
      description: "Complete 5 LeetCode problems daily.", 
      completed: false,
      createdAt: new Date().toISOString()
    },
    { 
      id: 2, 
      title: "Master Algorithms", 
      description: "Study sorting and searching algorithms.", 
      completed: false,
      createdAt: new Date().toISOString()
    },
    { 
      id: 3, 
      title: "Revise Operating Systems", 
      description: "Go through OS concepts and practice questions.", 
      completed: false,
      createdAt: new Date().toISOString()
    },
  ]);
};

export const savePlan = (plan: PlanItem[]): void => {
  setToStorage(STORAGE_KEYS.PLAN, plan);
};

export const addPlanItem = (item: Omit<PlanItem, 'id' | 'createdAt'>): PlanItem => {
  const plan = getPlan();
  const newItem: PlanItem = {
    ...item,
    id: Math.max(0, ...plan.map(p => p.id)) + 1,
    createdAt: new Date().toISOString(),
  };
  const updatedPlan = [...plan, newItem];
  savePlan(updatedPlan);
  return newItem;
};

export const updatePlanItem = (id: number, updates: Partial<PlanItem>): void => {
  const plan = getPlan();
  const updatedPlan = plan.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
  savePlan(updatedPlan);
};

export const deletePlanItem = (id: number): void => {
  const plan = getPlan();
  const updatedPlan = plan.filter(item => item.id !== id);
  savePlan(updatedPlan);
};

// Study Tasks Management
export const getStudyTasks = (): StudyTask[] => {
  return getFromStorage(STORAGE_KEYS.STUDY_TASKS, [
    { id: 1, name: "Learn React", createdAt: new Date().toISOString() },
    { id: 2, name: "Solve 5 LeetCode problems", createdAt: new Date().toISOString() },
    { id: 3, name: "Read OS notes", createdAt: new Date().toISOString() },
  ]);
};

export const saveStudyTasks = (tasks: StudyTask[]): void => {
  setToStorage(STORAGE_KEYS.STUDY_TASKS, tasks);
};

export const addStudyTask = (name: string): StudyTask => {
  const tasks = getStudyTasks();
  const newTask: StudyTask = {
    id: Math.max(0, ...tasks.map(t => t.id)) + 1,
    name,
    createdAt: new Date().toISOString(),
  };
  const updatedTasks = [...tasks, newTask];
  saveStudyTasks(updatedTasks);
  return newTask;
};

export const deleteStudyTask = (id: number): void => {
  const tasks = getStudyTasks();
  const updatedTasks = tasks.filter(task => task.id !== id);
  saveStudyTasks(updatedTasks);
};

// Session History Management
export const getSessionHistory = (): SessionRecord[] => {
  return getFromStorage(STORAGE_KEYS.SESSION_HISTORY, []);
};

export const saveSessionHistory = (history: SessionRecord[]): void => {
  setToStorage(STORAGE_KEYS.SESSION_HISTORY, history);
};

export const addSessionRecord = (task: string, duration: number): SessionRecord => {
  const history = getSessionHistory();
  const newRecord: SessionRecord = {
    id: Math.max(0, ...history.map(h => h.id)) + 1,
    task,
    duration,
    completedAt: new Date().toISOString(),
  };
  const updatedHistory = [...history, newRecord];
  saveSessionHistory(updatedHistory);
  return newRecord;
};

export const clearSessionHistory = (): void => {
  saveSessionHistory([]);
};

// User Preferences Management
export const getUserPreferences = (): UserPreferences => {
  return getFromStorage(STORAGE_KEYS.USER_PREFERENCES, {
    defaultStudyDuration: 25,
    autoStartBreaks: false,
    notifications: true,
    soundEnabled: true,
  });
};

export const saveUserPreferences = (preferences: UserPreferences): void => {
  setToStorage(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

export const updateUserPreferences = (updates: Partial<UserPreferences>): void => {
  const preferences = getUserPreferences();
  const updatedPreferences = { ...preferences, ...updates };
  saveUserPreferences(updatedPreferences);
};

// Theme Management
export const getTheme = (): 'light' | 'dark' => {
  return getFromStorage(STORAGE_KEYS.THEME, 'light');
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
  setToStorage(STORAGE_KEYS.THEME, theme);
};

// Analytics and Statistics
export const getStudyStats = () => {
  const history = getSessionHistory();
  const plan = getPlan();
  
  const totalSessions = history.length;
  const totalStudyTime = history.reduce((sum, session) => sum + session.duration, 0);
  const completedGoals = plan.filter(item => item.completed).length;
  const totalGoals = plan.length;
  
  // Get study time by day for the last 7 days (Monday to Sunday)
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i)); // Start from 6 days ago, go to today
    return date.toISOString().split('T')[0];
  });
  
  const studyTimeByDay = last7Days.map(date => {
    const daySessions = history.filter(session => 
      session.completedAt.startsWith(date)
    );
    return {
      date,
      minutes: daySessions.reduce((sum, session) => sum + session.duration, 0)
    };
  });
  
  return {
    totalSessions,
    totalStudyTime,
    completedGoals,
    totalGoals,
    completionRate: totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0,
    studyTimeByDay,
    averageSessionLength: totalSessions > 0 ? totalStudyTime / totalSessions : 0,
  };
};

// Data Export/Import
export const exportData = () => {
  const data = {
    schedule: getSchedule(),
    plan: getPlan(),
    studyTasks: getStudyTasks(),
    sessionHistory: getSessionHistory(),
    userPreferences: getUserPreferences(),
    theme: getTheme(),
    exportDate: new Date().toISOString(),
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `studybuddy-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.schedule) saveSchedule(data.schedule);
    if (data.plan) savePlan(data.plan);
    if (data.studyTasks) saveStudyTasks(data.studyTasks);
    if (data.sessionHistory) saveSessionHistory(data.sessionHistory);
    if (data.userPreferences) saveUserPreferences(data.userPreferences);
    if (data.theme) saveTheme(data.theme);
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Clear all data
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}; 