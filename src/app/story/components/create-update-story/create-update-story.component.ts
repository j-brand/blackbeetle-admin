import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '@core/services/story.service';
import { Story } from '@core/models/story';
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
  story: Story;
  message: String;

  constructor(
    private storyService: StoryService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.storyForm = this.formBuilder.group({
      active: [0],
      title: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      image_upload: [''],
    });

    let storyID = this.activeRoute.snapshot.paramMap.get('id');
    if (storyID) {
      this.editMode = true;
      this.getStory(Number(storyID));
    }
  }

  getStory(id: Number): void {
    this.storyService.getStory(id).subscribe((story) => {
      this.story = story;
      this.storyForm.patchValue(story);
      this.imgPath = `${environment.publicUrl}/storage/${story.title_image.path}${story.title_image.title}.${story.title_image.extension}`;
      //Set all formcontrols untouched
      Object.keys(this.storyForm.controls).forEach((controlKey) => {
        this.storyForm.controls[controlKey].markAsUntouched();
      });
    });
  }
  
  //Get all touched form values
  getUpdatedValues() {
    const updatedFormValues = {};
    this.storyForm['_forEachChild']((control, name) => {
      if (control.touched) {
        updatedFormValues[name] = control.value;
      }
    });
    return updatedFormValues;
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

  public onActiveChange(event: any) {
    if (event.checked) {
      this.storyForm.patchValue({ active: 1 });
    } else {
      this.storyForm.patchValue({ active: 0 });
    }
  }

  onSubmit() {
    var formValues = this.getUpdatedValues();

    if (Object.keys(formValues).length != 0) {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]: any[]) => {

          formData.set(key, value);
        
      });

      if (this.editMode) {
        this.storyService.updateStory(this.story.id, formData).subscribe({
          next: (data) => {
            this._snackBar.open('Story Details gespeichert!', '', {
              duration: 3000,
            });
          },
          error: (error) => {
            this._snackBar.open('Error! Call the Admin.^^', '', {
              duration: 3000,
            });
          },
        });
      } else {
        this.storyService.storeStory(formData).subscribe({
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
}
