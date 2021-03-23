import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AnkiDto} from "../../dtos/AnkiDto";
import {CellClickEvent, RemoveEvent} from "@progress/kendo-angular-grid";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {SoundUtil} from "../../utils/sound.util";
import {ExportToCsv, Options} from "export-to-csv";
export interface KendoGridColumn {
  field: string;
}
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() data: AnkiDto[] = [];
  editEvent: CellClickEvent | undefined;
  @ViewChild(EditDialogComponent) editDialog: EditDialogComponent | undefined;

  columns: KendoGridColumn[] = Object.getOwnPropertyNames(new AnkiDto()).map((field: string) => {
    return {field}
  });

  csvExportOptions: Options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    filename: 'exported',
    showLabels: true,
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSave(saveObject: AnkiDto) {
    if (this.editEvent?.rowIndex != undefined) {
      this.data[this.editEvent?.rowIndex] = Object.assign<AnkiDto, AnkiDto>(this.data[this.editEvent?.rowIndex], saveObject);
    }
  }

  onEdit($event: CellClickEvent) {
    this.editEvent = $event;
    this.editDialog?.onOpen(<AnkiDto>this.editEvent.dataItem);
  }

  onRemove($event: RemoveEvent) {
    this.data = this.data.filter((anki: AnkiDto) => anki.name !== (<AnkiDto>$event.dataItem).name)
  }

  onPlaySound(sound: string): void {
    SoundUtil.playSound(sound);
  }

  onExportCSV(): void {
    const exportData = [...this.data];
    const header = new AnkiDto();
    exportData.forEach((anki: AnkiDto) => {
      Object.keys(header).forEach(key => {
        // @ts-ignore
        if (!anki[key]) {
          // @ts-ignore
          anki[key] = '';
        }
      })
    })
    const csvExporter = new ExportToCsv(this.csvExportOptions);
    csvExporter.generateCsv(exportData);
  }
}
