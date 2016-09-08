<template>
  <div class="form-group">
    <label v-if="form[key].label" :for="form[key].id ? form[key].id : null">{{form[key].label}}</label>
    <input class="form-control" :id="form[key].id ? form[key].id : null" :type="form[key].inputType" v-model="form[key].value" :placeholder="form[key].placeholder" @blur="onBlur" @focus="onFocus" @click="onClick" @change="onChange" @keyup="onKeyup" @keydown="onKeydown">
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField]
 }
</script>
