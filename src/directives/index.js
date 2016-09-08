export default function(Vue){
    /**
     * Allows the user to pass extra attributes that should be added to the element. Such as placeholder etc etc
     * @param {Object} value
     */
    Vue.directive('formly-atts', function(value){
        if ( typeof value == 'undefined' ) return;
        Object.keys(value).forEach((key) => {
            this.el.setAttribute(key, value[key]);
        });
    });
}
