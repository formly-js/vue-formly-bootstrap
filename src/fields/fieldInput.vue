<template>
  <div class="form-group">
    <label v-if="form[key].label">{{form[key].label}}</label>
    <input class="form-control" :type="form[key].inputType" v-model="form[key].value" :placeholder="form[key].placeholder">
  </div>
</template>

<script>
 import baseField from './baseField';
 export default {
     mixins: [baseField]
 }
</script>
