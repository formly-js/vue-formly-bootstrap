import {expect} from 'chai';
import Vue from 'vue';
import VueFormly from 'vue-formly';
import FormlyBootstrap from 'src/index';
Vue.use(VueFormly);
Vue.use(FormlyBootstrap);

let el, vm;

function createForm(){
    el = document.createElement('div');
    el.innerHTML = '<formly-form :form="form"></formly-form>';
    vm = new Vue({
        el: el,
        data: data
    });

    return [el, vm];
}

let data;


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

    describe('input', () => {

        it('basic functions', (done) => {
            data.form.test.type = 'input';
            data.form.test.inputType = 'text';
            data.form.test.placeholder = 'holding';
            createForm(data);

            let inputs = vm.$el.querySelectorAll('input');
            let input = inputs[0];

            expect(inputs).to.be.length(1);
            expect(input.type).to.equal('text');
            expect(vm.$el.querySelectorAll('label')).to.be.length(1);
            expect(vm.$el.querySelectorAll('label')[0].textContent).to.equal(data.form.test.label);
            expect(vm.$el.querySelectorAll('input.form-control')).to.be.length(1);
            expect(input.placeholder).to.equal('holding');

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
