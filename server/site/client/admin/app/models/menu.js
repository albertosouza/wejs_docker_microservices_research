import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  class: DS.attr('string'),
  sorted: DS.attr('boolean'),
  links: DS.hasMany('link', {
    inverse: 'menu',
    async: true
  }),
  sortedLinks: Ember.computed('links', function() {
    let links = this.get('links');

    links = links.sortBy('weight');

    let r = Ember.A([]);

    for (let i = 0; i < links.get('length'); i++) {
      let link = links.objectAt(i);

      if (!link.get('depth')) {
        // is root
        r.push(link);
      } else {
        let parent;
        let length = r.get('length');
        for (let j = 0; j < length; j++) {
          let sLink = r.objectAt(j);
          // same link, skip ...
          if (r.get('id') === link.get('id')) {
            continue;
          }

          if (parent) {

            if (
              Number(sLink.get('parent')) === Number(link.get('parent'))
            ) {
              if (sLink.get('weight') > link.get('weight')) {
                r.splice(j+1, 0, link);
                break;
              }
            } else {
              r.splice(j, 0, link);
              break;
            }
          }

          if (
            !parent &&
            Number(sLink.get('id')) === Number(link.get('parent'))
          ) {
            parent = true;
          }
          // last run:
          if ((j+1) >= length) {
            r.splice(j+1, 0, link);
          }
        }
      }
    }

    // return sortedLinks;
    return r;
  }),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});