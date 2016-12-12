import { Directive } from 'angular-ecmascript/module-helpers';
import PortfolioCompanyTemplateUrl from '../../templates/portfolio-company.html';
import PortfolioCompanyCtrl from '../controllers/portfolio-company.controller';

export default class PortfolioCompanyDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = PortfolioCompanyTemplateUrl;
    this.controller = PortfolioCompanyCtrl;
    this.controllerAs = 'portfolioCompany';
    this.bindToController = true;
    this.scope = {
      companyId:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

PortfolioCompanyDirective.$name = 'portfolioCompany';
PortfolioCompanyDirective.$inject = [];
