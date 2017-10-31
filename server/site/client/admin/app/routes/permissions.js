import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  acl: Ember.inject.service('acl'),

  model() {
    return Ember.RSVP.hash({
      data: this.getPermissionsAndRoles()
    });
  },
  afterModel(model) {
    model.roleNames = Object.keys(model.data.roles);
    model.permissionNames = Object.keys(model.data.permissions);
  },
  getPermissionsAndRoles() {
    return this.get('acl').getPermissionsAndRoles();
  },

  actions: {
    addPermission(roleName, permissionName, cb) {
      this.get('acl').addPermissionToRole(roleName, permissionName)
      .then( ()=> {
        cb();
        return null;
      })
      .catch(()=>{
        cb();
      });
    },
    removePermission(roleName, permissionName, cb) {
      this.get('acl').removePermissionFromRole(roleName, permissionName)
      .then( ()=> {
        cb();
        return null;
      })
      .catch(()=>{
        cb();
      });
    }
  }
});