import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '@core/models/image';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagePath',
})
export class ImagePathPipe implements PipeTransform {
  transform(image: Image, variant?: String): String {
    let imgVariant: String = variant ? variant : '';

    let imagePath = `${environment.publicUrl}/storage/${image.path}${image.title}${imgVariant}.${image.extension}`;
    return imagePath;
  }
}
