import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const systemRoles = [
  'administrator',
  'authenticated',
  'unAuthenticated'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  acl: Ember.inject.service('acl'),

  model() {
    return Ember.RSVP.hash({
      data: this.get('acl').getRoles(),
      roles: Ember.A([]),
      newRole: {}
    });
  },
  afterModel(model) {
    for (let name in model.data) {
      if (systemRoles.indexOf(name) >-1 ) {
        model.data[name].isSystemRole = true;
      }

      model.roles.push(model.data[name]);
    }
  },
  actions: {
    createRole(role) {
      const roles = this.get('currentModel.data');
      if (roles[role.name]) {
        this.resetNewRole();
        return;
      }

      this.get('acl').createRole(role)
      .then( ()=> {
        const rolesList = this.get('currentModel.roles');
        rolesList.pushObject(role);
        roles[role.name] = role;
        this.resetNewRole();
      })
      .catch( (err)=> {
        console.log(err);
      });
    },
    deleteRole(role) {
      if (!confirm('Você tem certeza que deseja deletar esse perfil de usuário?')) {
        return;
      }

      const roles = this.get('currentModel.data');

      this.get('acl').deleteRole(role)
      .then( ()=> {
        const rolesList = this.get('currentModel.roles');
        rolesList.removeObject(role);
        delete roles[role.name];
      })
      .catch( (err)=> {
        console.log(err);
      });
    }
  },
  resetNewRole() {
    this.set('currentModel.newRole', {});
  }
});