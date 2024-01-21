<template>
   <div class="char__list">
         <ul v-if="!loading && !error" class="char__grid">
            
            <li v-for="card in cardsCharacters"
            :key="card.thumbnail"
            class="char__item "
            @click="selectChar(card)"
            @mouseover="pointMouse(card.id)"
            @mouseout="clearPointMouse()"
            :class="{
                'char__item_selected': currentID == card.id,  
            }"
            :tabindex = "1 + cardsCharacters.indexOf(card)"
            >
                  <img :src=card.thumbnail alt="image-character" style="object-fit: fill;" >
                  <div class="char__name">{{ card.name }}</div>
            </li>
         </ul>
         <spiner-process  v-if="loading" />
         <error-message v-if="error" />
         <div class="buttons">
            
            <button
                @click="loadStart"
                class="button button__main button__long"
                :style=" offset< 10 ? 'display: none;' : '' "
                >
                <div class="inner">to the begining</div>
            </button>
            <button
                @click="loadPrev"
                class="button button__main button__long"
                :style=" offset< 10 ? 'display: none;' : '' "
                >
                <div class="inner">load prev</div>
            </button>
            <button
                @click="loadNext"
                class="button button__main button__long"
                :style=" offset > 1500 ? 'display: none;' : '' ">
                <div class="inner">load next</div>
            </button>  
         
         </div>
         
   </div>
</template>

<script>

import {getCharact} from "@/api/MarvelApi";
import SpinerProcess from './servis/SpinerProcess.vue';
import ErrorMessage from './servis/ErrorMessage.vue';

export default {

   name: 'CharList',
   
   components: {
      SpinerProcess,
      ErrorMessage,
   },

   data() {
      return {
            cardsCharacters: [],  
            currentID: null,   
            loading: true,
            offset: 1,
            error:false,
      }
   },

   emits: {
      'select-char': {
         type: Object,
         require: false,
      }
   },

   created() {
      const offset = localStorage.getItem('marvel-offset');
      this.offset = offset ? offset : this.offset;
      this.getCharact(this.offset); 

   },

   methods: {
      onError() {
         this.loading = false;
         this.error = true;
      },

      pointMouse(ix) {
          this.currentID = ix;
      },
      clearPointMouse() {
          this.currentID = null;
      },

      loadStart() {
         this.offset = 1;
         this.getCharact(this.offset);  
      },
      loadNext() {
          this.offset = +this.offset + 9;
          this.getCharact(this.offset);  
      },
      loadPrev() {
          this.offset = +this.offset - 9;
          this.getCharact(this.offset);
      },
      getCharact(offset) {
          this.loading = true; 
          getCharact(offset, null).then(responce => {
             this.cardsCharacters = responce;
             this.loading = false;
             localStorage.setItem('marvel-offset', this.offset)
          }).catch( () => this.onError);
            
      },  
      
      selectChar(card) {
         
         this.$emit('select-char', card)
      },
   },
   
}

</script>

<style>
   .buttons {
      display: flex;
   }
 
</style>