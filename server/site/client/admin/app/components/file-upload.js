import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  session: Ember.inject.service('session'),

  uploader: null,

  getHeaders() {
    let headers = { Accept: 'application/vnd.api+json' },
        accessToken = this.get('session.session.authenticated.access_token');

    if (accessToken) {
      headers.Authorization = `Basic ${accessToken}`;
    }
    return headers;
  },

  filesDidChange(files) {
    if (Ember.isEmpty(files)) {
      this.set('uploader', null);
      return;
    }

    const uploader = EmberUploader.Uploader.create({
      ajaxSettings: {
        headers: this.getHeaders()
      },
      paramName: 'file',
      url: this.get('url')
    });

    this.set('uploader', uploader);

    this.sendAction('selected', files);

    uploader.on('progress', e => {
      // Handle progress changes
      // Use `e.percent` to get percentage
      this.sendAction('progress',uploader, e);
    });

    uploader.on('didUpload', e => {
      // Handle finished upload
      this.sendAction('didUpload',uploader, e);
    });

    uploader.on('didError', (jqXHR, textStatus, errorThrown) => {
      // Handle unsuccessful upload
      this.sendAction('didError',uploader, jqXHR, textStatus, errorThrown);
    });
  }
});
