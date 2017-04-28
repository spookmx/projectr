import { Directive } from 'angular-ecmascript/module-helpers';
import RequestItemTemplateUrl from '../../templates/request-item.html';
import RequestItemCtrl from '../controllers/request-item.controller';

export default class RequestItemDirective extends Directive {
  constructor() {
    super(...arguments);

    this.templateUrl = RequestItemTemplateUrl;
    this.controller = RequestItemCtrl;
    this.controllerAs = 'requestItem';
    this.bindToController = true;
    this.replace = true;
    this.scope = {
      request:'<'
    };
  }

  // Directive compile function
  compile() {

  }

  // Directive link function
  link() {

  }
}

RequestItemDirective.$name = 'requestItem';
RequestItemDirective.$inject = [];
