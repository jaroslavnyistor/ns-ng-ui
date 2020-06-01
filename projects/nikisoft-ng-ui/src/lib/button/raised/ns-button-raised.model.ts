import { NsButtonDefaultModel } from '../default/ns-button-default.model';
import { NsButtonMaterialType } from '../ns-button-material-type';

export class NsButtonRaisedModel extends NsButtonDefaultModel {
  constructor(text: string, isVisible = true) {
    super(text, isVisible);

    this.materialType = NsButtonMaterialType.Primary;
  }
}
