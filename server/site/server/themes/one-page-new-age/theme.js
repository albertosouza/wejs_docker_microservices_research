/**
 * @module  Theme
 * @name    one-age-new-age
 */

module.exports = {
  imageThumbnail: '',
  imageLarge: '',
  description: 'Uma página, apresentando todas as informações relevantes na home e com um slideshow incrível!',

  // theme config
  configs: {
    emailTemplates: {
      path: 'templates/email',
    },
    javascript: 'files/public/script.js',
    stylesheet: 'files/public/style.css'
  },

  autoLoadAllTemplates: true,
  // will be auto loaded
  templates: {},
  // set layouts here
  layouts: {
    'default': {
      template: __dirname + '/templates/server/layouts/default-layout.hbs',
      regions: {
        highlighted: {
          name: 'Highlighted'
        },
        sidebar: {
          name: 'Sidebar'
        }
      }
    },
    'fullwidth': {
      template: __dirname + '/templates/server/layouts/full-width-layout.hbs',
      regions: {
        highlighted: {
          name: 'Highlighted'
        }
      }
    },
    'home': {
      template: __dirname + '/templates/server/layouts/home.hbs',
      regions: {
        highlighted: {
          name: 'Highlighted'
        },
        afterContent: {
          name: 'After content'
        }
      }
    },
    'eventHome': {
      template: __dirname + '/templates/server/layouts/event-home-layout.hbs',
      regions: {
        highlighted: {
          name: 'Highlighted'
        },
      }
    },
  },
  widgets: {
    // 'we-cf-speakers': __dirname + '/templates/server/widgets/we-cf-speakers.hbs',
    // 'we-cf-schedule': __dirname + '/templates/server/widgets/we-cf-schedule.hbs',
    'html': __dirname + '/templates/server/widgets/html-widget.hbs',
    // 'we-cf-topics': __dirname + '/templates/server/widgets/we-cf-topics.hbs',
    // 'we-cf-video': __dirname + '/templates/server/widgets/we-cf-video.hbs',
    // 'we-cf-news': __dirname + '/templates/server/widgets/we-cf-news.hbs'
  }
};
