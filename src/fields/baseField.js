export default
{
    props: [
        'form',
        'key'
    ],
    created: function(){
        this.$set('form.'+this.key+'.$dirty', false);
        this.$set('form.'+this.key+'.$active', false);
    },
    methods: {
        runFunction: function(action, e){
            if ( typeof this.form[this.key][action] == 'function' ) this.form[this.key][action].call(this, e);
        },
        onFocus: function(e){
            this.$set('form.'+this.key+'.$active', true);
            this.runFunction('onFocus', e);
        },
        onBlur: function(e){
            this.$set('form.'+this.key+'.$dirty', true);
            this.$set('form.'+this.key+'.$active', false);
            this.runFunction('onBlur', e);
        },
        onClick: function(e){
            this.runFunction('onClick', e);
        },
        onChange: function(e){
            this.$set('form.'+this.key+'.$dirty', true);
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
