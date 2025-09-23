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

  // Generate page items (you can adjust logic for ellipsis)
  const getPageItems = () => {
    let items = [];
    for (let number = 1; number <= last_page; number++) {
      items.push(
        <Paginate.Item
          key={number}
          active={number === current_page}
          onClick={() => handleClick(number)}
          className="custom-pagination m-1"
        >
          {number}
        </Paginate.Item>
      );
    }
    return items;
  };

  return (
    <Paginate className="justify-content-center custom-active">
      {/* <Pagination.First
        onClick={() => handleClick(1)}
        disabled={current_page === 1}
      /> */}
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
      {/* <Pagination.Last
        onClick={() => handleClick(last_page)}
        disabled={current_page === last_page}
      /> */}
    </Paginate>
  );
}
