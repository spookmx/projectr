import { Service } from 'angular-ecmascript/module-helpers';

import addProductsTemplateUrl from '../../templates/add-products.html';

export default class AddProductsService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = addProductsTemplateUrl;
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

AddProductsService.$name = 'AddProducts';
AddProductsService.$inject = ['$rootScope', '$ionicModal'];
