import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {
  loading = false;

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) {
  }

  get<T>(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {
    this.spinner.show();
    return this.httpClient.get<T>(url, options).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
