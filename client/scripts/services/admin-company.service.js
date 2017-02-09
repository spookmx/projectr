import { Service } from 'angular-ecmascript/module-helpers';

import adminCompanyTemplateUrl from '../../templates/admin-company.html';

export default class AdminCompanyService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = adminCompanyTemplateUrl;
  }

  showModal(companyId) {
    this.scope = this.$rootScope.$new();
    this.scope.companyId = companyId;

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

AdminCompanyService.$name = 'AdminCompany';
AdminCompanyService.$inject = ['$rootScope', '$ionicModal'];
