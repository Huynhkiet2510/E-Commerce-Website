const ItemOrder = ({ item }) => {
  const price = Number(item.price);
  const qty = Number(item.quantity || 1);
  const total = price * qty;

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">

      <div className="flex items-center gap-4">
        <img
          src={item.images?.[0] || item.image}
          alt={item.title || item.name}
          className="w-14 h-14 rounded-lg object-cover border"
        />

        <div className="space-y-1">
          <p className="text-[11px] uppercase font-semibold text-text-muted">
            {item.category?.name || "Product"}
          </p>

          <p className="text-sm font-medium text-text-main line-clamp-2 max-w-[260px]">
            {item.title || item.name}
          </p>  

          <p className="text-sm text-text-main">
            ${price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="text-right text-sm space-y-1">
        <p className="text-text-main">
          {qty} × ${price.toLocaleString()}
        </p>

        <p className="font-semibold text-text-main">
          ${total.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ItemOrder;
