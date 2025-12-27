import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`}>
        <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-square overflow-hidden bg-muted/30">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {product.originalPrice && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                Save ₹{product.originalPrice - product.price}
              </Badge>
            )}
            {product.bestseller && (
              <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                Bestseller
              </Badge>
            )}
            
            {/* Quick Add Button - Shows on hover */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
              <Button
                onClick={handleQuickAdd}
                className="btn-premium"
                size="sm"
              >
                Quick Add to Cart
              </Button>
            </div>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-serif text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-primary">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};