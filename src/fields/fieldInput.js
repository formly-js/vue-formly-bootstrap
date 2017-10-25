import baseField from './baseField';
export default {
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

    // add the input
    children.push(
      h('input', {
	attrs: {
	  id: this.to.id,
	  type: this.to.inputType || 'text',
	  ...this.to.atts
	},
	'class': {
	  'form-control': true,
	  ...this.to.classes
	},
	domProps: {
	  value: self.value
	},
	on: {
	  input(event){
	    self.value = event.target.value;
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
    return h('div', {
      'class': [
	'form-group formly-input', 
	this.to.inputType,
	this.to.wrapperClasses,
	{
	  'formly-has-value': this.model[ this.field.key ],
	  'formly-has-focus': this.form[ this.field.key ].$active,
	  'has-error has-danger': this.hasError
	}
      ]
    }, children);
  },
  mixins: [baseField],
  methods: {
    onChange: function(e){
      
      this.$set(this.form[this.field.key], '$dirty', true);
      this.runFunction('onChange', e);
      if ( this.to.inputType == 'file' ){
        this.$set(this.model, this.field.key, this.$el.querySelector('input').files);
      }
      
    }
  }
}
