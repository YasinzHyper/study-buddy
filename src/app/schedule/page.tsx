"use client";
import React, { useState } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../page.module.css";

type ScheduleItem = {
  id: number;
  subject: string;
  date: string;
  time: string;
};

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { id: 1, subject: "Data Structures", date: "2025-01-08", time: "10:00 AM" },
    { id: 2, subject: "Algorithms", date: "2025-01-09", time: "2:00 PM" },
    { id: 3, subject: "Operating Systems", date: "2025-01-10", time: "11:00 AM" },
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleAddSession = () => {
    if (newSubject && newDate && newTime) {
      const newSession: ScheduleItem = {
        id: schedule.length + 1,
        subject: newSubject,
        date: newDate,
        time: newTime,
      };
      setSchedule([...schedule, newSession]);
      setNewSubject("");
      setNewDate("");
      setNewTime("");
    }
  };

  const handleDeleteSession = (id: number) => {
    const updatedSchedule = schedule.filter((item) => item.id !== id);
    setSchedule(updatedSchedule);
  };

  return (
    <div className={`${styles.colourfulMode} px-5 pt-5`}>
      <Head>
        <title>Schedule - StudyBuddy</title>
      </Head>
      <h1 className="text-center mb-5">Your Study Schedule</h1>

      <div className="row">
        {/* Schedule List */}
        <div className="col-md-6 mb-4">
          <h2 className="mb-4 text-center">Scheduled Sessions</h2>
          {schedule.length === 0 ? (
            <p className="text-center">No study sessions scheduled yet.</p>
          ) : (
            <ul className="list-group">
              {schedule.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.subject}</strong> - {item.date} at {item.time}
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteSession(item.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add New Session */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Add New Session</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSession();
              }}
            >
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="form-control"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  className="form-control"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Add Session
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
