#vue-formly-bootstrap
A plugin for [Vue Formly](https://github.com/matt-sanders/vue-formly) which adds multiple form fields according to Twitter Bootstrap.

##Installation
```
npm install vue-formly-bootstrap
```
or if you can just include the script:
```html
<script src="/path_to_folder/vue-formly-bootstrap/dist/vue-formly-bootstrap.js"></script>
```

##Usage
```js
import VueFormly from 'vue-formly';
import VueFormlyBootstrap from 'vue-formly-bootstrap';
Vue.use(VueFormly);
Vue.use(VueFormlyBootstrap);

let vm = new Vue({
   el: '#app',
   data: {
      form: {
         name: {
            type: 'input',
            label: 'Your name'
         },
         sex: {
            type: 'select',
            label: 'Sex',
            options: ['Male', 'Female']
         },
         comments: {
            type: 'textarea',
            label: 'Comments'
         }
      }
   },
   methods: {
      doSomething: function(){}
   }
});
```
```html
<div id="el">
   <formly-form :form="form" @submit="doSomething">
      <button>Submit</button>
   </formly-form>
</div>
```
If you include the script it will be installed for you.

Note that this is still a work in progress so some fields are under construction. See the To Do section for what's on the watchlist.

##Options

###Global options
There are some options that 

##To Do
* [x] Input
* [x] Select
* [x] Text Area
* [ ] Checkbox
* [ ] Radio Buttons
* [ ] Date Picker
* [ ] Other funky form inputs
* [x] Dirty/Clean checking
* [ ] Hide/Show options
* [x] Custom attributes
* [x] Custom Classes
* [x] Custom events