
export const APIBASE = 'https://gateway.marvel.com:443/v1/public/';
export const APIKEY = 'apikey=dd380dc0702d512034508b86c60f75f0';
export const BASEOFFSET = 210; 


export const getAllCharacters = async (offset) => {

   try {
      let res = await fetch(`${APIBASE}characters?limit=9&offset=${offset}&${APIKEY}`);
      res = await res.json();
      res = res.data.results;
      return res.map(item => dataConvertionChar(item));       
   } catch (error) {
      console.error(`Download error: ${error.message}`)
   }
   
};   


export const getOneCharacters = async (id) => {
   
   let res = await fetch(`${APIBASE}characters/${id}?&${APIKEY}`);
   res = await res.json();
   res = res.data.results;
   
   return res.map(item => dataConvertionChar(item));
   
};  

function dataConvertionChar(item) {
   return {
      id: item.id,
      name: item.name,
      description: item.description,
      thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
      homepage: item.urls[0].url,
      wiki: item.urls[1].url,
      comics: item.comics.items,
   }
};

export const getComicses = async (offset) => {

   try {
      let res = await fetch(`${APIBASE}comics?orderBy=title&limit=8&offset=${offset}&${APIKEY}`);
      res = await res.json();
      res = res.data.results;
      return res.map(item => dataConvertionComics(item));       
   } catch (error) {
      console.error(`Download error: ${error.message}`)
   }
}; 

function dataConvertionComics(item) {
   return {
      id: item.id,
      digitalId: item.digitalId,
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
      
   }
}
  