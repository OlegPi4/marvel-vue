<template>
   <div class="char__info">
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
            <div class="char__comics">Comics: <span v-if="char.comics.length === 0" >no comics</span></div> 
            <ul class="char__comics-list" style="max-height: 368px; overflow: hidden; overflow-y: scroll;">
                  <li  v-for="item in char.comics"
                  :key="item.id"
                  class="char__comics-item">
                       <a href="item.resourseURL" class="comics__name">{{ item.name }}</a> 
                  </li>

            </ul>
            <!-- <p class="char__select" style="padding-top: 10px;">Please select a character to see information</p> -->
           
      </template>
      <div v-if="skeleton" class="skeleton">
                  <div class="pulse skeleton__header">
                        <div class="pulse skeleton__circle"></div>
                        <div class="pulse skeleton__mini"></div>
                  </div>
                  <div class="pulse skeleton__block"></div>
                  <div class="pulse skeleton__block"></div>
                  <div class="pulse skeleton__block"></div>
       </div>  
      
   </div>
</template>

<script>

export default {
    name: 'CharInfo',
    
    components: {

    },

    props: {
        selChar: {
            type: null,
            required: false,
        }
    },

    data() {
      return {
          
          character: null, 
          skeleton: true,
          char: {},
      }
    },

    created () {
      
      const char = JSON.parse(localStorage.getItem('marvel-selectChar'));
      this.char = char;
    },

    computed: {
        descript() {
            let des = (this.char.description) ? this.char.description : "There is no character description." ;
            return des;
        }
    },

    methods: {
     
    },

    watch: {
      selChar() {
          if(this.selChar) {
              this.skeleton = false;
              this.char = this.selChar
              
              localStorage.setItem('marvel-selectChar', JSON.stringify(this.selChar)
              
              );
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
</style>