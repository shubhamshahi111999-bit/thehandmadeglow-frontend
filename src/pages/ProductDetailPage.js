import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productAPI } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Package, Clock, Flame, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProduct(id);
      setProduct(response.data);
      
      // Fetch related products
      const allProducts = await productAPI.getAllProducts(response.data.category);
      setRelatedProducts(allProducts.data.filter(p => p.id !== id).slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <p>Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button className="btn-premium">Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const relatedProductsList = relatedProducts;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/cart';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container-custom py-6 border-b border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="container-custom py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square rounded-2xl overflow-hidden bg-muted/30"
            >
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {(product.images || []).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.bestseller && (
                <Badge className="mb-3">Bestseller</Badge>
              )}
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                  <Badge variant="secondary">
                    Save ₹{product.originalPrice - product.price}
                  </Badge>
                </>
              )}
            </div>

            <Separator />

            {/* Product Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Burn Time</p>
                  <p className="text-sm text-muted-foreground">{product.burnTime || product.burn_time}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Weight</p>
                  <p className="text-sm text-muted-foreground">{product.weight}</p>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">In Stock - Ready to Ship</span>
            </div>

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 btn-premium"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card className="p-4 bg-muted/30 border-border">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Free shipping on orders above ₹999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Delivery in 3-5 business days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>COD available</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="container-custom pb-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.details}</p>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-3">Specifications</h3>
                    <dl className="space-y-2">
                      <div className="flex">
                        <dt className="font-semibold w-32">Wax Type:</dt>
                        <dd className="text-muted-foreground">{product.waxType || product.wax_type}</dd>
                      </div>
                      <div className="flex">
                        <dt className="font-semibold w-32">Burn Time:</dt>
                        <dd className="text-muted-foreground">{product.burnTime || product.burn_time}</dd>
                      </div>
                      <div className="flex">
                        <dt className="font-semibold w-32">Weight:</dt>
                        <dd className="text-muted-foreground">{product.weight}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-3">Fragrance Notes</h3>
                    <div className="flex flex-wrap gap-2">
                      {(product.fragranceNotes || product.fragrance_notes || []).map((note) => (
                        <Badge key={note} variant="secondary">{note}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card className="p-6">
              <div className="text-center py-8">
                <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-serif text-xl font-semibold mb-2">Customer Reviews</h3>
                <p className="text-muted-foreground mb-4">
                  {product.reviews} verified reviews with an average rating of {product.rating} stars
                </p>
                <p className="text-sm text-muted-foreground">
                  Reviews are collected from verified purchases
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      {relatedProductsList.length > 0 && (
        <section className="bg-muted/30 py-16 border-t border-border">
          <div className="container-custom">
            <h2 className="font-serif text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProductsList.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetailPage;