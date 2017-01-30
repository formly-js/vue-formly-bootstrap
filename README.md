#vue-formly-bootstrap
A plugin for [Vue Formly](https://github.com/matt-sanders/vue-formly) which adds multiple form fields according to Twitter Bootstrap.

##Version 2
Note that this is version 2 of Vue Formly Bootstrap, compatible with Vue Formly 2 and Vue 2. If you are looking for version 1 compatibility check out the [Version 1 Branch](https://github.com/formly-js/vue-formly-bootstrap/tree/1.0).

##Installation
```
npm install vue-formly-bootstrap
```
or if you can just include the script:
```html
<link rel="stylesheet" href="/path_to_bootstrap.css"/>
<script src="/path_to_bootstrap.js"></script>
<script src="/path_to_folder/vue-formly-bootstrap/dist/vue-formly-bootstrap.min.js"></script>
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
      form: {},
      model: {
         name: '',
         sex: '',
         comments: ''
      }
      fields: [
         {
            key: 'name',
            type: 'input',
            templateOptions: {
               label: 'Your name'
            }
         },
         {
            key: 'sex',
            type: 'select',
            options: ['Male', 'Female'],            
            templateOptions: {
               label: 'Sex'
            }

         },
         {
            key: 'comments',
            type: 'textarea',
            templateOptions: {
               label: 'Comments'
            }
         }
      ]
   },
   methods: {
      doSomething: function(){}
   }
});
```
```html
<div id="el">
   <form @submit="doSomething">
      <formly-form :form="form" :model="model" :fields="fields">
         <button>Submit</button>
      </formly-form>
   </form>
</div>
```
If you include the script it will be installed for you.

For more advanced details about how to use Vue Formly check out the [docs](https://www.gitbook.com/book/matt-sanders/vue-formly/content/v/2.0).

Note that this is still a work in progress so some fields are under construction. See the [To Do](#to-do) section for what's on the watchlist.

##Options & Attributes

###Form Attributes
The form object is used to track the state of the form. Whether it is valid or not, whether there are any errors etc. The following attributes will be set under each field key. e.g. if you had a field with the key of `name` you could access these under `form.name`

| Attribute | Type | Default | Description |
| --- | --- | --- | --- |
| $dirty | `boolean` | `false` | ***RESTRICTED*** This is set by the system and is just there for your reference. It gets set to `true` upon blur or change, whichever happens first. |
| $active | `boolean` | `false` | ***RESTRICTED*** Also set by the system and is set to true on focus. |

###Global options
These options are used by all the different field types. Some fields may have special options and these will be specified below. Check the [Vue Formly docs](https://matt-sanders.gitbooks.io/vue-formly/content/v/2.0/) for more info.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| type | `string` | `null` | ***REQUIRED*** this is the input type. Check the [Available Inputs](#available-inputs) section for a list of currently available inputs.

####Select options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| options | `array` | `null` | Pass either an array of strings or objects. Objects require a `label` and `value` property. If a string is passed then it will be used for the value and the label. eg: `options: ['Foo', 'Bar']` or `options: [{ label: 'Foo', value: 'bar'},{label: 'Bar', value: 'foo'}]` |

####List options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| options | `array` | `null` | Pass either an array of strings or objects. Objects require a `label` and `value` property. If a string is passed then it will be used for the value and the label. eg: `options: ['Foo', 'Bar']` or `options: [{ label: 'Foo', value: 'bar'},{label: 'Bar', value: 'foo'}]` |
| inputType | `string` | `checkbox` | The 'type' attribute to pass to each input. Can be either 'checkbox' or 'radio' | 

###Template Options
These should be added to the `templateOptions` property. Some input types may have specific options which can be used here and will be specified below.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `null` | A string containing the field label |
| onBlur | `function(e)` | `null` | A function to run on @blur event |
| onFocus | `function(e)` | `null` | A function to run on @focus event |
| onClick | `function(e)` | `null` | A function to run on @click event |
| onChange | `function(e)` | `null` | A function to run on @change event |
| onKeyup | `function(e)` | `null` | A function to run on @keyup event |
| onKeydown | `function(e)` | `null` | A function to run on @keydown event |
| atts | `object` | `null` | Pass an object of attributes to be added to the element. eg `{ placeholder: 'hello world' }` |
| classes | `object` | `null` | Pass an object of classes to be added to the element. Follows the Vue bindings where each key matches a boolean value. eg `{ 'class-a': true, 'class-b': false }` In this case class-a will be attached. |
| id | `string` | `null` | An ID string to attach to the element |

####Input options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| inputType | `string` | `text` | The 'type' attribute to pass to the input. Can be any valid input type. |

####List options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| inputType | `string` | `checkbox` | The 'type' attribute to pass to each input. Can be either 'checkbox' or 'radio' | 


##Available Inputs
* input
* select
* textarea
* list ( radio/checkbox )

##To Do
* [x] Input
* [x] Select
* [x] Text Area
* [x] Checkbox
* [x] Radio Buttons
* [ ] Date Picker
* [ ] Other funky form inputs
* [x] Dirty/Clean checking
* [ ] Hide/Show options
* [x] Custom attributes
* [x] Custom Classes
* [x] Custom events
* [ ] Handle errors & error classes
