// базовая часть пути запроса
const APIBASE = 'https://gateway.marvel.com:443/v1/public/';
// индивидуальный ключ 
const APIKEY = 'apikey=dd380dc0702d512034508b86c60f75f0';
// количество карточек на странице персонажей
const APICHARLIMIT = 9;
// количество карточек на странице комиксов
const APICOMICSLIMIT = 8;

// получение данных персонажей
export const getCharact = async (offset, id, name) => {
   
   let url = '';
   if (offset) {
      url = `${APIBASE}characters?limit=${APICHARLIMIT}&offset=${offset}&${APIKEY}`;
   } else if (id) {
      url = `${APIBASE}characters/${id}?&${APIKEY}`; 
   } else if (name) {
      url = `${APIBASE}characters?nameStartsWith=${name}&${APIKEY}`;
   }
   try {
      let res = await fetch(url);
      res = await res.json();
      res = res.data.results;
      res = res.map(item => dataConvertionChar(item));
      
      return res;       
   } catch (error) {
      console.error(`Download error: ${error.message}`);
   }
   
};   

// обработка данных персонажей
function dataConvertionChar(item) {
   return {
      id: item.id,
      name: item.name,
      description: item.description,
      thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
      homepage: item.urls[0].url ? item.urls[0].url : '',
      wiki: item.urls[1].url ? item.urls[1].url : '',
      comics: item.comics.items ? item.comics.items : '',
   }
};

// получение данных комиксов  
export const getCharacterComics = async (id) => {

   try {
      let res = await fetch(`${APIBASE}characters/${id}/comics?hasDigitalIssue=true&limit=${APICOMICSLIMIT}0&orderBy=title&${APIKEY}`);
      res = await res.json();
      res = res.data.results;
      return res.map(item => dataCharComics(item));       
   } catch (error) {
      console.error(`Download error: ${error.message}`)
   }
}; 

// обработка данных комиксов
function dataCharComics(item) {
   return {
      id: item.id,
      digitalId: item.digitalId,
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
      text: item.textObjects,
      url: item.urls[0].url,
   }
}