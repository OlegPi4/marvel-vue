<template>
   <section>
      <div class="search">
         <label class="char__select">search by name</label>
         <input type="text" required placeholder="name" v-model="searchName">
         <button 
         @click="searchByName"
         :disabled="searchName.length < 3? true : false "
         :style=" searchName.length > 2 ? 'border: solid 1px #4cc177;' : 'border: solid 1px #f17e7e;' "
         >ok</button>
      </div>
      <spiner-process v-if="loading" /> 
      <error-message v-if="error" />
      <modal-message  v-if="showModalMessage"  v-model:message="messageErrorSearch" />
      <modal-select v-if="showModalSelect"
      v-model:message="showModalSelect"
      :characters="searcCharacters" />
   </section>
</template>

<script>
import {getCharact} from "@/api/MarvelApi";
import SpinerProcess from './servis/SpinerProcess.vue';
import ErrorMessage from './servis/ErrorMessage.vue';
import ModalMessage from "./servis/ModalMessage.vue";
import ModalSelect from "./servis/ModalSelect.vue";

const caracterNotFound =  [ 1, 'The character searching', 'The character with that name not found!', 'Be careful when entering.']

export default {

   components: {
      SpinerProcess,
      ErrorMessage,
      ModalMessage,
      ModalSelect,
    },

   emits: {
      'pass-char': {
         type: Object,
         requred: false,
         default: null,
      } 
    }, 

   data() {
      return {
          searchName: '',
          searcCharacters: null,
          messageErrorSearch: null,
          loading: false,
          error: false,
          showModalMessage: false,
          showModalSelect: false,
      }
    },

    methods: {
      searchByName () {
         this.searcCharacters = null;
         this.loading = true;
         this.error = false;
         getCharact(null, null, this.searchName)
         .then(res => {
            this.searcCharacters = res;
            this.loading = false;
            this.messageErrorSearch = this.searcCharacters.length === 0 ? caracterNotFound : null;
         })
         .catch(this.onError)
      },
      
      onError() {
         this.loading = false;
         this.error = true;
      },
    },

    watch: {
      messageErrorSearch() {
         if(this.messageErrorSearch) {
            this.showModalMessage = true;
         } else {
            this.showModalMessage = false;
         }
         this.searchName = '';
      },
      searcCharacters() {
         if (this.searcCharacters) {
            if(this.searcCharacters.length === 1) {
               this.$emit('pass-char', this.searcCharacters[0]);
            } else if(this.searcCharacters.length > 1) {
               this.showModalSelect = true;
            }
            
         }   
      },
    }
}

</script>

<style>
  .search {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }
  .search label {
      margin-right: 10px;
  }
  .search input { 
      padding: 3px 6px;
      background-color: #eee;
      font-size: 18px;
      border: solid 1px #888;
      border-radius: 4px;
      outline: none;
      font-weight: 600;
      margin-right: 5px;
   }
   .search button {
      font-size: 18px;
      font-weight: 400;
      padding: 1px 6px;
      border-radius: 4px;
      border: solid 1px #f17e7e;
   }
</style>