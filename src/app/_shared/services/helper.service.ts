import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (value._isAMomentObject) {
        formData.append(key, value.format('Y-MM-DD'));
      } else if (typeof value == 'boolean') {
        formData.append(key, value == true ? '1' : '0');
      } else {
        formData.append(key, value);
      }
    }

    return formData;
  }

  getUpdatedValues(form: FormGroup) {
    const updatedFormValues = {};
    form['_forEachChild']((control, name) => {
      if (control.touched) {
        updatedFormValues[name] = control.value;
      }
    });
    return updatedFormValues;
  }
}
