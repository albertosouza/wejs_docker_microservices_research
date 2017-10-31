import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('role-permission-check', 'Integration | Component | role permission check', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{role-permission-check}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#role-permission-check}}
      template block text
    {{/role-permission-check}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
