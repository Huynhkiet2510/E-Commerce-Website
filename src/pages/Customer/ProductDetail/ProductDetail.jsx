import { useParams, Link } from "react-router-dom";
import BigError from "../../../components/StateErrror/BigError"
import useProductDetail from "./useProductDetail";
import MainContent from "./MainContent";
import ProductDetailSkeleton from "./ProductDetailSkeleton";


const ProductDetail = () => {
  const { slug } = useParams();
  const { fetchProductDetail, product, loading, error, activeImg, setActiveImg } = useProductDetail(slug);

  if (error) return (
    <BigError
      title="Không tải được sản phẩm"
      onRetry={fetchProductDetail}
    />
  )

  if (loading) return (
    <div className="max-w-7xl mx-auto px-2 py-4">
      <ProductDetailSkeleton />
    </div>
  );

  if (!product) return (
    <div className="text-center py-20 text-gray-500">
      Không tìm thấy thông tin sản phẩm.
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-2 py-4">

      <div className="mb-6 text-sm text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <span>\</span>
        <span className="text-gray-800 font-medium truncate max-w-[300px]">
          {product.category?.slug}
        </span>
        <span>\</span>
        <span className="text-gray-800 font-medium truncate max-w-[300px]">
          {product.title}
        </span>
      </div>

      <MainContent
        activeImg={activeImg}
        setActiveImg={setActiveImg}
        product={product}
      />

    </div>
  );
};

export default ProductDetail;