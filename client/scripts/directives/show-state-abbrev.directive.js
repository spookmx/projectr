import { Directive } from 'angular-ecmascript/module-helpers';
import ShowStateAbbrevTemplateUrl from '../../templates/show-state-abbrev.html';
import ShowStateAbbrevCtrl from '../controllers/show-state-abbrev.controller';

export default class ShowStateAbbrevDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = ShowStateAbbrevTemplateUrl;
    this.controller = ShowStateAbbrevCtrl;
    this.controllerAs = 'showStateAbbrev';
    this.bindToController = true;
    this.replace = true;
    this.scope = {
      state:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

ShowStateAbbrevDirective.$name = 'showStateAbbrev';
ShowStateAbbrevDirective.$inject = [];
