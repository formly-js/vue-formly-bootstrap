<template>
  <div class="checkbox formly-list" :id="to.id" :class="to.classes">

    <label v-for="option in field.options">
      <input v-if="!to.type || to.type == 'checkbox'" type="checkbox" v-model="model[field.key]" :value="option.value || option" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts">
      <input v-if="to.type == 'radio'" type="radio" v-model="model[field.key]" :value="option.value || option" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts">
      {{option.label || option}}
    </label>
    
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField],
     created: function(){
         //set the default value to be an array if it's a checkbox
         let type = this.to.type;
         if ( (!type || type == 'checkbox') && this.model[ this.field.key ] == '') this.$set(this.model, this.field.key, []);
     }
 }
</script>
