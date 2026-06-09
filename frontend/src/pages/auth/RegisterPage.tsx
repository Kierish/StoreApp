import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

export function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div style={{ textAlign: 'left' }}>
          <Link to="/" className={styles.backLink}>
            ← Back to Store
          </Link>
        </div>
        
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Register to start shopping with us.</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input 
              type="text" 
              placeholder="Choose a username"
              className={styles.input} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className={styles.input} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Phone Number</label>
            <input 
              type="tel" 
              placeholder="+48 123 456 789"
              className={styles.input} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className={styles.input} 
            />
          </div>

          <button type="button" className={styles.button}>
            Sign Up
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? 
          <Link to="/login" className={styles.footerLink}>
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}