import { useEffect, useMemo, useState } from "react";
import type { ProductInteface } from "../interfaces/product";
import { fetchProduct } from "../api/productApi";
import { useDebounce } from "../hooks/useDebounce";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import Error from "../components/Error";

const PAGE_SIZE = 8;

const ProductWithoutAIPage = () => {
  const [products, setProducts] = useState<ProductInteface[]>([]);
  console.log("Products : ", products);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);

  const [page, setPage] = useState(1);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const data = await fetchProduct();
      setProducts(data);
    } catch {
      setError("Failed fetch Product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(debounceSearch.toLowerCase())
    );
  }, [products, debounceSearch]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page]);

  const totalPage = Math.ceil(filteredProducts.length / PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  if (loading) return <Loading />;
  if (error) return <Error onRetry={loadProduct} />;

  return (
    <div className="pb-20">
      <header className="w-full border-b border-slate-200 p-4 text-2xl font-bold shadow">
        D2YSTORE
      </header>

      <div className="mt-8 mx-24 flex justify-center flex-col items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Product..."
          className="py-2 px-2 border-2 rounded w-110 border-slate-800 mb-8"
        />

        {paginatedProducts.length !== 0 ? (
          <div>
            <div className="grid grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPage={totalPage}
              onPageChange={setPage}
            />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ProductWithoutAIPage;
