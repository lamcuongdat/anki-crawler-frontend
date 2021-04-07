import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AnkiDto} from "../../dtos/AnkiDto";
import {CellClickEvent, RemoveEvent} from "@progress/kendo-angular-grid";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import {SoundUtil} from "../../utils/sound.util";
import {ExportToCsv, Options} from "export-to-csv";
import {
  faFileAudio,
  faFileCsv,
  faTrash,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import {MediaService} from "../../services/media.service";
import * as FileSaver from "file-saver";
import {StringUtil} from "../../utils/string.util";
import * as JSZip from 'jszip';
import {SoundDto} from "../../dtos/SoundDto";

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
  @Output() updateData: EventEmitter<AnkiDto[]> = new EventEmitter<AnkiDto[]>();
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
  csvFileIcon = faFileCsv;
  audioFileIcon = faFileAudio;
  speakerIcon = faVolumeUp;
  deleteIcon = faTrash;

  constructor(private mediaService: MediaService) {
  }

  ngOnInit(): void {
  }

  onSave(saveObject: AnkiDto) {
    if (this.editEvent?.rowIndex != undefined) {
      this.data[this.editEvent?.rowIndex] = Object.assign<AnkiDto, AnkiDto>(this.data[this.editEvent?.rowIndex], saveObject);
      this.updateData.emit(this.data);
    }
  }

  onEdit($event: CellClickEvent) {
    this.editEvent = $event;
    this.editDialog?.onOpen(<AnkiDto>this.editEvent.dataItem);
  }

  onRemove($event: RemoveEvent) {
    this.data = this.data.filter((anki: AnkiDto) => anki.name !== (<AnkiDto>$event.dataItem).name)
    this.updateData.emit(this.data);
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

  onDownloadAllSounds() {
    const urls = this.data.map((anki: AnkiDto) => anki.sound);
    this.mediaService.getAudioBlobs(urls).subscribe((sounds: SoundDto[]) => {
      let zip = new JSZip();
      let folder = zip.folder("sound");
      console.log(this.data)
      sounds.forEach((sound: SoundDto) => {
        const ankiDto: AnkiDto | undefined = this.data.find((anki: AnkiDto) => anki.sound == sound.url);
        if (folder && ankiDto) {
          folder.file(`${StringUtil.correctFileName(ankiDto.name)}.mp3`,
            StringUtil.b64toBlob(sound.blob), {base64: true});
        }
      })
      if (folder) {
        zip.generateAsync({type: "blob"})
          .then(function (content) {
            FileSaver.saveAs(content, "sound.zip");
          });
      }
    })
  }
}
