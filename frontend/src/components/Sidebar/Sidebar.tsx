import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCategories } from '../../hooks/api/useCategories';
import { useTags } from '../../hooks/api/useTags';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories } = useCategories();
  const { data: tags } = useTags();

  const activeCategory = searchParams.get('categoryName') || '';
  const minPriceUrl = searchParams.get('minPrice') || '';
  const maxPriceUrl = searchParams.get('maxPrice') || '';
  const activeTags = searchParams.getAll('TagNames');

  const [minPrice, setMinPrice] = useState(minPriceUrl);
  const [maxPrice, setMaxPrice] = useState(maxPriceUrl);

  useEffect(() => {
    setMinPrice(minPriceUrl);
  }, [minPriceUrl]);

  useEffect(() => {
    setMaxPrice(maxPriceUrl);
  }, [maxPriceUrl]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['+', '-', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePriceChange = (value: string, setter: (val: string) => void) => {
    let normalized = value.replace(',', '.'); 

    if (normalized.startsWith('0') && normalized.length > 1 && normalized[1] !== '.') {
      normalized = Number(normalized).toString();
    }

    setter(normalized);
  };

  const updateUrl = (newParams: Record<string, string | string[] | null>) => {
    const updated = new URLSearchParams(searchParams);
    updated.set('page', '1');

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '') {
        updated.delete(key);
      } else if (Array.isArray(value)) {
        updated.delete(key);
        value.forEach(val => updated.append(key, val));
      } else {
        updated.set(key, value);
      }
    });

    setSearchParams(updated);
  };

  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) {
      updateUrl({ categoryName: null });
    } else {
      updateUrl({ categoryName });
    }
  };

  const handleTagToggle = (tagName: string) => {
    const nextTags = activeTags.includes(tagName)
      ? activeTags.filter(t => t !== tagName)
      : [...activeTags, tagName];
    updateUrl({ TagNames: nextTags });
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();

    const minVal = minPrice ? Number(minPrice) : 0;
    const maxVal = maxPrice ? Number(maxPrice) : Infinity;

    if (minVal < 0 || maxVal < 0) {
      alert("Price cannot be negative!");
      return;
    }

    let finalMin = minPrice;
    let finalMax = maxPrice;

    if (minPrice && maxPrice && minVal > maxVal) {
      setMinPrice(maxPrice);
      setMaxPrice(minPrice);
      finalMin = maxPrice;
      finalMax = minPrice;
    }

    updateUrl({
      minPrice: finalMin || null,
      maxPrice: finalMax || null
    });
  };

  const handleClearAll = () => {
    setSearchParams({ page: '1' });
    setMinPrice('');
    setMaxPrice('');
  };

  const hasFilters = activeCategory || minPriceUrl || maxPriceUrl || activeTags.length > 0;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filters</h3>
        {hasFilters && (
          <button onClick={handleClearAll} className={styles.clearBtn}>
            Clear All
          </button>
        )}
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Categories</h4>
        <div className={styles.list}>
          {categories?.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`${styles.filterBtn} ${activeCategory === cat.name ? styles.active : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Price Range ($)</h4>
        <form onSubmit={handlePriceApply} className={styles.priceForm}>
          <input
            type="number"
            min="0"
            step="any"
            onKeyDown={handleKeyDown}
            placeholder="Min"
            className={styles.priceInput}
            value={minPrice}
            onChange={e => handlePriceChange(e.target.value, setMinPrice)} 
          />
          <span className={styles.priceSeparator}>-</span>
          <input
            type="number"
            min="0"
            step="any"
            onKeyDown={handleKeyDown} 
            placeholder="Max"
            className={styles.priceInput}
            value={maxPrice}
            onChange={e => handlePriceChange(e.target.value, setMaxPrice)} 
          />
          <button type="submit" className={styles.priceBtn}>Go</button>
        </form>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Tags</h4>
        <div className={styles.tagsGrid}>
          {tags?.map(tag => {
            const isSelected = activeTags.includes(tag.name);
            return (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.name)}
                className={`${styles.tagFilterBtn} ${isSelected ? styles.tagFilterBtnActive : ''}`}
              >
                #{tag.name}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}