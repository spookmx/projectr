import { Directive } from 'angular-ecmascript/module-helpers';
import ShowProductCompanyTemplateUrl from '../../templates/show-product-company.html';
import ShowProductCompanyCtrl from '../controllers/show-product-company.controller';

export default class ShowProductCompanyDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = ShowProductCompanyTemplateUrl;
    this.controller = ShowProductCompanyCtrl;
    this.controllerAs = 'showProductCompany';
    this.bindToController = true;
    this.replace = true;
    this.scope = {
      company:'@'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

ShowProductCompanyDirective.$name = 'showProductCompany';
ShowProductCompanyDirective.$inject = [];
