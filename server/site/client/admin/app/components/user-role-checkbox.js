import Ember from 'ember';

export default Ember.Component.extend({
  roleName: null,
  user: null,
  have: null,
  isLoading: false,

  attributeBindings: ['type'],
  classNameBindings: ['have:active', 'isLoading:disabled'],

  tagName: 'button',
  type: 'button',

  init() {
    this._super();

    const roles = this.get('user.roles'),
      roleName = this.get('roleName');

    if (
      !roles ||
      roles.indexOf(roleName) === -1
    ) {
      // dont have the role
      this.set('have', false);
    } else {
      // have the role
      this.set('have', true);
    }
  },
  click() {
    this.set('isLoading', true);
    this.toggleProperty('have');

    if (this.get('have')) {
      this.sendAction(
        'addUserRole',
        this.get('roleName'),
        this.get('user'),
        this.requestDoneCallback.bind(this)
      );
    } else {
      this.sendAction(
        'removeUserRole',
        this.get('roleName'),
        this.get('user'),
        this.requestDoneCallback.bind(this)
      );
    }
  },
  /**
   * Callback for set role requests
   * Used for change loading status
   */
  requestDoneCallback() {
    // wait some time to show the loading image:
    setTimeout( ()=> {
      this.set('isLoading', false);
    }, 400);
  }
});
