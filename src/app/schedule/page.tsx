"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSchedule, saveSchedule, addScheduleItem, deleteScheduleItem, ScheduleItem } from "@/lib/storage";

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // Load schedule from localStorage on component mount
  useEffect(() => {
    const savedSchedule = getSchedule();
    setSchedule(savedSchedule);
  }, []);

  const handleAddSession = () => {
    if (newSubject && newDate && newTime) {
      const newSession = addScheduleItem({
        subject: newSubject,
        date: newDate,
        time: newTime,
      });
      setSchedule([...schedule, newSession]);
      setNewSubject("");
      setNewDate("");
      setNewTime("");
    }
  };

  const handleDeleteSession = (id: number) => {
    deleteScheduleItem(id);
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="gradient-bg-soft rounded-2xl p-6 mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">Your Study Schedule</h1>
          <p className="text-muted-foreground">Organize your study sessions efficiently</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Schedule List */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="text-center gradient-text text-xl">Scheduled Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {schedule.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 gradient-bg-soft rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <p className="text-muted-foreground">No study sessions scheduled yet.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {schedule.map((item) => (
                  <li key={item.id} className="gradient-bg-soft rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-semibold text-lg gradient-text">{item.subject}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <span>📅 {item.date}</span>
                          <span>🕐 {item.time}</span>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteSession(item.id)}
                        className="gradient-bg-strong text-white hover:opacity-90"
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Add New Session */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="text-center gradient-text text-xl">Add New Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={e => {
                e.preventDefault();
                handleAddSession();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  required
                  placeholder="e.g. Data Structures"
                  className="gradient-border focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  required
                  className="gradient-border focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  required
                  className="gradient-border focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button type="submit" className="w-full gradient-button text-lg py-3">
                Add Session
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      {schedule.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">{schedule.length}</div>
              <div className="text-sm text-muted-foreground">Total Sessions</div>
            </CardContent>
          </Card>
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">
                {schedule.filter(item => new Date(item.date) >= new Date()).length}
              </div>
              <div className="text-sm text-muted-foreground">Upcoming Sessions</div>
            </CardContent>
          </Card>
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">
                {schedule.filter(item => new Date(item.date) < new Date()).length}
              </div>
              <div className="text-sm text-muted-foreground">Past Sessions</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
