import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { List, Pageable, Product } from '../_models';
import { Observable } from 'rxjs';
import queryString from 'query-string';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  get(pageable: Pageable, request: { [key: string]: string | number }) {
    const params = queryString.stringify({ ...pageable, ...request });
    return this.http.get<List<Product>>(`${environment.application.api}/products/?${params}`);
  }

  post(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.application.api}/products/`, product);
  }

  put(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.application.api}/products/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.application.api}/products/${id}`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.application.api}/products/${id}`);
  }
}
