/**
 * ModelsTagsModel
 *
 * @module      :: Model
 * @description :: Association table to models and tags
 *
 */

module.exports = function Model(we) {
  // set sequelize model define and options
  return {
    definition: {
      id: {
        type: we.db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      modelName: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      modelId: {
        type: we.db.Sequelize.BIGINT,
        allowNull: false
      },
      field: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      isTag: {
        type: we.db.Sequelize.STRING
      },
      order: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: false
      },
      vocabularyName: {
        type: we.db.Sequelize.STRING,
        defaultValue: 'Tags',
        allowNull: false
      },

      relatedRecord: {
        type: we.db.Sequelize.VIRTUAL
      }
    },

    associations: {
      term: {
        type: 'belongsTo',
        model: 'term',
        inverse: 'models',
        constraints: false
      }
    },

    options: {
      classMethods: {},
      instanceMethods: {
        loadRelatedRecord(cb) {
          const self = this;
          we.db.models[this.modelName]
          .findOne({
            where: { id: this.modelId },
            include: [{ all: true }]
          })
          .then(function afterLoadRelatedRecord(r) {
            self.relatedRecord = r;
            cb();
            return r;
          })
          .catch(cb);
        }
      },
      hooks: {}
    }
  };
};
