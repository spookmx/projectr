import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Companies, Products, States, Cities, Requests } from '../lib/collections';

Meteor.methods({
  addCompany(companyId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to add company to portfolio.');
    }
    return Meteor.users.update(this.userId, {
      $addToSet: {
        companies: companyId
      }
    });
  },
  removeCompany(companyId){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to remove a company.');
    }
    let user = Meteor.users.findOne(this.userId);
    let products = [];
    _.each(user.products, (product)=>{
      let productComplete = Products.findOne({_id:product._id});
      productComplete.company != companyId ? products.push(product) : null;
    });
    let companies = _.without(user.companies, companyId);
    return Meteor.users.update(this.userId, {
      $set: {
        products: products,
        companies: companies
      }
    });
  },
  addProducts(selected){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to add products to portfolio.');
    }
    return Meteor.users.update(this.userId, {
      $addToSet: {
        products: { $each: selected }
      }
    });
  },
  updateProduct(product){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update services on portfolio.');
    }
    let user = Meteor.users.findOne(this.userId);
    let products = _.without(user.products, _.findWhere(user.products, {_id: product._id}));
    products.push(product);

    return Meteor.users.update(this.userId, {
      $set: {
        products: products
      }
    });
  },
  removeProduct(product){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to remove products.');
    }
    let user = Meteor.users.findOne(this.userId);
    let products = _.without(user.products, _.findWhere(user.products, {_id: product._id}));
    return Meteor.users.update(this.userId, {
      $set: {
        products: products
      }
    });
  },
  addState(stateId){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to add state to territories.');
    }
    return Meteor.users.update(this.userId, {
      $addToSet: {
        states: stateId
      }
    });
  },
  removeState(stateId){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to add state to territories.');
    }
    let user = Meteor.users.findOne(this.userId);
    let cities = [];
    _.each(user.cities, (city, key)=>{
      let cityComplete = Cities.findOne({_id:city._id});
      cityComplete.state != stateId ? cities.push(city) : null;
    });
    let states = _.without(user.states, stateId);
    return Meteor.users.update(this.userId, {
      $set: {
        states: states,
        cities: cities
      }
    });
  },
  addCities(selected){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to add products to portfolio.');
    }
    return Meteor.users.update(this.userId, {
      $addToSet: {
        cities: { $each: selected }
      }
    });
  },
  findReps(query){
    let users = Meteor.users.find({$and:[
      {
        products:{$elemMatch: {_id:query.product._id}}
      },{
        cities:{$elemMatch: {_id:query.location.cityId}}
      }]
    }).fetch();
    if(users.length){
      if(users.length > 1){
        return { legend: users.length +" reps on the area" }
      }else{
        let city = _.findWhere(users[0].cities, {_id: query.location.cityId});
        let product = _.findWhere(users[0].products, {_id: query.product._id});
        return { legend: users[0].givenName + " " + users[0].familyName, hospitals:city.hospitals, services: {s:product.s, m:product.m, i:product.i, c:product.c} }
      }
    }else{
      return null
    }
  },
  updateCity(city){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update cities.');
    }
    let user = Meteor.users.findOne(this.userId);
    let cities = _.without(user.cities, _.findWhere(user.cities, {_id: city._id}));
    cities.push(city);

    return Meteor.users.update(this.userId, {
      $set: {
        cities: cities
      }
    });
  },
  removeCity(city){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to remove cities.');
    }
    let user = Meteor.users.findOne(this.userId);
    let cities = _.without(user.cities, _.findWhere(user.cities, {_id: city._id}));

    return Meteor.users.update(this.userId, {
      $set: {
        cities: cities
      }
    });
  },
  adminAddCompany(company){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to add companies.');
    }
    if (Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      company.active = false;
    }
    company.createdAt = new Date();
    company.lastUpdatedAt = new Date();
    company.createdBy = this.userId;
    company.lastUpdatedBy = this.userId;
    return Companies.insert(company);
  },
  adminUpdateCompany(company){
    if (!this.userId || Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to add companies.');
    }
    company.lastUpdatedAt = new Date();
    company.lastUpdatedBy = this.userId;
    return Companies.update({_id:company._id}, {
      $set: {
        name:company.name,
        description:company.description,
        website:company.website,
        lastUpdatedAt: company.lastUpdatedAt,
        lastUpdatedBy: company.lastUpdatedBy,
        active: company.active
      }
    });
  },
  adminAddProduct(product){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to add products.');
    }
    if (Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      product.active = false;
    }
    product.createdAt = new Date();
    product.lastUpdatedAt = new Date();
    product.createdBy = this.userId;
    product.lastUpdatedBy = this.userId;
    return Products.insert(product);
  },
  adminUpdateProduct(product){
    if (!this.userId || Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to edit products.');
    }
    product.lastUpdatedAt = new Date();
    product.lastUpdatedBy = this.userId;
    return Products.update({_id:product._id}, {
      $set: {
        name:product.name,
        description:product.description,
        website:product.website,
        lastUpdatedAt: product.lastUpdatedAt,
        lastUpdatedBy: product.lastUpdatedBy,
        copayInformation: product.copayInformation,
        copayWebsite: product.copayWebsite,
        type: product.type,
        active: product.active
      }
    });
  },
  adminDeleteProduct(productId){
    if (!this.userId || Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to delete products.');
    }
    Products.remove({_id: productId});
    let users = Meteor.users.find({
      products:{
        $elemMatch: {
          _id:productId
        }
      }
    }).fetch();
    _.each(users, (user)=>{
      let products = _.without(user.products, _.findWhere(user.products, {_id: productId}));
      Meteor.users.update(user._id, {
        $set: {
          products: products
        }
      });
    });
  },
  adminDeleteCompany(companyId){
    if (!this.userId || Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to delete companies.');
    }
    Companies.remove({_id: companyId});
    let users = Meteor.users.find({
      companies: companyId
    }).fetch();
    _.each(users, (user)=>{
      let companies = _.without(user.companies, companyId);
      Meteor.users.update(user._id, {
        $set: {
          companies: companies
        }
      });
    });
  },

  adminAddState(state){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to add states.');
    }
    if (Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      state.active = false;
    }
    state.createdAt = new Date();
    state.lastUpdatedAt = new Date();
    state.createdBy = this.userId;
    state.lastUpdatedBy = this.userId;
    return States.insert(state);
  },
  adminUpdateState(state){
    if (!this.userId || Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to modify states.');
    }
    state.lastUpdatedAt = new Date();
    state.lastUpdatedBy = this.userId;
    return States.update({_id:state._id}, {
      $set: {
        name:state.name,
        lastUpdatedAt: state.lastUpdatedAt,
        lastUpdatedBy: state.lastUpdatedBy,
        active: state.active
      }
    });
  },
  adminAddCity(city){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to add cities.');
    }
    if (Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      city.active = false;
    }
    city.createdAt = new Date();
    city.lastUpdatedAt = new Date();
    city.createdBy = this.userId;
    city.lastUpdatedBy = this.userId;
    return Cities.insert(city);
  },
  adminUpdateCity(city){
    if (!this.userId || Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to edit cities.');
    }
    city.lastUpdatedAt = new Date();
    city.lastUpdatedBy = this.userId;
    return Cities.update({_id:city._id}, {
      $set: {
        name:city.name,
        lastUpdatedAt: city.lastUpdatedAt,
        lastUpdatedBy: city.lastUpdatedBy,
        active: city.active
      }
    });
  },
  adminDeleteCity(cityId){
    if (!this.userId || Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to delete cities.');
    }
    Cities.remove({_id: cityId});
    let users = Meteor.users.find({
      cities:{
        $elemMatch: {
          _id:cityId
        }
      }
    }).fetch();
    _.each(users, (user)=>{
      let cities = _.without(user.cities, _.findWhere(user.cities, {_id: cityId}));
      Meteor.users.update(user._id, {
        $set: {
          cities: cities
        }
      });
    });
  },
  adminDeleteState(stateId){
    if (!this.userId || Meteor.users.findOne(this.userId).roleAttribute != "manager") {
      throw new Meteor.Error('not-logged-in', 'Must be logged in and have the rights to delete states.');
    }
    States.remove({_id: stateId});
    let users = Meteor.users.find({
      states: stateId
    }).fetch();
    _.each(users, (user)=>{
      let states = _.without(user.states, stateId);
      Meteor.users.update(user._id, {
        $set: {
          states: states
        }
      });
    });
  },
  search(searchText){
    return Products.find({
      name:{
        $regex: `.*${searchText}.*`,
        $options : 'i'
      }
    }).fetch();
  },
  productReps(query){
    let users = Meteor.users.find({$and:[
      {
        products:{$elemMatch: {_id:query.product._id}}
      },{
        cities:{$elemMatch: {_id:query.location.cityId}}
      }]
    }).fetch();
    return users;
  },
  addRequest(request){
    request.createdAt = new Date();
    request.status = 'Open';
    request.lastUpdatedAt = new Date();
    //Add contact to Rep
    let representativeProcess = Meteor.users.update({$and:[
      {_id: request.representative},
      { 'contacts._id': { '$ne': request.requester } }
    ]},{
      $push: { contacts: {_id: request.requester, alias:''} }
    });
    //Add contact to Requester
    let requesterProcess = Meteor.users.update({$and:[
      {_id: request.requester},
      { 'contacts._id': { '$ne': request.representative } }
    ]},{
      $push: { contacts: {_id: request.representative, alias:''} }
    });
    let addProcess = Requests.insert(request);
    return {
      representativeProcess: representativeProcess,
      requesterProcess: requesterProcess,
      addProcess: addProcess
    };
  },
  getRequests(){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to get requests.');
    }
    return Requests.find({
      requester: this.userId
    },{
      sort: {createdAt: -1}
    }).fetch();
  },
  getRequest(requestId){
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 'Must be logged in to get a request.');
    }
    return Requests.findOne({
      _id: requestId
    });
  },
  getUserById(userId){
    return Meteor.users.findOne({
      _id: userId
    });
  },
  updateRequestStatus(requestInfo){
    return Requests.update(
      { _id: requestInfo.requestId },
      { $set: { status: requestInfo.status } }
    );
  },
  commentRequest(commentInfo){
    return Requests.update(
      { _id: commentInfo.requestId },
      { $push: { comments: commentInfo.comment } }
    );
  }

});
