import { Service } from 'angular-ecmascript/module-helpers';

import adminCityTemplateUrl from '../../templates/admin-city.html';

export default class AdminCityService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = adminCityTemplateUrl;
  }

  showModal(stateId, cityId) {
    this.scope = this.$rootScope.$new();
    this.scope.stateId = stateId;
    this.scope.cityId = cityId;

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

AdminCityService.$name = 'AdminCity';
AdminCityService.$inject = ['$rootScope', '$ionicModal'];
