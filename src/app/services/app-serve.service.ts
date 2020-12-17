import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServeService {
  url: any = "https://dokkanz-task.herokuapp.com";
  // url: any = "http://localhost:3000";
  body: any;
  productBody: any;
  productUpdateBody: any;
  constructor(private httpClient: HttpClient) { }


  public getAllCategories(): Observable<any> {
    return this.httpClient.get(`${this.url}/viewcategories`);
  }

  public addNewCategory(CategoryName,): Observable<any> {
    this.body = { CategoryName };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/addcategory`, this.body, { headers: headers });
  }

  public addNewSubCategory(CategoryName, SubCategoryName): Observable<any> {
    this.body = { CategoryName, SubCategoryName };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/addsubcategory`, this.body, { headers: headers });
  }

  public getOneCategory(categoryname): Observable<any> {
    return this.httpClient.get(`${this.url}/viewcategory/${categoryname}`);
  }



  public addSubCategoryProduct(categoryname, subcategoryname, code, name, price): Observable<any> {
    this.productBody = { code, name, price };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/addsubcategoryproduct/${categoryname}/${subcategoryname}`, this.productBody, { headers: headers });
  }

  public deleteSubCategoryProduct(categoryname, subcategoryname, productcode): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.delete(`${this.url}/deletesubcategoryproduct/${categoryname}/${subcategoryname}/${productcode}`, { headers: headers });
  }
  public updateSubCategoryProduct(categoryname, subcategoryname, productid, name, price): Observable<any> {
    this.productUpdateBody = { name, price };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/updatesubcategoryproduct/${categoryname}/${subcategoryname}/${productid}`, this.productUpdateBody, { headers: headers });
  }
}
