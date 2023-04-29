import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IcategoryElementRequest, IcategoryElementResponse } from 'src/app/shared/interfaces/categories/categories.categories';
import { environment } from 'src/environments/environment';
import {
  Firestore,
  CollectionReference,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  docData
} from '@angular/fire/firestore';
import { DocumentData, collection, addDoc }  from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };

  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

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

//   --------------------------------------------------------------------------------------------------------------------

  getAllFirebase() {
    return collectionData(this.categoryCollection, {idField: 'id'});
  }

  getOneFirebase(id: string) {
    const categoryDocumentreference = doc(this.afs, `categories/${id}`);

    return docData(categoryDocumentreference, {idField: 'id'});
  }

  createFirebase(category: IcategoryElementRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateFirebase(category: IcategoryElementRequest, id: string) {
    const categoryDocumentreference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentreference, {...category})
  }

  deleteFirebase(id: number){
    const categoryDocumentreference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentreference);
  }

}
