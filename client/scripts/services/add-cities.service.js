import { Service } from 'angular-ecmascript/module-helpers';

import addCitiesTemplateUrl from '../../templates/add-cities.html';

export default class AddCitiesService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = addCitiesTemplateUrl;
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

AddCitiesService.$name = 'AddCities';
AddCitiesService.$inject = ['$rootScope', '$ionicModal'];
