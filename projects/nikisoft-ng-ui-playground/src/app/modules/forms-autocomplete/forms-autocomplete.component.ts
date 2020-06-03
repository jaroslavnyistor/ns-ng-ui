import { Component } from '@angular/core';
import { NsPageStandardDiConfigurator } from 'nikisoft-ng-ui';
import { FormsAutocompleteDataService } from './forms-autocomplete-data.service';
import { FormsAutocompleteModel } from './forms-autocomplete.model';
import { FormsAutocompleteService } from './forms-autocomplete.service';

@Component({
  selector: 'forms-autocomplete',
  templateUrl: './forms-autocomplete.component.html',
  styleUrls: ['./forms-autocomplete.component.sass'],
  providers: [
    NsPageStandardDiConfigurator.provideService(FormsAutocompleteService, FormsAutocompleteModel),
    FormsAutocompleteDataService,
  ],
})
export class FormsAutocompleteComponent {}
