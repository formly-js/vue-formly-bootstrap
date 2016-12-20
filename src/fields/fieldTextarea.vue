<template>
  <div class="form-group formly-textarea">
    <label v-if="to.label" :for="to.id ? to.id : null">{{to.label}}</label>
    <textarea class="form-control" :class="to.classes" :id="to.id ? to.id : null" v-model="model[field.key]" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts"></textarea>
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField]
 }
</script>
