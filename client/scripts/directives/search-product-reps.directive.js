import { Directive } from 'angular-ecmascript/module-helpers';
import SearchProductRepsTemplateUrl from '../../templates/search-product-reps.html';
import SearchProductRepsCtrl from '../controllers/search-product-reps.controller';

export default class SearchProductRepsDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = SearchProductRepsTemplateUrl;
    this.controller = SearchProductRepsCtrl;
    this.controllerAs = 'searchProductReps';
    this.bindToController = true;
    this.replace = true;
    this.scope = {
      product:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

SearchProductRepsDirective.$name = 'searchProductReps';
SearchProductRepsDirective.$inject = [];
