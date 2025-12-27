import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Flame, Package, Heart, Shield, Star, ArrowRight } from 'lucide-react';
import { productAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAllProducts('all');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const bestSellers = products.filter(p => p.bestseller).slice(0, 4);
  const featured = products.filter(p => p.featured).slice(0, 3);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast.success('Subscribed!', {
      description: 'Welcome to The Handmade Glow family!'
    });
    e.target.reset();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container-custom py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <Badge variant="secondary" className="w-fit">
                ✨ Handcrafted with Love
              </Badge>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Handcrafted Candles to
                <span className="block text-gradient-gold mt-2">
                  Light Your Calm
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Discover our collection of premium hand-poured candles, crafted to bring warmth, tranquility, and beautiful fragrance into your everyday moments.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button size="lg" className="btn-premium w-full sm:w-auto">
                    Shop Candles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/shop/gift">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Gift Sets
                  </Button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Handmade</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Free Shipping ₹999+</span>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1662748900969-8f73eba53403?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZXN8ZW58MHx8fHdoaXRlfDE3NjY3NjU3OTl8MA&ixlib=rb-4.1.0&q=85"
                  alt="Handmade Candles"
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Flame className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">40-50hrs</p>
                    <p className="text-sm text-muted-foreground">Burn Time</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container-custom py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every mood and occasion
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Relaxation Candles',
              description: 'Unwind with calming fragrances',
              image: 'https://images.unsplash.com/photo-1612293905607-b003de9e54fb?w=800',
              link: '/shop/relaxation'
            },
            {
              title: 'Festive Candles',
              description: 'Celebrate special moments',
              image: 'https://images.pexels.com/photos/1832562/pexels-photo-1832562.jpeg?w=800',
              link: '/shop/festive'
            },
            {
              title: 'Gift Sets',
              description: 'Perfect presents for loved ones',
              image: 'https://images.unsplash.com/photo-1646562011038-73774c1ef7d7?w=800',
              link: '/shop/gift'
            }
          ].map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link to={collection.link}>
                <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-card">
                      <h3 className="font-serif text-xl md:text-2xl font-semibold mb-2">{collection.title}</h3>
                      <p className="text-sm text-card/90">{collection.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why Choose The Handmade Glow?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every candle tells a story of craftsmanship, quality, and care
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: 'Hand-Poured with Love',
                description: 'Each candle is carefully crafted by hand with attention to detail'
              },
              {
                icon: <Flame className="h-8 w-8" />,
                title: 'Premium Soy Wax',
                description: 'Made with eco-friendly, natural soy wax for cleaner burning'
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: 'Long-Lasting Fragrance',
                description: '40-50 hours of beautiful, consistent scent throw'
              },
              {
                icon: <Package className="h-8 w-8" />,
                title: 'Perfect for Gifting',
                description: 'Beautifully packaged, ready to bring joy to your loved ones'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="text-center p-6 h-full border-border hover:shadow-md transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container-custom py-16 md:py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Customer favorites you'll love</p>
          </div>
          <Link to="/shop">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real experiences from our wonderful community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                review: 'The lavender candle is absolutely divine! The quality is exceptional and it burns for so long. Perfect for my evening meditation.',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
              },
              {
                name: 'Rohan Mehta',
                review: 'Bought the gift set for my mom and she loved it! The packaging was beautiful and the candles smell amazing. Highly recommend!',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
              },
              {
                name: 'Ananya Desai',
                review: 'These candles have transformed my home ambiance. The fragrances are not overpowering, just perfect. Will definitely order again!',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 border-border">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.review}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">Verified Customer</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-custom py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-warm border-border p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Join The Glow Community
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter for exclusive offers, new arrivals, and candle care tips
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-background"
                />
                <Button type="submit" className="btn-premium sm:w-auto">
                  Subscribe
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>
      </section>
    </Layout>
  );
};

export default HomePage;