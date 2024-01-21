<template>
    <div class="dialog"  @click="hideDialog" >
      <div  @click.stop class="dialog__content"> 
        
      </div>
   </div>
</template>

<script>
export default {
   
   name: 'modal-select',

   props: {
      characters:{
         type: Array,
         default: null,
      }
   },

   emits: {
      'one-char': {
         type: Array,
         require: false,
         default: null,
      }
   },

   data() {
      return {

      }
   },

   methods: {
      hideDialog() {		
         this.$emit('update:message', false)
      }
   }

}
</script>

<style scoped>
.dialog {		
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   background: rgba(0, 0, 155, 0.15); 
   
   position: fixed;
   display: flex;
   z-index: 5;
}
.dialog__content {  
   Margin: auto;
   background: #fff;
   border-radius: 12px;
   min-height: 50px;
   min-width: 300px;
   padding: 20px;
   z-index: 5;
}
.dialog__content h3 {
   text-align: center;
   margin-bottom: 10px;
   font-size: 22px;
}
.dialog__content p {
   color: rgb(192, 59, 55);
   font-size: 20px;
   font-weight: 600;
   padding-top: 10px;
   margin-bottom: 15px;
}
.footer {
   display: flex;
   justify-content: space-between;
   font-size: 18px;
   font-weight: 500;
   padding-top: 15px;
   color: #0c0755;
   padding-right: 20px;
}
.footer button {
   margin: 0 auto;
   padding: 4px 12px;
   text-transform: uppercase;
   font-size: 16px;
   border: none;
   background-color: #73eea2;
   border-radius: 4px;
}
</style>