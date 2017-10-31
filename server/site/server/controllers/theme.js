module.exports = {
  getAllThemes(req, res) {
    const we = req.we;

    res.locals.themes = we.view.themes;
    res.locals.themeConfigs = we.config.themes;

    let themes = {};

    for(let name in res.locals.themes) {
      if (!res.locals.themes[name].description) continue;

      themes[name] = {
        name: name,
        imageThumbnail: res.locals.themes[name].imageThumbnail,
        imageLarge: res.locals.themes[name].imageLarge,
        description: res.locals.themes[name].description
      };
    }

    res.ok({
      themes: themes,
      enabled: we.config.themes.app
    });
  }
};