import { Service } from 'angular-ecmascript/module-helpers';

import profileAccountNameTemplateUrl from '../../templates/profile-account-name.html';

export default class ProfileAccountNameService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = profileAccountNameTemplateUrl;
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

ProfileAccountNameService.$name = 'ProfileAccountName';
ProfileAccountNameService.$inject = ['$rootScope', '$ionicModal'];
