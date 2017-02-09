import { Service } from 'angular-ecmascript/module-helpers';

import editCityTemplateUrl from '../../templates/edit-city.html';

export default class EditCityService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = editCityTemplateUrl;
  }

  showModal(cityId) {
    this.scope = this.$rootScope.$new();
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

EditCityService.$name = 'EditCity';
EditCityService.$inject = ['$rootScope', '$ionicModal'];
