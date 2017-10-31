import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from "../config/environment";

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),

  beforeModel() {
    this.get('notifications').setDefaultAutoClear(true);
    this.get('notifications').setDefaultClearDuration(5200);

    return this.getLocalesFromHost();
  },
  model() {
    return Ember.RSVP.hash({
      loadedSettings: this.get('settings').getUserSettings(),
      minimumLoadingDelay: new window.Promise( (resolve)=> {
        setTimeout( ()=> {
          resolve();
        }, 500);
      })
    });
  },
  afterModel() {
    this.set('i18n.locale', this.get('settings.data.activeLocale'));
  },

  /**
   * Get locales from host
   *
   */
  getLocalesFromHost() {
    return new window.Promise( (resolve, reject)=> {
      Ember.$.ajax({
        url: `${ENV.API_HOST}/i18n/get-all-locales`,
        type: 'GET'
      })
      .done( (data)=> {
        if (data && data.locales) {
          // load locales with ember-i18n
          for(let name in data.locales) {
            this.get('i18n').addTranslations(name, data.locales[name]);
          }
        }

        resolve();
      })
      .fail(reject);
    });
  },
  actions: {
    goTo(route, params) {
      if (params) {
        this.transitionTo(route, params);
      } else {
        this.transitionTo(route);
      }
    },
    showLoginModal() {
      this.set('showLoginModal', true);
    },
    /**
     * Application error handler
     *
     * @param  {Object} err Error object
     */
    error(err) {
      // handle token invalid response, this may occurs if the token is deleted in backend for block access
      if (
        err.status === 401 &&
        err.responseJSON &&
        err.responseJSON.error === 'invalid_grant' &&
        err.responseJSON.error_context === 'authentication'
      ) {
        console.log('TODO add message for invalid token invalid_grant', err);
        this.get('session').invalidate();
        return;
      } else if(
        err.errors &&
        err.errors[0].status === '404'
      ) {
        // log it
        Ember.Logger.error('404', err);
        // show message
        this.get('notifications').error('<code>404</code> não encontrado.');
        // redirect ... to 404
        this.transitionTo('/not-found');
      } else {
        this.get('notifications').error('Ocorreu um erro inesperado no servidor!<br>Tente novamente mais tarde ou entre em contato com o administrador do sistema.', {
          htmlContent: true,
          clearDuration: 10000
        });
        Ember.Logger.error(err);
      }
    },
    queryError(err) {
      // todo! add an better validation handling here...
      if (err && err.errors) {
        err.errors.forEach( (e)=> {
          if (e.errorName === 'SequelizeValidationError') {
            // todo! add an better validation handling here...
            this.get('notifications').error(e.title);
          } else {
            this.get('notifications').error(e.title);
          }
        });
      } else if (
        err &&
        err.responseJSON &&
        err.responseJSON.meta &&
        err.responseJSON.meta.messages
      ) {

        err.responseJSON.meta.messages.forEach( (e)=> {
          switch(e.status) {
            case 'warning':
              this.get('notifications').warning(e.message);
              break;
            case 'success':
              this.get('notifications').success(e.message);
              break;
            default:
              this.get('notifications').error(e.message);
          }
        });

      } else {
        console.error('Unknow query error', err);
      }
    },

    scrollToTop() {
      // move scroll to top:
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
});