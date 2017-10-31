/**
 * Main project controller
 *
 */

module.exports = {
  index(req, res) {
    const models = req.we.db.models;

    res.locals.data = { online: true };

    models.slideshow
    .findOne({
      where: { id: 1 },
    })
    .then( (r)=> {
      return models.slide
      .findAll({
        where: { slideshowId: 1 }
      })
      .then( (s)=> {
        s.forEach((slide)=>{
          slide.imageOBJ = slide.image[0];
        });

        r.slides = s;
        return r;
      });
    })
    .then( (r)=> {
      res.locals.data.slideshow = r;
      return null;
    })
    .then( (r)=> {
      // get noticias
      return models.content
      .findAll({
        where: { published: true },
        include: [{
          as: 'cats',
          model: models.term,
          required: true,
          where: { text: 'Notícias' }
        }],
        limit: 6
      })
      .then( (contents)=> {
        res.locals.data.news = contents;
        return r;
      });
    })
    .then( ()=> {
      res.ok();
      return null;
    })
    .catch(res.queryError);
  }
};