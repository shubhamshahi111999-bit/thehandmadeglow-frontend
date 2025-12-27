import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Sparkles, Leaf, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-warm py-16 md:py-20 border-b border-border">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Our Story
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Crafting moments of calm, one candle at a time
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Story */}
      <section className="container-custom py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1619695662967-3e739a597f47?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHw0fHxjb3p5JTIwaG9tZSUyMGNhbmRsZXN8ZW58MHx8fHdoaXRlfDE3NjY3NjU4MDV8MA&ixlib=rb-4.1.0&q=85"
                alt="Handmade candles"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Hand-Poured with Love,
              <span className="block text-primary mt-2">Crafted for You</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Handmade Glow began with a simple belief: that moments of calm and warmth should be accessible to everyone. What started as a passion project in a small home studio has blossomed into a labor of love, bringing handcrafted candles to homes across India.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every candle we create is hand-poured with premium soy wax and carefully curated fragrances. We believe in the power of scent to transform spaces, evoke memories, and create moments of tranquility in our busy lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From selecting the finest ingredients to pouring each candle with care, we're committed to quality, sustainability, and bringing a touch of handmade warmth into your home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-muted/30 py-16 md:py-20 border-y border-border">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              The Handmade Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every candle is a result of careful craftsmanship and attention to detail
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Select Premium Wax',
                description: 'We use only the finest natural soy wax for clean, long-lasting burns'
              },
              {
                step: '02',
                title: 'Blend Fragrances',
                description: 'Carefully measured fragrance oils are blended to create the perfect scent'
              },
              {
                step: '03',
                title: 'Hand Pour',
                description: 'Each candle is poured by hand with precision and care'
              },
              {
                step: '04',
                title: 'Cure & Package',
                description: 'Candles cure for optimal scent throw before beautiful packaging'
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 h-full text-center border-border">
                  <div className="text-4xl font-serif font-bold text-primary/20 mb-4">
                    {process.step}
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container-custom py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            What We Stand For
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our core values guide everything we do
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Heart className="h-8 w-8" />,
              title: 'Handcrafted Love',
              description: 'Every candle is made with care and attention to detail'
            },
            {
              icon: <Leaf className="h-8 w-8" />,
              title: 'Sustainable',
              description: 'Natural soy wax and eco-friendly packaging'
            },
            {
              icon: <Sparkles className="h-8 w-8" />,
              title: 'Quality First',
              description: 'Premium ingredients for superior fragrance and burn'
            },
            {
              icon: <Package className="h-8 w-8" />,
              title: 'Thoughtful Gifting',
              description: 'Perfect for sharing warmth with loved ones'
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {value.icon}
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-warm py-16 border-t border-border">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience The Glow?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our collection and find the perfect candle for your space
            </p>
            <Link to="/shop">
              <Button size="lg" className="btn-premium">
                Shop Our Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;