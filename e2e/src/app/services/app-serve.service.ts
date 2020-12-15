import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServeService {
  url: any = "https://dokkanz-task.herokuapp.com";
  body: any;
  productBody: any;
  productUpdateBody: any;
  constructor(private httpClient: HttpClient) { }


  public getAllCategories(): Observable<any> {
    return this.httpClient.get(`${this.url}/viewcategories`);
  }

  public getOneCategory(categoryid): Observable<any> {
    return this.httpClient.get(`${this.url}/viewcategory/${categoryid}`);
  }

  public addNewCategory(Name, Description): Observable<any> {
    this.body = { Name, Description };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/addcategory`, this.body, { headers: headers });
  }

  public addCategoryProduct(categoryid, code, name, price): Observable<any> {
    this.productBody = { code, name, price };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.post(`${this.url}/addcategoryproduct/${categoryid}`, this.productBody, { headers: headers });
  }

  public deleteCategoryProduct(categoryid, productcode): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.delete(`${this.url}/deletecategoryproduct/${categoryid}/${productcode}`, { headers: headers });
  }
  public updateCategoryProduct(categoryid, productid, code, name, price): Observable<any> {
    this.productUpdateBody = { code, name, price };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.httpClient.put(`${this.url}/updatecategoryproduct/${categoryid}/${productid}`, this.productUpdateBody, { headers: headers });
  }
}
