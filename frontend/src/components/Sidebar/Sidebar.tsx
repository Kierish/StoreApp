import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>
        Filters
      </h3>
      <p className={styles.placeholder}>
        Placeholder for categories, price sliders, etc.
      </p>
    </aside>
  );
}