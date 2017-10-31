/**
 * We {{content-publish-btn}}  helper
 *
 * usage:  {{content-publish-btn record=record req=req}}
 */

module.exports = function(we) {
  return function helper() {
    const options = arguments[arguments.length-1];

    // check if can update the content
    if (!we.acl.canStatic('update_content', options.hash.req.userRoleNames)){
      return '';
    }

    let url = '/content/'+options.hash.record.id+'/edit?redirectTo='+
      options.hash.req.url;

    let html = '<form class="form-inline publish-btn-form" action="'+url+'" method="POST">';

    if (options.hash.record.published) {
      html += '<input name="published" type="hidden" value="false">'+
        '<button class="btn btn-default btn-publish"  type="submit">'+
          options.hash.req.res.__('content.published.btn.unpublish')+
        '</button>';
    } else {
      html += '<input name="published" type="hidden" value="true">'+
        '<button class="btn btn-default btn-publish" type="submit">'+
          options.hash.req.res.__('content.published.btn.publish')+
        '</button>';
    }

    html += '</form>';
    return  new we.hbs.SafeString(html);
  };
};