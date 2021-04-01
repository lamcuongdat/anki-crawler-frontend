import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SuccessEvent} from "@progress/kendo-angular-upload";
import {AnkiDto} from "../../dtos/AnkiDto";
import {MultiSelectComponent} from "@progress/kendo-angular-dropdowns";
import {environment} from "../../../environments/environment";
import {WordToAnkiService} from "../../services/word-to-anki.service";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  result: AnkiDto[] = [];
  wordList: string[] = [];
  insertedWords: string[] = [];
  savUrl: string = `${environment.apiUrl}/files`;
  @ViewChild(MultiSelectComponent) multiSelectComponent: MultiSelectComponent;
  searchIcon = faSearch;

  constructor(private wordToAnkiService: WordToAnkiService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  onSuccess($event: SuccessEvent) {
    this.result = $event.response.body;
  }

  onInsertWord() {
    const word = this.multiSelectComponent.searchbar.input.nativeElement.value;
    if (word) {
      if (this.insertedWords.indexOf(word) < 0) {
        this.insertedWords.push(word);
      }
      if (this.wordList.indexOf(word) < 0) {
        this.wordList.push(word);
        this.wordList = this.wordList.sort();
      }
      this.multiSelectComponent.searchbar.input.nativeElement.value = '';
    }
  }

  onGetAnkiObjects(): void {
    this.wordToAnkiService.getAnkiObjects(this.insertedWords).subscribe((ankiObjects: AnkiDto[]) => {
      this.result = [...this.result, ... ankiObjects];
      this.insertedWords = [];
      this.changeDetectorRef.markForCheck();
    })
  }

  updateData($event: AnkiDto[]): void {
    this.result = $event;
  }
}
