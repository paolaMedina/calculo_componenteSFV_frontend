import { Injectable } from '@angular/core';
import {  HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
@Injectable()
export class ApiService {
  protected api_url = environment.apiURL;
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({'Content-Type':  'application/json'})
  }

  private formatErrors(error: any) {
    console.log(error, 'error in format errores')
    return new Observable(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
  
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    console.log(JSON.stringify(body), 'datos a enviar')
    return this.http.post(
      `${this.api_url}${path}/`,
      JSON.stringify(body),
      {headers: this.headers}
    ).pipe(tap(response=> console.log(response,'algo de respuesta')));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }

}