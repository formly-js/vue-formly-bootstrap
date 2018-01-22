import baseField from './baseField';
export default {
  mixins: [baseField],
  render(h){
    const self = this;
    const children = [];

    // add the label if it needs it
    if ( this.to.label ) children.push(
      h('label', {
	attrs: {
	  'for': this.to.id
	}
      }, this.to.label )
    );

    // add the textarea
    children.push(
      h('textarea', {
	attrs: {
	  id: this.to.id,
	  ...this.to.atts
	},
	'class': {
	  'form-control': true,
	  ...this.to.classes
	},
	domProps: {
	  value: this.model[ this.field.key ]
	},
	on: {
	  input(event){
	    self.$formlySet( self.model, self.field.key, event.target.value );
	    self.$emit('input', event.target.value);
	  },
	  blur: this.onBlur,
	  focus: this.onFocus,
	  click: this.onClick,
	  change: this.onChange,
	  keyup: this.onKeyup,
	  keydown: this.onKeydown
	}
      })
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
	'form-group formly-textarea', 
	this.to.wrapperClasses,
	{
	  'formly-has-value': this.model[ this.field.key ],
	  'formly-has-focus': this.form[ this.field.key ].$active,
	  'has-error has-danger': this.hasError
	}
      ]
    }, children);
  }
}
