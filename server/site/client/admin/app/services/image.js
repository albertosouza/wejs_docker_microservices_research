import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Service.extend({
  getImageData(imageId) {
    let headers = { Accept: 'application/json' },
        accessToken = this.get('session.session.authenticated.access_token');

    if (accessToken) {
      headers.Authorization = `Basic ${accessToken}`;
    }

    return Ember.$.ajax({
      url: `${ENV.API_HOST}/api/v1/image/${imageId}/data`,
      type: 'GET',
      headers: headers
    })
    .then((data) => {
      if (data && data.image) {
        return Ember.A([data.image]);
      } else {
        return null;
      }
    });
  }
});

