<template>
  <div class="checkbox formly-list" :id="to.id" :class="[to.wrapperClasses, {'has-error has-danger': hasError}]">
    <label v-if="to.label">{{to.label}}</label>
    <label v-for="option in field.options" :class="to.labelClasses">
      <input v-if="!to.inputType || to.inputType == 'checkbox'" type="checkbox" v-model="model[field.key]" :value="option.value || option" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts" :class="to.classes">
      <input v-if="to.inputType == 'radio'" type="radio" v-model="model[field.key]" :value="option.value || option" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts" :class="to.classes">
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
