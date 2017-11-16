import baseField from './baseField';
export default {
  mixins: [baseField],
  render(h){
    const children = [];
    const self = this;

    // add the label if it needs it
    if ( this.to.label ) children.push(
      h('label', {
	attrs: {
	  'for': this.to.id
	}
      }, this.to.label )
    );

    // create each option
    const options = [];
    if ( 'options' in this.field ){
      this.field.options.forEach( option => {
	const optionVal = option.hasOwnProperty('value') ? option.value : option;
	options.push(
	  h('option', {
	    domProps: {
	      value:  optionVal
	    }
	  }, option.label || option)
	);
      });
    }

    // add the element
    children.push(
      h('select', {
	attrs: {
	  id: this.to.id,
	  ...this.to.atts
	},
	'class': {
	  'form-control': true,
	  ...this.to.classes
	},
	domProps: {
	  value: this.model[this.field.key]
	},
	on: {
	  click: this.onClick,
	  blur: this.onBlur,
	  focus: this.onFocus,
	  keyup: this.onKeyup,
	  keydown: this.onKeydown,
	  change(event){
	    const val = self.booleanValue( event.target.value );
	    self.model[ self.field.key ] = val;
	    self.$emit('change', val);
	    if ( typeof self.onChange === 'function' ) self.onChange(event);
	  }
	}
      }, options)
    );

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
	'form-group formly-select', 
	this.to.wrapperClasses,
	{
	  'has-error has-danger': this.hasError
	}
      ]
    }, children);
  }
}
