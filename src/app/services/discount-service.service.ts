import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { discountElementRequest, discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';


@Injectable({
  providedIn: 'root'
})
export class DiscountServiceService {
  
  private url = environment.BACKEND_URL;
  private api = { discount: `${this.url}/posts` };
  constructor(private http: HttpClient) { }

  // Отримуєм данні
  getAll(): Observable<discountElementResponse[]> {
    return this.http.get<discountElementResponse[]>(this.api.discount);
  }

  // Створюємо пост
  create(postItem: discountElementRequest): Observable<void> {
    return this.http.post<void>(this.api.discount, postItem)
  }

  // Видалення поста
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discount}/${id}`,)
  }

  // Оновлення посту
  update(postItem: discountElementRequest, id: number): Observable<discountElementRequest> {
    return this.http.patch<discountElementRequest>(`${this.api.discount}/${id}`, postItem)
  }
}
