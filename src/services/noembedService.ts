const baseUrl = "https://noembed.com/embed?url=";

export default function getNoembedInfo (fetchUrl: string) {
  return fetch(`${baseUrl}${fetchUrl}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    //body: JSON.stringify({'urlRecipe':urlRecipe})
  })
  .then(result => {
    return result.json();
  })
  .catch(e => console.log('error in service file', e))
}


//! error format
// {
//   "error" : "no matching providers found",
//   "url" : "https://vime" 
// }