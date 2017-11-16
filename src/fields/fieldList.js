import baseField from './baseField';
export default {
  computed: {
    inputType(){
      return this.to.inputType || 'checkbox';
    }
  },
  created(){
    // set the default value to array
    if ( this.inputType === 'checkbox' && ( this.model[ this.field.key ].constructor !== Array || !this.model[ this.field.key ].constructor) ) this.$set( this.model, this.field.key, [] );
  },
  mixins: [baseField],
  render(h){
    const children = [];
    const self = this;
    const isArray = this.inputType === 'checkbox';

    // add the label if it needs it
    if ( this.to.label ) children.push(
      h('label', this.to.label )
    );

    // create each option
    if ( 'options' in this.field ){
      this.field.options.forEach( option => {
	const optionLabel = option.hasOwnProperty('label') ? option.label : option;
	const optionVal = option.hasOwnProperty('value') ? option.value : option;
	const optionChecked = isArray ? this.model[ this.field.key ].indexOf( optionVal ) > -1 : this.model[ this.field.key ] === optionVal;

	children.push(
	  // wrap each option in a label
	  h('label', {
	    'class': this.to.labelClasses
	  }, [
	    // create an input 
	    h('input', {
	      attrs: {
		type: this.inputType,
		...this.to.atts
	      },
	      'class': {
		...this.to.classes
	      },
	      domProps: {
		value: optionVal,
		checked: optionChecked
	      },
	      on: {
		click: this.onClick,
		blur: this.onBlur,
		focus: this.onFocus,
		keyup: this.onKeyup,
		keydown: this.onKeydown,
		change(event){
		  const isChecked = event.target.checked;
		  const val = self.booleanValue( event.target.value );
		  // we need to add/remove differently depending on the type of input we're using
		  if ( isArray ){
		    if ( isChecked ){
		      // if it's a checkbox, and hence an array, push it
		      self.model[ self.field.key ].push( val );
		    } else {
		      // otherwise remove it
		      const valueIdx = self.model[ self.field.key ].indexOf( val );
		      if ( valueIdx > -1 ) self.model[ self.field.key ].splice( valueIdx, 1 );
		    }
		  } else {
		    self.model[ self.field.key ] = isChecked ? val : null;
		  }
		  self.$emit('change', val);
		  if ( typeof self.onChange === 'function' ) self.onChange(event);
		}
	      }
	    }),
	    // display the label
	    optionLabel
	  ])
	);
      });
    }

    // add the error element
    children.push(
      h('error-display', {
	props: {
	  form: this.form,
	  field: this.field.key
	}
      })
    );

    // create the wrapper element
    return h('div', {
      'class': [
	'form-group formly-list', 
	this.to.wrapperClasses,
	{
	  'has-error has-danger': this.hasError
	}
      ]
    }, children);
  }
}
