import * as moment from 'moment';

export class DateUtil {
  public static DATE_TIME_NO_SPACE_FORMAT: string = 'YYYYMMDD-HHmmss'
  public static DATE_TIME_DEFAULT_FORMAT: string = 'YYYY MM DD HH:mm:ss'

  public static now(format?: string): string {
    const _format = format ? format : this.DATE_TIME_DEFAULT_FORMAT;
    return moment().format(_format);
  }
}
