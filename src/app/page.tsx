"use client";

import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Home() {

  return (
    <div className={styles.colourfulMode}>
      <Head>
        <title>StudyBuddy - Your Study Assistant</title>
        <meta name="description" content="Stay organized and productive with StudyBuddy, your personal study assistant for CS majors." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`py-5 text-center`}>
        <div className="container">
          <h1 className="display-4 fw-bold text-gradient">Welcome to StudyBuddy</h1>
          <p className="lead">Empower your learning journey with cutting-edge tools designed for tech enthusiasts.</p>
          <a href="/login" className="btn btn-warning btn-lg mt-3 shadow center">Get Started</a>
        </div>
      </header>

      <main>
        <section id="features" className={`py-5 ${styles.featuresSection}`}>
          <div className="container">
            <h2 className="text-center mb-5 fw-bold">Core Features</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className={`card shadow-lg ${styles.featureCard}`}>
                  <div className={`card-body ${styles.cardBody}`}>
                    <div className="icon mb-3 text-primary">
                      <i className="bi bi-calendar-check fs-1"></i>
                    </div>
                    <h5 className="card-title">Smart Scheduling</h5>
                    <p className="card-text">Create personalized study schedules based on your goals and availability.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`card shadow-lg ${styles.featureCard}`}>
                  <div className={`card-body ${styles.cardBody}`}>
                    <div className="icon mb-3 text-success">
                      <i className="bi bi-folder fs-1"></i>
                    </div>
                    <h5 className="card-title">Material Organization</h5>
                    <p className="card-text">Keep all your study materials neatly organized in one place.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`card shadow-lg ${styles.featureCard}`}>
                  <div className={`card-body ${styles.cardBody}`}>
                    <div className="icon mb-3 text-warning">
                      <i className="bi bi-lightbulb fs-1"></i>
                    </div>
                    <h5 className="card-title">AI-Powered Suggestions</h5>
                    <p className="card-text">Get smart suggestions to improve your study efficiency.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className={`py-5 ${styles.testimonialsSection}`}>
          <div className="container">
            <h2 className="text-center mb-5 fw-bold">What Our Users Say</h2>
            <div className="row g-4">
              <div className="col-md-6">
                <blockquote className={`blockquote p-4 shadow-lg ${styles.testimonialBlock}`}>
                  <p className="mb-3">StudyBuddy has transformed the way I organize my study schedule. Highly recommended!</p>
                  <footer className="blockquote-footer text-end">Jane Doe, CS Major</footer>
                </blockquote>
              </div>
              <div className="col-md-6">
                <blockquote className={`blockquote p-4 shadow-lg ${styles.testimonialBlock}`}>
                  <p className="mb-3">With StudyBuddy, staying on top of my courses has never been easier.</p>
                  <footer className="blockquote-footer text-end">John Smith, Software Engineering Student</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className={`py-5 text-center ${styles.ctaSection}`}>
          <div className="container">
            <h2 className="mb-4 fw-bold">Ready to Boost Your Productivity?</h2>
            <a href="/login" className="btn btn-warning btn-lg shadow">Get Started</a>
          </div>
        </section>
      </main>

      <footer className={`py-3 text-center ${styles.footer}`}>
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} StudyBuddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
