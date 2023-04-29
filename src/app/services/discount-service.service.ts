import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { discountElementRequest, discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import {
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import { DocumentData, collection, addDoc } from '@firebase/firestore';
import { IcategoryElementRequest } from "../shared/interfaces/categories/categories.categories";


@Injectable({
  providedIn: 'root'
})
export class DiscountServiceService {

  private url = environment.BACKEND_URL;
  private api = { discount: `${this.url}/posts` };

  private discountCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.discountCollection = collection(this.afs, 'discount');

  }

  // Отримуєм данні
  getAll(): Observable<discountElementResponse[]> {
    return this.http.get<discountElementResponse[]>(this.api.discount);
  }

  getOne(id: number): Observable<discountElementResponse> {
    return this.http.get<discountElementResponse>(`${this.api.discount}/${id}`)
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

  //   --------------------------------------------------------------------------------------------------------

  getAllFirebase() {
    return collectionData(this.discountCollection, { idField: 'id' });
  }

  getOneFirebase(id: string): Observable<DocumentData> {
    const discountDocumentreference = doc(this.afs, `discount/${id}`);
    return docData(discountDocumentreference, { idField: 'id' });
  }

  createFirebase(discount: discountElementRequest) {
    return addDoc(this.discountCollection, discount);
  }

  updateFirebase(discount: discountElementRequest, id: string) {
    const discountDocumentreference = doc(this.afs, `discount/${id}`);
    return updateDoc(discountDocumentreference, { ...discount })
  }

  deleteFirebase(id: number) {
    const discountDocumentreference = doc(this.afs, `discount/${id}`);
    return deleteDoc(discountDocumentreference);
  }

}
