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

  getAudioBlobs(audioUrls: string[]): Observable<SoundDto[]> {
    return this.http.get<SoundDto[]>(`${environment.apiUrl}/audio-files`, {params: {audioUrls}});
  }

  getAudioBlob(audioUrl: string): Observable<SoundDto> {
    return this.http.get<SoundDto>(`${environment.apiUrl}/audio-file`, {params: {audioUrl}});
  }
}
