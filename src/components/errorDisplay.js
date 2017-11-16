export default {
  render(h){
    if ( this.message ) return h('span', {
      'class': 'help-block form-text text-danger'
    }, this.message);
  },
  props: ['field', 'form'],
  computed: {
    message(){
      let message = false;
      if ( !( this.field in this.form.$errors ) || !( this.field in this.form ) || this.form[ this.field ].$active || !this.form[this.field].$dirty ) return message;
      let errors = this.form.$errors[ this.field ];
      Object.keys( errors ).some( errorKey => {
        if ( typeof errors[ errorKey ] != 'boolean' ){
          message = errors[ errorKey ];
          return true;
        }
      });
      return message;
    }
  }
}
