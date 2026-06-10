import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '../components/Navbar/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Pagination } from '../components/Pagination/Pagination';
import { ProductCard } from '../components/ProductCard/ProductCard';
import type { ProductReadDto } from '../types/product';
import { apiClient } from '../api/apiClient';
import styles from './StorePage.module.css'; 

const fetchProducts = async (page: number, size: number) => {
  const response = await apiClient(`/api/Product?Page=${page}&PageSize=${size}`);
  
  if (!response.ok) {
    throw new Error(`The server returned an error: ${response.status} ${response.statusText}`);
  }

  const products: ProductReadDto[] = await response.json();
  const paginationHeader = response.headers.get('X-Pagination');
  const metaData = paginationHeader ? JSON.parse(paginationHeader) : {};

  return { products, metaData };
};

export function StorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('size') || '5', 10); 

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', currentPage, pageSize], 
    queryFn: () => fetchProducts(currentPage, pageSize),
    staleTime: 1000 * 60 * 5, 
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), size: pageSize.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
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
              {data?.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}

              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={data?.metaData?.TotalPages ?? 1}
                totalCount={data?.metaData?.TotalCount ?? 0}
                hasNextPage={data?.metaData?.HasNextPage ?? false}
                hasPreviousPage={data?.metaData?.HasPreviousPage ?? false}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default StorePage;