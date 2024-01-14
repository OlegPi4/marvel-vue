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

        <main >
            
            <ramdon-charact /> 
            <div class="char__content">
                
                <char-list />
                
                <char-info />
            </div>
            <img class="bg-decoration" src="../src/img/vision.png" alt="vision">
        
        </main> 
        <main >
            <div class="app__banner">
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

  date() {
    return {
      cardsCharacters: [],
      randomChar: [],
      showCharacters: true,
      showComics: true,
    }
  },

  created() {
    const cardsChar = getAllCharacters();
    if (cardsChar) {
       this.cardsCharacters = cardsChar;
    }
    // console.log(`ddddddddddd`)
    // console.log(this.cardsCharacters);

    const charOne = getOneCharacters(1011355);
    if (charOne) {
       this.randomChar = charOne;
    }
    // console.log(`CCCCCCCCCC`)
    // console.log(this.randomChar);
  }
}
</script>

<style>
#app {
 
}

</style>
