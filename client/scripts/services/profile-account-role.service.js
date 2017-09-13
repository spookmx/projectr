import { Service } from 'angular-ecmascript/module-helpers';

import ProfileAccountRoleTemplateUrl from '../../templates/profile-account-role.html';

export default class ProfileAccountRoleService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = ProfileAccountRoleTemplateUrl;
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

ProfileAccountRoleService.$name = 'ProfileAccountRole';
ProfileAccountRoleService.$inject = ['$rootScope', '$ionicModal'];
