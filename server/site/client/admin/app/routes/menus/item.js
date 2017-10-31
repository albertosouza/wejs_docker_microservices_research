import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from "../../config/environment";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model(params) {
    console.log('>params1>', params);
    return Ember.RSVP.hash({
      menuId: params.id,
      menuData: this.getLinks(params.id),
      record: null,
      sorted: false,
      editingRecord: null,
      tableDrag: null
    });
  },

  afterModel(model) {
    console.log('rodo>', model);
    let linksFormated = model.menuData.link.map((link)=> {
      return {
        id: link.id,
        type: 'link',
        attributes: link,
        relationships: {
          menu: {
            data: {
              id: model.menuId,
              type: 'menu'
            }
          }
        }

      };
    });

    this.get('store').push({ data: linksFormated });

    model.record = this.get('store').findRecord('menu', model.menuId);

    return model.record;
  },

  getLinks(menuId) {
    return new window.Promise( (resolve, reject)=> {
      let headers = { Accept: 'application/json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: `${ENV.API_HOST}/link?menuId=${menuId}&order=depth ASC`,
        type: 'GET',
        headers: headers
      })
      .done(resolve)
      .fail(reject);
    });
  },

  getNewLinkRecord() {
    const link = this.get('store').createRecord('link');
    link.set('menu', this.get('currentModel.record'));
    return link;
  },

  reorderItems(itemModels, draggedModel) {
    itemModels.forEach((item, i)=>{
      item.set('weight', i);
    });
    this.set('currentModel.justDragged', draggedModel);
    this.set('currentModel.record.sorted', true);
  },

  actions: {
    reorderItems(itemModels, draggedModel) {
      this.reorderItems(itemModels, draggedModel);
    },
    saveLinksOrder() {
      const menuId = this.get('currentModel.record.id'),
        data = {};

      const tableDrag = this.get('currentModel.tableDrag');
      if (!tableDrag) {
        return null;
      }

      const form = Ember.$(tableDrag.table).parent();
      const fields = form.serializeArray();

      for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        data[field.name] = field.value;
      }

      let headers = { Accept: 'application/vnd.api+json' },
          accessToken = this.get('session.session.authenticated.access_token');

      if (accessToken) {
        headers.Authorization = `Basic ${accessToken}`;
      }

      Ember.$.ajax({
        url: `${ENV.API_HOST}/admin/menu/${menuId}/sort-links`,
        type: 'POST',
        headers: headers,
        data: data
      })
      .done( ()=> {
        this.get('notifications').success('Ordem salva');
      })
      .fail( ()=> {
        this.get('notifications').error('Erro ao salvar a ordem dos links');
      });

    },

    onTabledragDropRow(ctx) {
      this.set('currentModel.tableDrag', ctx.tableDrag);
      this.set('currentModel.record.sorted', true);
    },

    deleteLink(link, links) {
      if (this.linkHaveChildrens(link, links)) {
        alert('Não é possível remover o link.\nRemova os sublinks antes de remover esse link.');
        return false;
      }

      if (confirm(`Tem certeza que deseja deletar o link "${link.get('text')}"? \nEssa ação não pode ser desfeita.`)) {

        link.destroyRecord()
        .then( ()=> {
          // remove from view:
          Ember.$('#tabledrad-item-'+link.id).remove();
          links.removeObject(link);

          this.get('notifications').success(`O link "${link.get('text')}" foi deletado.`);
          return null;
        });
      }
    }
  },


  linkHaveChildrens(link, links) {
    for (let i = 0; i < links.get('length'); i++) {
      let listItem = links.objectAt(i);
      let parent = listItem.get('parent');

      if (
        parent &&
        Number(parent) === Number(link.id)
      ) {
        return true;
      }

    }

    return false;
  }
});