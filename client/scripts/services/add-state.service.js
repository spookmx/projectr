import { Service } from 'angular-ecmascript/module-helpers';

import addStateTemplateUrl from '../../templates/add-state.html';

export default class AddStateService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = addStateTemplateUrl;
  }

  showModal() {
    this.scope = this.$rootScope.$new();

    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: this.scope
    })
    .then((modal) => {
      this.modal = modal;
      this.modal.show();
    });
  }

  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }
}

AddStateService.$name = 'AddState';
AddStateService.$inject = ['$rootScope', '$ionicModal'];
