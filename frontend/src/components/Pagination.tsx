interface PaginationProps {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;

    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, pageSize, totalPages, totalCount, hasNextPage, hasPreviousPage, onPageChange }: PaginationProps){
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

    const baseBoxStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',  
        height: '40px',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontSize: '0.95rem',
        userSelect: 'none' as const,
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', margin: '30px 0 50px 0' }}>
        <button
            disabled={!hasPreviousPage}
            onClick={() => onPageChange(currentPage - 1)}
            style={{ 
                ...baseBoxStyle, 
                border: 'none', 
                fontSize: '1.4rem',
                color: hasPreviousPage ? '#333' : '#ccc',
                cursor: hasPreviousPage ? 'pointer' : 'not-allowed'
            }}
        >
            {'‹'} 
        </button>

        {getPageNumbers().map((pageNum, index) => {
            if (pageNum === '...'){
                return <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    width: '40px', height: '40px', color: '#999' }}>...</span>;
            }
            return (
                <button 
                key={index}
                onClick={() => onPageChange(pageNum as number)}
                style={{ 
                    ...baseBoxStyle, 
                    border: pageNum === currentPage ? '2px solid #333' : '1px solid #e0e0e0', 
                    color: pageNum === currentPage ? '#333' : '#666', 
                    fontWeight: pageNum === currentPage ? 'bold' : 'normal' 
                }}>
                    {pageNum}
                </button>
            )
        })}

        <button
            disabled={!hasNextPage}
            onClick={() => onPageChange(currentPage + 1)}
            style={{ 
                ...baseBoxStyle, 
                border: 'none', 
                fontSize: '1.4rem',
                color: hasNextPage ? '#333' : '#ccc',
                cursor: hasNextPage ? 'pointer' : 'not-allowed'
            }}
        >
            {'›'} 
        </button>

        </div>
    )
}