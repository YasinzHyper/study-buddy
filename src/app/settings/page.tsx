"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  getUserPreferences, 
  updateUserPreferences, 
  getStudyStats, 
  exportData, 
  importData as importDataFunction, 
  clearAllData,
  UserPreferences 
} from "@/lib/storage";

export default function Settings() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    defaultStudyDuration: 25,
    autoStartBreaks: false,
    notifications: true,
    soundEnabled: true,
  });
  const [stats, setStats] = useState<any>(null);
  const [importDataText, setImportDataText] = useState<string>("");
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    const savedPreferences = getUserPreferences();
    const studyStats = getStudyStats();
    
    setPreferences(savedPreferences);
    setStats(studyStats);
  }, []);

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    const updatedPreferences = { ...preferences, [key]: value };
    setPreferences(updatedPreferences);
    updateUserPreferences(updatedPreferences);
  };

  const handleExport = () => {
    exportData();
  };

  const handleImport = () => {
    if (importDataText.trim()) {
      const success = importDataFunction(importDataText);
      if (success) {
        alert("Data imported successfully! Please refresh the page.");
        setImportDataText("");
        setShowImport(false);
      } else {
        alert("Failed to import data. Please check the format.");
      }
    }
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      clearAllData();
      alert("All data has been cleared. Please refresh the page.");
    }
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="gradient-bg-soft rounded-2xl p-6 mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Study Preferences */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="gradient-text text-xl">Study Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium">Default Study Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="120"
                value={preferences.defaultStudyDuration}
                onChange={(e) => handlePreferenceChange('defaultStudyDuration', parseInt(e.target.value))}
                className="gradient-border focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center space-x-3 p-3 gradient-bg-soft rounded-lg">
              <input
                id="autoStartBreaks"
                type="checkbox"
                checked={preferences.autoStartBreaks}
                onChange={(e) => handlePreferenceChange('autoStartBreaks', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="autoStartBreaks" className="text-sm">Auto-start breaks after study sessions</Label>
            </div>

            <div className="flex items-center space-x-3 p-3 gradient-bg-soft rounded-lg">
              <input
                id="notifications"
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="notifications" className="text-sm">Enable notifications</Label>
            </div>

            <div className="flex items-center space-x-3 p-3 gradient-bg-soft rounded-lg">
              <input
                id="soundEnabled"
                type="checkbox"
                checked={preferences.soundEnabled}
                onChange={(e) => handlePreferenceChange('soundEnabled', e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="soundEnabled" className="text-sm">Enable sound effects</Label>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="gradient-text text-xl">Your Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 gradient-bg-soft rounded-lg">
                <div className="text-2xl font-bold gradient-text-strong">{stats.totalSessions}</div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
              </div>
              <div className="text-center p-4 gradient-bg-soft rounded-lg">
                <div className="text-2xl font-bold gradient-text-strong">{stats.totalStudyTime}</div>
                <div className="text-sm text-muted-foreground">Minutes Studied</div>
              </div>
              <div className="text-center p-4 gradient-bg-soft rounded-lg">
                <div className="text-2xl font-bold gradient-text-strong">{stats.completedGoals}</div>
                <div className="text-sm text-muted-foreground">Goals Completed</div>
              </div>
              <div className="text-center p-4 gradient-bg-soft rounded-lg">
                <div className="text-2xl font-bold gradient-text-strong">{stats.completionRate.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="gradient-text text-xl">Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button onClick={handleExport} className="w-full gradient-button">
                📤 Export All Data
              </Button>
              <p className="text-xs text-muted-foreground">
                Download a backup of all your study data as a JSON file
              </p>
            </div>

            <div className="space-y-2">
              {!showImport ? (
                <Button 
                  onClick={() => setShowImport(true)} 
                  variant="outline" 
                  className="w-full gradient-border hover:gradient-bg-soft"
                >
                  📥 Import Data
                </Button>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Paste your exported JSON data here..."
                    value={importDataText}
                    onChange={(e) => setImportDataText(e.target.value)}
                    rows={4}
                    className="gradient-border focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleImport} className="flex-1 gradient-button">
                      Import
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowImport(false);
                        setImportDataText("");
                      }} 
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Import previously exported data (this will overwrite current data)
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleClearData} 
                variant="destructive" 
                className="w-full gradient-bg-strong text-white hover:opacity-90"
              >
                🗑️ Clear All Data
              </Button>
              <p className="text-xs text-muted-foreground">
                Permanently delete all your study data
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="gradient-text text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.studyTimeByDay.some((day: any) => day.minutes > 0) ? (
              <div className="space-y-3">
                {stats.studyTimeByDay.slice(-7).reverse().map((day: any) => (
                  <div key={day.date} className="flex justify-between items-center p-3 gradient-bg-soft rounded-lg">
                    <span className="text-sm">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <Badge variant={day.minutes > 0 ? "default" : "secondary"} className={day.minutes > 0 ? "gradient-bg" : "gradient-bg-soft"}>
                      {day.minutes}m
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 gradient-bg-soft rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-sm text-muted-foreground">No study activity recorded yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 