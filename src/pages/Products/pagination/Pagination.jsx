import { Pagination as Paginate } from "react-bootstrap";

export default function Pagination({ meta, onPageChange }) {
  if (!meta) return null;

  const { current_page, last_page } = meta;

  const handleClick = (page) => {
    if (page !== current_page && page >= 1 && page <= last_page) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageItems = () => {
    let items = [];
    const delta = 1;
    const left = current_page - delta;
    const right = current_page + delta;
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= last_page; i++) {
      if (i === 1 || i === last_page || (i >= left && i <= right)) {
        range.push(i);
      }
    }

    let prevPage = null;
    for (let i of range) {
      if (prevPage) {
        if (i - prevPage === 2) {
          rangeWithDots.push(prevPage + 1);
        } else if (i - prevPage > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      prevPage = i;
    }

    items = rangeWithDots.map((page, index) => {
      if (page === "...") {
        return (
          <Paginate.Ellipsis
            key={`ellipsis-${index}`}
            disabled
            className="m-1"
          />
        );
      }
      return (
        <Paginate.Item
          key={page}
          active={page === current_page}
          onClick={() => handleClick(page)}
          className="custom-pagination m-1"
        >
          {page}
        </Paginate.Item>
      );
    });

    return items;
  };

  return (
    <Paginate className="justify-content-center custom-active">
      <Paginate.Prev
        onClick={() => handleClick(current_page - 1)}
        disabled={current_page === 1}
        className="m-1"
      />
      {getPageItems()}
      <Paginate.Next
        onClick={() => handleClick(current_page + 1)}
        disabled={current_page === last_page}
        className="m-1"
      />
    </Paginate>
  );
}
