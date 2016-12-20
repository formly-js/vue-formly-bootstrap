import chai from 'chai';
import {expect} from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import Vue from 'vue';
import VueFormly from 'vue-formly';
import FormlyBootstrap from 'src/index';
//import {blur} from './expectations';
Vue.use(VueFormly);
Vue.use(FormlyBootstrap);
chai.use(sinonChai);

let el, vm, data, spy;

function createForm(){
  el = document.createElement('div');
  //el.innerHTML = '<formly-form :form="form" :model="model" :fields="fields"></formly-form>';
  vm = new Vue({
    data: data,
    template: '<formly-form :form="form" :model="model" :fields="fields"></formly-form>'
  }).$mount(el);

  return [el, vm];
}

function trigger (target, event, process) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(event, true, true);
  if (process) process(e);
  target.dispatchEvent(e);
}

function describeFunctions(formlyElement, inputElement, inputType = 'text', options){
  beforeEach(() => {
    data.fields[0].type = formlyElement;
    data.fields[0].templateOptions.type = inputType;
    if ( typeof options != 'undefined' ) data.fields[0].options = options;
    spy = sinon.spy();
  });

  it('dirty/active', () => {
    createForm();
    expect(vm.form.test.$dirty).to.be.false;
    expect(vm.form.test.$active).to.be.false;
  });

  
  it('blur', ()=>{
    let copy = {};
    data.fields[0].templateOptions.onBlur = function(e){
      copy = this.form;
    };
    createForm();
    trigger(vm.$el.querySelectorAll(inputElement)[0], 'blur');
    expect(vm.form.test.$active).to.be.false;
    expect(vm.form.test.$dirty).to.be.true;
    //check that "this" is the same
    //the deep equal of "this" seemed to time out
    expect(copy).to.deep.equal(vm.form);
  });

  
  it('focus', () => {
    data.fields[0].templateOptions.onFocus = spy;
    createForm();
    trigger(vm.$el.querySelectorAll(inputElement)[0], 'focus');
    expect(spy.called).to.be.true;
    expect(vm.form.test.$active).to.be.true;
  });

  it('click', () => {
    data.fields[0].templateOptions.onClick = spy;
    createForm();
    trigger(vm.$el.querySelectorAll(inputElement)[0], 'click');
    expect(spy.called).to.be.true;
  });

  it('change', () => {
    data.fields[0].templateOptions.onChange = spy;
    createForm();
    trigger(vm.$el.querySelectorAll(inputElement)[0], 'change');
    expect(spy.called).to.be.true;
    expect(vm.form.test.$dirty).to.be.true;           
  });

  it('keyup', () => {
    data.fields[0].templateOptions.onKeyup = spy;
    createForm();
    trigger(vm.$el.querySelectorAll(inputElement)[0], 'keyup');
    expect(spy.called).to.be.true;
  });

  it('keydown', () => {
    data.fields[0].templateOptions.onKeydown = spy;
    createForm();
    trigger(vm.$el.querySelectorAll(inputElement)[0], 'keydown');
    expect(spy.called).to.be.true;
  });
  
  
};

function describeAttributes(inputElement, testPlaceholder = true){
  beforeEach(()=>{
    data.fields[0].type = inputElement;
    data.fields[0].templateOptions.type = 'text';
  });
  
  it('attributes', () => {
    data.fields[0].templateOptions.atts = {
      'data-foo': 'bar',
      'data-bar': 'foo',
      'placeholder': 'holding'
    };
    createForm();
    let input = vm.$el.querySelectorAll(inputElement)[0];
    expect(input.dataset.foo).to.equal('bar');
    expect(input.dataset.bar).to.equal('foo');
    if ( testPlaceholder ) expect(input.placeholder).to.equal('holding');
  });

  it('classes', () => {
    data.fields[0].templateOptions.classes = {
      'class-a': true,
      'class-b': false
    };
    createForm();
    let input = vm.$el.querySelectorAll(inputElement)[0];
    expect(input.className).to.equal('form-control class-a');
  });

  it('id', () => {
    data.fields[0].templateOptions.id = 'someId';
    createForm();
    let input = vm.$el.querySelectorAll(inputElement)[0];
    let label = vm.$el.querySelectorAll('label')[0];
    expect(input.id).to.equal(data.fields[0].templateOptions.id);
    expect(label.htmlFor).to.equal(data.fields[0].templateOptions.id);
  });
};

function describeConditional(inputElement){
  it('label', (done) => {
    data.fields[0].type = inputElement;
    data.fields[0].templateOptions.type = 'text';
    data.fields[0].templateOptions.label = '';
    createForm(data);

    expect(vm.$el.querySelectorAll('label')).to.be.length(0);

    vm.fields[0].templateOptions.label = 'testing';

    setTimeout(()=>{
      expect(vm.$el.querySelectorAll('label')).to.be.length(1);
      expect(vm.$el.querySelectorAll('label')[0].innerHTML).to.equal('testing');
      done();
    },0);
  });
};

describe('Bootstrap Field Inputs', () => {

  beforeEach(() => {        
    data = {
      form: {},
      model: {
        test: ''
      },
      fields: [
        {
          key: 'test',
          templateOptions: {
            label: 'test'
          }
        }
      ]
    };
  });

  describe('Input', () => {
    
    describe('functions',() =>{
      describeFunctions('input', 'input');
    });
    
    describe('classes & attributes', () => {
      describeAttributes('input');
      it('should have input type as a class', () => {
        data.fields[0].type = 'input';
        data.fields[0].templateOptions.type = 'text';
        createForm(data);

        let els = vm.$el.querySelectorAll('.text');
        expect(els).to.be.length(1);
      });
    });
    
    
    describe('conditional elements', ()=>{
      describeConditional('input');
    });
    
    
    it('layout', (done) => {
      data.fields[0].type = 'input';
      data.fields[0].templateOptions.type = 'text';
      createForm(data);

      let inputs = vm.$el.querySelectorAll('input');
      let input = inputs[0];
      let labels = vm.$el.querySelectorAll('label');
      let label = labels[0];

      expect(inputs).to.be.length(1);
      expect(input.type).to.equal('text');
      expect(input.className).to.equal('form-control');

      vm.model.test = 'testing';

      setTimeout(() => {
        expect(vm.$el.querySelectorAll('input')[0].value).to.equal('testing');
        done();
      }, 0);
      
    });
    
    it('adds active and focus classes', (done) => {
      data.fields[0].type = 'input';
      data.fields[0].templateOptions.type = 'text';
      createForm(data);

      expect(vm.$el.querySelectorAll('.formly-has-focus')).to.be.length(0);
      expect(vm.$el.querySelectorAll('.formly-has-value')).to.be.length(0);

      trigger(vm.$el.querySelectorAll('input')[0], 'focus');
      data.model.test = 'test';
      setTimeout(()=>{
        expect(vm.$el.querySelectorAll('.formly-has-focus')).to.be.length(1);
        expect(vm.$el.querySelectorAll('.formly-has-value')).to.be.length(1);
        done();
      },0);
    });

    it('defaults to text', () => {
      data.fields[0].type = 'input';
      data.fields[0].templateOptions.type = undefined;
      createForm(data);

      let inputs = vm.$el.querySelectorAll('input');
      let input = inputs[0];
      expect(input.type).to.equal('text');
    });
    
  });
  
  describe('Select', () => {
    describe('functions', ()=>{
      describeFunctions('select', 'select');
    });
    describe('classes & attributes', () => {
      describeAttributes('select', false);
    });
    describe('conditional elements', ()=>{
      describeConditional('select');
    });

    it('layout', () => {
      data.fields[0].type = 'select';
      createForm(data);

      let inputs = vm.$el.querySelectorAll('select');
      let input = inputs[0];

      expect(inputs).to.be.length(1);
    });

    it('array options', () => {
      data.fields[0].type = 'select';
      data.fields[0].options = ['one', 'two', 'three'];
      createForm();
      let options = vm.$el.querySelectorAll('option');
      let option = options[0];
      expect(options).to.be.length(3);
      expect(option.value).to.equal('one');
      expect(option.innerHTML).to.equal('one');
    });

    it('object options', () => {
      data.fields[0].type = 'select';
      data.fields[0].options = [
        { label: 'Foo', value: 'bar' },
        { label: 'Bar', value: 'foo' }
      ];
      createForm();
      let options = vm.$el.querySelectorAll('option');
      let option = options[0];
      expect(options).to.be.length(2);
      expect(option.value).to.equal('bar');
      expect(option.innerHTML).to.equal('Foo');
    });
    
  });
/*
     describe('Textarea', () => {
     describe('functions', ()=>{
     describeFunctions('textarea', 'textarea');
     });
     describe('classes & attributes', () => {
     describeAttributes('textarea');
     });
     describe('conditional elements', ()=>{
     describeConditional('textarea');
     });

     it('layout', () => {
     data.form.test.type = 'textarea';
     createForm();

     let inputs = vm.$el.querySelectorAll('textarea');
     let input = inputs[0];

     expect(inputs).to.be.length(1);
     });
     });

     describe("List", () => {
     describe('checkbox functions', ()=>{
     describeFunctions('list', 'input', 'checkbox', ['one']);
     });
     describe('classes & attributes', () => {
     /*
     it('classes', () => {
     data.form.test.classes = {
     'class-a': true,
     'class-b': false
     };
     createForm();
     let input = vm.$el.querySelectorAll(inputElement)[0];
     expect(input.className).to.equal('form-control class-a');
     });

     it('id', () => {
     data.form.test.id = 'someId';
     createForm();
     let input = vm.$el.querySelectorAll(inputElement)[0];
     let label = vm.$el.querySelectorAll('label')[0];
     expect(input.id).to.equal(data.form.test.id);
     expect(label.htmlFor).to.equal(data.form.test.id);
     });
   */
  /*
     });

     it('array options', () => {
     data.form.test.type = 'list';
     data.form.test.inputType = 'checkbox';
     data.form.test.options = ['one', 'two', 'three'];
     createForm();

     let inputs = vm.$el.querySelectorAll('input');
     let labels = vm.$el.querySelectorAll('label');
     expect(inputs).to.be.length(3);
     expect(inputs[0].value).to.equal('one');
     expect(labels[0].textContent).to.contain('one');
     expect(inputs[1].value).to.equal('two');
     expect(labels[1].textContent).to.contain('two');            
     });

     it('object options', () => {
     data.form.test.type = 'list';
     data.form.test.inputType = 'checkbox'
     data.form.test.options = [
     { label: 'Foo', value: 'bar' },
     { label: 'Bar', value: 'foo' }
     ];
     createForm();

     let inputs = vm.$el.querySelectorAll('input');
     let labels = vm.$el.querySelectorAll('label');
     expect(inputs).to.be.length(2);
     expect(inputs[0].value).to.equal('bar');
     expect(labels[0].textContent).to.contain('Foo');
     expect(inputs[1].value).to.equal('foo');
     expect(labels[1].textContent).to.contain('Bar');            
     });

     it('sets defaults', () => {
     data.form.test.type = 'list';
     data.form.test.options = ['one', 'two'];
     createForm();

     expect(vm.$el.querySelectorAll('input')[0].type).to.equal('checkbox');
     expect(vm.form.test.value).to.be.length(0);
     expect(vm.form.test.value).to.deep.equal([]);
     });

     it("shouldn't overwrite defaults", () => {
     data.form.test.type = 'list';
     data.form.test.options = ['one', 'two'];
     data.form.test.value = ['one'];
     createForm();

     expect(vm.form.test.value).to.be.length(1);
     expect(vm.form.test.value[0]).to.equal('one');
     });

     it('multiple values', (done) => {
     data.form.test.type = 'list';
     data.form.test.inputType = 'checkbox';
     data.form.test.options = ['one', 'two'];
     createForm();

     vm.form.test.value = ['one', 'two'];
     setTimeout(()=>{
     let inputs = vm.$el.querySelectorAll('input');
     expect(inputs[0].checked).to.be.true;
     expect(inputs[1].checked).to.be.true;
     done();
     }, 0);
     });

     it('single value', (done) => {
     data.form.test.type = 'list';
     data.form.test.inputType = 'radio';
     data.form.test.options = ['one', 'two'];
     createForm();

     vm.form.test.value = 'two';
     setTimeout(()=>{
     let inputs = vm.$el.querySelectorAll('input');
     expect(inputs[0].checked).to.be.false;
     expect(inputs[1].checked).to.be.true;
     done();
     }, 0);            
     });
     });
   */
});
