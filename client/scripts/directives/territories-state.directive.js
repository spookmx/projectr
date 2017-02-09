import { Directive } from 'angular-ecmascript/module-helpers';
import TerritoriesStateTemplateUrl from '../../templates/territories-state.html';
import TerritoriesStateCtrl from '../controllers/territories-state.controller';

export default class TerritoriesStateDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = TerritoriesStateTemplateUrl;
    this.controller = TerritoriesStateCtrl;
    this.controllerAs = 'territoriesState';
    this.bindToController = true;
    this.scope = {
      stateId:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

TerritoriesStateDirective.$name = 'territoriesState';
TerritoriesStateDirective.$inject = [];
