import { useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import { apiClient } from '../../api/apiClient';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar/Navbar';
import { ConfirmModal } from '../../components/Modal/ConfirmModal'; 
import type { ProductReadDto } from '../../types/product';
import styles from './ProductPage.module.css';

const fetchProductById = async (id: string): Promise<ProductReadDto> => {
  const response = await apiClient(`/api/Product/${id}`);
  if (!response.ok) throw new Error('Product not found');
  return response.json();
};

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient(); 
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'info' | 'spec' | 'opinions' | 'faq'>('info');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  const previousSearch = location.state?.searchParams || '';
  const backUrl = `/${previousSearch}`;

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const confirmDelete = async () => {
    try {
      const response = await apiClient(`/api/Product/${id}`, { method: 'DELETE' });
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['products'] }); 
        navigate(backUrl); 
      } else {
        alert('Failed to delete product.');
      }
    } catch (error) {
      alert('An error occurred while deleting.');
    } finally {
      setIsDeleteModalOpen(false);
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
                <button className={styles.btnEdit} onClick={() => alert("Update functionality coming next!")}>
                  Edit
                </button>
                <button className={styles.btnDelete} onClick={() => setIsDeleteModalOpen(true)}>
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
              Opinions
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
            {activeTab === 'opinions' && <div>User reviews and ratings will appear here.</div>}
            {activeTab === 'faq' && <div>Frequently asked questions will appear here.</div>}
          </div>
        </div>

      </div>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"?`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}

export default ProductPage;