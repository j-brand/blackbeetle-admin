import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from '@angular/core';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  @Input() imageSrc?: string;
  @Output() imageChangeEvent = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput: ElementRef;

  fileAttr = 'Datei auswählen...';


  uploadFileEvt(file: any) {
    if (file.target.files && file.target.files[0]) {
      this.fileAttr = '';
      Array.from(file.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 fileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          this.imageChangeEvent.emit(imgBase64Path);
        };
      };
      reader.readAsDataURL(file.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Datei auswählen...';
    }
  }
}
