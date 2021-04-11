import {MediaService} from "../services/media.service";
import {SoundDto} from "../dtos/SoundDto";
import {StringUtil} from "./string.util";
export interface SoundCheck {
  valid: boolean;
  blobData: Blob;
}
export class SoundUtil {
  public static playSound(url: string, mediaService: MediaService): void{
    this.checkSound(url, mediaService).then((result) => {
      if (result.valid) {
        let file = new File([result.blobData], "audio.mp3")
        let audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.load();
        audio.play();
      }
    })
  }

  public static checkSound(url: string, mediaService: MediaService): Promise<SoundCheck> {
    return new Promise<SoundCheck>((resolve) => {
      mediaService.getAudioBlob(url).subscribe((sound: SoundDto) => {
        let file = new File([StringUtil.b64toBlob(sound.blob)], "audio.mp3")
        let audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.load();
        audio.muted = true;
        audio.play().then((fulfillValue) => {
          resolve({
            valid: true,
            blobData: StringUtil.b64toBlob(sound.blob)
          });
        }, (rejectValue) => {
          console.log(rejectValue)
          resolve({
            valid: false,
            blobData: new Blob()
          });
        });
      })
    });
  }
}
