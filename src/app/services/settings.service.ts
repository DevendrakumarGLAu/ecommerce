import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { SiteSettings } from '../models/settings.model';
import { ApiService } from './api.service';

/** Public storefront settings — GET /settings requires no auth on the backend. */
@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly api = inject(ApiService);

  get(): Observable<SiteSettings> {
    return this.api.get<SiteSettings>('/settings');
  }
}
