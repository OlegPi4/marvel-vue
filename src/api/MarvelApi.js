
const APIBASE = 'https://gateway.marvel.com:443/v1/public/';
const APIKEY = 'apikey=dd380dc0702d512034508b86c60f75f0';
const BASEOFFSET = 210; 


async function getResource(url) {
   let res = await fetch(url);

   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
   }
   return await res.json();
};


export const getAllCharacters = async (offset = BASEOFFSET) => {
   let res = await getResource(`${APIBASE}characters?limit=9&offset=${offset}&${APIKEY}`)
   .then(res => res.data.results);
   //res = getDataFromResponce(res);
   //return res;
   return res.map(item => transformCharacter(item));
};  


// function getDataFromResponce(res) {
//    let newArr = [];   
//    let obj = {};
//    res.forEach(function(item, i) {
//       +console.log(`${item.name} --- ${i}`);
//       obj.id = item.id;
//       obj.name = item.name;
      
//       newArr.push(obj);
      
//     });
//     console.log(newArr);
//     return newArr;
// }

export const getOneCharacters = async (id) => {
   const res = await getResource(`${APIBASE}characters/${id}?&${APIKEY}`);
   return res.data.results;
   
};  



function transformCharacter(char) {
   return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
   }
};