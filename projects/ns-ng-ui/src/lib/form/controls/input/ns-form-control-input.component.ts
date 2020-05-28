import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NsIcon } from '../../../icon/ns-icon.enum';
import { NsFormControlInputModel } from './ns-form-control-input.model';

@Component({
  selector: 'ns-form-control-input',
  templateUrl: './ns-form-control-input.component.html',
  styleUrls: ['./ns-form-control-input.component.sass'],
})
export class NsFormControlInputComponent implements AfterViewInit {
  NsIcon = NsIcon;

  @Input() model: NsFormControlInputModel<any>;

  @ViewChild('inputElement', { static: true })
  inputElement: ElementRef;

  ngAfterViewInit(): void {
    if (this.model.autofocus) {
      window.setTimeout(() => this.inputElement.nativeElement.focus(), 0);
    }
  }
}
