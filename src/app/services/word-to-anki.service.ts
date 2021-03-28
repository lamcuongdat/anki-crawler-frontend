import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AnkiDto} from "../dtos/AnkiDto";
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WordToAnkiService {

  constructor(private http: HttpClient) { }

  public getAnkiObjects(words: string[]): Observable<AnkiDto[]> {
    return this.http.get<AnkiDto[]>(`${environment.apiUrl}/words`, {params: {words}});
  }
}
