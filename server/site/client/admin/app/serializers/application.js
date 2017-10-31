import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute(key) {
    return key;
  },
  keyForRelationship(key) {
    return key;
  },
  payloadTypeFromModelName(modelName) {
    return modelName;
  },
  modelNameFromPayloadKey(name) {
    return name;
  }
});
