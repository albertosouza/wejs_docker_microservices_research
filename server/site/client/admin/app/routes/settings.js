import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: Ember.inject.service(),
  image: Ember.inject.service(),

  model() {
    const systemSettings = (this.get('settings').get('systemSettings') || ''),
          logoId = systemSettings.logoId,
          iconId = systemSettings.iconId;

    return Ember.RSVP.hash({
      settings: systemSettings,
      logo: ((logoId)? this.get('image').getImageData(logoId) : null ),
      icon: ((iconId)? this.get('image').getImageData(iconId) : null ),
    });
  },

  actions: {
    save(data) {
      const s = this.get('settings'),
          logo = this.get('currentModel.logo'),
          icon = this.get('currentModel.icon'),
          banner = this.get('currentModel.banner');

      // resolve logo url and id
      this.resolveImage(data, logo, 'logo');
      // resolve icon url and id
      this.resolveImage(data, icon, 'icon');
      // resolve banner url and id
      this.resolveImage(data, banner, 'banner');

      s.setSystemSettings(data)
      .then( (result) => {
        Ember.set(s, 'systemSettings', result.settings);
        this.get('notifications').success('As configurações do sistema foram salvas.');
        this.send('scrollToTop');
      })
      .fail( (err)=> {
        this.send('queryError', err);
      });
    }
  },

  resolveImage(data, images, name) {
    let image;

    if (images && images.firstObject) {
      image = Ember.get(images, 'firstObject');
    } else {
      return;
    }

    if (image && image.urls && image.urls.large) {
      Ember.set(data, name+'Id', image.id);
      Ember.set(data, name+'UrlThumbnail', image.urls.thumbnail);
      Ember.set(data, name+'UrlMedium', image.urls.medium);
      Ember.set(data, name+'UrlOriginal', image.urls.original);
      Ember.set(data, name+'Url', image.urls.thumbnail);
    } else {
      Ember.set(data, name+'Id', null);
      Ember.set(data, name+'UrlThumbnail', null);
      Ember.set(data, name+'UrlMedium', null);
      Ember.set(data, name+'UrlOriginal', null);
      Ember.set(data, name+'Url', null);
    }
  }
});
