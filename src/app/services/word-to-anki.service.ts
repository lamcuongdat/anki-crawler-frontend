import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AnkiDto} from "../dtos/AnkiDto";
import {environment} from "../../environments/environment";
import {HttpHandlerService} from "./http-handler.service";

@Injectable({
  providedIn: 'root'
})
export class WordToAnkiService {

  constructor(private httpHandler: HttpHandlerService) { }

  public getAnkiObjects(words: string[]): Observable<AnkiDto[]> {
    return this.httpHandler.get<AnkiDto[]>(`${environment.apiUrl}/words`, {params: {words}});
  }
}
