import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border border-slate-100 shadow-md rounded-md p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-2"
      />
      <h3 className="font-semibold text-sm mb-1 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-sm text-slate-600">${product.price}</p>
    </div>
  );
};

export default ProductCard;
