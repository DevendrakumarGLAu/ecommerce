import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PaginatedResult, PaginationQuery } from '../models/api-response.model';
import { Product, ProductFilters, ProductSummary } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly api = inject(ApiService);

  /** Public product listing — published products only. */
  list(pagination: PaginationQuery = {}, filters: ProductFilters = {}): Observable<PaginatedResult<ProductSummary>> {
    return this.api.get<PaginatedResult<ProductSummary>>('/products', {
      ...pagination,
      ...filters,
      status: 'published' // storefront must never show draft/archived products
    });
  }

  /** Full product detail, including images, category, and marketplace buy links, by slug. */
  getBySlug(slug: string): Observable<Product> {
    return this.api.get<Product>(`/products/${slug}`);
  }
}
