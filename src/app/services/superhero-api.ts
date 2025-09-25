import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, HeroApi } from '../interfaces/hero-api';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SuperheroApi {
  private readonly http = inject(HttpClient);
  
  getSHeroes(): Observable<HeroApi> {
    return this.http.get<HeroApi>(`${environment.BASE_HEROAPI_URL}/all.json`);
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${environment.BASE_HEROAPI_URL}/id/${id}.json`)
  }

}
