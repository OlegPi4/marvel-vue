# marvel


#### Пробую ставити touch.. в CharList.vue
 <li v-for="card in cardsCharacters"        
            :key="card.thumbnail"  
            class="char__item "  
            @click="selectChar(card)"  
            @mouseover="pointMouse(card.id)"  
            @touchsratr ="pointMouse(card.id)"    !!!  не реагує
            @mouseout="clearPointMouse()"  
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
