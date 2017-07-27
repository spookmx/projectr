import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Products, Requests } from '../../../lib/collections';

export default class RequestItemCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('products');
    this.subscribe('requests');

    this.helpers({
      product(){
        return Products.findOne({_id:this.getReactively('this.request.product')});
      },
      request(){
        return Requests.findOne({_id:this.requestId});
      },
      badge(){
        if(this.userId == this.getReactively('this.request.representative')){
          if(!this.getReactively('this.request.viewRepresentative')){
             return 'NEW';
          }
          let comments = _.sortBy(_.where(this.getReactively('this.request.comments'), {user: 'requester'}), 'date');
          comments.length > 0 ? lastCommentDate = comments[comments.length-1].date : null;
          if(this.getReactively('this.request.viewRepresentative') && lastCommentDate > this.getReactively('this.request.viewRepresentative')){
            return 'COMMENTS';
          }
        }else{
          if(!this.getReactively('this.request.viewRequester')){
            return 'NEW';
          }
          let comments = _.sortBy(_.where(this.getReactively('this.request.comments'), {user: 'representative'}), 'date');
          comments.length > 0 ? lastCommentDate = comments[comments.length-1].date : null;
          if(this.getReactively('this.request.viewRequester') && lastCommentDate > this.getReactively('this.request.viewRequester')){
            return 'COMMENTS';
          }
        }
      }
    });

    //Create required badges


    this.services = {
      s: 'Sample',
      m: 'Inservice Meal',
      i: 'Stock Inventory',
      c: 'Case Coverage'
    };
  }
}

RequestItemCtrl.$name = 'RequestItemCtrl';
RequestItemCtrl.$inject = ['$log', '$scope'];
