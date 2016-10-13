<template>
  <div class="form-group formly-input" :class="{'formly-has-value': form[key].value, 'formly-has-focus': form[key].$active}">
    <label v-if="form[key].label" :for="form[key].id ? form[key].id : null">{{form[key].label}}</label>
    <input class="form-control" :class="form[key].classes" :id="form[key].id ? form[key].id : null" :type="form[key].inputType || text" v-model="form[key].value" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="form[key].atts">
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField],
     methods: {
         onChange: function(e){
             this.$set('form.'+this.key+'.$dirty', true);
             this.runFunction('onChange', e);
             if ( this.form[this.key].inputType == 'file' ){
                 this.$set('form.'+this.key+'.files', this.$el.querySelector('input').files);
             }
         }
     }
 }
</script>
