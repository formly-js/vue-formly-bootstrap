import chai from 'chai';
import {expect} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import errorDisplay from 'src/components/errorDisplay.vue';

let el, vm, data;

function createVue(){
  el = document.createElement('div');
  vm = new Vue({
    data: data,
    template: '<error-display :field="key" :form="form"></error-display>',
    components: {
      'error-display': errorDisplay
    }
  }).$mount(el);

  return [el, vm];
}

describe("errorDisplay.vue", () => {
  it("should display errors", () => {
    data = {
      form: {
        '$errors': {
          test: {
            foo: 'This is a test'
          }
        },
        test: {
          '$active': false,
          '$dirty': true
        }
      },
      key: 'test'
    };

    createVue();
    expect(vm.$el.textContent).to.equal( data.form.$errors.test.foo );
  });

  it('should only display the first error', () => {

    data = {
      form: {
        '$errors': {
          test: {
            foo: false,
            bar: 'This is a test',
            foobar: 'testing'
          }
        },
        test: {
          '$active': false,
          '$dirty': true
        }
      },
      key: 'test'
    };

    createVue();
    expect(vm.$el.textContent).to.equal( data.form.$errors.test.bar );
    
  });

  it('should show nothing at all without errors', () => {

    data = {
      form: {
        '$errors': {
          test: {
            foo: false
          }
        },
        test: {
          '$active': false,
          '$dirty': true
        }
      },
      key: 'test'
    };

    createVue();
    expect(vm.$el.textContent).to.equal( '' );
    
  });
});
