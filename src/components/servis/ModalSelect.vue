<template>
    <div class="dialog"  @click="hideDialog" >
      <div  @click.stop class="dialog__content"> 
         <h2 class="title__select">select a character</h2>
         <ul  class="char__grid" 
              :class="{'scroll-type': characters.length > 6}" 
            >
            
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

.scroll-type {
    max-height: 700px;
    overflow: hidden;
    overflow-y: scroll;
    padding-top: 22px; 
    scrollbar-width: thin;
    scrollbar-color: #939393 #eaf6fa;
   }
   .scroll-type::-webkit-scrollbar {
       
        width: 14px;
   }
   .scroll-type::-webkit-scrollbar-track {
        background: #eaf6fa;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2) inset;
        border-radius: 8px;
   }
   .scroll-type::-webkit-scrollbar-thumb {
        background: #939393;
        border-radius: 6px;
        border: 3px solid #d4d4d4;
   }
   .scroll-type::-webkit-scrollbar-thumb:hover {
        background: #7c7c7c;
    }
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
.dialog__content h2 {
   text-align: center;
   margin-bottom: 14px;
   font-size: 24px;
}

</style>