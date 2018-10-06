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
    //console.log(error, 'error in format errores')
    return new Observable(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
  private getDjangoCSFRtoken(): string | false {
    //console.log(document.getElementsByName("csrfmiddlewaretoken"), 'elements by name csrf middleware token ');
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
  /**
   * Realizar un post y seguidamente redireccionar a la url target
   * @param nombre_projecto Nombre de el proyecto que se va a enviar 
   * @param body El objeto que se enviara en el post
   */
  postRedirect(nombre_projecto: string, body: Object = {}): void {
    var _body = {validated_data: JSON.stringify(body)};
    //console.log("estoy a punto de hacer el post data 2 super valid");
    this.post(`postData2`, _body).subscribe(
      _ => {
        window.top.location.href=`${this.api_url}pdf/cotizacion_${nombre_projecto}/`;
      }
    ); 
  }
  post(path: string, body: Object = {}): Observable<any> {
    this.appendDjangoCSFRtokenToHeaders();
    return this.http.post(
      `${this.api_url}${path}/`,
      JSON.stringify(body),
      {headers: this.headers},

    ).pipe(tap(response=>{}));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }

}