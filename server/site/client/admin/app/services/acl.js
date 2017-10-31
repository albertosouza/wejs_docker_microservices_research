import Ember from 'ember';
import ENV from "../config/environment";

const systemRoles = [
  'administrator',
  'authenticated',
  'unAuthenticated'
];

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  /**
   * Get all permissions and roles from api host
   *
   * @return {Promise}
   */
  getPermissionsAndRoles() {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/permission`,
        type: 'GET',
        headers: headers
      })
      .done(resolve)
      .fail(reject);
    });
  },
  /**
   * Get Roles
   *
   * @return {Promise}
   */
  getRoles() {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/permission`,
        type: 'GET',
        headers: headers
      })
      .done( (data)=> {
        resolve(data.roles);
        return null;
      })
      .fail(reject);
    });
  },
  /**
   * Get roles in list format
   *
   * @return {Promise}
   */
  getRolesArray() {
    return this.getRoles()
    .then( (data)=> {
      const roles = Ember.A([]);

      for (let name in data) {
        if (systemRoles.indexOf(name) >-1 ) {
          data[name].isSystemRole = true;
        }

        roles.push(data[name]);
      }

      return roles;
    });
  },
  /**
   * Get user roles
   *
   * @return {Promise}
   */
  getUserRoles(userId) {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/user/${userId}/roles`,
        type: 'GET',
        headers: headers
      })
      .done( (data)=> {
        resolve(data.data);
        return null;
      })
      .fail(reject);
    });
  },
  /**
   * Update user roles
   *
   * @return {Promise}
   */
  updateUserRoles(roleNames, userId) {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      const data = { userRoles: roleNames };

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/user/${userId}/roles`,
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        headers: headers
      })
      .done( (data)=> {
        console.log('result>', data);
        resolve(data.data);
        return null;
      })
      .fail(reject);
    });
  },
  /**
   * Request method to remove one permission from role
   *
   * @param {String} roleName
   * @param {String} permissionName
   * @return {Promise}
   */
  removePermission(roleName, permissionName) {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/role/${roleName}/permissions/${permissionName}`,
        type: 'DELETE',
        headers: headers
      })
      .done(resolve)
      .fail(reject);
    });
  },

  /**
   * Create one role request method
   */
  createRole(role) {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      role.action = 'create';

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/role`,
        type: 'POST',
        dataType: 'json',
        data: role,
        headers: headers
      })
      .done(resolve)
      .fail(reject);
    });
  },

  /**
   * Delete one role request method
   */
  deleteRole(role) {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      role.action = 'delete';

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/role`,
        type: 'POST',
        dataType: 'json',
        data: role,
        headers: headers
      })
      .done(resolve)
      .fail(reject);
    });
  },


  /**
   * Add one permission from role
   *
   * @param  {String} roleName
   * @param  {String} permissionName
   * @return {Promise}
   */
  addPermissionToRole(roleName, permissionName) {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/role/${roleName}/permissions/${permissionName}`,
        type: 'POST',
        dataType: 'json',
        headers: headers
      })
      .done(resolve)
      .fail(reject);
    });
  },

  /**
   * Remove one permission from role
   *
   * @param  {String} roleName
   * @param  {String} permissionName
   * @return {Promise}
   */
  removePermissionFromRole(roleName, permissionName) {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: `${ENV.API_HOST}/acl/role/${roleName}/permissions/${permissionName}`,
        type: 'DELETE',
        dataType: 'json',
        headers: headers
      })
      .done(resolve)
      .fail(reject);
    });
  }
});