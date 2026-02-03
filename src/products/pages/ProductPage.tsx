import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import { useDebounce } from "../hooks/useDebounce";
import { fetchProduct } from "../api/products.api";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { Pagination } from "../components/Pagination";

const PAGE_SIZE = 4;

export function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [page, setPage] = useState(1);

  // FETCH DATA
  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchProduct();
      setProducts(data);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  // DERIVED STATE : FILTER
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  // DERIVED STATE: PAGINATION
  /**
   * page = 1
   * startIndex = (page - 1) * PAGE_SIZE
   * endIndex   = startIndex + PAGE_SIZE
   */
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredProducts.slice(start, end);
  }, [page, filteredProducts]);

  const totalPage = Math.ceil(filteredProducts.length / PAGE_SIZE);

  // RESET PAGE SAAT SEARCH
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // CONDITIONAL RENDERING STATE
  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} onRetry={loadProduct} />;
  if (filteredProducts.length === 0) return <EmptyState />;

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-slate-200 mb-4 px-4 py-2 w-full rounded-md shadow-sm focus:outline-none"
      />

      <div className="space-y-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPage}
        onPageChange={setPage}
      />
    </div>
  );
}
