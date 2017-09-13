import { Service } from 'angular-ecmascript/module-helpers';

import ProfileAccountEmailTemplateUrl from '../../templates/profile-account-email.html';

export default class ProfileAccountEmailService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = ProfileAccountEmailTemplateUrl;
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

ProfileAccountEmailService.$name = 'ProfileAccountEmail';
ProfileAccountEmailService.$inject = ['$rootScope', '$ionicModal'];
