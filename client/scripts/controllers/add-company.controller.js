import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';

export default class AddCompanyCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';

    this.subscribe('companies');

    this.helpers({
      companies() {
        return Companies.find({});
      }
    });
  }

  addCompany(companyId) {
    console.log(this.companies);
    // this.callMethod('addCompany', companyId, (err) => {
    //   this.hideNewChatModal();
    // });
  }

  hideAddCompanyModal() {
    this.AddCompany.hideModal();
  }

}

AddCompanyCtrl.$name = 'AddCompanyCtrl';
AddCompanyCtrl.$inject = ['AddCompany'];
