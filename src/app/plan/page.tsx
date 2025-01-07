"use client";
import React, { useState } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../page.module.css";

type PlanItem = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function Plan() {
  const [plan, setPlan] = useState<PlanItem[]>([
    { id: 1, title: "Learn Data Structures", description: "Complete 5 LeetCode problems daily.", completed: false },
    { id: 2, title: "Master Algorithms", description: "Study sorting and searching algorithms.", completed: false },
    { id: 3, title: "Revise Operating Systems", description: "Go through OS concepts and practice questions.", completed: false },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddPlan = () => {
    if (newTitle && newDescription) {
      const newPlanItem: PlanItem = {
        id: plan.length + 1,
        title: newTitle,
        description: newDescription,
        completed: false,
      };
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
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedPlan = Array.from(plan);
    const [movedItem] = reorderedPlan.splice(result.source.index, 1);
    reorderedPlan.splice(result.destination.index, 0, movedItem);
    setPlan(reorderedPlan);
  };

  return (
    <div className={`${styles.colourfulMode} px-5 py-5`}>
      <Head>
        <title>Plan - StudyBuddy</title>
      </Head>
      <h1 className="text-center mb-5">Your Study Plan</h1>

      <div className="row">
        {/* Plan List */}
        <div className="col-md-6 mb-4">
          <h2 className="mb-4 text-center">Current Goals</h2>
          {plan.length === 0 ? (
            <p className="text-center">No goals added yet. Start planning now!</p>
          ) : (
            <ul className="list-group">
              {plan.map((item) => (
                <li
                  key={item.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    item.completed ? "list-group-item-success" : ""
                  }`}
                >
                  <div>
                    <strong>{item.title}</strong>
                    <p className="mb-1">{item.description}</p>
                  </div>
                  <button
                    className={`btn btn-${item.completed ? "secondary" : "primary"} btn-sm`}
                    onClick={() => handleToggleComplete(item.id)}
                  >
                    {item.completed ? "Undo" : "Complete"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add New Plan */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Add a New Goal</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPlan();
              }}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Goal Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Add Goal
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-center mb-4">Milestone Timeline</h2>
        <div className="timeline">
          {plan.map((item, index) => (
            <div key={item.id} className="timeline-item flex justify-center">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          padding-left: 40px;
          border-left: 4px solidrgb(98, 146, 187);
        }
        .timeline-item {
          position: relative;
          padding-left: 20px;
        }
        .timeline-dot {
          position: absolute;
          left: -12px;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #6c757d;
          border: 2px solid #fff;
        }
        .timeline-content {
          background: rgba(45, 98, 177, 0.8);
          padding: 10px 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
