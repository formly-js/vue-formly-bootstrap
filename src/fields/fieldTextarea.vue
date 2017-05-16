<template>
  <div class="form-group formly-textarea" :class="[to.wrapperClasses, {'formly-has-value': model[field.key], 'formly-has-focus': form[field.key].$active, 'has-error has-danger': hasError}]">
    <label v-if="to.label" :for="to.id ? to.id : null">{{to.label}}</label>
    <textarea class="form-control" :class="to.classes" :id="to.id ? to.id : null" v-model="model[field.key]" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown" v-formly-atts="to.atts"></textarea>
    <error-display :form="form" :field="field.key"></error-display>
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField]
 }
</script>
