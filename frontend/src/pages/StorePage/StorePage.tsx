// src/pages/StorePage/StorePage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar'; 
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductCard } from '../../components/ProductCard/ProductCard'; 
import { ConfirmModal } from '../../components/Modal/ConfirmModal'; 
import type { ProductReadDto } from '../../types/product'; 

// Import our new hooks
import { useProducts } from '../../hooks/api/useProducts';
import { useDeleteProduct } from '../../hooks/api/useDeleteProduct';
import styles from './StorePage.module.css'; 

const PAGE_SIZE = 5;

export function StorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = rawPage > 0 ? rawPage : 1; 

  // UI State: Which product is currently selected for deletion in the modal?
  const [productToDelete, setProductToDelete] = useState<ProductReadDto | null>(null);

  // 1. Get data from our custom hook
  const { data, isLoading, isError, error } = useProducts(currentPage);
  
  // 2. Get our delete function from our custom hook
  const deleteMutation = useDeleteProduct();

  // Sync URL page params if user types an invalid page manually or pages change
  useEffect(() => {
    if (rawPage !== currentPage) {
      setSearchParams({ page: currentPage.toString() }, { replace: true });
    }
    if (data?.metaData) {
      const { TotalPages, TotalCount } = data.metaData;
      if (TotalCount > 0 && currentPage > TotalPages) {
        setSearchParams({ page: TotalPages.toString() }, { replace: true });
      }
    }
  }, [rawPage, currentPage, data, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      // Execute the mutation hook
      await deleteMutation.mutateAsync(productToDelete.id);
    } catch (e) {
      alert("Error occurred while deleting.");
    } finally {
      setProductToDelete(null); 
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.mainContent}>
          {isLoading ? (
            <p className={styles.loadingText}>Loading products...</p>
          ) : isError ? (
            <div className={styles.errorCard}>
              <p className={styles.errorTitle}>⚠️ Connection Failed</p>
              <p className={styles.errorText}>{(error as Error).message}</p>
            </div>
          ) : (
            <>
              {data?.products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  No products found.
                </div>
              ) : (
                data?.products.map((p) => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onDeleteClick={(prod) => setProductToDelete(prod)}
                    onEditClick={(prod) => alert(`Will open edit form for ${prod.name}`)}
                  />
                ))
              )}

              {data?.metaData?.TotalCount > 0 && (
                <Pagination
                  currentPage={currentPage}
                  pageSize={PAGE_SIZE}
                  totalPages={data?.metaData?.TotalPages ?? 1}
                  totalCount={data?.metaData?.TotalCount ?? 0}
                  hasNextPage={data?.metaData?.HasNextPage ?? false}
                  hasPreviousPage={data?.metaData?.HasPreviousPage ?? false}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </div>

      <ConfirmModal 
        isOpen={productToDelete !== null}
        title="Delete Product"
        message={`Are you sure you want to permanently delete "${productToDelete?.name}"?`}
        confirmText={deleteMutation.isPending ? "Deleting..." : "Delete"} // Bonus UI feedback
        onConfirm={confirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
}

export default StorePage;