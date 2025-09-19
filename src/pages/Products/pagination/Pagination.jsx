import { Pagination } from "react-bootstrap";

export default function Paginate({ meta, onPageChange }) {
  if (!meta) return null;

  const { current_page, last_page } = meta;

  const handleClick = (page) => {
    if (page !== current_page && page >= 1 && page <= last_page) {
      onPageChange(page);
    }
  };

  // Generate page items (you can adjust logic for ellipsis)
  const getPageItems = () => {
    let items = [];
    for (let number = 1; number <= last_page; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === current_page}
          onClick={() => handleClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Pagination className="justify-content-center">
      <Pagination.First
        onClick={() => handleClick(1)}
        disabled={current_page === 1}
      />
      <Pagination.Prev
        onClick={() => handleClick(current_page - 1)}
        disabled={current_page === 1}
      />
      {getPageItems()}
      <Pagination.Next
        onClick={() => handleClick(current_page + 1)}
        disabled={current_page === last_page}
      />
      <Pagination.Last
        onClick={() => handleClick(last_page)}
        disabled={current_page === last_page}
      />
    </Pagination>
  );
}
