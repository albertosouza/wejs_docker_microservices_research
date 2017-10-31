import Ember from 'ember';

export default Ember.Component.extend({
  roleName: null,
  permissionName: null,
  roles: null,
  can: null,
  isLoading: false,

  attributeBindings: ['type'],
  classNameBindings: ['can:active', 'isLoading:disabled'],

  tagName: 'button',
  type: 'button',

  init() {
    this._super();

    const roles = this.get('roles'),
      permissionName = this.get('permissionName'),
      roleName = this.get('roleName');

    if (
      !roles[roleName] ||
      !roles[roleName].permissions ||
      roles[roleName].permissions.indexOf(permissionName) === -1
    ) {
      // dont have the permission
      this.set('can', false);
    } else {
      // have the permission
      this.set('can', true);
    }
  },
  click() {
    this.set('isLoading', true);
    this.toggleProperty('can');

    if (this.get('can')) {
      this.sendAction(
        'addPermission',
        this.get('roleName'),
        this.get('permissionName'),
        this.requestDoneCallback.bind(this)
      );
    } else {
      this.sendAction(
        'removePermission',
        this.get('roleName'),
        this.get('permissionName'),
        this.requestDoneCallback.bind(this)
      );
    }

  },
  /**
   * Callback for change permissions request
   * Used for change loading status
   */
  requestDoneCallback() {
    // wait some time to show the loading image:
    setTimeout( ()=> {
      this.set('isLoading', false);
    }, 400);
  }
});
