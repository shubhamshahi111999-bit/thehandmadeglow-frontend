import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { productAPI } from '@/services/api';
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [filterCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts(filterCategory);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newProduct = {
      name: formData.get('name'),
      category: formData.get('category'),
      price: parseInt(formData.get('price')),
      original_price: formData.get('originalPrice') ? parseInt(formData.get('originalPrice')) : null,
      image: formData.get('image') || 'https://images.unsplash.com/photo-1643122966676-29e8597257f7?w=800',
      images: [formData.get('image') || 'https://images.unsplash.com/photo-1643122966676-29e8597257f7?w=800'],
      description: formData.get('description'),
      details: formData.get('details'),
      wax_type: formData.get('waxType'),
      burn_time: formData.get('burnTime'),
      weight: formData.get('weight'),
      fragrance_notes: formData.get('fragranceNotes').split(',').map(s => s.trim()),
      rating: 4.5,
      reviews: 0,
      in_stock: true,
      featured: false,
      bestseller: false
    };

    try {
      await productAPI.createProduct(newProduct);
      toast.success('Product added successfully!');
      setIsAddDialogOpen(false);
      fetchProducts();
      e.target.reset();
    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error('Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(productId);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const updatedProduct = {
      name: formData.get('name'),
      category: formData.get('category'),
      price: parseInt(formData.get('price')),
      original_price: formData.get('originalPrice') ? parseInt(formData.get('originalPrice')) : null,
      image: formData.get('image'),
      images: [formData.get('image')],
      description: formData.get('description'),
      details: formData.get('details'),
      wax_type: formData.get('waxType'),
      burn_time: formData.get('burnTime'),
      weight: formData.get('weight'),
      fragrance_notes: formData.get('fragranceNotes').split(',').map(s => s.trim()),
      rating: editingProduct.rating,
      reviews: editingProduct.reviews,
      in_stock: true,
      featured: editingProduct.featured,
      bestseller: editingProduct.bestseller
    };

    try {
      await productAPI.updateProduct(editingProduct.id, updatedProduct);
      toast.success('Product updated successfully!');
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to update product');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-premium">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif">Add New Product</DialogTitle>
                <DialogDescription>Fill in the product details below</DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input id="name" name="name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relaxation">Relaxation</SelectItem>
                        <SelectItem value="festive">Festive</SelectItem>
                        <SelectItem value="gift">Gift Sets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input id="price" name="price" type="number" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input id="originalPrice" name="originalPrice" type="number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL *</Label>
                  <Input id="image" name="image" type="url" placeholder="https://example.com/image.jpg" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea id="description" name="description" rows={2} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Detailed Description *</Label>
                  <Textarea id="details" name="details" rows={3} required />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="waxType">Wax Type *</Label>
                    <Input id="waxType" name="waxType" defaultValue="Premium Soy Wax" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="burnTime">Burn Time *</Label>
                    <Input id="burnTime" name="burnTime" placeholder="40-45 hours" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight *</Label>
                    <Input id="weight" name="weight" placeholder="200g" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fragranceNotes">Fragrance Notes (comma separated) *</Label>
                  <Input id="fragranceNotes" name="fragranceNotes" placeholder="Lavender, Vanilla, Chamomile" required />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-premium">
                    Add Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Edit Product Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif">Edit Product</DialogTitle>
                <DialogDescription>Update product details below</DialogDescription>
              </DialogHeader>
              
              {editingProduct && (
                <form onSubmit={handleUpdateProduct} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Product Name *</Label>
                      <Input 
                        id="edit-name" 
                        name="name" 
                        defaultValue={editingProduct.name}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category *</Label>
                      <Select name="category" defaultValue={editingProduct.category} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relaxation">Relaxation</SelectItem>
                          <SelectItem value="festive">Festive</SelectItem>
                          <SelectItem value="gift">Gift Sets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price (₹) *</Label>
                      <Input 
                        id="edit-price" 
                        name="price" 
                        type="number" 
                        defaultValue={editingProduct.price}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-originalPrice">Original Price (₹)</Label>
                      <Input 
                        id="edit-originalPrice" 
                        name="originalPrice" 
                        type="number"
                        defaultValue={editingProduct.original_price || ''}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-image">Image URL *</Label>
                    <Input 
                      id="edit-image" 
                      name="image" 
                      type="url" 
                      defaultValue={editingProduct.image}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Short Description *</Label>
                    <Textarea 
                      id="edit-description" 
                      name="description" 
                      rows={2}
                      defaultValue={editingProduct.description}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-details">Detailed Description *</Label>
                    <Textarea 
                      id="edit-details" 
                      name="details" 
                      rows={3}
                      defaultValue={editingProduct.details}
                      required 
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-waxType">Wax Type *</Label>
                      <Input 
                        id="edit-waxType" 
                        name="waxType"
                        defaultValue={editingProduct.wax_type}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-burnTime">Burn Time *</Label>
                      <Input 
                        id="edit-burnTime" 
                        name="burnTime"
                        defaultValue={editingProduct.burn_time}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-weight">Weight *</Label>
                      <Input 
                        id="edit-weight" 
                        name="weight"
                        defaultValue={editingProduct.weight}
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-fragranceNotes">Fragrance Notes (comma separated) *</Label>
                    <Input 
                      id="edit-fragranceNotes" 
                      name="fragranceNotes"
                      defaultValue={editingProduct.fragrance_notes.join(', ')}
                      required 
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsEditDialogOpen(false);
                      setEditingProduct(null);
                    }}>
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-premium">
                      Update Product
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                  <SelectItem value="festive">Festive</SelectItem>
                  <SelectItem value="gift">Gift Sets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Card className="border-border overflow-hidden group">
                <div className="relative aspect-square overflow-hidden bg-muted/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      Save ₹{product.originalPrice - product.price}
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-serif text-lg font-semibold mb-1">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
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
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-primary">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-3 w-3 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="border-border">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No products found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;