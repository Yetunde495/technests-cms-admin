import { ArrowLeftIcon, ArrowRight } from "lucide-react";

interface Pagination {
  nextPage: number;
  prevPage: number;
  currentPage: number;
  pages: number;
  total: number;
}

interface Props {
  data: any[];
  pagination: Pagination;
  page: number | string;
  pageLimit: number | string;
  setPageLimit: (arg: number) => void;
  setPage: (arg: number) => void;
}

interface PaginationProps {
  onNextPage: (page: string | number) => void;
  onPrevPage: (page: string | number) => void;
  onSelectPage: (page: string | number) => void;
  pageLimit: Array<number>;
  prevPage: number;
  nextPage: number;
  activePage: number;
  show: boolean;
  activeLimit: number;
  totalPages?: number;
  onChangeLimit: (limit: string | number) => void;
}

const Pagination2 = ({
  onNextPage,
  onPrevPage,
  onSelectPage,
  prevPage,
  nextPage,
  activePage = 1,
  show,
  onChangeLimit,
  activeLimit,
  pageLimit,
  totalPages,
}: PaginationProps) => {
  return show ? (
    <div className="mb-4 rounded-sm">
      <div className=" py-3 px-6.5">
        <div className="col-span-12 flex flex-wrap items-center justify-center gap-3">
          {totalPages && activePage ? (
            <div className="datatable-info">
              <p>
                <span>{activePage}</span> of <span>{totalPages}</span>
              </p>
            </div>
          ) : null}
          <nav>
            <ul className="flex flex-wrap items-center gap-2">
              <li
                onClick={() =>
                  prevPage && Number(prevPage) !== 1
                    ? onPrevPage(Number(prevPage))
                    : onPrevPage(1)
                }
                className="cursor-pointer datatable-pagination-list-item datatable-hidden datatable-disabled"
              >
                <a
                  data-page="1"
                  className="datatable-pagination-list-item-link 
                              rounded bg-[#EDEFF1] py-1.5 px-3 text-xs font-medium text-black hover:bg-primary 
                              hover:text-white dark:text-black dark:hover:bg-primary 
                              dark:hover:text-white"
                >
                  {"‹"}
                </a>
              </li>
              {
                <li onClick={() => onSelectPage(activePage)}>
                  <a
                    className="flex items-center justify-center rounded py-0.5 
                                px-3 font-medium hover:bg-primary hover:text-white bg-primary text-white"
                  >
                    {activePage}
                  </a>
                </li>
              }
              <li
                onClick={() =>
                  nextPage && Number(nextPage) > 1
                    ? onNextPage(Number(nextPage))
                    : onNextPage(1)
                }
                className="disable cursor-pointer datatable-pagination-list-item"
              >
                <a
                  data-page="2"
                  className="datatable-pagination-list-item-link rounded bg-[#EDEFF1] 
                              py-1.5 px-3 text-xs font-medium text-black hover:bg-primary 
                              hover:text-white dark:text-black dark:hover:bg-primary 
                              dark:hover:text-white"
                >
                  {"›"}
                </a>
              </li>
            </ul>
          </nav>
          <div className="relative z-20 inline-block rounded bg-white shadow-card-2 dark:bg-boxdark">
            <select
              title="pageLimit"
              value={activeLimit}
              onChange={(e) => onChangeLimit(e.target.value)}
              name="pageLimit"
              id="pageLimit"
              className="relative z-20 inline-flex appearance-none rounded border border-stroke bg-transparent py-2 pl-4 pr-9 font-medium text-sm outline-none dark:border-strokedark"
            >
              {pageLimit?.map((pl: number, pli: number) => (
                <option key={pl + "-" + pli} value={pl}>
                  {pl} / Page
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.96967 6.21967C4.26256 5.92678 4.73744 5.92678 5.03033 6.21967L9 10.1893L12.9697 6.21967C13.2626 5.92678 13.7374 5.92678 14.0303 6.21967C14.3232 6.51256 14.3232 6.98744 14.0303 7.28033L9.53033 11.7803C9.23744 12.0732 8.76256 12.0732 8.46967 11.7803L3.96967 7.28033C3.67678 6.98744 3.67678 6.51256 3.96967 6.21967Z"
                  fill="#64748B"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

const Pagination = ({
  onNextPage,
  onPrevPage,
  onSelectPage,
  prevPage,
  nextPage,
  activePage = 1,
  show,
  onChangeLimit,
  activeLimit,
  pageLimit,
  totalPages,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages && activePage) {
      const startPage = Math.max(2, activePage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

      if (startPage > 2) {
        pageNumbers.push(<li key="start-ellipsis">...</li>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li key={i} onClick={() => onSelectPage(i)}>
            <a
              className={`flex items-center justify-center rounded py-[6px] px-3.5 font-medium hover:bg-primary hover:text-white ${
                activePage === i ? "bg-primary text-white" : "dark:text-white/90  text-black/80"
              }`}
            >
              {i}
            </a>
          </li>
        );
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push(<li key="end-ellipsis">...</li>);
      }
    }

    return pageNumbers;
  };

  return show ? (
    <div className="mb-4 rounded-sm">
      <div className="py-3 px-6.5">
        <div className="col-span-12 flex flex-wrap items-center justify-center gap-3">
          {totalPages && activePage ? (
            <div className="datatable-info">
              <p>
                <span>{activePage}</span> of <span>{totalPages}</span>
              </p>
            </div>
          ) : null}
          <nav>
            <ul className="flex flex-wrap items-center gap-2">
              <li
                onClick={() =>
                  prevPage && Number(prevPage) !== 1
                    ? onPrevPage(Number(prevPage))
                    : onPrevPage(1)
                }
                className="cursor-pointer datatable-pagination-list-item datatable-hidden datatable-disabled"
              >
                <a
                  data-page="1"
                  className="datatable-pagination-list-item-link flex items-center justify-center dark:bg-black py-2.5 px-3 rounded-[5px] font-medium text-black bg-light dark:text-white hover:bg-primary dark:hover:bg-primary hover:text-white"
                >
                  <ArrowLeftIcon size={16} />
                </a>
              </li>

              <li onClick={() => onSelectPage(1)}>
                <a
                  className={`flex items-center justify-center rounded py-[6px] px-3.5 font-medium hover:bg-primary hover:text-white ${
                    activePage === 1 ? "bg-primary text-white" : "dark:text-white/90  text-black/80"
                  }`}
                >
                  1
                </a>
              </li>

              {renderPageNumbers()}

              {totalPages && totalPages > 1 && (
                <li onClick={() => onSelectPage(totalPages)}>
                  <a
                    className={`flex items-center justify-center rounded py-[6px] px-3.5 font-medium hover:bg-primary hover:text-white ${
                      activePage === totalPages ? "bg-primary text-white" : "dark:text-white/90  text-black/80"
                    }`}
                  >
                    {totalPages}
                  </a>
                </li>
              )}

              <li
                onClick={() =>
                  nextPage && Number(nextPage) > 1
                    ? onNextPage(Number(nextPage))
                    : onNextPage(1)
                }
                className="disable cursor-pointer datatable-pagination-list-item"
              >
                <a
                  data-page="2"
                  className="datatable-pagination-list-item-link flex items-center justify-center dark:bg-black py-2.5 px-3 rounded-[5px] font-medium text-black bg-light dark:text-white hover:bg-primary dark:hover:bg-primary hover:text-white"
                >
                  <ArrowRight size={16} />
                </a>
              </li>
            </ul>
          </nav>
          <div className="relative z-20 inline-block rounded bg-white shadow-card-2 dark:bg-boxdark">
            <select
              title="pageLimit"
              value={activeLimit}
              onChange={(e) => onChangeLimit(e.target.value)}
              name="pageLimit"
              id="pageLimit"
              className="relative z-20 inline-flex appearance-none rounded border border-stroke bg-transparent py-2 pl-4 pr-9 font-medium text-sm outline-none dark:border-strokedark"
            >
              {pageLimit?.map((pl: number, pli: number) => (
                <option key={pl + "-" + pli} value={pl}>
                  {pl} / Page
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.96967 6.21967C4.26256 5.92678 4.73744 5.92678 5.03033 6.21967L9 10.1893L12.9697 6.21967C13.2626 5.92678 13.7374 5.92678 14.0303 6.21967C14.3232 6.51256 14.3232 6.98744 14.0303 7.28033L9.53033 11.7803C9.23744 12.0732 8.76256 12.0732 8.46967 11.7803L3.96967 7.28033C3.67678 6.98744 3.67678 6.51256 3.96967 6.21967Z"
                  fill="#64748B"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

const TablePagination = ({
  data,
  pagination,
  page,
  pageLimit,
  setPage,
  setPageLimit,
}: Props) => {
  //   const [pageLimit, setPageLimit] = useState<string | number>(10);
  //   const [page, setPage] = useState<string | number>(1);

  const handleChangePageLimit = (v: any) => {
    setPageLimit(v);
    setPage(1);
  };
  const handleChangePage = (v: any) => setPage(v);

  const onNextPage = (p: any) => {
    if (pagination.currentPage !== pagination.pages) {
      setPage(p);
    }
  };

  const onPrevPage = (p: any) => {
    if (pagination.currentPage > 1) {
      setPage(p);
    }
  };

  return (
    <Pagination
      show={data?.length > 0}
      totalPages={pagination.pages}
      activePage={Number(page)}
      activeLimit={Number(pageLimit)}
      nextPage={pagination.nextPage}
      prevPage={pagination.prevPage}
      pageLimit={[10, 25, 50, 100, 200]}
      onPrevPage={onPrevPage}
      onNextPage={onNextPage}
      onSelectPage={handleChangePage}
      onChangeLimit={handleChangePageLimit}
    />
  );
};

export default TablePagination;
