import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

export function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div style={{ textAlign: 'left' }}>
          <Link to="/" className={styles.backLink}>
            ← Back to Store
          </Link>
        </div>
        
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Please sign in to your account.</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
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
            Sign In
          </button>
        </form>

        <p className={styles.footerText}>
          Don't have an account? 
          <Link to="/register" className={styles.footerLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}