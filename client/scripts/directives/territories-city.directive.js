import { Directive } from 'angular-ecmascript/module-helpers';
import TerritoriesCityTemplateUrl from '../../templates/territories-city.html';
import TerritoriesCityCtrl from '../controllers/territories-city.controller';

export default class TerritoriesCityDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = TerritoriesCityTemplateUrl;
    this.controller = TerritoriesCityCtrl;
    this.controllerAs = 'territoriesCity';
    this.bindToController = true;
    this.replace = true;
    this.scope = {
      cityId:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

TerritoriesCityDirective.$name = 'territoriesCity';
TerritoriesCityDirective.$inject = [];
