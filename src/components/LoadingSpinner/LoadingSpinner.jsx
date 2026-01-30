const LoadingSpinner = ({ size = "md", color = "blue" }) => {
  // Định nghĩa kích thước linh hoạt
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  // Định nghĩa màu sắc linh hoạt
  const colorClasses = {
    blue: "border-blue-600",
    white: "border-white",
    gray: "border-gray-300",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]} 
          rounded-full 
          border-t-transparent 
          animate-spin
        `}
      ></div>
    </div>
  );
};

export default LoadingSpinner;