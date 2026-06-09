import { useEffect, useState } from 'react'
import '../App.css';
import { Navbar } from '../components/Navbar/Navbar';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Pagination } from '../components/Pagination/Pagination';
import { ProductCard } from '../components/ProductCard/ProductCard';
import type { ProductReadDto } from '../types/product';
import { useSearchParams } from 'react-router-dom';


export function App() {
  const [products, setProducts] = useState<ProductReadDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('size') || '5', 10);
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), size: pageSize.toString() });
  };
  
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/Product?Page=${currentPage}`); 
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          window.scrollTo({ top: 0, behavior: 'smooth' });

          const paginationHeader = response.headers.get('X-Pagination');
          if (paginationHeader){
            const metaData = JSON.parse(paginationHeader);

            setTotalPages(metaData.TotalPages ?? 0);
            setTotalCount(metaData.TotalCount ?? 0);
            setHasNextPage(metaData.HasNextPage ?? false);
            setHasPreviousPage(metaData.HasPreviousPage ?? false);  
          }
        } else {
          setError(`The server returned an error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        setError("Could not connect to the backend server.");
        console.error("Fetch failed", error);
      } finally {
        setIsLoading(false); 
      }
    }

    loadProducts();
  }, [currentPage, pageSize]);

  return (
    <div style={{ backgroundColor: '#f3eff7', minHeight: '100vh' }}>
      
      <Navbar />

      <div style={{ 
        display: 'flex', 
        width: '100%', 
        padding: '0 40px 40px 40px', 
        boxSizing: 'border-box', 
        gap: '24px' 
      }}>
        <Sidebar />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {isLoading ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Loading products...
            </p>
          ) : error ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              backgroundColor: 'white', 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid #f5c6cb',
              color: '#721c24'
            }}>
              <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                ⚠️ Connection Failed
              </p>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.95rem' }}>{error}</p>
            </div>
          ) : (
            <>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}

              <Pagination
                currentPage={currentPage}
                pageSize={3}
                totalPages={totalPages}
                totalCount={totalCount}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App
