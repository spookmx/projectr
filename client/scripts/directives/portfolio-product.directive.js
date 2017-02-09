import { Directive } from 'angular-ecmascript/module-helpers';
import PortfolioProductTemplateUrl from '../../templates/portfolio-product.html';
import PortfolioProductCtrl from '../controllers/portfolio-product.controller';

export default class PortfolioProductDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = PortfolioProductTemplateUrl;
    this.controller = PortfolioProductCtrl;
    this.controllerAs = 'portfolioProduct';
    this.bindToController = true;
    this.replace = true;
    this.scope = {
      productId:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

PortfolioProductDirective.$name = 'portfolioProduct';
PortfolioProductDirective.$inject = [];
