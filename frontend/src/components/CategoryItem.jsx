import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-64 w-full rounded-lg group">
      <Link to={`/category${category.href}`}>
        <div className="w-full h-full cursor-pointer">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />

          {/* Image with reduced size, responsive loading, and smooth scaling */}
          <img
            srcSet={`${category.imageUrl}?w=400 400w, ${category.imageUrl}?w=800 800w, ${category.imageUrl}?w=1200 1200w`}
            sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
            src={category.imageUrl} // Fallback for browsers not supporting srcset
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy" // Lazy loading for offscreen images
          />

          {/* Category name and description */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-gray-900 to-transparent">
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-200 text-sm">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
