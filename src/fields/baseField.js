import errorDisplay from '../components/errorDisplay';
export default
{
  props: [
    'form',
    'field',
    'model',
    'to'
  ],
  created: function(){
    let state = {
      '$dirty': false,
      '$active': false,
      '$hasError': false
    };
    this.$set(this.form, this.field.key, state);
  },
  methods: {
    runFunction: function(action, e){
      if ( typeof this.to[action] == 'function' ) this.to[action].call(this, e);
    },
    onFocus: function(e){
      this.$set(this.form[this.field.key], '$active', true);
      this.runFunction('onFocus', e);
    },
    onBlur: function(e){
      this.$set(this.form[this.field.key], '$dirty', true);
      this.$set(this.form[this.field.key], '$active', false);
      this.runFunction('onBlur', e);
    },
    onClick: function(e){
      this.runFunction('onClick', e);
    },
    onChange: function(e){
      this.$set(this.form[this.field.key], '$dirty', true);
      this.runFunction('onChange', e);
    },
    onKeyup: function(e){
      this.runFunction('onKeyup', e);
    },
    onKeydown: function(e){
      this.runFunction('onKeydown', e);
    }        
  },
  computed: {
    hasError: function(){
      if ( this.form[ this.field.key ].$dirty == false || this.form[ this.field.key ].$active == true ) {
        return false;
      }
      let errors = this.form.$errors[ this.field.key ];
      let hasErrors = false;
      Object.keys( errors ).forEach( err => {
        if ( errors[err] !== false ) hasErrors = true; 
      });
      this.$set(this.form[ this.field.key ], '$hasError', hasErrors);
      return hasErrors;
    }
  },
  components: {
    'error-display': errorDisplay
  }
};
