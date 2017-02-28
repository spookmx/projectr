import { Directive } from 'angular-ecmascript/module-helpers';
import ProductRepsTemplateUrl from '../../templates/product-reps.html';
import ProductRepsCtrl from '../controllers/product-reps.controller';

export default class ProductRepsDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = ProductRepsTemplateUrl;
    this.controller = ProductRepsCtrl;
    this.controllerAs = 'productReps';
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

ProductRepsDirective.$name = 'productReps';
ProductRepsDirective.$inject = [];
