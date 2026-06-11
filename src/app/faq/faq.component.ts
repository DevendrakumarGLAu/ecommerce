import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CONTACT } from '../contact.config';

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

interface FaqCategory {
  id: string;
  label: string;
  icon: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  readonly contact = CONTACT;
  searchQuery = '';
  activeCategory = 'all';

  categories: FaqCategory[] = [
    {
      id: 'orders',
      label: 'Orders & Payments',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      items: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major payment methods including Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, UPI (GPay, PhonePe, Paytm), and Cash on Delivery for orders up to ₹5,000. All online transactions are secured with 256-bit SSL encryption.',
          open: false
        },
        {
          question: 'Can I modify or cancel my order after placing it?',
          answer: 'You can cancel or modify your order within 2 hours of placing it by contacting our support team via WhatsApp or email. Once the order is dispatched, cancellations are no longer possible, but you can initiate a return after delivery.',
          open: false
        },
        {
          question: 'Will I receive an order confirmation?',
          answer: 'Yes, an order confirmation with your order number and details will be sent to your registered email and phone number via SMS immediately after placing the order.',
          open: false
        },
        {
          question: 'Is Cash on Delivery available?',
          answer: 'Yes, Cash on Delivery (COD) is available for orders up to ₹5,000 across most pin codes in India. COD availability is shown at checkout based on your delivery location.',
          open: false
        }
      ]
    },
    {
      id: 'shipping',
      label: 'Shipping & Delivery',
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
      items: [
        {
          question: 'How long does delivery take?',
          answer: 'Standard delivery takes 5–7 business days. Express delivery (2–3 business days) is available in select cities for an additional charge. Remote locations may take 7–10 business days. You will receive tracking details via SMS and email once your order ships.',
          open: false
        },
        {
          question: 'Is there free shipping?',
          answer: 'Yes! We offer free standard shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹60 applies.',
          open: false
        },
        {
          question: 'Do you ship outside India?',
          answer: 'Currently we ship within India only. International shipping is on our roadmap — follow us on Instagram to be the first to know when it launches.',
          open: false
        },
        {
          question: 'How do I track my order?',
          answer: 'Once your order is shipped, you will receive a tracking link via SMS and email. You can also track your order by contacting us on WhatsApp with your order number.',
          open: false
        }
      ]
    },
    {
      id: 'returns',
      label: 'Returns & Exchanges',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      items: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day hassle-free return policy from the date of delivery. Items must be unused, in original packaging, and in the same condition as received. Customised or personalised items are not eligible for return.',
          open: false
        },
        {
          question: 'How do I initiate a return or exchange?',
          answer: 'Contact us within 7 days of delivery via WhatsApp at +91 98765 43210 or email at returns@firozabadbangles.com with your order number and photos of the item. Our team will guide you through the process within 24 hours.',
          open: false
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5–7 business days after we receive and inspect the returned item. The amount is credited back to the original payment method. UPI/Card refunds may take an additional 2–3 banking days depending on your bank.',
          open: false
        },
        {
          question: 'What if I receive a damaged or wrong item?',
          answer: 'We sincerely apologise for this! Please photograph the item and packaging immediately and contact us within 48 hours. We will arrange a free return pickup and send you a replacement or full refund — whichever you prefer.',
          open: false
        }
      ]
    },
    {
      id: 'products',
      label: 'Products & Sizing',
      icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
      items: [
        {
          question: 'How do I find my bangle size?',
          answer: 'We have a detailed Size Guide to help you measure accurately. The most common sizes are 2/4, 2/6, and 2/8. Measure the circumference around your knuckles with fingers held together, then refer to our size chart.',
          open: false
        },
        {
          question: 'Are the bangles made of real glass?',
          answer: 'Yes! All our bangles are crafted from authentic Firozabad glass, famous for its vibrant colours and quality. The glass is carefully shaped, lacquered, and finished by skilled artisans with decades of experience.',
          open: false
        },
        {
          question: 'How should I care for my bangles?',
          answer: 'Glass bangles are delicate. Avoid knocking them against hard surfaces. Store them in the provided pouch or box when not wearing. Keep away from water, perfumes, and chemicals. Remove before doing heavy tasks or sports.',
          open: false
        },
        {
          question: 'Do the colours look the same in person as in the photos?',
          answer: 'We photograph all products under natural light to represent colours as accurately as possible. However, slight variations may occur due to screen settings and lighting. If you have any concerns about a specific product, contact us before ordering.',
          open: false
        },
        {
          question: 'Can I order custom or bulk quantities?',
          answer: 'Absolutely! We accept bulk orders for weddings, festivals, and corporate gifting. Contact us on WhatsApp or email for custom designs, colour combinations, and wholesale pricing for orders above 50 pieces.',
          open: false
        }
      ]
    },
    {
      id: 'account',
      label: 'Account & General',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      items: [
        {
          question: 'Do I need an account to place an order?',
          answer: 'No, you can shop as a guest. However, creating an account lets you track orders, save your address, and access your order history for easy reorders.',
          open: false
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes. We use industry-standard SSL encryption for all transactions. Your personal data is never sold to third parties. Please read our Privacy Policy for full details.',
          open: false
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach us via WhatsApp at +91 98765 43210 (Mon–Sat, 10 AM–7 PM), email at info@firozabadbangles.com, or through our Instagram DMs. We typically respond within a few hours.',
          open: false
        }
      ]
    }
  ];

  get filteredCategories(): FaqCategory[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (this.activeCategory === 'all' && !q) return this.categories;

    return this.categories
      .filter(cat => this.activeCategory === 'all' || cat.id === this.activeCategory)
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          !q ||
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        )
      }))
      .filter(cat => cat.items.length > 0);
  }

  get totalResults(): number {
    return this.filteredCategories.reduce((sum, c) => sum + c.items.length, 0);
  }

  toggle(item: FaqItem): void {
    item.open = !item.open;
  }

  setCategory(id: string): void {
    this.activeCategory = id;
    this.searchQuery = '';
  }

  clearSearch(): void {
    this.searchQuery = '';
  }
}
