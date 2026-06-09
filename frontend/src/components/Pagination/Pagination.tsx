import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
}

export function Pagination({ 
    currentPage, 
    totalPages, 
    hasNextPage, 
    hasPreviousPage, 
    onPageChange 
}: PaginationProps) {
    
    const getPageNumbers = () => { 
        const pages: (number | string)[] = [];
        const maxVisible: number = 5;
        if (totalPages <= maxVisible){
            for (let i = 1; i <= totalPages; i++ ){
                pages.push(i);
            }
        }
        else{
            if (currentPage <= 3){
                for (let i = 1; i <= 4; i++){
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
            else if ((currentPage + 2) >= totalPages){
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++){
                    pages.push(i);
                }
            }
            else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++){
                    pages.push(i);
                }
                pages.push('...')
                pages.push(totalPages);
            }
        }
    
        return pages;
    }

    return (
        <div className={styles.container}>
            <button
                disabled={!hasPreviousPage}
                onClick={() => onPageChange(currentPage - 1)}
                className={`${styles.pageItem} ${styles.navButton}`}
            >
                {'‹'} 
            </button>

            {getPageNumbers().map((pageNum, index) => {
                if (pageNum === '...'){
                    return (
                        <span key={index} className={`${styles.pageItem} ${styles.ellipsis}`}>
                            ...
                        </span>
                    );
                }

                const isActive = pageNum === currentPage;
                
                return (
                    <button 
                        key={index}
                        onClick={() => onPageChange(pageNum as number)}
                        className={`${styles.pageItem} ${styles.pageButton} ${isActive ? styles.activePage : ''}`}
                    >
                        {pageNum}
                    </button>
                )
            })}

            <button
                disabled={!hasNextPage}
                onClick={() => onPageChange(currentPage + 1)}
                className={`${styles.pageItem} ${styles.navButton}`}
            >
                {'›'} 
            </button>
        </div>
    )
}