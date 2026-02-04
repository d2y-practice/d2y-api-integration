import type { ProductInteface } from "../interfaces/product";

interface ProductCardInterface {
  product: ProductInteface;
}

const ProductCard = ({ product }: ProductCardInterface) => {
  return (
    <div className="col-span-1 border border-slate-200 shadow-md rounded-md">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain"
      />
      <div className="flex flex-col p-4">
        <h3 className="font-semibold line-clamp-1">{product.title}</h3>
        <div className="py-1.5 px-3 text-[11px] bg-slate-800 text-white rounded-2xl w-fit my-2">
          {product.category}
        </div>
        <p className="text-slate-400">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
