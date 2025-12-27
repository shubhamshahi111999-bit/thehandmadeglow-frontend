import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { orderAPI } from '@/services/api';
import { CreditCard, Wallet, Banknote, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const cartTotal = getCartTotal();
  const shippingCost = cartTotal >= 999 ? 0 : 50;
  const finalTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    navigate('/shop');
    return null;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    toast.error('Please login to place an order');
    navigate('/login', { state: { from: { pathname: '/checkout' } } });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.target);
    
    const orderData = {
      items: cart.map(item => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      shipping_address: {
        name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        pincode: formData.get('pincode')
      },
      payment_method: paymentMethod === 'razorpay' ? 'Razorpay' : 'COD',
      notes: formData.get('notes') || null
    };

    try {
      const response = await orderAPI.createOrder(orderData);
      toast.success('Order placed successfully!', {
        description: `Order ${response.data.order_number} has been created.`
      });
      clearCart();
      setIsProcessing(false);
      navigate('/account');
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error('Failed to place order', {
        description: error.response?.data?.detail || 'Please try again'
      });
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm py-12 border-b border-border">
        <div className="container-custom">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your order</p>
        </div>
      </section>

      <div className="container-custom py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-serif">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Textarea id="address" name="address" rows={2} required />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" name="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input id="state" name="state" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input id="pincode" name="pincode" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any special instructions for delivery?"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-serif">Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      {/* Razorpay */}
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                        <RadioGroupItem value="razorpay" id="razorpay" />
                        <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <CreditCard className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">Card / UPI / Net Banking</p>
                                <p className="text-xs text-muted-foreground">Via Razorpay</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%231A73E8' d='M42 24c0-9.94-8.06-18-18-18S6 14.06 6 24s8.06 18 18 18 18-8.06 18-18z'/%3E%3C/svg%3E" alt="UPI" className="h-6" />
                            </div>
                          </div>
                        </Label>
                      </div>

                      {/* COD */}
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/30 transition-colors">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <Banknote className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Cash on Delivery</p>
                              <p className="text-xs text-muted-foreground">Pay when you receive</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 p-3 bg-muted/30 rounded-lg flex items-start space-x-2">
                    <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Your payment information is secure. We use industry-standard encryption.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-serif">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                      {cart.map((item) => (
                        <div key={item.id} className="flex space-x-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold text-primary mt-1">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium">
                          {shippingCost === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${shippingCost}`
                          )}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <span className="font-serif text-lg font-semibold">Total</span>
                      <span className="font-serif text-xl font-bold text-primary">
                        ₹{finalTotal}
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-premium"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2">⏳</span>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Place Order
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By placing this order, you agree to our Terms & Conditions
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;