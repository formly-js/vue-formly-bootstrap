<template>
  <div class="form-group formly-input" :class="[ to.type, {'formly-has-value': model[field.key], 'formly-has-focus': form[field.key].$active}]">
    <label v-if="to.label" :for="to.id ? to.id : null">{{to.label}}</label>
    <input class="form-control" :class="to.classes" :id="to.id ? to.id : null" :type="to.type || text" v-model="model[field.key]" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts">
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
   mixins: [baseField],
   methods: {
     onChange: function(e){
       /*
       this.$set('form.'+this.key+'.$dirty', true);
       this.runFunction('onChange', e);
       if ( this.form[this.key].inputType == 'file' ){
         this.$set('form.'+this.key+'.files', this.$el.querySelector('input').files);
       }
       */
     }
   }
 }
</script>
