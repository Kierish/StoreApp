import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar'; 
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductCard } from '../../components/ProductCard/ProductCard'; 
import { ConfirmModal } from '../../components/Modal/ConfirmModal'; 
import type { ProductReadDto } from '../../types/product'; 
import { apiClient } from '../../api/apiClient';
import styles from './StorePage.module.css'; 

const PAGE_SIZE = 5;

const fetchProducts = async (page: number) => {
  const response = await apiClient(`/api/Product?Page=${page}&PageSize=${PAGE_SIZE}`);
  if (!response.ok) throw new Error(`Server error: ${response.status}`);
  const products: ProductReadDto[] = await response.json();
  const paginationHeader = response.headers.get('X-Pagination');
  const metaData = paginationHeader ? JSON.parse(paginationHeader) : {};
  return { products, metaData };
};

export function StorePage() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = rawPage > 0 ? rawPage : 1; 

  useEffect(() => {
    if (rawPage !== currentPage) {
      setSearchParams({ page: currentPage.toString() }, { replace: true });
    }
  }, [rawPage, currentPage, setSearchParams]);

  const [productToDelete, setProductToDelete] = useState<ProductReadDto | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', currentPage], 
    queryFn: () => fetchProducts(currentPage),
    staleTime: 1000 * 60 * 5, 
  });

  useEffect(() => {
    if (data?.metaData) {
      const { TotalPages, TotalCount } = data.metaData;
      if (TotalCount > 0 && currentPage > TotalPages) {
        setSearchParams({ page: TotalPages.toString() }, { replace: true });
      }
    }
  }, [data, currentPage, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const response = await apiClient(`/api/Product/${productToDelete.id}`, { method: 'DELETE' });
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ['products'] }); 
      } else {
        alert("Failed to delete.");
      }
    } catch (e) {
      alert("Error occurred.");
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
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
}

export default StorePage;