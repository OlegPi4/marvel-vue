<template>
    <div class="app">
        <header class="app__header">
            <h1 class="app__title">
                <a href="#">
                    <span>Marvel</span>
                    information portal
                </a>
            </h1>
            <nav class="app__menu">
                <ul>
                    <li><a href="#">Characters</a></li>
                    /
                    <li><a href="#">Comics</a></li>
                </ul>
            </nav>
                     
            
        </header>
           
        <main  v-if="showCharacters">
            
           <ramdon-charact 
                
            /> 
            <div class="char__content">
                
                <char-list />
                
                <char-info />
            </div>
            <img class="bg-decoration" src="../src/img/vision.png" alt="vision">
        
        </main> 
        <main  v-if="showComics" >
            <div  class="app__banner">
                <img src="img/Avengers.png" alt="Avengers">
                <div class="app__banner-text">
                    New comics every week!<br>
                    Stay tuned!
                </div>
                <img src="img/Avengers_logo.png" alt="Avengers logo">
            </div>
            <comics-list />
        </main>  
        
    </div>
</template>

<script>
import {getAllCharacters, getOneCharacters} from "@/api/MarvelApi";
import RamdonCharact from '@/components/RandomCharact.vue';
import CharList from '@/components/CharList.vue';
import CharInfo from '@/components/CharInfo.vue';
import ComicsList from '@/components/ComicsList.vue';

export default {  
  name: 'App',
  components: {
   RamdonCharact,
   CharList,
   CharInfo,
   ComicsList,
  },

  data() {
    return {
    
      showCharacters: true,
      showComics: false,
    }
  },

  created() {

  },
 
}
</script>

<style>


</style>
