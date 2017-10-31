import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize(serialized) {
    return (Ember.typeOf(serialized) === "array") ? Ember.A(serialized): Ember.A([]);
  },

  serialize(deserialized) {
    let type = Ember.typeOf(deserialized);
    if (type === 'array') {
      return Ember.A(deserialized);
    } else if (type === 'string') {
      return Ember.A(deserialized.split(',').map(function (item) {
          return Ember.$.trim(item);
      }));
    } else {
      return [];
    }
  }
});