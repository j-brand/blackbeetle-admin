import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringExcerpt',
})
export class StringExcerptPipe implements PipeTransform {
  transform(text: string, length: number): string {
    if (text != null && text.length > length) {
      return text.substr(0, length) + '...';
    }
    return text;
  }
}
