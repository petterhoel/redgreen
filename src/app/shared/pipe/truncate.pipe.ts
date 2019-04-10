import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number = 0): string {
    if (!length) {
      return value;
    }
    if (value.length <= length) {
      return value;
    }
    return value.substr(0, length);
  }
}
