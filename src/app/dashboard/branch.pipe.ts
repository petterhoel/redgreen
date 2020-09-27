import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branch'
})
export class BranchPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return 'default branch';
    }
    const position = value.lastIndexOf('/');
    return value.slice(position + 1, value.length);
  }

}
