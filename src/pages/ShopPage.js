import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { productAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { toast } from 'sonner';

const ShopPage = () => {
  const { category: urlCategory } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Candles' },
    { id: 'relaxation', name: 'Relaxation' },
    { id: 'festive', name: 'Festive' },
    { id: 'gift', name: 'Gift Sets' }
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts(selectedCategory);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-gradient-warm py-12 md:py-16 border-b border-border">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Our Collection
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover handcrafted candles for every mood, moment, and space
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-serif text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{cat.name}</span>
                        <Badge variant="secondary" className="ml-2">{cat.count}</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Info */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-serif text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Starting from ₹449</p>
                  <p>Gift sets up to ₹1,299</p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-border space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">100% Handmade</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Premium Soy Wax</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">40+ Hours Burn Time</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters & Categories
              </Button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="lg:hidden mb-6 p-4 border border-border rounded-lg bg-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{cat.name}</span>
                        <Badge variant="secondary">{cat.count}</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold">
                  {categories.find(c => c.id === selectedCategory)?.name || 'All Candles'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {sortedProducts.length} products
                </p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-muted/30 py-12 border-t border-border">
        <div className="container-custom text-center">
          <h3 className="font-serif text-2xl font-semibold mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-muted-foreground mb-6">
            Contact us for custom orders or special requests
          </p>
          <Button className="btn-premium" asChild>
            <a href="https://wa.me/919876543210?text=Hi! I'm interested in custom candles" target="_blank" rel="noopener noreferrer">
              Chat with Us on WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ShopPage;