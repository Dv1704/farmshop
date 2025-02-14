import { useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';
import CategoryItem from '../components/CategoryItem';
import FeaturedProducts from '../components/FeaturedProducts';

// Categories list
const categories = [
    { href: "/fruits", name: "Fruits", imageUrl: "/mixed-fruits.jpg" },
    { href: "/vegetables", name: "Vegetables", imageUrl: "/pexels-nc-farm-bureau-mark-2255935.jpg" },
    { href: "/livestock", name: "Livestock", imageUrl: "/pexels-pixabay-162801.jpg" },
    { href: "/seafood", name: "Seafood", imageUrl: "/pexels-mali-229789.jpg" },
    { href: "/dairy-products", name: "Dairy Products", imageUrl: "/pexels-charlotte-may-5946717.jpg" },
    { href: "/grains-cereals", name: "Grains & Cereals", imageUrl: "/pexels-polina-tankilevitch-4110250.jpg" },
    { href: "/nuts-seeds", name: "Nuts & Seeds", imageUrl: "/pexels-iriser-1013420.jpg" },
    { href: "/tubers-roots", name: "Tubers & Roots", imageUrl: "/pexels-daniel-dan-47825192-7543113.jpg" },
    { href: "/legumes-pulses", name: "Legumes & Pulses", imageUrl: "/pexels-arina-krasnikova-6316671.jpg" },
    { href: "/herbs-spices", name: "Herbs & Spices", imageUrl: "/pexels-tara-winstead-6694137.jpg" },
    { href: "/beverages-oilcrops", name: "Beverages & Oil Crops", imageUrl: "/pexels-phouy-sonedala-53440070-7791208.jpg" },
    { href: "/honey-sweeteners", name: "Honey & Natural Sweeteners", imageUrl: "/pexels-alex-falconer-70591009-8500502.jpg" },
];

const ShopPage = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        console.log("Fetching featured products...");
        fetchFeaturedProducts().then(() => {
            console.log("Products after fetching:", products);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    }, [fetchFeaturedProducts]);

    return (
        <div className="min-h-screen text-white overflow-hidden" style={{ backgroundColor: '#f0fff4' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h1 className="text-center text-5xl sm:text-6xl font-bold text-green-900 mb-4">
                    Explore Our Categories
                </h1>
                <p className="text-center text-xl text-green-700 mb-12">
                    Discover the finest products in sustainable agriculture
                </p>

                {/* Categories Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryItem category={category} key={category.name} />
                    ))}
                </div>

            

                {/* Featured Products Section */}
                {!isLoading && products.length > 0 ? (
                    <FeaturedProducts featuredProducts={products} />
                ) : (
                    <p className="text-center text-gray-700 mt-10">No featured products available.</p>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
