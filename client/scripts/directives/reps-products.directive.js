import { Directive } from 'angular-ecmascript/module-helpers';
import RepsProductsTemplateUrl from '../../templates/reps-products.html';
import RepsProductsCtrl from '../controllers/reps-products.controller';

export default class RepsProductsDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = RepsProductsTemplateUrl;
    this.controller = RepsProductsCtrl;
    this.controllerAs = 'repsProducts';
    this.bindToController = true;
    this.replace = true;
    this.scope = {
      rep:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

RepsProductsDirective.$name = 'repsProducts';
RepsProductsDirective.$inject = [];
