import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from "../../config/environment";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notifications: Ember.inject.service('notification-messages'),
  acl: Ember.inject.service('acl'),

  model(params) {
    return Ember.RSVP.hash({
      user: this.get('store').findRecord('user', params.id),
      roles: this.get('acl').getRolesArray(),
      newPassword: null,
      rNewPassword: null
    });
  },
  actions: {
    save(user) {
      user.save()
      .then( (r)=> {
        this.get('notifications').success('Dados salvos.');
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    },

    changeActiveStatus(user, status) {
      user.active = status;
      user.save()
      .then( (r)=> {
        if (status) {
          this.get('notifications').success('Conta de usuário ativada.');
        } else {
          this.get('notifications').success('Conta de usuário desativada.');
        }

        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    },

    changePassword(model) {
     let headers = {
        Accept: 'application/vnd.api+json'
      };

      let accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: ENV.API_HOST + '/auth/'+ model.user.id +'/new-password',
        type: 'POST',
        data: {
          newPassword: model.newPassword,
          rNewPassword: model.rNewPassword
        },
        cache: false,
        headers: headers
      })
      .then( (response)=> {
        console.log('response>', response);
        this.get('notifications').success('Senha alterada com sucesso.');

        model.newPassword = null;
        model.rNewPassword = null;
        // success
        return response;
      })
      .catch( (err)=> {
        this.send('queryError', err);
      });
    },
    addUserRole(roleName, user, cb) {
      const userRoles = user.get('roles');

      if (userRoles.indexOf(roleName) > -1) {
        // this user already have the role:
        return cb();
      }

      userRoles.push(roleName);

      return this.get('acl')
      .updateUserRoles(userRoles, user.id)
      .then( ()=> {
        cb();
        return null;
      })
      .catch(cb);
    },
    removeUserRole(roleName, user, cb) {
      const userRoles = user.get('roles');

      if (userRoles.indexOf(roleName) === -1) {
        // this user dont have the role:
        return cb();
      }

      const index = userRoles.indexOf(roleName);
      if (index !== -1) {
        userRoles.splice( index, 1 );
      }

      return this.get('acl')
      .updateUserRoles(userRoles, user.id)
      .then( ()=> {
        cb();
        return null;
      })
      .catch(cb);
    }
  }
});