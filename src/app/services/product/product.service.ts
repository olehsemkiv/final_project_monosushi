import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/products/product.interface';
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
import {IcategoryElementRequest} from "../../shared/interfaces/categories/categories.categories";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };

  private productCollection!: CollectionReference<DocumentData>;


  constructor(
    private http: HttpClient,
    private afs: Firestore

  ) {
    this.productCollection = collection(this.afs, 'products');

  }

  // Отримуєм данні
  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products);
  }

  // Отримуєм данні по категорії
  getAllByCategory(name: string): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.api.products}?category.path=${name}`);
  }

  // Створюємо пост
  create(product: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(this.api.products, product)
  }

  // Видалення поста
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`,)
  }

  // Оновлення посту
  update(product: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product)
  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`)
  }

//   ------------------------------------------------------------------------------------------

  getAllFirebase() {
    return collectionData(this.productCollection, {idField: 'id'});
  }

  getAllByCategoryFirebase(){
    return collectionData(this.productCollection, {idField: 'id'});
  }

  getOneFirebase(id: string) {
    const productDocumentreference = doc(this.afs, `products/${id}`);
    return docData(productDocumentreference, {idField: 'id'});
  }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentreference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentreference, {...product})
  }

  deleteFirebase(id: number){
    const productDocumentreference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentreference);
  }

}
