import { useEffect } from 'react';

/** Steps back a page when the current one becomes empty (e.g. its last item was deleted or filtered out). */
const useClampPage = (page: number, setPage: (page: number) => void, itemsOnPage?: number) => {
  useEffect(() => {
    if (page > 1 && itemsOnPage === 0) setPage(page - 1);
  }, [page, setPage, itemsOnPage]);
};

export default useClampPage;
