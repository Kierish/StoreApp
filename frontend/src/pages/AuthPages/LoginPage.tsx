import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { setTokens } from "../../utils/token";
import { useAuth } from "../../contexts/AuthContext";
import { useLogin } from "../../hooks/api/useAuthApi";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginMutation.mutateAsync({ email, password });
      
      setTokens(data.token, data.refreshToken);
      login(data.token);
      
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
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
        
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Please sign in to your account.</p>

        {loginMutation.isError && (
          <div style={{ color: '#721c24', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.9rem' }}>
            {loginMutation.error.message}
          </div>
        )}

        <form className={styles.form} onSubmit={handleLogin}>
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

          <button type="submit" className={styles.button} disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
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