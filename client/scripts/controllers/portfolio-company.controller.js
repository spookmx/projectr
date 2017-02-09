import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies } from '../../../lib/collections';
import { Products } from '../../../lib/collections';

export default class PortfolioCompanyCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('companies');
    this.subscribe('products');

    this.helpers({
      company() {
        return Companies.findOne({_id:this.companyId});
      },
      user(){
        return Meteor.user();
      },
      products(){
        return Products.find({
          $and:[
            {
              '_id':{
                $in: _.map(this.getReactively('this.user.products'), (product)=>{ return product._id})
              }
            },
            {
              'company': this.companyId
            }
          ]
        });
      }
    });
  }
  removeCompany(){
    this.$ionicPopup.show({
      template: 'Do you want to remove this company from your portfolio?',
      title: 'Remove Company',
      subTitle: '',
      buttons: [
        { text: 'No' },
        {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: (e)=> {
            this.callMethod('removeCompany', this.companyId, (err, result) => {
              if (err) return this.handleError(err);
            });
          }
        }
      ]
    });
  }
  showAddProductsModal(){
    this.AddProducts.showModal(this.companyId);
  }
}

PortfolioCompanyCtrl.$name = 'PortfolioCompanyCtrl';
PortfolioCompanyCtrl.$inject = ['AddProducts', '$ionicPopup', '$log', '$scope'];
