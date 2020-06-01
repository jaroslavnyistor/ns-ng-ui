import { Component, Input } from '@angular/core';
import { NsToolbarEditModel } from './ns-toolbar-edit.model';
import { NsToolbarEditService } from './ns-toolbar-edit.service';

@Component({
  selector: 'ns-toolbar-edit',
  templateUrl: './ns-toolbar-edit.component.html',
  styleUrls: ['./ns-toolbar-edit.component.sass'],
})
export class NsToolbarEditComponent {
  @Input() model: NsToolbarEditModel;
  @Input() service: NsToolbarEditService;

  handleAddRequested() {
    this.service.handleAddRequested();
  }

  handleEditRequested() {
    if (this.model.isEditDisabled) {
      return;
    }

    this.service.handleEditRequested();
  }

  handleDeleteRequested() {
    if (this.model.isDeleteDisabled) {
      return;
    }

    this.service.handleDeleteRequested();
  }
}
