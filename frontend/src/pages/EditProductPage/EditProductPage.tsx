import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { useProduct } from '../../hooks/api/useProduct';
import { useUpdateProduct } from '../../hooks/api/useUpdateProduct';
import styles from './EditProductPage.module.css';
import { useCategories } from '../../hooks/api/useCategories';
import { useTags } from '../../hooks/api/useTags';
import type { ProductCreateDto } from '../../types/product';

const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80';

export function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: product, isLoading, isError } = useProduct(id);
  const updateMutation = useUpdateProduct();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: tagsData, isLoading: isLoadingTags } = useTags();

  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [price, setPrice] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategoryName(product.categoryName || '');
      setPrice(product.price ? product.price.toString() : '');
      setSelectedTags(product.tagNames || []);
      setMetaTitle(product.pageMetadata?.metaTitle || '');
      setMetaDescription(product.pageMetadata?.metaDescription || '');
      setImageUrl(product.pageMetadata?.openGraphImageUrl || '');
    }
  }, [product]);

  const isEmployee = user?.role === 'Employee' || user?.role === 'Admin';

  if (!isEmployee) {
    return (
      <div style={{ backgroundColor: '#f3eff7', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to view this page.</p>
          <Link to="/">Return to Store</Link>
        </div>
      </div>
    );
  }

  if (isLoading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading product details...</div>;
  if (isError || !product) return <div style={{ padding: 40, textAlign: 'center' }}>Product not found!</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const finalImageUrl = imageUrl.trim() || DEFAULT_IMAGE_URL;

     const updateData: ProductCreateDto = {
      name,
      categoryName,
      price: Number(price),
      tagNames: selectedTags.length > 0 ? selectedTags : undefined,
      pageMetadata: {
        metaTitle,
        metaDescription: metaDescription || undefined,
        openGraphImageUrl: finalImageUrl,
      }
    };

    try {
      await updateMutation.mutateAsync({ id, data: updateData });
      navigate(`/product/${id}`); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: '#f3eff7', minHeight: '100vh' }}>
      <Navbar />
      
      <div className={styles.pageWrapper}>
        <Link to={`/product/${id}`} className={styles.backLink}>← Back to Product</Link>

        <div className={styles.mainCard}>
          <h1 className={styles.pageTitle}>Edit Product</h1>

          {updateMutation.isError && (
            <div className={styles.errorMessage}>
              {updateMutation.error?.message || 'Failed to update product.'}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Product Name</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Price ($)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0.01"
                  className={styles.input} 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select 
                  className={styles.input} 
                  value={categoryName} 
                  onChange={e => setCategoryName(e.target.value)} 
                  required 
                  disabled={isLoadingCategories}
                >
                  <option value="" disabled>
                    {isLoadingCategories ? 'Loading categories...' : 'Choose a category...'}
                  </option>
                  {categories?.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {isLoadingCategories && <span className={styles.helperText}>Loading categories list from server...</span>}
              </div>  

              <div className={styles.formGroup}>
                <label className={styles.label}>Tags</label>
                <div className={styles.tagsContainer}>
                  {isLoadingTags ? (
                    <span className={styles.helperText}>Loading tags...</span>
                  ) : (
                    tagsData?.map(tag => {
                      const isChecked = selectedTags.includes(tag.name);
                      return (
                        <label 
                          key={tag.id} 
                          className={`${styles.tagPill} ${isChecked ? styles.tagPillActive : ''}`}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedTags(prev => 
                                prev.includes(tag.name)
                                  ? prev.filter(t => t !== tag.name)
                                  : [...prev, tag.name]
                              );
                            }}
                            style={{ display: 'none' }}
                          />
                          #{tag.name}
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <hr style={{ borderTop: '1px solid #eee', margin: '10px 0' }} />
            
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>SEO & Metadata</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Meta Title</label>
              <input 
                type="text" 
                className={styles.input} 
                value={metaTitle} 
                onChange={e => setMetaTitle(e.target.value)} 
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Image URL (Absolute)</label>
              <input 
                type="url" 
                className={styles.input} 
                value={imageUrl} 
                onChange={e => setImageUrl(e.target.value)} 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Meta Description</label>
              <textarea 
                className={styles.textarea} 
                value={metaDescription} 
                onChange={e => setMetaDescription(e.target.value)} 
              />
            </div>

            <button 
              type="submit" 
              className={styles.btnSave} 
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}