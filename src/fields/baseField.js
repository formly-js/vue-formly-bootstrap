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
      '$active': false
    };
    this.$set(this.form, this.field.key, state);
  },
  methods: {
    runFunction: function(action, e){
      if ( typeof this.to[action] == 'function' ) this.to[action].call(this, e);
    },
    onFocus: function(e){
      this.$set('form.'+this.field.key+'.$active', true);
      this.runFunction('onFocus', e);
    },
    onBlur: function(e){
      this.$set('form.'+this.field.key+'.$dirty', true);
      this.$set('form.'+this.field.key+'.$active', false);
      this.runFunction('onBlur', e);
    },
    onClick: function(e){
      this.runFunction('onClick', e);
    },
    onChange: function(e){
      this.$set('form.'+this.field.key+'.$dirty', true);
      this.runFunction('onChange', e);
    },
    onKeyup: function(e){
      this.runFunction('onKeyup', e);
    },
    onKeydown: function(e){
      this.runFunction('onKeydown', e);
    }        
  }
};
