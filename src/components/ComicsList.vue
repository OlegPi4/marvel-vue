<template>
     
    <div class="comics__list">
         <ul  v-if="!loading && !error"  class="comics__grid">
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
                     <img :src=card.thumbnail alt="comic title" class="comics__item-img" style="object-fit: fill;">
                     <div class="comics__item-name" style="padding: 0px 5px;">{{ card.title }}</div>
                     <div class="comics__item-price" style="padding: 0px 5px;">{{ card.price }}$</div>
                  </a>
               </li>
         </ul>
         <spiner-process  v-if="loading" />
         <error-message v-if="error" />
         <div class="buttons">
            
            <button
                @click="loadStart"
                class="button button__main button__long"
                :style=" offsetComics < 8 ? 'display: none;' : '' "
                >
                <div class="inner">to the begining</div>
            </button>
            <button
                @click="loadPrev"
                class="button button__main button__long"
                :style=" offsetComics < 8 ? 'display: none;' : '' "
                >
                <div class="inner">load prev</div>
            </button>
            <button
                @click="loadNext"
                class="button button__main button__long"
                :style=" offsetComics > 58800 ? 'display: none;' : '' ">
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
            currentChar: null,
            currentComics: null,   
            loading: true,
            offsetComics: 0,
            error:false,
      }
   },
   created() {
      this.offsetComics = localStorage.getItem('marvel-offset-comics');

      this.getCom(this.offsetComics); 
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
         this.offsetComics = 0;
         this.getCom(this.offsetComics);  
      },
      loadNext() {
          this.offsetComics = +this.offsetComics + 8;
          this.getCom(this.offsetComics);  
      },
      loadPrev() {
          this.offsetComics = +this.offsetComics - 8;
          this.getCom(this.offsetComics);
      },
      getCom(offset) {
          this.loading = true; 
          getComicses(offset).then(responce => {
             this.cardsComics = responce;
             localStorage.setItem('marvel-offset-comics', offset);
            
          }).catch( () => this.onError);
            
      },  
      
      selectChar(card) {
         this.$emit('select-char', card)
      },
   },
   

   watch: {
      cardsComics() {
          if(this.cardsComics.length > 0) {
            this.loading = false;
          }
      },
     
   }


}
</script>

<style>

</style>