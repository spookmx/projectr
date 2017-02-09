import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Companies, Products, States, Cities } from '../lib/collections';

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
        return users.length +" reps on the area"
      }else{
        return users[0].givenName + " " + users[0].familyName
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
  }
});
