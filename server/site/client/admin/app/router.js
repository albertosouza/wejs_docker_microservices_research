import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user');

  this.route('login');
  this.route('forgot-password');
  this.route('logout');
  this.route('profile', function() {
    this.route('change-password');
  });

  this.route('contents', function() {
    this.route('create');
    this.route('item', { path: ':id' }, function(){

    });
  });


  this.route('site-contacts', function() {
    this.route('create');
    this.route('item', { path: ':id' }, function(){});
  });

  this.route('users', function() {
    this.route('create');
    this.route('item', { path: ':id' }, function(){

    });
  });

  this.route('url-alia', function() {
    this.route('create');
    this.route('item', { path: ':id' }, function(){

    });
  });

  this.route('menus', function() {
    this.route('create');
    this.route('item', { path: ':id' }, function(){
      this.route('add-link');
      this.route('edit-link', { path: ':linkid' }, function(){

      });
    });
  });

  this.route('slides', function() {
    this.route('create');
    this.route('item', { path: ':id' }, function(){});
  });

  this.route('vocabulary', function() {
    this.route('create');
    this.route('item', { path: ':id' }, function() {
      this.route('terms', function() {
        this.route('create');
        this.route('item', { path: ':id' }, function(){});
      });
    });
  });

  this.route('permissions');
  this.route('roles');

  this.route('settings', function() {
    this.route('project');
    this.route('integrations');
    this.route('theme');
  });

  this.route('not-found', { path: '/*path' });
});

export default Router;
