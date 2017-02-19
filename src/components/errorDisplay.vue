<template>
  <span v-if="message" class="help-block">{{message}}</span>
</template>

<script>
 export default {
   props: ['field', 'form'],
   computed: {
     message(){
       let message = false;
       if ( !( this.field in this.form.$errors ) ) return message;
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
</script>
