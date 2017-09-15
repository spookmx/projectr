import { Service } from 'angular-ecmascript/module-helpers';

import ProfileAccountPasswordTemplateUrl from '../../templates/profile-account-password.html';

export default class ProfileAccountPasswordService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = ProfileAccountPasswordTemplateUrl;
    
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

ProfileAccountPasswordService.$name = 'ProfileAccountPassword';
ProfileAccountPasswordService.$inject = ['$rootScope', '$ionicModal'];
