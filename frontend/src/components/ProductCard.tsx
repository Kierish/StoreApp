export interface ProductSeoReadDto {
  metaTitle: string;
  metaDescription?: string;
  slug?: string;
  openGraphImageUrl?: string;
}

export interface ProductReadDto {
  id: string;
  name: string;
  tagNames?: string[];
  categoryId: string;
  categoryName?: string;
  price: number;
  productSeo?: ProductSeoReadDto;
}

interface ProductCardProps{
    product: ProductReadDto;
}

export function ProductCard({ product }: ProductCardProps) {
  const seo = product.productSeo;
  const imageUrl = seo?.openGraphImageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80';
  const description = seo?.metaDescription || 'No description available for this product.';

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row',   
      border: '1px solid #e8e8e8', 
      borderRadius: '12px', 
      width: '100%',
      maxWidth: '1100px', 
      padding: '16px',
      margin: '10px auto', 
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      gap: '24px' 
    }}>
      <div style={{ width: '160px', height: '160px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
        <img 
          src={imageUrl} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        borderRight: '1px solid #eee', 
        paddingRight: '24px'
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', color: '#111', fontWeight: 'bold' }}>
          {product.name}
        </h3>
        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '12px' }}>
          Category: <span style={{ color: '#007bff', cursor: 'pointer' }}>{product.categoryName || 'General'}</span>
        </div>

        <p style={{ margin: '0 0 16px 0', color: '#555', fontSize: '0.9rem', lineHeight: '1.5' }}>
          {description}
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {product.tagNames?.map((tag, index) => (
            <span key={index} style={{ 
              backgroundColor: '#f5f5f5', 
              color: '#444', 
              padding: '4px 10px', 
              borderRadius: '16px', 
              fontSize: '0.75rem' 
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ 
        width: '180px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'baseline', 
          gap: '4px',
          marginBottom: '16px' 
        }}>
          <span style={{ fontSize: '1.1rem', color: '#555', marginRight: '4px' }}>
            from
          </span>
          <span style={{ fontSize: '2rem', fontWeight: '900', color: '#5b01ab', lineHeight: '1' }}>
            {product.price.toFixed(2)}
          </span>

          <span style={{ fontSize: '1.1rem', color: '#555', marginRight: '4px' }}>
            $
          </span>
        </div>
        <button style={{ 
          backgroundColor: '#5b01ab', 
          color: 'white', 
          border: 'none', 
          borderRadius: '24px', 
          padding: '10px 0', 
          width: '100%',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(255, 102, 0, 0.2)'
        }}>
          Add to cart
        </button>
      </div>

    </div>
  );
}