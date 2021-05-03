import {AnkiDto} from "../dtos/AnkiDto";
import {AnkiExportCsvDto} from "../dtos/AnkiExportCsvDto";

export class MappetUtil {
  public static ankiToAnkiExportCsv(anki: AnkiDto): AnkiExportCsvDto {
    return {
      name: anki.name ?  anki.name : '',
      vocab: anki.vocab ? anki.vocab : '',
      level: anki.level ? anki.level : '',
      wordForm: anki.wordForm ? anki.wordForm : '',
      pronounce: anki.pronounce ? anki.pronounce : '',
      definition: anki.definition ? anki.definition : '',
      hint: anki.hint ? anki.hint : '',
      example: anki.example ? anki.example : '',
      advanced: anki.advanced ? anki.advanced : '',
      picture: anki.picture ? anki.picture : '',
      sound: anki.name ? `[sound:${anki.name}.mp3]` : '',
    }
  }
}
