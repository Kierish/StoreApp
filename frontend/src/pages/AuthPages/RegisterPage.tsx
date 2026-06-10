import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { setTokens } from "../../utils/token";
import { useAuth } from "../../contexts/AuthContext";
import { useRegister } from "../../hooks/api/useAuthApi";

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const registerMutation = useRegister();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await registerMutation.mutateAsync({ userName, email, phoneNumber, password });

      setTokens(data.token, data.refreshToken);
      login(data.token);

      navigate("/");
    } catch (err) {
      // Error is automatically handled and displayed by registerMutation.isError
      console.error("Registration failed:", err);
    }
  };

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

        {registerMutation.isError && (
          <div style={{ color: '#721c24', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.9rem' }}>
            {registerMutation.error.message}
          </div>
        )}

        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input 
              type="text" 
              placeholder="Choose a username"
              className={styles.input} 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className={styles.input} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Phone Number</label>
            <input 
              type="tel" 
              placeholder="+48 123 456 789"
              className={styles.input} 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`${styles.input} ${styles.passwordInput}`} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1} 
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"} 
              </button>
            </div>
          </div>

          <button type="submit" className={styles.button} disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Signing Up..." : "Sign Up"}
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