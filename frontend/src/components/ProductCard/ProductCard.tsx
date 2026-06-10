import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductCard.module.css';
import type { ProductReadDto } from '../../types/product';
import { useAuth } from '../../contexts/AuthContext'; 

interface ProductCardProps {
  product: ProductReadDto;
  onEditClick?: (product: ProductReadDto) => void;   
  onDeleteClick?: (product: ProductReadDto) => void; 
}

export function ProductCard({ product, onEditClick, onDeleteClick }: ProductCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); 

  const metaData = product.pageMetadata; 
  const imageUrl = metaData?.openGraphImageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80';
  const description = metaData?.metaDescription || 'No description available for this product.';

  const isEmployee = user?.role === 'Employee' || user?.role === 'Admin';

  const handleCardClick = () => {
    navigate(`/product/${product.id}`, { 
      state: { searchParams: location.search } 
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} role="button" tabIndex={0}>
      
      {isEmployee && (
        <div className={styles.adminActions}>
          <button 
            className={styles.tinyBtn} 
            title="Edit"
            onClick={(e) => { e.stopPropagation(); onEditClick?.(product); }}
          >
            ✏️
          </button>
          <button 
            className={styles.tinyBtn} 
            title="Delete"
            onClick={(e) => { e.stopPropagation(); onDeleteClick?.(product); }}
          >
            🗑️
          </button>
        </div>
      )}

      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={product.name} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.category}>
          Category: <span className={styles.categoryLink}>{product.categoryName || 'General'}</span>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.tagsContainer}>
          {product.tagNames?.map((tag, index) => (
            <span key={index} className={styles.tag}>#{tag}</span>
          ))}
        </div>
      </div>

      <div className={styles.actionSection}>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>from</span>
          <span className={styles.priceAmount}>{product.price.toFixed(2)}</span>
          <span className={styles.priceLabel}>$</span>
        </div>
        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}