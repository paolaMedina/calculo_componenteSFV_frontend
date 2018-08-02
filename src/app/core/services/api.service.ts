import { Injectable } from '@angular/core';
import {  HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
@Injectable()
export class ApiService {
  protected api_url = environment.apiURL;
  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(error: any) {
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
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }

}