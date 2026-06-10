import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../contexts/AuthContext"; 

export function Navbar() {
  const { isAuthenticated, logout } = useAuth(); 

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Store
      </Link>
      
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search for products..." 
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>
          🔍
        </span>
      </div>

      <div className={styles.actions}>
        <div className={styles.cartAction}>
          <span className={styles.cartIcon}>🛒</span>
          <span>Cart</span>
          <span className={styles.cartBadge}>0</span>
        </div>

        {isAuthenticated ? (
          <div className={styles.profileContainer}>
            <div className={styles.profileAvatar}>👤</div>
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem}>My Profile</div>
              <div className={styles.dropdownItem}>Orders</div>
              <div className={styles.dropdownItem}>Settings</div>
              <button 
                className={`${styles.dropdownItem} ${styles.logoutBtn}`} 
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className={styles.loginLink}>
            <div className={styles.loginButton}>
              <span className={styles.loginIcon}>👤</span>
              <span>Log In</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}