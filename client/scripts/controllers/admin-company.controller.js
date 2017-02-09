import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';

export default class AdminCompanyCtrl extends Controller {
  constructor() {
    super(...arguments);
    if(this.AdminCompany.scope.companyId){
      //Existing Company
      this.companyId = this.AdminCompany.scope.companyId;
      this.subscribe('companies');
      this.helpers({
        company() {
          return Companies.findOne({_id: this.companyId});
        }
      });
      this.title = "Update "+this.company.name;
    }else{
      //New Company
      this.company = {website:"http://", active:true};
      this.title = "Add New Company";
    }
  }

  saveAdminCompanyModal() {
    if(this.companyId){
      this.callMethod('adminUpdateCompany', this.company, (err, result) => {
        if (err) return this.handleError(err);
        this.hideAdminCompanyModal();
      });
    }else{
      this.callMethod('adminAddCompany', this.company, (err, result) => {
        if (err) return this.handleError(err);
        this.hideAdminCompanyModal();
      });
    }
  }

  handleError(err) {
    this.$log.error('Adding company error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add company',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideAdminCompanyModal() {
    this.AdminCompany.hideModal();
  }

}

AdminCompanyCtrl.$name = 'AdminCompanyCtrl';
AdminCompanyCtrl.$inject = ['AdminCompany', '$ionicPopup', '$log', '$scope'];
