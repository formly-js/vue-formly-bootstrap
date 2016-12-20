<template>
  <div class="form-group formly-select">
    <label v-if="to.label" :for="to.id ? to.id : null">{{to.label}}</label>
    <select class="form-control" :class="to.classes" :id="to.id ? to.id : null" v-model="model[field.key]" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts">
      <option v-for="option in field.options" :value="option.value || option">{{option.label || option}}</option>
    </select>
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField]
 }
</script>
