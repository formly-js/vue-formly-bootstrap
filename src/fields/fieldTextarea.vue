<template>
  <div class="form-group">
    <label v-if="form[key].label" :for="form[key].id ? form[key].id : null">{{form[key].label}}</label>
    <textarea class="form-control" :class="form[key].classes" :id="form[key].id ? form[key].id : null" v-model="form[key].value" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="form[key].atts"></textarea>
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField]
 }
</script>
