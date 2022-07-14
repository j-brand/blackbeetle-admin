import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from '@core/services/file-upload.service';

@Component({
  selector: 'app-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.scss'],
})
export class FileDropzoneComponent implements OnInit {
  files: any[] = [];

  @Input()
  uploadURL: any;

  @Output('uploaded')
  fileUploaded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fileUplaodService: FileUploadService) {}

  ngOnInit(): void {
    //console.log(this.uploadURL);
  }

  public onFilesDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const file of files) {
      file.progress = 0;
      let index = this.files.push(file);
      if (file.type.startsWith('image/')) {
        this.uploadFile(file, index - 1);
      } else {
        this.files[index - 1].error = true;
        this.files[index - 1].error_message = 'Bitte nur Bilder hochladen.';
      }
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * Pass file to upload Service
   * @param file (File)
   */
  uploadFile(file: File, index: number) {
    let uploadUrl = this.uploadURL;
    let formModel = new FormData();
    formModel.append('file', file);
    this.fileUplaodService.upload(uploadUrl, formModel).subscribe((result) => {
      if (result.status && result.status == 'progress') {
        this.files[index].progress = result.message;
      } else if (result.id) {
        this.fileUploaded.emit(result);
        this.files[index].success = true;
      }
    });
  }
}
