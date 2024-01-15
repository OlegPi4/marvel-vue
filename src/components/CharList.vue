<template>
   <div class="char__list">
         <ul v-if="!loading" class="char__grid">
            
            <li v-for="card in cardsCharacters"
            :key="card.thumbnail"
            class="char__item "
            @mouseover="pointMouse(card.id)"
            @mouseout="clearPointMouse()"
            :class="{
                'char__item_selected': currentID == card.id,  
            }"
            >
                  <img :src=card.thumbnail alt="image-character" >
                  <div class="char__name">{{ card.name }}</div>
            </li>
         </ul>
         <spiner-process  v-if="loading" />
         <div class="buttons">
            <button
                @click="loadNext"
                class="button button__main button__long">
                <div class="inner">load next</div>
            </button>  
            <button
                @click="LoadPrev"
                class="button button__main button__long">
                <div class="inner">load prev</div>
         </button>
         
         </div>
         
   </div>
</template>

<script>

import {getAllCharacters} from "@/api/MarvelApi";
import SpinerProcess from './SpinerProcess.vue';

export default {

   name: 'CharList',
   
   components: {
      SpinerProcess,
   },

   

   data() {
      return {
            cardsCharacters: [],  
            currentID: null,   
            loading: true,
            offset: 210,
      }
   },

   created() {
      const offset = localStorage.getItem('marvel-offset');
      this.offset = offset;
      this.getCharact(this.offset); 

   },
   unmounted() {
     
   },

   methods: {
      pointMouse(ix) {
          this.currentID = ix;
      },
      clearPointMouse() {
          this.currentID = null;
      },

      loadNext() {
          this.offset = +this.offset + 9;
          this.getCharact(this.offset);  
      },
      LoadPrev() {
          this.offset = +this.offset - 9;
          this.getCharact(this.offset);
      },
      getCharact(offset) {
          this.loading = true; 
          getAllCharacters(offset).then(responce => {
             this.cardsCharacters = responce;
             localStorage.setItem('marvel-offset', this.offset)
          })  
      }

   },
   watch: {
      cardsCharacters() {
          if(this.cardsCharacters.length > 0) {
            this.loading = false;
          }
      }
   }
  
}

</script>

<style>
   .buttons {
      display: flex;
   }
</style>