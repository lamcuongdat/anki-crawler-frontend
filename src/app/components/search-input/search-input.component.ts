import { Component, OnInit } from '@angular/core';
import {SuccessEvent} from "@progress/kendo-angular-upload";
import {AnkiDto} from "../../dtos/AnkiDto";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  result: AnkiDto[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSuccess($event: SuccessEvent) {
    this.result = $event.response.body;
  }
}
