import { useState, useEffect } from "react";
import Controllers from "./controllers/Controllers";
import ProductList from "./ProductList/ProductList";
import Pagination from "./pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function Products() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const api = import.meta.env.VITE_API_URL;

  const fetchData = async (page = 1) => {
    try {
      const sort = searchParams.get("sort") || "";
      const from = searchParams.get("from") || "";
      const to = searchParams.get("to") || "";

      const response = await fetch(
        `${api}/products?page=${page}&sort=${sort}&filter%5Bprice_from%5D=${from}&filter%5Bprice_to%5D=${to}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <div>
      {loading && <Spinner />}
      {error && (
        <div className="text-center">
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && data.data.length > 0 && (
        <>
          <Controllers meta={data.meta} />
          <ProductList data={data.data} />
          <Pagination meta={data.meta} onPageChange={fetchData} />
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
