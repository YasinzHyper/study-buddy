"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../page.module.css";

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Focus on being productive instead of busy.",
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done.",
  "Don’t watch the clock; do what it does. Keep going."
];

export default function Study() {
  const [tasks, setTasks] = useState<string[]>(["Learn React", "Solve 5 LeetCode problems", "Read OS notes"]);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [timer, setTimer] = useState<number>(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<string[]>([]);
  const [quote, setQuote] = useState<string>("");

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
    setTimer(25 * 60);
    setSessionHistory([...sessionHistory, selectedTask]);
    setSelectedTask("");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`${styles.colourfulMode} px-5 py-5`}>
      <Head>
        <title>Study - StudyBuddy</title>
      </Head>
      <h1 className="text-center mb-4">Focused Study Sessions</h1>

      <div className="row">
        {/* Task Selection */}
        <div className="col-md-6 mb-4">
          <h2 className="mb-4 text-center">Select a Task</h2>
          <ul className="list-group">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`list-group-item ${selectedTask === task ? "active" : ""}`}
                onClick={() => setSelectedTask(task)}
                style={{ cursor: "pointer" }}
              >
                {task}
              </li>
            ))}
          </ul>
        </div>

        {/* Timer and Quote */}
        <div className="col-md-6 d-flex flex-column align-items-center">
          <div className="card shadow p-4 mb-4 text-center" style={{ width: "100%" }}>
            <h2 className="mb-4">Pomodoro Timer</h2>
            <h1 className="display-4">{formatTime(timer)}</h1>
            <p className="lead">{quote}</p>
            {!isRunning ? (
              <button
                className="btn btn-primary btn-lg mt-3"
                onClick={handleStartSession}
                disabled={!selectedTask}
              >
                Start Session
              </button>
            ) : (
              <button
                className="btn btn-danger btn-lg mt-3"
                onClick={handleEndSession}
              >
                End Session
              </button>
            )}
          </div>

          {/* Session History */}
          {sessionHistory.length > 0 && (
            <div className="card shadow p-4 text-center" style={{ width: "100%" }}>
              <h2 className="mb-4">Session History</h2>
              <ul className="list-group">
                {sessionHistory.map((session, index) => (
                  <li key={index} className="list-group-item">
                    {session}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .list-group-item {
          transition: background-color 0.3s ease;
        }
        .list-group-item:hover {
          background-color: rgba(0, 123, 255, 0.1);
        }
        .active {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </div>
  );
}
