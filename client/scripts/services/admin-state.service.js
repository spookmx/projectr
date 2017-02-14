import { Service } from 'angular-ecmascript/module-helpers';

import adminStateTemplateUrl from '../../templates/admin-state.html';

export default class AdminStateService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = adminStateTemplateUrl;
  }

  showModal(stateId) {
    this.scope = this.$rootScope.$new();
    this.scope.stateId = stateId;

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

AdminStateService.$name = 'AdminState';
AdminStateService.$inject = ['$rootScope', '$ionicModal'];
