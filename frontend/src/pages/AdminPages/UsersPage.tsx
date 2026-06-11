import { Navbar } from '../../components/Navbar/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { useUsers, useChangeRole } from '../../hooks/api/useUsers';
import { Link } from 'react-router-dom';
import styles from './UsersPage.module.css';

export function UsersPage() {
  const { user } = useAuth(); 
  const { data: users, isLoading, isError } = useUsers();
  const changeRoleMutation = useChangeRole();

  if (user?.role !== 'Admin') {
    return (
      <div style={{ backgroundColor: '#f3eff7', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2>Access Denied</h2>
          <p>You must be an Admin to view this page.</p>
          <Link to="/">Return to Store</Link>
        </div>
      </div>
    );
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await changeRoleMutation.mutateAsync({ id: userId, newRole });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to change role');
    }
  };

  return (
    <div style={{ backgroundColor: '#f3eff7', minHeight: '100vh' }}>
      <Navbar />
      
      <div className={styles.pageWrapper}>
        
        <Link to="/" className={styles.backLink}>← Back to Store</Link>

        <div className={styles.mainCard}>
          <h1 className={styles.pageTitle}>User Management</h1>
          
          {isError && (
            <div className={styles.errorMessage}>Failed to load users from the server.</div>
          )}

          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Username</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users?.map(u => {
                  const isCurrentUser = u.id === user?.id;

                  return (
                    <tr key={u.id}>
                      <td className={styles.td}>{u.userName}</td>
                      <td className={styles.td}>{u.email}</td>
                      <td className={styles.td}>
                        
                        {isCurrentUser ? (
                          <span style={{ fontWeight: 'bold', color: '#5b01ab', padding: '8px 0' }}>
                            {u.role} <span style={{ color: '#888', fontWeight: 'normal' }}>(You)</span>
                          </span>
                        ) : (
                          <select 
                            className={styles.roleSelect}
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            disabled={
                              changeRoleMutation.isPending && 
                              changeRoleMutation.variables?.id === u.id
                            }
                          >
                            <option value="Customer">Customer</option>
                            <option value="Employee">Employee</option>
                            <option value="Admin">Admin</option>
                          </select>
                        )}

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}