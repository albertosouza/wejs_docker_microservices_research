import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('we-datepicker', 'Integration | Component | we datepicker', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{we-datepicker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#we-datepicker}}
      template block text
    {{/we-datepicker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
