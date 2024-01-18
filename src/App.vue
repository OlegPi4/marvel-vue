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
                    <li><a @click="changePageCaract" href="#">Characters</a></li>
                    /
                    <li><a @click="changePageComics" href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
        <main  v-if="showCharacters">
            <ramdon-charact /> 
            <div class="char__content">
                <char-list @select-char="selectChar"/>
                <char-info v-bind:selChar="selectedChar"
                @select-comics="changePageComics"/>
            </div>
            <img class="bg-decoration" src="../src/img/vision.png" alt="vision">
        </main> 
        <main  v-if="showComics" >
            <div  class="app__banner">
                <img src="../src/img/Avengers.png" alt="Avengers">
                <div class="app__banner-text">
                    New comics every week!<br>
                    Stay tuned!
                </div>
                <img src="../src/img/Avengers_logo.png" alt="Avengers logo">
            </div>
            <comics-list />
        </main>  
        
    </div>
</template>

<script>

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
      selectedChar: null,
    }
  },

  created() {
    this.showCharacters = JSON.parse(localStorage.getItem('showCharacters'));
    this.showComics = JSON.parse(localStorage.getItem('showComics'));
    console.log(`${this.showCharacters} -- ${this.showComics}`);
  },

  methods: {

    selectChar(ix) {
        this.selectedChar = ix;
    },

    changePageCaract() {
        this.showCharacters = true;  
        this.showComics = false;
    },

    changePageComics() {
        this.showCharacters = false;  
        this.showComics = true;
    }

  },

  watch: {
    showCharacters() {
        localStorage.setItem('showCharacters', JSON.stringify(this.showCharacters));
    },

    showComics() {
        localStorage.setItem('showComics', JSON.stringify(this.showComics));
    },

    selectedChar() {
    }
  }
}
</script>

<style>


</style>
