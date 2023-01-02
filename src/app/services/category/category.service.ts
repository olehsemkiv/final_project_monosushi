import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IcategoryElementRequest, IcategoryElementResponse } from 'src/app/shared/interfaces/categories/categories.categories';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };

  constructor(private http: HttpClient) { }

  // Отримуєм данні
  getAll(): Observable<IcategoryElementResponse[]> {
    return this.http.get<IcategoryElementResponse[]>(this.api.categories);
  }

  // Створюємо пост
  create(category: IcategoryElementRequest): Observable<void> {
    return this.http.post<void>(this.api.categories, category)
  }

  // Видалення поста
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`,)
  }

  // Оновлення посту
  update(category: IcategoryElementRequest, id: number): Observable<IcategoryElementRequest> {
    return this.http.patch<IcategoryElementRequest>(`${this.api.categories}/${id}`, category)
  }
}
