import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ 
  isOpen, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel 
}: ConfirmModalProps) {
  
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>{cancelText}</button>
          <button className={styles.btnConfirm} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}