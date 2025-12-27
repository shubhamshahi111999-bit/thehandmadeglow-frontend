import React from 'react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const PolicyPage = ({ type }) => {
  const policies = {
    shipping: {
      title: 'Shipping Policy',
      sections: [
        {
          heading: 'Shipping Methods & Delivery Time',
          content: 'We offer standard shipping across India with delivery typically within 3-5 business days. Orders are processed within 1-2 business days before shipment.'
        },
        {
          heading: 'Shipping Charges',
          content: 'FREE shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹50 applies.'
        },
        {
          heading: 'Order Tracking',
          content: 'Once your order ships, you will receive a tracking number via email and SMS to monitor your delivery status.'
        },
        {
          heading: 'Delivery Areas',
          content: 'We currently ship to all serviceable pincodes across India. Remote areas may experience slightly longer delivery times.'
        },
        {
          heading: 'Packaging',
          content: 'All candles are carefully packaged to ensure safe delivery. We use eco-friendly packaging materials whenever possible.'
        }
      ]
    },
    refund: {
      title: 'Refund & Cancellation Policy',
      sections: [
        {
          heading: 'Order Cancellation',
          content: 'Orders can be cancelled within 12 hours of placement at no charge. After this period, orders are processed and cannot be cancelled.'
        },
        {
          heading: 'Return Eligibility',
          content: 'We accept returns within 7 days of delivery if the product is unused, unlit, and in its original packaging with all labels intact.'
        },
        {
          heading: 'Refund Process',
          content: 'Once we receive and inspect your return, refunds are processed within 5-7 business days to the original payment method.'
        },
        {
          heading: 'Non-Returnable Items',
          content: 'For hygiene reasons, candles that have been lit or used cannot be returned. Custom or personalized orders are also non-returnable.'
        },
        {
          heading: 'Damaged or Defective Products',
          content: 'If you receive a damaged or defective product, please contact us within 48 hours with photos. We will arrange a replacement or full refund immediately.'
        },
        {
          heading: 'How to Initiate a Return',
          content: 'Contact us at hello@thehandmadeglow.com with your order number and reason for return. Our team will guide you through the process.'
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: 'Information We Collect',
          content: 'We collect information you provide when placing orders, including name, email, phone number, and shipping address. We also collect payment information processed securely through our payment partners.'
        },
        {
          heading: 'How We Use Your Information',
          content: 'Your information is used to process orders, communicate about your purchases, provide customer support, and send promotional offers (with your consent).'
        },
        {
          heading: 'Data Security',
          content: 'We implement industry-standard security measures to protect your personal information. Payment data is encrypted and processed through secure payment gateways.'
        },
        {
          heading: 'Third-Party Sharing',
          content: 'We do not sell your personal information. We share data only with trusted service providers (shipping, payment processing) necessary to fulfill your orders.'
        },
        {
          heading: 'Cookies',
          content: 'Our website uses cookies to improve user experience and analyze site traffic. You can control cookie preferences through your browser settings.'
        },
        {
          heading: 'Your Rights',
          content: 'You have the right to access, update, or delete your personal information. Contact us at hello@thehandmadeglow.com for any privacy-related requests.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      sections: [
        {
          heading: 'Acceptance of Terms',
          content: 'By accessing and using The Handmade Glow website and services, you accept and agree to be bound by these terms and conditions.'
        },
        {
          heading: 'Product Information',
          content: 'We strive to provide accurate product descriptions and images. However, slight variations in color, fragrance intensity, and appearance may occur as all candles are handmade.'
        },
        {
          heading: 'Pricing & Payment',
          content: 'All prices are in Indian Rupees (₹) and inclusive of applicable taxes. We reserve the right to modify prices without prior notice. Payment is required at the time of order placement.'
        },
        {
          heading: 'Order Acceptance',
          content: 'We reserve the right to refuse or cancel any order for reasons including product unavailability, pricing errors, or suspected fraudulent activity.'
        },
        {
          heading: 'Intellectual Property',
          content: 'All content on this website, including images, text, and logos, is the property of The Handmade Glow and protected by copyright laws.'
        },
        {
          heading: 'Limitation of Liability',
          content: 'We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.'
        },
        {
          heading: 'Candle Safety',
          content: 'Customers are responsible for following proper candle care and safety instructions provided with each product. Never leave burning candles unattended.'
        },
        {
          heading: 'Governing Law',
          content: 'These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of courts in [Your City], India.'
        }
      ]
    }
  };

  const currentPolicy = policies[type] || policies.shipping;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-warm py-16 md:py-20 border-b border-border">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              {currentPolicy.title}
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto p-8 md:p-12 border-border">
            <div className="space-y-8">
              {currentPolicy.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-serif text-xl md:text-2xl font-semibold mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  {index < currentPolicy.sections.length - 1 && (
                    <Separator className="mt-8" />
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <Separator className="my-8" />
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-serif text-lg font-semibold mb-2">
                Questions or Concerns?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about this policy, please don't hesitate to contact us.
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:hello@thehandmadeglow.com" className="text-primary hover:underline">
                    hello@thehandmadeglow.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+919876543210" className="text-primary hover:underline">
                    +91 98765 43210
                  </a>
                </p>
                <p>
                  <strong>WhatsApp:</strong>{' '}
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Chat with us
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </Layout>
  );
};

export default PolicyPage;