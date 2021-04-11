import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AnkiDto} from "../../dtos/AnkiDto";
import {SoundUtil} from "../../utils/sound.util";
import {Observable, of} from "rxjs";
import {
  faCheck,
  faExclamation,
  faTimes,
  faVolumeMute,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import {MediaService} from "../../services/media.service";

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
    sound: new FormControl(undefined,[], [this.soundUrlValidator()])
  }
  form: FormGroup = new FormGroup(this.formControls);
  checkIcon = faCheck;
  timesIcon = faTimes;
  playIcon = faVolumeUp;
  muteIcon = faVolumeMute;
  notExistIcon = faExclamation;
  constructor(private mediaService: MediaService) { }
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
  }

  onPlaySound(): void {
    SoundUtil.playSound(this.formControls.sound.value, this.mediaService);
  }

  soundUrlValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return SoundUtil.checkSound(control.value, this.mediaService).then((result) => {
        return new Promise<{ [key: string]: any } | null>((resolve) => {
          if (result.valid) {
            resolve(null);
          } else {
            resolve({'valid': false});
          }
        });
      })
    };
  }

  onLoadImageUrlFail() {
    this.isImageUrlValid = false;
  }

  onLoadImageUrlSuccess() {
    this.isImageUrlValid = true;
  }
}
