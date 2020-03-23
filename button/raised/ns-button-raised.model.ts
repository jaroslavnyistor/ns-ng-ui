import { NsButtonDefaultModel } from '../default/ns-button-default.model';
import { NsButtonType } from '../ns-button-type';

export class NsButtonRaisedModel extends NsButtonDefaultModel {
   constructor(text: string, isVisible = true) {
      super(text, isVisible);

      this.type = NsButtonType.Primary;
   }
}
