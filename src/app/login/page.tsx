"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "next/head";
import styles from "../page.module.css";

export default function Login() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);

  const toggleMode = () => setIsSignup(!isSignup);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dummy authentication logic
    router.push("/study");
  };

  return (
    <div className={styles.colourfulMode + " d-flex justify-content-center align-items-center "} >
      <Head>
        <title>{isSignup ? "Signup" : "Login"} - StudyBuddy</title>
      </Head>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">{isSignup ? "Signup" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" required />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>
        <div className="mt-3 text-center">
          <button className="btn btn-link" onClick={toggleMode}>
            {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
