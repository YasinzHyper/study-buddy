"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getStudyStats, getSchedule, getPlan, getStudyTasks } from "@/lib/storage";

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [recentSchedule, setRecentSchedule] = useState<any[]>([]);
  const [recentPlan, setRecentPlan] = useState<any[]>([]);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);

  useEffect(() => {
    // Load all data from localStorage
    const studyStats = getStudyStats();
    const schedule = getSchedule();
    const plan = getPlan();
    const tasks = getStudyTasks();

    setStats(studyStats);
    setRecentSchedule(schedule.slice(0, 3));
    setRecentPlan(plan.slice(0, 3));
    setRecentTasks(tasks.slice(0, 3));
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your study data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="gradient-bg-hero rounded-2xl p-8 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to StudyBuddy
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Your personal study companion for organized learning and productive sessions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                View Schedule
              </Button>
            </Link>
            <Link href="/study">
              <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary">
                Start Studying
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Study Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text-strong">{stats.totalSessions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalStudyTime} minutes total
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Goals Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text-strong">{stats.completedGoals}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completionRate.toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text-strong">{stats.averageSessionLength.toFixed(0)}m</div>
            <p className="text-xs text-muted-foreground">
              per study session
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text-strong">{stats.totalGoals - stats.completedGoals}</div>
            <p className="text-xs text-muted-foreground">
              remaining to complete
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Schedule */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="gradient-text">Recent Schedule</span>
              <Link href="/schedule">
                <Button variant="ghost" size="sm" className="gradient-button">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSchedule.length === 0 ? (
              <p className="text-sm text-muted-foreground">No scheduled sessions</p>
            ) : (
              <div className="space-y-2">
                {recentSchedule.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm p-2 rounded-lg gradient-bg-soft">
                    <span className="font-medium">{item.subject}</span>
                    <Badge variant="secondary" className="gradient-bg-soft">{item.date}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Goals */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="gradient-text">Recent Goals</span>
              <Link href="/plan">
                <Button variant="ghost" size="sm" className="gradient-button">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPlan.length === 0 ? (
              <p className="text-sm text-muted-foreground">No goals set</p>
            ) : (
              <div className="space-y-2">
                {recentPlan.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm p-2 rounded-lg gradient-bg-soft">
                    <span className="font-medium truncate">{item.title}</span>
                    <Badge variant={item.completed ? "default" : "secondary"} className={item.completed ? "gradient-bg" : "gradient-bg-soft"}>
                      {item.completed ? "Done" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="gradient-text">Study Tasks</span>
              <Link href="/study">
                <Button variant="ghost" size="sm" className="gradient-button">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No study tasks</p>
            ) : (
              <div className="space-y-2">
                {recentTasks.map((item) => (
                  <div key={item.id} className="text-sm p-2 rounded-lg gradient-bg-soft">
                    <span className="font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="gradient-card-hover">
        <CardHeader>
          <CardTitle className="gradient-text">Weekly Study Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            // Debug: Log the data to see what we're working with
            console.log('Study stats:', stats);
            console.log('Study time by day:', stats.studyTimeByDay);
            
            const hasData = stats.studyTimeByDay.some((day: any) => day.minutes > 0);
            console.log('Has data:', hasData);
            
            return hasData ? (
              <div className="space-y-4">
                <div className="flex items-end justify-between h-32 space-x-2">
                  {stats.studyTimeByDay.map((day: any, index: number) => {
                    console.log(`Day ${index}:`, day);
                    const maxMinutes = Math.max(...stats.studyTimeByDay.map((d: any) => d.minutes));
                    const height = maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 10;
                    console.log(`Day ${day.date}: ${day.minutes}m, height: ${height}%`);
                    
                    return (
                      <div key={day.date} className="flex flex-col items-center flex-1">
                        <div className="text-xs text-muted-foreground mb-2">
                          {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div 
                          className="w-full gradient-progress rounded-t transition-all duration-300"
                          style={{ 
                            height: `${Math.max(10, height)}%` 
                          }}
                        ></div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {day.minutes}m
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Total study time this week: {stats.studyTimeByDay.reduce((sum: number, day: any) => sum + day.minutes, 0)} minutes
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 gradient-bg-soft rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 gradient-text">No study data yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start your first study session to see your progress here!
                </p>
                <div className="flex items-end justify-between h-32 space-x-2 opacity-50">
                  {stats.studyTimeByDay.map((day: any, index: number) => (
                    <div key={day.date} className="flex flex-col items-center flex-1">
                      <div className="text-xs text-muted-foreground mb-2">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="w-full bg-muted rounded-t" style={{ height: '10px' }}></div>
                      <div className="text-xs text-muted-foreground mt-1">0m</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 justify-center mt-4">
                  <Link href="/study">
                    <Button className="gradient-button">
                      Start Your First Session
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      // Add test data for debugging
                      const testData = [
                        { task: "Test Study", duration: 25, completedAt: new Date().toISOString() },
                        { task: "Another Session", duration: 35, completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
                        { task: "Weekend Study", duration: 45, completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
                      ];
                      testData.forEach(record => {
                        const { addSessionRecord } = require('@/lib/storage');
                        addSessionRecord(record.task, record.duration);
                      });
                      window.location.reload();
                    }}
                    className="gradient-border"
                  >
                    Add Test Data
                  </Button>
                </div>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Features Section */}
      <section id="features" className="py-8">
        <h2 className="text-3xl font-bold text-center mb-10 gradient-text">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="gradient-card-hover">
            <CardHeader>
              <CardTitle className="gradient-text">Smart Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create personalized study schedules based on your goals and availability.</p>
            </CardContent>
          </Card>
          <Card className="gradient-card-hover">
            <CardHeader>
              <CardTitle className="gradient-text">Goal Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Set and track your learning goals with progress visualization.</p>
            </CardContent>
          </Card>
          <Card className="gradient-card-hover">
            <CardHeader>
              <CardTitle className="gradient-text">Pomodoro Timer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Stay focused with the Pomodoro technique and track your study sessions.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-12 text-center gradient-bg-hero text-white rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
        <p className="text-lg mb-8 opacity-90">Start organizing your study routine today!</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/schedule">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
              Plan Your Schedule
            </Button>
          </Link>
          <Link href="/study">
            <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white hover:text-primary">
              Start Studying
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
