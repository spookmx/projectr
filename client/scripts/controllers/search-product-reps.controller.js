import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class SearchProductRepsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.loading = true;
    this.result = false

    this.helpers({
    });
    this.query = {product: this.product, location:this.location};
    this.callMethod('findReps', this.query, (err, result) => {
      if (err) return this.handleError(err);
      this.handleResponse(result);
    });
  }

  handleResponse(result){
    this.loading = false;
    if(result){
      this.result = true;
      this.legend = result.legend;
      result.hospitals ? this.hospitals = result.hospitals : null;
    }
  }

  handleError(err) {
    this.$log.error('Adding products error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Failed to add products',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

SearchProductRepsCtrl.$name = 'SearchProductRepsCtrl';
SearchProductRepsCtrl.$inject = ['$ionicPopup', '$log', '$scope'];
