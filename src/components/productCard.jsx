import { Link, useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;
  const navigate = useNavigate();
  const img =
    product.images[0] ||
    product?.image ||
    "https://via.placeholder.com/600x600?text=Product";
  const title = product.name || "Unnamed product";
  const desc = product.description || "";
  const price = product.price ?? "";
  const labeled = product.labledprice;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Image */}
      <Link className="relative" to={"/overview/" + product.productId}>
        <img
          src={img}
          alt={title}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {product?.stock === 0 ? (
            <span className="rounded-full bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white">
              Out of stock
            </span>
          ) : (
            <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
              In stock
            </span>
          )}
        </div>

        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
            {title}
          </h3>

          {/* Price */}
          <div className="text-right">
            {labeled ? (
              <div className="text-xs text-slate-500 line-through">
                {labeled}
              </div>
            ) : null}
            <div className="text-sm font-semibold text-rose-700">{price}</div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{desc}</p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {product?.altNames?.[0] ? `aka ${product.altNames[0]}` : ""}
          </span>

          <button
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
            onClick={() =>
              navigate("/checkout", {
                state: {
                  cart: [
                    {
                      productId: product?.productId,
                      name: product?.name,
                      altNames: product?.altNames,
                      image: product?.images[0],
                      price: product?.price,
                      labledprice: product?.labledprice,
                      qty: 1,
                    },
                  ],
                },
              })
            }
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
