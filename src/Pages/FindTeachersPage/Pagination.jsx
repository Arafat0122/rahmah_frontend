import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        const pages = [];
        for (let i = Math.max(1, start); i <= end; i++) pages.push(i);
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <nav
            role="navigation"
            aria-label="Pagination Navigation"
            className="flex items-center justify-center gap-3 mt-12 py-10 border-t border-slate-200 min-w-screen"
        >
            {/* Prev */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className="p-3 rounded-2xl border border-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-md transition-all active:scale-90"
            >
                <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
                {/* First page indicator */}
                {visiblePages[0] > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onPageChange(1)}
                            aria-label="Go to page 1"
                            className="w-12 h-12 rounded-2xl text-sm font-bold bg-white border border-slate-200 text-slate-600 hover:border-primary transition-colors"
                        >
                            1
                        </button>
                        <MoreHorizontal className="text-slate-500" size={16} aria-hidden="true" />
                    </div>
                )}

                {visiblePages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        aria-label={`Go to page ${page}`}
                        className={`w-12 h-12 rounded-2xl text-sm font-bold transition-all duration-300 ${currentPage === page
                            ? "bg-slate-900 text-white shadow-xl shadow-slate-900/30 scale-110"
                            : "bg-white border border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Last page indicator */}
                {visiblePages[visiblePages.length - 1] < totalPages && (
                    <div className="flex items-center gap-2">
                        <MoreHorizontal className="text-slate-500" size={16} aria-hidden="true" />
                        <button
                            type="button"
                            onClick={() => onPageChange(totalPages)}
                            aria-label={`Go to page ${totalPages}`}
                            className="w-12 h-12 rounded-2xl text-sm font-bold bg-white border border-slate-200 text-slate-600 hover:border-primary transition-colors"
                        >
                            {totalPages}
                        </button>
                    </div>
                )}
            </div>

            {/* Next */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className="p-3 rounded-2xl border border-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white hover:shadow-md transition-all active:scale-90"
            >
                <ChevronRight size={20} />
            </button>
        </nav>
    );
};

export default Pagination;