<template>
  <div class="form-group formly-input" :class="[ to.inputType, {'formly-has-value': model[field.key], 'formly-has-focus': form[field.key].$active}, 'has-error': form[field.key].$hasError]">
    <label v-if="to.label" :for="to.id ? to.id : null">{{to.label}}</label>
    <input class="form-control" :class="to.classes" :id="to.id ? to.id : null" type="text"  v-model="model[field.key]" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts" v-formly-input-type="to.inputType">
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
   mixins: [baseField],
   methods: {
     onChange: function(e){
       
       this.$set(this.form[this.field.key], '$dirty', true);
       this.runFunction('onChange', e);
       if ( this.to.type == 'file' ){
         this.$set(this.model, this.field.key, this.$el.querySelector('input').files);
       }
       
     }
   }
 }
</script>
