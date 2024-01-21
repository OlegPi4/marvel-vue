<template>
    <div class="app">
        <header class="app__header">
            <h1 class="app__title">
                <a href="https://www.marvel.com/">
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
        <main>
            <section v-if="showCharacters">
                <ramdon-charact /> 
                <div class="char__content">
                    <char-list @select-char="selectChar"/>
                    <char-info :selChar="selectedChar"
                    @select-comics="changePageComics"/>  
               </div>
                <img class="bg-decoration" src="../src/img/vision.png" alt="vision">
            </section>
        </main> 
        <main  v-if="!showCharacters" >
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
        <modal-message  v-if="showModal" 
         v-model:message="messageErrorSearch" />
    </div>
</template>

<script>

import RamdonCharact from '@/components/RandomCharact.vue';
import CharList from '@/components/CharList.vue';
import CharInfo from '@/components/CharInfo.vue';
import ComicsList from '@/components/ComicsList.vue';
import ModalMessage from './components/servis/ModalMessage.vue';


const caracterNotFound =  [ 1, 'The comics loading', 'Select a character on the "Characters" page !', '']

export default {  
  name: 'App',
  components: {
   RamdonCharact,
   CharList,
   CharInfo,
   ComicsList,
   ModalMessage,
   
  },

  data() {
    return {
      showCharacters: true,
      selectedChar: null,
      showModal: false,
      messageErrorSearch: null,
    }
  },

  created() {
    let showCh = JSON.parse(localStorage.getItem('showCharacters'));
    if (showCh !== null) {
         this.showCharacters = showCh;
    } 
    
  },

  methods: {

    selectChar(ix) {
        this.selectedChar = ix;
    },

    changePageCaract() {
        this.showCharacters = true;  
    },

    changePageComics() {

        let com = JSON.parse(localStorage.getItem('marvel-selected-comics'));
        if (com) {
            this.showCharacters = false;  
        } else {
            this.messageErrorSearch = caracterNotFound;
            
        }    
    }

  },

  watch: {
    showCharacters() {
        localStorage.setItem('showCharacters', JSON.stringify(this.showCharacters));
    },

    selectedChar() {
    },

    messageErrorSearch() {
        if(this.messageErrorSearch) {
            this.showModal = true;
        } else {
            this.showModal = false;
        }
    }
  }
}
</script>

<style>


</style>
