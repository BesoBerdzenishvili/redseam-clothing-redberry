import { useState, useEffect } from "react";
// import Controllers from "./controllers/Controllers";
import ProductList from "./productList/ProductList";
import Paginate from "./pagination/Pagination";
import { Spinner } from "react-bootstrap";

export default function Products() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (page = 1, sort = "", from = "", to = "") => {
    try {
      // TODO: see best practices for hiding api
      const response = await fetch(
        `https://api.redseam.redberryinternship.ge/api/products?page=${page}&sort=${sort}&filter%5Bprice_from%5D=${from}&filter%5Bprice_to%5D=${to}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      console.log(result, "resultsss 4s");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3" />
          <p>Loading data...</p>
        </div>
      )}
      {error && (
        <div className="text-center">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && data.data.length > 0 && (
        <>
          {/* <Controllers meta={data.meta} /> */}
          <ProductList data={data.data} />
          <Paginate meta={data.meta} onPageChange={fetchData} />
        </>
      )}
      {!loading && !error && data.data.length === 0 && (
        <div className="text-center">
          <p>No Data Yet...</p>
        </div>
      )}
    </div>
  );
}
