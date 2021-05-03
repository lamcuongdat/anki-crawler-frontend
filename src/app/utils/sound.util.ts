import {StringUtil} from "./string.util";

export interface SoundCheck {
  valid: boolean;
  blobData: Blob;
}
export class SoundUtil {
  public static checkSoundWithBlob(blob: string): Promise<SoundCheck> {
    return new Promise<SoundCheck>((resolve) => {
        let file = new File([StringUtil.b64toBlob(blob)], "audio.mp3")
        let audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.load();
        audio.muted = true;
        audio.play().then((fulfillValue) => {
          resolve({
            valid: true,
            blobData: StringUtil.b64toBlob(blob)
          });
        }, (rejectValue) => {
          console.log(rejectValue)
          resolve({
            valid: false,
            blobData: new Blob()
          });
        });
    });
  }

  public static playSoundWithBlob(blob: string): void {
    this.checkSoundWithBlob(blob).then((result) => {
      if (result.valid) {
        let file = new File([result.blobData], "audio.mp3")
        let audio = new Audio();
        audio.src = URL.createObjectURL(file);
        audio.load();
        audio.play();
      }
    })
  }
}
