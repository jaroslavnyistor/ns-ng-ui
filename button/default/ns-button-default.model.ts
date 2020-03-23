import { NsButtonModel } from '../ns-button.model';

export class NsButtonDefaultModel extends NsButtonModel {
   constructor(text: string, isVisible = true) {
      super(text, isVisible);
   }
}
