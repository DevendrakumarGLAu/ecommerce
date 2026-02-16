import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newsletterEmail: string = '';
  currentYear: number = new Date().getFullYear();

  onNewsletterSubmit() {
    if (this.newsletterEmail && this.validateEmail(this.newsletterEmail)) {
      console.log('Newsletter subscription:', this.newsletterEmail);
      // Add your newsletter subscription logic here
      alert('Thank you for subscribing!');
      this.newsletterEmail = '';
    } else {
      alert('Please enter a valid email address');
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}