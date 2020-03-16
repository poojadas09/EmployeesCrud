import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseURL: string = environment.apiEndPoint + '/api/employees/';
  constructor(private http: HttpClient) { }

  protected get(url: string): Observable<any> {
    return this.http.get(this.baseURL + url)
      .pipe(map((res) => {
        return res;
      }));
  }

  protected put(url: string, data: object): Observable<any> {
    return this.http.put<any>(this.baseURL + url, data)
      .pipe(map((res) => {
        return res;
      }));
  }
  protected delete(url: string, Id: any): Observable<any> {
    return this.http.delete<any>(this.baseURL + url)
      .pipe(map((res) => {
        return res;
      }));
  }
  protected getbyId(url: string, Id: any): Observable<any> {
    return this.http.get(this.baseURL + url + Id)
      .pipe(map((res) => {
        return res;
      }));
  }
  protected post(url: string, data: object): Observable<any> {
    return this.http.post<any>(this.baseURL + url, data)
      .pipe(map((res) => {
        return res;
      }));
  }
}
