import { Service } from 'angular-ecmascript/module-helpers';

import editProductTemplateUrl from '../../templates/edit-product.html';

export default class EditProductService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = editProductTemplateUrl;
  }

  showModal(productId) {
    this.scope = this.$rootScope.$new();
    this.scope.productId = productId;

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

EditProductService.$name = 'EditProduct';
EditProductService.$inject = ['$rootScope', '$ionicModal'];
