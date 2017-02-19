<template>
  <div class="checkbox formly-list" :id="to.id" :class="[to.classes, {'has-error': hasError}]">

    <label v-for="option in field.options">
      <input v-if="!to.inputType || to.inputType == 'checkbox'" type="checkbox" v-model="model[field.key]" :value="option.value || option" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts">
      <input v-if="to.inputType == 'radio'" type="radio" v-model="model[field.key]" :value="option.value || option" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts">
      {{option.label || option}}
    </label>
    <error-display :form="form" :field="field.key"></error-display>
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField],
     created: function(){
         //set the default value to be an array if it's a checkbox
         let type = this.to.inputType;
         if ( (!type || type == 'checkbox') && this.model[ this.field.key ] == '') this.$set(this.model, this.field.key, []);
     }
 }
</script>
