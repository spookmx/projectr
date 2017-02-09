import { Service } from 'angular-ecmascript/module-helpers';

import adminProductTemplateUrl from '../../templates/admin-product.html';

export default class AdminProductService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = adminProductTemplateUrl;
  }

  showModal(companyId, productId) {
    this.scope = this.$rootScope.$new();
    this.scope.companyId = companyId;
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

AdminProductService.$name = 'AdminProduct';
AdminProductService.$inject = ['$rootScope', '$ionicModal'];
