<template>
    <div class="dialog"  @click="hideDialog" >
      <div  @click.stop class="dialog__content"> 
         <h2 class="title__select">select a character</h2>
         <ul  class="char__grid scroll-type" 
              style="max-height: 680px;
              overflow: hidden;
              overflow-y: scroll;
              padding-top: 22px;">
            
            <li v-for="card in characters"
            :key="card.thumbnail"
            class="char__item "
            @click="selectChar(card)"
            @mouseover="pointMouse(card.id)"
            @mouseout="clearPointMouse()"
            :class="{
                'char__item_selected': currentID == card.id,  
            }"
            :tabindex = "1 + characters.indexOf(card)"
            >
                  <img :src=card.thumbnail alt="image-character" style="object-fit: fill;" >
                  <div class="char__name">{{ card.name }}</div>
            </li>
         </ul>
 
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
         type: Object,
         require: false,
         default: null,
      },
      'update:message': {
         type: Boolean,
         require: false,
      }
   },

   data() {
      return {
         cardsCharacters: [],     
         currentID: null,      
         offset: 1,

      }
   },

   methods: {
      hideDialog() {		
         this.$emit('update:message', false)
      },
      pointMouse(ix) {
          this.currentID = ix;
      },
      clearPointMouse() {
          this.currentID = null;
      },
      selectChar(card) {
         this.$emit('one-char', card)
         this.hideDialog();
      },

   },
   watch: {
      characters() {
         this.cardsCharacters = this.characters;
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