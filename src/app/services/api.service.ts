import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

/** Query params as a flat object; `undefined`/`null`/`''` values are omitted. */
export type QueryParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Centralized HTTP client wrapper for the FastAPI backend.
 *
 * Prefixes every request with `environment.apiBaseUrl` and unwraps the
 * backend's `{ success, message, data }` envelope, so callers just get
 * `data` typed as `T`. Uses an absolute base URL (not a relative one) so
 * requests resolve identically during SSR and in the browser.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  get<T>(path: string, params?: QueryParams): Observable<T> {
    return this.http
      .get<ApiResponse<T>>(this.url(path), { params: this.buildParams(params) })
      .pipe(map((res) => res.data));
  }

  private url(path: string): string {
    return `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  private buildParams(params?: QueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (!params) {
      return httpParams;
    }
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }
    return httpParams;
  }
}
