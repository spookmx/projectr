import { Service } from 'angular-ecmascript/module-helpers';

import searchSelectLocationTemplateUrl from '../../templates/search-select-location.html';

export default class SearchSelectLocationService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = searchSelectLocationTemplateUrl;
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

SearchSelectLocationService.$name = 'SearchSelectLocation';
SearchSelectLocationService.$inject = ['$rootScope', '$ionicModal'];
