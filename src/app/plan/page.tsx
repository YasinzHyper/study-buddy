"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPlan, addPlanItem, updatePlanItem, deletePlanItem, PlanItem } from "@/lib/storage";

export default function Plan() {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Load plan from localStorage on component mount
  useEffect(() => {
    const savedPlan = getPlan();
    setPlan(savedPlan);
  }, []);

  const handleAddPlan = () => {
    if (newTitle && newDescription) {
      const newPlanItem = addPlanItem({
        title: newTitle,
        description: newDescription,
        completed: false,
      });
      setPlan([...plan, newPlanItem]);
      setNewTitle("");
      setNewDescription("");
    }
  };

  const handleToggleComplete = (id: number) => {
    const updatedPlan = plan.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setPlan(updatedPlan);
    updatePlanItem(id, { completed: !plan.find(item => item.id === id)?.completed });
  };

  return (
    <div className="space-y-12">
      <div className="text-center mb-8">
        <div className="gradient-bg-soft rounded-2xl p-6 mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">Your Study Plan</h1>
          <p className="text-muted-foreground">Set goals and track your progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plan List */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="text-center gradient-text text-xl">Current Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {plan.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 gradient-bg-soft rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <p className="text-muted-foreground">No goals added yet. Start planning now!</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {plan.map((item) => (
                  <li key={item.id} className="gradient-bg-soft rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-semibold text-lg gradient-text">{item.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Created: {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant={item.completed ? "secondary" : "default"}
                        size="sm"
                        onClick={() => handleToggleComplete(item.id)}
                        className={item.completed ? "gradient-bg-soft" : "gradient-button"}
                      >
                        {item.completed ? "✓ Completed" : "Mark Complete"}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Add New Plan */}
        <Card className="gradient-card-hover">
          <CardHeader>
            <CardTitle className="text-center gradient-text text-xl">Add a New Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={e => {
                e.preventDefault();
                handleAddPlan();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">Goal Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  required
                  placeholder="e.g. Learn Data Structures"
                  className="gradient-border focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  rows={3}
                  required
                  placeholder="Describe your goal..."
                  className="gradient-border focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button type="submit" className="w-full gradient-button text-lg py-3">
                Add Goal
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      {plan.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">{plan.length}</div>
              <div className="text-sm text-muted-foreground">Total Goals</div>
            </CardContent>
          </Card>
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">
                {plan.filter(item => item.completed).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed Goals</div>
            </CardContent>
          </Card>
          <Card className="gradient-card-hover">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold gradient-text-strong mb-2">
                {plan.length > 0 ? Math.round((plan.filter(item => item.completed).length / plan.length) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Milestone Timeline */}
      {plan.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-8 gradient-text">Milestone Timeline</h2>
          <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
            {plan.map((item) => (
              <div key={item.id} className="relative flex items-start gap-4">
                <span className={`absolute -left-4 top-1 w-4 h-4 rounded-full border-2 ${item.completed ? 'gradient-bg border-primary' : 'bg-muted border-border'}`}></span>
                <div className={`rounded-lg p-4 w-full ${item.completed ? 'gradient-bg-soft' : 'gradient-card'}`}>
                  <div className="font-semibold gradient-text">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {item.completed ? '✓ Completed' : '⏳ In Progress'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
