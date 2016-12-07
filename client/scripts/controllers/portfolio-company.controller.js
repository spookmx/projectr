import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';

export default class PortfolioCompanyCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('companies');

    this.helpers({
      company() {
        return Companies.findOne({_id:this.companyId});
      },
      user(){
        return Meteor.user();
      }
    });
  }
  showAddProductsModal(){
    this.AddProducts.showModal();
  }
}

PortfolioCompanyCtrl.$name = 'PortfolioCompanyCtrl';
PortfolioCompanyCtrl.$inject = ['AddProducts', '$ionicPopup', '$log', '$scope'];
