const ProductDetailSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-2 py-4 animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="mb-6 flex items-center gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Side: Images */}
                <div>
                    {/* Main Image Skeleton */}
                    <div className="rounded-2xl overflow-hidden bg-gray-200 h-[480px] w-full"></div>

                    {/* Thumbnails Skeleton */}
                    <div className="flex gap-3 mt-4 flex-wrap">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-20 h-20 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Info */}
                <div className="space-y-6">
                    {/* Category Label */}
                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>

                    {/* Title */}
                    <div className="space-y-2">
                        <div className="h-8 w-full bg-gray-200 rounded"></div>
                        <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
                    </div>

                    {/* Price */}
                    <div className="h-10 w-32 bg-gray-200 rounded"></div>

                    {/* Description */}
                    <div className="border-t pt-4 space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    </div>

                    {/* Button */}
                    <div className="pt-6">
                        <div className="h-14 w-full bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;