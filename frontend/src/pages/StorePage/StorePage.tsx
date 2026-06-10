import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Sidebar } from '../../components/Sidebar/Sidebar'; 
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductCard } from '../../components/ProductCard/ProductCard'; 
import { ConfirmModal } from '../../components/Modal/ConfirmModal'; 
import { useAuth } from '../../contexts/AuthContext';
import type { ProductReadDto } from '../../types/product'; 
import { useProducts } from '../../hooks/api/useProducts';
import { useDeleteProduct } from '../../hooks/api/useDeleteProduct';
import styles from './StorePage.module.css'; 

const PAGE_SIZE = 5;

export function StorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = rawPage > 0 ? rawPage : 1; 

  const [productToDelete, setProductToDelete] = useState<ProductReadDto | null>(null);

  const { data, isLoading, isError, error } = useProducts(currentPage);
  const deleteMutation = useDeleteProduct();

  const isEmployee = user?.role === 'Employee' || user?.role === 'Admin';

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
              {isEmployee && (
                <div className={styles.actionTopBar}>
                  <button 
                    onClick={() => navigate('/product/new')}
                    className={styles.btnAddProduct}
                  >
                    + Add New Product
                  </button>
                </div>
              )}

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
                    onEditClick={(prod) => navigate(`/product/${prod.id}/edit`)}
                  />
                ))
              )}

              {data?.metaData && data.metaData.TotalCount > 0 && (
                <Pagination
                  currentPage={currentPage}
                  pageSize={PAGE_SIZE}
                  totalPages={data.metaData.TotalPages ?? 1}
                  totalCount={data.metaData.TotalCount ?? 0}
                  hasNextPage={data.metaData.HasNextPage ?? false}
                  hasPreviousPage={data.metaData.HasPreviousPage ?? false}
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
        message={`Are you sure you want to delete "${productToDelete?.name}"?`}
        confirmText={deleteMutation.isPending ? "Deleting..." : "Delete"}
        onConfirm={confirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
}

export default StorePage;