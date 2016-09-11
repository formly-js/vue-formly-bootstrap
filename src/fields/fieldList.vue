<template>
  <div class="checkbox" :id="form[key].id" :class="form[key].classes">

    <label v-for="option in form[key].options">
      <input :type="form[key].inputType || 'checkbox'" v-model="form[key].value" :value="option.value || option" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="form[key].atts"> {{option.label || option}}
    </label>
    
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField],
     created: function(){
         //set the default value to be an array if it's a checkbox
         let type = this.form[this.key].inputType;
         if ( (!type || type == 'checkbox') && this.form[this.key].value == '') this.$set('form.'+this.key+'.value', []);
     }
 }
</script>
