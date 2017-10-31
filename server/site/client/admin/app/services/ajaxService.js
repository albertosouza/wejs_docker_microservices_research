import Ember from 'ember';
import ENV from "../config/environment";

import AjaxService from 'ember-ajax/services/ajax';
import { UnauthorizedError } from 'ember-ajax/errors';

export default AjaxService.extend({
  session: Ember.inject.service(),
  host: ENV.API_HOST,

  request(url, options) {
    this.get('session').authorize('authorizer:custom', (headers) => {
      this.set('headers', headers);
    });

    return this._super(url, options).
      catch((error) => {
        if (error instanceof UnauthorizedError) {
          if (this.get('session.isAuthenticated')) {
            this.get('session').invalidate();
          }
        }
        else {
          throw error;
        }
      });
  }
});