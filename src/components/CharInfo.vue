<template>
   <div class="char__info">
      <found-charact @pass-char="foundedChar" />
      <template  v-if="!skeleton"> 
         <div class="char__basics">
            <img :src="char.thumbnail"  :alt="char.name" style="object-fit: fill;">
            <div>
                <div class="char__info-name">{{ char.name }}</div>
                <div class="char__btns">
                    <a :href="char.homepage" class="button button__main">
                        <div class="inner">homepage</div>
                    </a>
                    <a :href="char.wiki" class="button button__secondary">
                        <div class="inner">Wiki</div>
                    </a>
                </div>
            </div>
          </div>
          <div class="char__descr">
                 {{  descript  }}
          </div>
          <div class="char__comics">Comics: <span v-if="comics.length === 0" >no comics</span>
          </div> 
          <ul 
              v-if="comics"
              class="char__comics-list"
              style="max-height: 368px; overflow: hidden; overflow-y: scroll;">
                  <li  v-for="item in comics"
                  :key="item.id"
                  class="char__comics-item">
                       <a :href=item.url class="comics__name">{{ item.title }}</a> 
                  </li>

          </ul>
          <spiner-process v-if="loading" />
          <error-message v-if="error" />
          <p class="char__select" style="padding: 15px 0px;">Please select a character to see information</p> 
            
          <!-- <found-charact  @pass-char="foundedChar" /> -->
          <div class="button__comics">
              <a href="#" class="button button__main"
                 @click="loadComicsPage">
                 <div class="inner" >comics</div>
              </a>
          </div > 
      </template>
      
      <div v-if="skeleton" class="skeleton">
          <div class="pulse skeleton__header">
                <div class="pulse skeleton__circle"></div>
                <div class="pulse skeleton__mini"></div>
          </div>
          <div class="pulse skeleton__block"></div>
          <div class="pulse skeleton__block"></div>
          <div class="pulse skeleton__block"></div>
          <p class="char__select" style="padding: 15px 0px;">Please select a character to see information</p> 
          <!-- <found-charact @pass-char="foundedChar" /> -->
         
      </div>  
   </div>
</template>

<script>
import {getCharacterComics} from "@/api/MarvelApi";
import SpinerProcess from './servis/SpinerProcess.vue';
import ErrorMessage from './servis/ErrorMessage.vue';
import FoundCharact from "./FoundCharact.vue";

export default {
    name: 'CharInfo',
    
    components: {
      SpinerProcess,
      ErrorMessage,
      FoundCharact,
    
    },
    
    props: {
        selChar: {
            type: null,
            required: false,
        }
    },

    data() {
       return {
          skeleton: true,
          error: false,
          loading: false,
          char: {},
          comics: {},
          foundChar: {},
     
       } 
    },

    emits: {
      'select-comics': {
         type: null,
         require: false,

      }
   },

    created () {
        this.char = JSON.parse(localStorage.getItem('marvel-selectChar'));
        this.comics = JSON.parse(localStorage.getItem('marvel-selected-comics'));
    },

    computed: {
        descript() {
            let des = (this.char.description) ? this.char.description : "There is no character description." ;
            return des;
        }
    },

    methods: {
      foundedChar(char) {
         this.char = char;
         this.skeleton = false;
         this.goToRequest();
      },

      onError() {
         this.loading = false;
         this.error = true;
      },

      loadComicsPage() {
         this.$emit('select-comics');
      },

      goToRequest() {
        this.skeleton = false;
        this.comics = {};
        this.loading = true;
        localStorage.setItem('marvel-selectChar', JSON.stringify(this.char));  
        getCharacterComics(this.char.id)
           .then(responce => {
               this.comics = responce;
               this.loading = false;
               localStorage.setItem('marvel-selected-comics', JSON.stringify(this.comics));
           })
           .catch(this.onError);
       } 
     },

    watch: {
      selChar() {
          if(this.selChar) {
            this.char = this.selChar;
            this.goToRequest();   
          }; 
      },

       char() {
          if(this.char) {
             this.skeleton = false;
          }
      }
    }

}
</script>

<style>
  .comics__name:hover {
      color: blueviolet;
  }
  .button__comics {
    display: flex;
    justify-content: center;
  }

</style>