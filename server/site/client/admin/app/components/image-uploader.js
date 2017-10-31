import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Component.extend({
  isLOading: false,
  url: `${ENV.API_HOST}/api/v1/image`,
  uploader: null,

  multiple: false,

  percent: 0,
  value: Ember.A([]),
  selectedFile: null,
  previewImageSrc: null,

  uploadingImage: false,
  description: null,

  canAddMore: Ember.computed('value.length', 'multiple', function() {
    const isMultiple = this.get('multiple');

    if (
      // multiple:
      isMultiple ||
      // single and empty:
      !isMultiple && !this.get('value.length')
    ) {
      return true;
    } else {
      return false;
    }
  }),

  fileToShow: Ember.computed('value', function() {
    const value = this.get('value');
    if (Ember.isArray(value)) {
      return value[0];
    } else {
      return null;
    }
  }),

  getValue() {
    let value = this.get('value');
    if (value) {
      return value;
    } else {
      this.set('value', Ember.A([]));
      return this.get('value');
    }
  },

  actions: {
    startUpload() {},
    selected(files) {
      const file = files[0];
      this.set('selectedFile', file);
      const reader = new FileReader();

      reader.onload = (e)=> {
        // get local file src
        this.set('previewImageSrc', e.target.result);
      };
      reader.readAsDataURL(file);
    },
    progress(uploader, e) {
      this.set('percent', e.percent);
    },
    didUpload(uploader, e) {
      const value = this.getValue();
      value.pushObject(e.image);

      this.set('uploader', null);
      this.set('description', null);
      this.set('selectedFile', null);
    },
    didError(uploader, jqXHR, textStatus, errorThrown) {
      console.log('didError>', uploader, jqXHR, textStatus, errorThrown);
    },
    removeImage(image) {
      if (confirm(`Tem certeza que deseja remover essa imagem?`)) {
        const value = this.getValue();
        value.removeObject(image);
        this.set('uploader', null);
        this.set('selectedFile', null);
      }
    },
    upload() {
      this.get('uploader')
      .upload(this.get('selectedFile'), {
        description: (this.get('description') || '')
      })
      .then( (r)=> {
        this.set('uploader', null);
        this.set('selectedFile', null);
        this.set('uploadingImage', false);
        return r;
      })
      .catch( (err)=> {
        console.log('erro no upload', err);
      });
    },

    openImageUploader() {
      this.set('uploadingImage', true);
    },

    onHideUploadModal() {
      if (this.get('uploadingImage')) {
        this.set('uploadingImage', false);
      }

      this.set('uploader', null);
      this.set('selectedFile', null);
      this.set('description', null);
      this.set('uploadingImage', false);
    }
  }
});
