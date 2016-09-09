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
    el.innerHTML = '<formly-form :form="form"></formly-form>';
    vm = new Vue({
        el: el,
        data: data
    });

    return [el, vm];
}

function trigger (target, event, process) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(event, true, true);
    if (process) process(e);
    target.dispatchEvent(e);
}

function describeFunctions(inputElement){
    beforeEach(() => {
        data.form.test.type = inputElement;
        data.form.test.inputType = 'text';
        spy = sinon.spy();
    });

    it('dirty/active', () => {
        createForm();
        expect(vm.form.test.$dirty).to.be.false;
        expect(vm.form.test.$active).to.be.false;
    });
    
    it('blur', ()=>{
        let copy = {};
        data.form.test.onBlur = function(e){
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
        data.form.test.onFocus = spy;
        createForm();
        trigger(vm.$el.querySelectorAll(inputElement)[0], 'focus');
        expect(spy.called).to.be.true;
        expect(vm.form.test.$active).to.be.true;
    });

    it('click', () => {
        data.form.test.onClick = spy;
        createForm();
        trigger(vm.$el.querySelectorAll(inputElement)[0], 'click');
        expect(spy.called).to.be.true;
    });

    it('change', () => {
        data.form.test.onChange = spy;
        createForm();
        trigger(vm.$el.querySelectorAll(inputElement)[0], 'change');
        expect(spy.called).to.be.true;
        expect(vm.form.test.$dirty).to.be.true;           
    });

    it('keyup', () => {
        data.form.test.onKeyup = spy;
        createForm();
        trigger(vm.$el.querySelectorAll(inputElement)[0], 'keyup');
        expect(spy.called).to.be.true;
    });

    it('keydown', () => {
        data.form.test.onKeydown = spy;
        createForm();
        trigger(vm.$el.querySelectorAll(inputElement)[0], 'keydown');
        expect(spy.called).to.be.true;
    });
};

function describeAttributes(inputElement, exclude = []){
    beforeEach(()=>{
        data.form.test.type = inputElement;
        data.form.test.inputType = 'text';
    });
    
    it('attributes', () => {
        if ( exclude.indexOf('attributes') >= 0 ) return true;
        data.form.test.atts = {
            'data-foo': 'bar',
            'data-bar': 'foo'
        };
        createForm();
        let input = vm.$el.querySelectorAll(inputElement)[0];
        expect(input.dataset.foo).to.equal('bar');
        expect(input.dataset.bar).to.equal('foo');
    });

    it('classes', () => {
        if ( exclude.indexOf('classes') >= 0 ) return true;
        data.form.test.classes = {
            'class-a': true,
            'class-b': false
        };
        createForm();
        let input = vm.$el.querySelectorAll(inputElement)[0];
        expect(input.className).to.equal('form-control class-a');
    });



    it('placeholder', () => {
        if ( exclude.indexOf('placeholder') >= 0 ) return;
        data.form.test.placeholder = 'holding';
        createForm();
        let input = vm.$el.querySelectorAll(inputElement)[0];
        expect(input.placeholder).to.equal('holding');
    });

    it('id', () => {
        if ( exclude.indexOf('id') >= 0 ) return true;
        data.form.test.id = 'someId';
        createForm();
        let input = vm.$el.querySelectorAll(inputElement)[0];
        let label = vm.$el.querySelectorAll('label')[0];
        expect(input.id).to.equal(data.form.test.id);
        expect(label.htmlFor).to.equal(data.form.test.id);
    });
};

function describeConditional(inputElement){
    it('label', () => {
        data.form.test.type = inputElement;
        data.form.test.inputType = 'text';
        data.form.test.label = '';
        createForm(data);

        expect(vm.$el.querySelectorAll('label')).to.be.length(0);
    });
};

describe('Bootstrap Field Inputs', () => {

    beforeEach(() => {        
        data = {
            form: {
                test: {
                    label: 'Test'
                }
            }
        };
    });

    describe('=== Input ===', () => {
        
        describe('functions',() =>{
            describeFunctions('input');
        });
        describe('classes & attributes', () => {
            describeAttributes('input');
        });
        describe('conditional elements', ()=>{
            describeConditional('input');
        });
        
        it('layout', (done) => {
            data.form.test.type = 'input';
            data.form.test.inputType = 'text';
            createForm(data);

            let inputs = vm.$el.querySelectorAll('input');
            let input = inputs[0];
            let labels = vm.$el.querySelectorAll('label');
            let label = labels[0];

            expect(inputs).to.be.length(1);
            expect(input.type).to.equal('text');
            expect(input.className).to.equal('form-control');
            
            expect(labels).to.be.length(1);
            expect(label.textContent).to.equal(data.form.test.label);

            vm.form.test.value = 'testing';

            setTimeout(() => {
                expect(vm.$el.querySelectorAll('input')[0].value).to.equal('testing');
                done();
            }, 0);
            
        });
    });



    describe('=== Select ===', () => {
        describe('functions', ()=>{
            describeFunctions('select');
        });
        describe('classes & attributes', () => {
            describeAttributes('select', ['placeholder']);
        });
        describe('conditional elements', ()=>{
            describeConditional('select');
        });
         
    });

    
    
});
