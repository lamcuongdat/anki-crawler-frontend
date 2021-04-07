import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SoundDto} from "../dtos/SoundDto";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  getAudioBlobs(urls: string[]): Observable<SoundDto[]> {
    return this.http.get<SoundDto[]>(`${environment.apiUrl}/audio`, {params: {urls}});
  }
}
