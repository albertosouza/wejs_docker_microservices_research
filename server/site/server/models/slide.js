/**
 * Slide model
 */

module.exports = function slideModel(we) {
  const model = {
    // define you model here
    // see http://docs.sequelizejs.com/en/latest/docs/models-definition
    definition: {
      title: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: we.db.Sequelize.TEXT,
        allowNull: true,
        formFieldType: 'textarea',
      },
      link: {
        type: we.db.Sequelize.STRING,
        allowNull: true
      },
      linkText: {
        type: we.db.Sequelize.STRING,
        allowNull: true
      },
      published: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: false,
        formFieldType: null
      },
      publishedAt: {
        type: we.db.Sequelize.DATE,
        allowNull: true
      }
    },
    // Associations
    // see http://docs.sequelizejs.com/en/latest/docs/associations
    associations: {
      creator: {
        type: 'belongsTo',
        model: 'user'
      },
      slideshow: {
        type: 'belongsTo',
        model: 'slideshow',
        inverse: 'slides'
      }
    },
    options: {
      // title field, for default title record pages
      titleField: 'title',

      imageFields: {
        image: { formFieldMultiple: false }
      },

      // Class methods for use with: we.db.models.[yourmodel].[method]
      classMethods: {
        // suport to we.js url alias feature
        urlAlias(record) {
          return {
            alias: '/slide/' + record.id,
            target: '/slide/' + record.id,
          };
        }

      },
      // Sequelize hooks
      // See http://docs.sequelizejs.com/en/latest/api/hooks
      hooks: {
        beforeCreate(r, opts, done) {
          // create an published content and set its publishedDate:
          if (r.published) {
            r.publishedAt = Date.now();
          }

          done();
          return r;
        },

        beforeUpdate(r, opts, done) {
          if (r.published && !r.publishedAt) {
            // set publishedAt on publish:
            r.publishedAt = Date.now();
          } else if (!r.published && r.publishedAt) {
            // reset publishedAt on unpublish
            r.publishedAt = null;
          }

          done();
          return r;
        }

      }
    }
  };

  return model;
};
