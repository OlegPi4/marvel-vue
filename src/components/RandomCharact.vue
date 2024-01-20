<template>
    <div class="randomchar">
         <div v-if="!loading && !error" class="randomchar__block">
            <img 
               :src="urlImg" 
               alt="Random character" 
               class="randomchar__img" 
               :class="{
                  'randomchar__img-contain': imgObjectFit == true,
                  'randomchar__img-cover': imgObjectFit == false,
                  }"
            >
            <div class="randomchar__info">
               <p class="randomchar__name">{{ name }}</p> 
               <p class="randomchar__descr">
                     {{ description }}
               </p>
               <div class="randomchar__btns">
                     <a :href="pathHomepage" class="button button__main">
                        <div class="inner">homepage</div>
                     </a>
                     <a :href="pathWiki" class="button button__secondary">
                        <div class="inner">Wiki</div>
                     </a>
               </div>
            </div>
         </div>
         <spiner-process v-if="loading"  />
         <error-message
            v-if="error"
            class="randomchar__block"/>   
         <div class="randomchar__static">
            <p class="randomchar__title">
               Random character for today!<br>
               Do you want to get to know him better?
            </p>
            <p class="randomchar__title">
               Or choose another one
            </p>
            <button @click.stop="getRandomChar" class="button button__main">
               <div class="inner">try it</div>
            </button>
            <img src="../img/mjolnir.png" alt="mjolnir" class="randomchar__decoration">
         </div>
   </div>
</template>

<script>
import SpinerProcess from './servis/SpinerProcess.vue';
import ErrorMessage from './servis/ErrorMessage.vue';
import {getCharact} from "@/api/MarvelApi";

export default {
   name: 'RandomCharact',

   components: {
      SpinerProcess,
      ErrorMessage,
   },

   data() {
      return {
         loading: true,
         randomChar: null,
         error: false,
         imgObjectFit: false,
      }
   },

   created() {
      this.getRandomChar();
   },

   computed: {
      urlImg() {
         return this.randomChar[0].thumbnail;
      },
      name() {
         return this.randomChar[0].name;
      },
      pathHomepage() {
         return this.randomChar[0].homepage;
      },
      pathWiki() {
         return this.randomChar[0].wiki;
      },
      description() {
         let des = (this.randomChar[0].description) ? this.randomChar[0].description : "There is no character description." ;
         if (des.length > 200) {
            des = des.slice(0, 200) + '...'
         }
         return des;
      },
      
   },

   methods: {
     
      onError() {
         this.loading = false;
         this.error = true;
      },

      getRandomChar() {
         const startRandomCharact = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
         this.loading = true;
         getCharact(null, startRandomCharact)
         .then( resp => this.randomChar = resp)
         .catch(this.onError); 
         }
   },

   watch: {
      randomChar() {
         if (this.randomChar.length > 0) {
            this.loading = false;
            this.error = false;
         }
        
         if( 'image_not_available.jpg' === this.randomChar[0].thumbnail.slice(-23)) {
            this.imgObjectFit = true;
         } else {
            this.imgObjectFit = false;
         }
         
      },
   }
}
</script>

<style>

</style>