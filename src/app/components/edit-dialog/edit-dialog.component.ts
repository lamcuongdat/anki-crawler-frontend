import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AnkiDto} from "../../dtos/AnkiDto";
import {SoundUtil} from "../../utils/sound.util";
import {faCheck, faExclamation, faPlay, faTimes, faVolumeMute} from "@fortawesome/free-solid-svg-icons";
import {WordToAnkiService} from "../../services/word-to-anki.service";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Input() open = false;
  @Output() save = new EventEmitter<AnkiDto>();
  isImageUrlValid = true;
  formControls = {
    name: new FormControl(undefined, [Validators.required]),
    vocab: new FormControl(),
    level: new FormControl(),
    wordForm: new FormControl(),
    pronounce: new FormControl(),
    definition: new FormControl(),
    hint: new FormControl(),
    example: new FormControl(),
    advanced: new FormControl(),
    picture: new FormControl(),
    sound: new FormControl(),
    soundBlob: new FormControl()
  }
  form: FormGroup = new FormGroup(this.formControls);
  checkIcon = faCheck;
  timesIcon = faTimes;
  playIcon = faPlay;
  muteIcon = faVolumeMute;
  notExistIcon = faExclamation;
  constructor(private wordToAnkiService: WordToAnkiService) { }
  ngOnInit(): void {
  }

  onClose() {
    this.open = false;
  }

  onOpen(anki?: AnkiDto) {
    this.open = true;
    if (anki) {
      this.patchValue(anki);
    }
  }

  onSave() {
    this.save.emit(this.form.getRawValue());
    this.onClose();
  }

  private patchValue(anki: AnkiDto) {
    this.formControls.name.setValue(anki.name);
    this.formControls.level.setValue(anki.level);
    this.formControls.vocab.setValue(anki.vocab);
    this.formControls.wordForm.setValue(anki.wordForm);
    this.formControls.pronounce.setValue(anki.pronounce);
    this.formControls.definition.setValue(anki.definition);
    this.formControls.hint.setValue(anki.hint);
    this.formControls.example.setValue(anki.example);
    this.formControls.advanced.setValue(anki.advanced);
    this.formControls.picture.setValue(anki.picture);
    this.formControls.sound.setValue(anki.sound);
    this.formControls.soundBlob.setValue(anki.soundBlob);
  }

  onPlaySound(): void {
    SoundUtil.playSoundWithBlob(this.formControls.soundBlob.value);
  }

  onLoadImageUrlFail() {
    this.isImageUrlValid = false;
  }

  onLoadImageUrlSuccess() {
    this.isImageUrlValid = true;
  }

  onVocabChange() {
    let vocab = this.formControls.vocab.value;
    vocab = vocab.trim();
    if (!vocab) {
      return;
    }
    vocab = vocab.toLowerCase();
    this.wordToAnkiService.getAnkiObjects(vocab)
      .subscribe((ankis: AnkiDto[]) => {
        const anki: AnkiDto = ankis[0];
        if (anki) {
          console.log(anki)
          this.formControls.sound.setValue(anki.sound)
          this.formControls.soundBlob.setValue(anki.soundBlob)
        }
      })
  }

  onVocabInput() {
    let vocab = this.formControls.vocab.value;
    if (!vocab) {
      return;
    }
    vocab = vocab.toUpperCase();
    this.formControls.vocab.setValue(vocab);
  }
}
