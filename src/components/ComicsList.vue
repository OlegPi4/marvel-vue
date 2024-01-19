<template>
     
    <div class="comics__list">
         <ul  v-if="!loading && !error"  class="comics__grid">
               <li v-for="card in cardsComicsPage"
               :key="card.thumbnail"
               @click="selectComic"
               @touchstart="selectComic"
               @mouseover="pointMouse(card.id)"
               @mouseout="clearPointMouse()"
               :class="{
                  'char__item_selected': currentComics == card.id,  
               }"
               :tabindex = "1 + cardsComics.indexOf(card)"
               class="comics__item">
                  <a :href="card.url">
                     <img :src=card.thumbnail alt="comic title" class="comics__item-img" style="object-fit: fill;">
                     <div class="comics__item-name" style="padding: 0px 5px;">{{ card.title }}</div>
                     <div class="comics__item-price" style="padding: 0px 5px;">{{ card.price }}</div>
                  </a>
               </li>
         </ul>
         <spiner-process  v-if="loading" />
         <error-message v-if="error" />
         <div class="buttons">
            
            <button
                @click="loadStart"
                class="button button__main button__long"
                :style=" currentPage < 2 ? 'display: none;' : '' "
                >
                <div class="inner">to the begining</div>
            </button>
            <button
                @click="loadPrev"
                class="button button__main button__long"
                :style=" currentPage < 2 ? 'display: none;' : '' "
                >
                <div class="inner">load prev</div>
            </button>
            <button
                @click="loadNext"
                class="button button__main button__long"
                :style=" currentPage >= maxPage  ? 'display: none;' : '' ">
                <div class="inner">load next</div>
            </button>  
         
         </div>
    </div>
</template>

<script>

import SpinerProcess from './SpinerProcess.vue';
import ErrorMessage from './ErrorMessage.vue';
import Vue3TouchEvents from 'vue3-touch-events';

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
            loading: false,
            offsetComics: 0,
            error:false,
            currentPage: 1,
            numberComics: 0,
            maxPage: null,
      }
   },
   created() {
      this.offsetComics = localStorage.getItem('marvel-offset-comics');
      this.cardsComics = JSON.parse(localStorage.getItem('marvel-selected-comics'));
      this.currentChar = JSON.parse(localStorage.getItem('marvel-selectChar'));
   },

   computed: {
      cardsComicsPage() {
        
         return this.cardsComics.slice((this.currentPage - 1) * 8, (this.currentPage * 8))
      }
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
         this.currentPage = 1;
      },
      loadNext() {
         this.currentPage += 1; 
      },
      loadPrev() {
         this.currentPage -= 1;
      },

      selectComic() {
         
      }   

   },
   
   watch: {
      cardsComics() {
          if(this.cardsComics.length > 0) {
            this.loading = false;
            this.maxPage = Math.ceil(this.cardsComics.length/8) ;
          }
      },
   }
}
</script>

<style>

</style>