import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StoryService } from '@core/services/story.service';
import { Story } from '@core/models/story';
import { HelperService } from '@shared/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-update-story',
  templateUrl: './create-update-story.component.html',
  styleUrls: ['./create-update-story.component.scss'],
})
export class CreateUpdateStoryComponent implements OnInit {
  storyForm: FormGroup;
  imgPath: String;
  editMode: Boolean = false;
  message: String;
  detailsExpanded: boolean = false;
  uploading = false;

  @Input()
  story?: Story;

  constructor(
    private helperService: HelperService,
    private storyService: StoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.storyForm = this.formBuilder.group({
      active: new FormControl(0),
      title: new FormControl([''], Validators.required),
      slug: new FormControl([''], Validators.required),
      description: new FormControl([''], Validators.required),
      image_upload: new FormControl(['']),
    });

    if (this.story) {
      this.setEditMode(this.story);
    }
    if (this.story.active == 0) {
      this.detailsExpanded = true;
    }
  }

  private setEditMode(story: Story) {
    this.editMode = true;
    this.storyForm.patchValue(story);
    this.storyForm.markAsPristine();
    this.imgPath = `${environment.publicUrl}/storage/${story.title_image.path}${story.title_image.title}.${story.title_image.extension}`;
  }

  //Add preview Image on File Input Change
  public onFileChanged(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgPath = reader.result as string;
        this.storyForm.patchValue({ image_upload: file });
        this.storyForm.controls['image_upload'].markAsTouched();
      };
    }
  }

  onSubmit() {
    var formValues = this.helperService.getUpdatedValues(this.storyForm);

    if (this.editMode) {
      this.uploading = true;
      this.storyService
        .updateStory(this.story.id, this.helperService.toFormData(formValues))
        .subscribe({
          next: (data) => {
            this.uploading = false;
            this.detailsExpanded = false;
            this._snackBar.open('Storydetails gespeichert!', '', {
              duration: 3000,
            });
          },
          error: (err) => {
            this._snackBar.open(err.error.message, '', {
              duration: 3000,
            });
          },
        });
    } else {
      this.storyService
        .createStory(this.helperService.toFormData(this.storyForm.value))
        .subscribe({
          next: (data) => {
            this.router.navigate(['/story/' + data.id]);
          },
          error: (error) => {
            if (error.errors) {
              Object.entries(error.errors).forEach(([key, value]: any[]) => {
                this.storyForm.controls[key].setErrors(value);
              });
            }
          },
        });
    }
  }
}
