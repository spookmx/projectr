import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Companies, Products } from '../../../lib/collections';

export default class AdminCompanyCtrl extends Controller {
  constructor() {
    super(...arguments);
    if(this.$stateParams.companyId){
      //Existing Company
      this.companyId = this.$stateParams.companyId;
      this.subscribe('companies');
      this.subscribe('products');
      this.helpers({
        company() {
          return Companies.findOne({_id: this.companyId});
        },
        activeProducts() {
          return Products.find({
            company: this.companyId,
            active: true
          });
        },
        inactiveProducts() {
          return Products.find({
            company: this.companyId,
            active: false
          });
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
      });
    }else{
      this.callMethod('adminAddCompany', this.company, (err, result) => {
        if (err) return this.handleError(err);
        this.hideAdminCompanyModal();
      });
    }
  }

  deleteCompany(){
    this.$ionicPopup.show({
      template: 'This company will be removed from all portfolios and deleted from the application. Do you want to proceed?',
      title: 'Delete Company',
      subTitle: '',
      buttons: [
        { text: 'No' },
        {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: (e)=> {
            this.callMethod('adminDeleteCompany', this.companyId, (err, result) => {
              if (err) return this.handleError(err);
              this.$state.go('tab.admin-portfolio');
            });
          }
        }
      ]
    });
  }

  showAddProductModal(){
    this.AdminProduct.showModal(this.companyId);
  }

  editProduct(productId){
    this.AdminProduct.showModal(this.companyId, productId);
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
AdminCompanyCtrl.$inject = ['AdminProduct', 'AdminCompany', '$ionicPopup', '$log', '$scope', '$stateParams', '$state'];
