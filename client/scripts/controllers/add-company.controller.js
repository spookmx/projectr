import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';

export default class AddCompanyCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.searchText = '';

    this.subscribe('companies');

    this.helpers({
      companies() {
        return Companies.find({
          active: true
        });
      },
      userCompanies(){
        return Meteor.user().companies;
      }
    });
  }

  filterCompanies(criteria, companies){
    return function(item){
      var found = false;
      _.each(companies, (companyId)=> {
        companyId == item._id ? found = true : null;
      });
      if(!found && item.name.match(new RegExp(criteria,'gi'))){
        return item;
      }else{
        return null;
      }
    }
  }

  selectAddCompanyModal() {
    this.callMethod('addCompany', this.choice, (err, result) => {
      if (err) return this.handleError(err);
      this.hideAddCompanyModal();
    });
  }

  handleError(err) {
    this.$log.error('Adding company error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add company',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  hideAddCompanyModal() {
    this.AddCompany.hideModal();
  }

}

AddCompanyCtrl.$name = 'AddCompanyCtrl';
AddCompanyCtrl.$inject = ['AddCompany', '$ionicPopup', '$log', '$scope'];
