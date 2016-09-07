export default
{
    props: [
        'form',
        'key'
    ],
    created: function(){
        this.$set('form.'+this.key+'.$dirty', false);
    },
    methods: {
        onBlur: function(event){
            console.log('hit');
            this.$set('form.'+this.key+'.$dirty', true);
        }
    }
};
