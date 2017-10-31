import Ember from 'ember';
import ENV from "../../config/environment";

let editorLocaleCache, editorLocaleUrlCache;

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),
  settings: Ember.inject.service('settings'),

  editorOptions: Ember.computed('settings.data', {
    get() {
      const opts = {
        min_height: 400,
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools codesample'
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media |  codesample',
        language: this.getEditorLocale(),
        language_url: this.getEditorLocaleUrl()
      };

      return opts;
    }
  }),

  getEditorLocale() {
    if (editorLocaleCache) {
      return editorLocaleCache;
    }

    let locale = this.get('settings.data.activeLocale');
    // use default en-us locale
    if (!locale || locale === 'en' || locale === 'en-us') {
      return null;
    }

    if (locale.indexOf('-') > -1) {
      const parts = locale.split('-');
      // Locales with more than 2 parts not are supported
      // TODO!
      if (parts.length > 2) {
        return null;
      }
      // Converts the seccond part of the locale to uppercase:
      parts[1] = parts[1].toUpperCase();
      // override the locale?
      locale = parts.join('_');
    } else {
      return null;
    }

    editorLocaleCache = locale;

    return editorLocaleCache;
  },

  getEditorLocaleUrl() {
    if (editorLocaleUrlCache) {
      return editorLocaleUrlCache;
    }

    let locale = this.get('settings.data.activeLocale');
    // use default en-us locale
    if (!locale || locale === 'en' || locale === 'en-us') {
      return null;
    }

    if (locale.indexOf('-') > -1) {
      const parts = locale.split('-');
      // Locales with more than 2 parts not are supported
      // TODO!
      if (parts.length > 2) {
        return null;
      }
      // Converts the seccond part of the locale to uppercase:
      parts[1] = parts[1].toUpperCase();
      // override the locale?
      locale = parts.join('_');
    } else {
      return null;
    }

    editorLocaleUrlCache = `/admin/tiny-mce-languages/${locale}.js`;

    return editorLocaleUrlCache;
  },

  actions: {
    searchCategoryTerms(term) {
      let url = `${ENV.API_HOST}/api/v1/term-texts?term=${term}&vocabularyName=Category`;
      return this.get('ajax')
      .request(url)
      .then((json) => json.term );
    },
    searchTagsTerms(term) {
      let url = `${ENV.API_HOST}/api/v1/term-texts?term=${term}&vocabularyName=Tags`;
      return this.get('ajax')
      .request(url)
      .then((json) => {
        // add current term in  terms returned from backend search:
        json.term.push(term);
        return json.term;
      });
    },
    changeDate(record, field, dates) {
      if (!dates || !dates[0]) {
        return;
      }
      this.get('model.record').set(field, dates[0]);
    }
  }
});
