import { AbstractControl } from '@angular/forms';
import { NsFormArray } from './controls/array/ns-form-array';
import { NsFormGroup } from './controls/group/ns-form-group';
import { NsFormControl } from './controls/ns-form-control';

export class NsFormBuilder {
  public build(entity: any): NsFormGroup {
    const formGroup = new NsFormGroup({});

    for (const prop in entity) {
      if (entity.hasOwnProperty(prop)) {
        const value: any = entity[prop];

        let formControl: AbstractControl;

        if (Array.isArray(value)) {
          formControl = this.buildArray(value);
        } else if (typeof value === 'object') {
          if (value == null) {
            formControl = new NsFormControl('');
          } else {
            formControl = this.build(value);
          }
        } else {
          formControl = new NsFormControl(value);
        }

        formGroup.addControl(prop, formControl);
      }
    }

    formGroup.setValue(entity);

    return formGroup;
  }

  private buildArray(value: any[]): NsFormArray {
    const formArray = new NsFormArray([]);

    value.forEach((item) => {
      formArray.push(this.build(item));
    });

    return formArray;
  }
}
