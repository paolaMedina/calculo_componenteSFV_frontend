import { Injectable } from '@angular/core';
import {  HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
declare var $:any;

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
  private getDjangoCSFRtoken(): string | false {
    console.log(document.getElementsByName("csrfmiddlewaretoken"), 'elements by name csrf middleware token ');
    const hiddenCsfrInput = <HTMLInputElement> document.getElementsByName("csrfmiddlewaretoken")[0]; //
    if ( hiddenCsfrInput ) { 
      return hiddenCsfrInput.value;
    } else {
      return '';
    }
  }
  private appendDjangoCSFRtokenToHeaders() {
    var djangoCSFRtoken: string | false;
    djangoCSFRtoken = this.getDjangoCSFRtoken();
    if ( this.headers.get('X-CSRFToken') ) {

    } else if( djangoCSFRtoken ) {
      this.headers.append('X-CSRFToken', djangoCSFRtoken);
    }
  }
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }
  postRedirect(path: string, body: Object = {}): void {
    var _body = {validated_data: JSON.stringify(body)};
    ($.redirect(`${this.api_url}${path}/`, _body)); 
  }
  post(path: string, body: Object = {}): Observable<any> {
    this.appendDjangoCSFRtokenToHeaders();
    console.log(this.headers.get('X-CSRFToken'));
    console.log(JSON.stringify(body), 'datos a enviar')
    return this.http.post(
      `${this.api_url}${path}/`,
      JSON.stringify(body),
      {headers: this.headers},

    ).pipe(tap(response=> console.log(response,'algo de respuesta')));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }

}