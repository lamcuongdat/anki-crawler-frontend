export class SoundUtil {
  public static playSound(url: string): void{
    this.checkSound(url).then((result) => {
      if (result) {
        let audio = new Audio();
        audio.src = url;
        audio.load();
        audio.play();
      }
    })
  }

  public static checkSound(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let audio = new Audio();
      audio.src = url;
      audio.load();
      audio.muted = true;
      audio.play().then((fulfillValue) => {
        resolve(true);
      }, (rejectValue) => {
        resolve(false);
      });
    });
  }
}
