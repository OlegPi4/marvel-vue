<template>
     
    <div class="comics__list">
         <ul class="comics__grid">
               <li v-for="card in cardsComics"
               :key="card.thumbnail"
               @click="selectChar(card)"
               @mouseover="pointMouse(card.id)"
               @mouseout="clearPointMouse()"
               :class="{
                  'char__item_selected': currentComics == card.id,  
               }"
               :tabindex = "1 + cardsComics.indexOf(card)"
               class="comics__item">
                  <a href="#">
                     <img :src=card.thumbnail alt="comic title" class="comics__item-img">
                     <div class="comics__item-name">{{ card.title }}</div>
                     <div class="comics__item-price">9.99$</div>
                  </a>
               </li>
         </ul>
         <div class="buttons">
            
            <button
                @click="loadStart"
                class="button button__main button__long"
                :style=" offset< 9 ? 'display: none;' : '' "
                >
                <div class="inner">to the begining</div>
            </button>
            <button
                @click="loadPrev"
                class="button button__main button__long"
                :style=" offset< 9 ? 'display: none;' : '' "
                >
                <div class="inner">load prev</div>
            </button>
            <button
                @click="loadNext"
                class="button button__main button__long"
                :style=" offset > 58800 ? 'display: none;' : '' ">
                <div class="inner">load next</div>
            </button>  
         
         </div>
    </div>
</template>

<script>

import {getComicses} from "@/api/MarvelApi";
import SpinerProcess from './SpinerProcess.vue';
import ErrorMessage from './ErrorMessage.vue';

export default {

   name: 'ComicsList',
   
   components: {
      SpinerProcess,
      ErrorMessage,
   },

   

   data() {
      return {
            cardsComics: [],
            currentComics: null,   
            loading: true,
            offset: 1,
            error:false,
      }
   },
   created() {
      const offset = localStorage.getItem('marvel-offset-comics');
      this.offset = offset;
      this.getCharact(this.offset); 
   },

   methods: {
      onError() {
         this.loading = false;
         this.error = true;
      },

      pointMouse(ix) {
          this.currentComics = ix;
      },
      clearPointMouse() {
          this.ccurrentComics = null;
      },

      loadStart() {
         this.offset = 1;
         this.getCharact(this.offset);  
      },
      loadNext() {
          this.offset = +this.offset + 8;
          this.getCharact(this.offset);  
      },
      loadPrev() {
          this.offset = +this.offset - 8;
          this.getCharact(this.offset);
      },
      getCharact(offset) {
          this.loading = true; 
          getComicses(offset).then(responce => {
             this.cardsComics = responce;
             localStorage.setItem('marvel-offset-comics', this.offset)
          }).catch( () => this.onError);
            
      },  
      
      selectChar(card) {
         this.$emit('select-char', card)
      },
   },
   

   watch: {
      cardsCharacters() {
          if(this.cardsCharacters.length > 0) {
            this.loading = false;
          }
      },
     
   }


}
</script>

<style>

</style>