import { Injectable } from '@angular/core';
import { NsDialogDeleteService } from './delete/ns-dialog-delete.service';

@Injectable({
  providedIn: 'root',
})
export class NsDialogService {
  private readonly _deleteDialogService: NsDialogDeleteService;

  constructor(deleteDialogService: NsDialogDeleteService) {
    this._deleteDialogService = deleteDialogService;
  }

  openDeleteDialog(title: string, message: string, confirmCallback: () => void) {
    this._deleteDialogService.open(title, message, confirmCallback);
  }
}
