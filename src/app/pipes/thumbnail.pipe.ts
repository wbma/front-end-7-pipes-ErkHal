import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  transform(filename: string, args?: string): string {

    const imageSizes = {
      small: "-tn160.png",
      medium: "-tn320.png",
      large: "-tn640.png"
    };

    if(args) { return filename.split('.')[0] + imageSizes[args]; }

    return filename.split('.')[0] + imageSizes.small;
  }

}
