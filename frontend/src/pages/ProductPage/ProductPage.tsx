import { useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar/Navbar';
import { ConfirmModal } from '../../components/Modal/ConfirmModal'; 
import styles from './ProductPage.module.css';
import { useProduct } from '../../hooks/api/useProduct';
import { useDeleteProduct } from '../../hooks/api/useDeleteProduct';
import { useComments, useAddComment, useDeleteComment } from '../../hooks/api/useComments';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'info' | 'spec' | 'opinions' | 'faq'>('info');
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const previousSearch = location.state?.searchParams || '';
  const backUrl = `/${previousSearch}`;

  const { data: product, isLoading, isError } = useProduct(id);
  const deleteMutation = useDeleteProduct();

  const { data: comments, isLoading: isLoadingComments } = useComments(id);
  const addCommentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment();
  const [newCommentText, setNewCommentText] = useState('');

  const confirmDelete = async () => {
    if (!id) return;
    try {
      await deleteMutation.mutateAsync(id); 
      navigate(backUrl); 
    } catch (error) {
      alert('An error occurred while deleting.');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newCommentText.trim()) return;

    try {
      await addCommentMutation.mutateAsync({
        productId: id,
        text: newCommentText.trim()
      });
      setNewCommentText('');
    } catch (err) {
      alert("Failed to post comment");
    }
  };

  const confirmDeleteComment = async () => {
    if (!id || !commentToDelete) return;
    try {
      await deleteCommentMutation.mutateAsync({ commentId: commentToDelete, productId: id });
    } catch (err) {
      alert("Failed to delete comment");
    } finally {
      setCommentToDelete(null); 
    }
  };

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading product...</div>;
  if (isError || !product) return <div style={{ padding: 40, textAlign: 'center' }}>Product not found!</div>;

  const imageUrl = product.pageMetadata?.openGraphImageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80';
  const isEmployee = user?.role === 'Employee' || user?.role === 'Admin';

  return (
    <div style={{ backgroundColor: '#f3eff7', minHeight: '100vh' }}>
      <Navbar />
      
      <div className={styles.pageWrapper}>
        <Link to={backUrl} className={styles.backLink}>← Back to Store</Link>

        <div className={styles.mainCard}>
          <div className={styles.imageSection}>
            <img src={imageUrl} alt={product.name} className={styles.productImage} />
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <div className={styles.productCategory}>Category: <strong>{product.categoryName}</strong></div>
            
            <p className={styles.productDesc}>{product.pageMetadata?.metaDescription}</p>

            <div className={styles.tags}>
              {product.tagNames?.map(tag => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          </div>

          <div className={styles.actionSection}>
            <div className={styles.priceBox}>
              <span className={styles.priceAmount}>{product.price.toFixed(2)}</span>
              <span className={styles.priceCurrency}>$</span>
            </div>
            
            <button className={styles.addToCartBtn} onClick={() => alert("Added to cart!")}>
              Add to cart
            </button>

            {isEmployee && (
              <div className={styles.actionButtons}>
                <button className={styles.btnEdit} onClick={() => navigate(`/product/${id}/edit`)}>
                  Edit
                </button>
                <button 
                  className={styles.btnDelete}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabsHeader}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'info' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Product Information
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'spec' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('spec')}
            >
              Specification
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'opinions' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('opinions')}
            >
              Opinions ({comments?.length || 0})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'faq' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('faq')}
            >
              Ask a Question (FAQ)
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'info' && (
              <div>
                <h2>About {product.name}</h2>
                <p>{product.pageMetadata?.metaDescription || "No detailed information provided for this product."}</p>
              </div>
            )}
            {activeTab === 'spec' && <div>Specification details will appear here.</div>}
            
            {activeTab === 'opinions' && (
              <div>
                <h2>Customer Opinions</h2>

                {isAuthenticated ? (
                  <form className={styles.addCommentForm} onSubmit={handleAddComment}>
                    <textarea 
                      className={styles.commentTextarea}
                      placeholder="Write your opinion..."
                      value={newCommentText}
                      onChange={e => setNewCommentText(e.target.value)}
                      required
                    />
                    <button 
                      type="submit" 
                      className={styles.submitCommentBtn}
                      disabled={addCommentMutation.isPending || !newCommentText.trim()}
                    >
                      {addCommentMutation.isPending ? 'Posting...' : 'Post Opinion'}
                    </button>
                  </form>
                ) : (
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    Please <Link to="/login" style={{ color: '#5b01ab', fontWeight: 'bold' }}>log in</Link> to leave an opinion.
                  </p>
                )}

                {isLoadingComments ? (
                  <p>Loading opinions...</p>
                ) : comments?.length === 0 ? (
                  <p>No opinions yet. Be the first to review this product!</p>
                ) : (
                  <div className={styles.commentsList}>
                    {comments?.map(comment => {
                      const canDelete = user?.id === comment.userId || isEmployee;

                      return (
                        <div key={comment.id} className={styles.commentItem}>
                          <div className={styles.commentHeader}>
                            <span className={styles.commentAuthor}>{comment.userName}</span>
                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className={styles.commentText}>{comment.text}</p>
                          
                          {canDelete && (
                            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                              <button 
                                className={styles.deleteCommentBtn} 
                                onClick={() => setCommentToDelete(comment.id)}
                                disabled={deleteCommentMutation.isPending}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'faq' && <div>Frequently asked questions will appear here.</div>}
          </div>
        </div>

      </div>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${product?.name}"?`}
        confirmText={deleteMutation.isPending ? "Deleting..." : "Delete"}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <ConfirmModal 
        isOpen={commentToDelete !== null}
        title="Delete Opinion"
        message="Are you sure you want to delete this opinion? This action cannot be undone."
        confirmText={deleteCommentMutation.isPending ? "Deleting..." : "Delete"}
        onConfirm={confirmDeleteComment}
        onCancel={() => setCommentToDelete(null)}
      />
    </div>
  );
}

export default ProductPage;