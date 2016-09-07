import {expect} from 'chai';
import Vue from 'vue';
import VueFormly from 'vue-formly';
import FormlyBootstrap from 'src/index';
Vue.use(VueFormly);
Vue.use(FormlyBootstrap);

let el, vm, data;

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
    var e = document.createEvent('HTMLEvents')
    e.initEvent(event, true, true)
    if (process) process(e)
    target.dispatchEvent(e)
}

describe('components', () => {

    beforeEach(() => {
        data = {
            form: {
                test: {
                    label: 'Test'
                }
            }
        };
    });

    describe('functions', () => {

        beforeEach(() => {
            data.form.test.type = 'input';
            data.form.test.inputType = 'text';
        });

        it('dirty', () => {
            createForm();
            expect(vm.form.test.$dirty).to.be.false;
        });

        it('blur', () => {
            createForm();
            trigger(vm.$el.querySelectorAll('input')[0], 'blur');
            expect(vm.form.test.$dirty).to.be.true;
        });
        
    });

    describe('input', () => {

        it('basic functions', (done) => {
            data.form.test.type = 'input';
            data.form.test.inputType = 'text';
            data.form.test.placeholder = 'holding';
            data.form.test.id = 'someId';
            createForm(data);

            let inputs = vm.$el.querySelectorAll('input');
            let input = inputs[0];
            let labels = vm.$el.querySelectorAll('label');
            let label = labels[0];

            expect(inputs).to.be.length(1);
            expect(input.type).to.equal('text');
            expect(input.id).to.equal(data.form.test.id);
            expect(input.placeholder).to.equal('holding');
            expect(input.className).to.equal('form-control');
            
            expect(labels).to.be.length(1);
            expect(label.textContent).to.equal(data.form.test.label);
            expect(label.htmlFor).to.equal(data.form.test.id);

            vm.form.test.value = 'testing';

            setTimeout(() => {
                expect(vm.$el.querySelectorAll('input')[0].value).to.equal('testing');
                done();
            }, 0);
            
        });

        it('conditional elements', () => {
            data.form.test.type = 'input';
            data.form.test.inputType = 'text';
            data.form.test.label = '';
            delete data.form.test.placeholder;
            createForm(data);

            expect(vm.$el.querySelectorAll('label')).to.be.length(0);
        });

    });

    
    
});
