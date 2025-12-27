import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '@/context/AdminContext';
import { productAPI, orderAPI } from '@/services/api';
import { TrendingUp, Package, ShoppingBag, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { orders } = useAdmin();
  const [products, setProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productAPI.getAllProducts('all'),
        orderAPI.getAllOrders('all')
      ]);
      setProducts(productsRes.data);
      setAllOrders(ordersRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = allOrders.filter(o => o.status === 'pending').length;
  const totalProducts = products.length;
  const totalOrders = allOrders.length;

  // Recent orders
  const recentOrders = allOrders.slice(0, 5);

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6" />,
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: <ShoppingBag className="h-6 w-6" />,
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      title: 'Total Products',
      value: totalProducts,
      icon: <Package className="h-6 w-6" />,
      change: '0',
      changeType: 'neutral'
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: <TrendingUp className="h-6 w-6" />,
      change: '+5',
      changeType: 'positive'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      processing: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      shipped: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      delivered: 'bg-green-500/10 text-green-600 border-green-500/20',
      cancelled: 'bg-red-500/10 text-red-600 border-red-500/20'
    };
    return colors[status] || '';
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                    {stat.changeType === 'positive' && (
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <p className="font-semibold">{order.order_number}</p>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.shipping_address.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">₹{order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif">Order Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => {
                  const count = allOrders.filter(o => o.status === status).length;
                  const percentage = allOrders.length > 0 ? ((count / allOrders.length) * 100).toFixed(1) : 0;
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm capitalize">{status}</span>
                        <span className="text-sm font-medium">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatusColor(status).split(' ')[0].replace('/10', '')}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif">Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">₹{product.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{product.rating}</p>
                      <p className="text-xs text-muted-foreground">rating</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;