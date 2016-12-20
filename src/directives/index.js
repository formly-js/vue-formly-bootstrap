export default function(Vue){
  /**
   * Allows the user to pass extra attributes that should be added to the element. Such as placeholder etc etc
   * @param {Object} value
   */
  Vue.directive('formly-atts',{
    bind:function(el, binding){
      
      if ( !binding.value ) return;
      
      Object.keys(binding.value).forEach((key) => {
        el.setAttribute(key, value[key]);
      });
      
    }
  });

  
  Vue.directive('formly-input-type', {
    bind: function(el, binding){
      if ( !binding.value ) return;

      el.setAttribute('type', binding.value);
    }
  });
  
}
