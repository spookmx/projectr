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

  requestAddCompanyModal(){
    this.callMethod('adminAddCompany', this.company, (err, result) => {
      if (err) return this.handleError(err);
      this.handleRequestCompleted();
    });
  }

  handleRequestCompleted(){
    this.hideAddCompanyModal();
    this.$rootScope.requestCompletedAlert = this.$ionicPopup.show({
      title: 'Request Listing',
      template: 'Thanks! We are processing your request.',
      buttons: [
      { text: 'Ok' }
      ]
    });
  }

}

AddCompanyCtrl.$name = 'AddCompanyCtrl';
AddCompanyCtrl.$inject = ['AddCompany', '$ionicPopup', '$log', '$scope', '$rootScope'];
