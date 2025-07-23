const BASE_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".wrapper")
const btnEl = document.querySelector(".btn")
const loadingEl = document.querySelector(".loading")


let offset = 0
const limit = 4

btnEl.addEventListener("click", ()=>{
  offset++
  manageLoading("flex")
  fetchData("recipes", createRecipes, `?limit=${limit}&skip=${offset * limit}`,  manageLoading);
})

function createRecipes(data) {
  console.log(data)
  const fragment = document.createDocumentFragment()
  data.comments.forEach((item) => {
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    cardEl.innerHTML = `
      <img src=${item.image} alt="">
      <h3>${item.name}</h3>
      <p>${item.rating}</p>
    `
    fragment.appendChild(cardEl)
  })
  wrapperEl.appendChild(fragment)
}

function manageLoading(type){
 loadingEl.style.display = type
}

function fetchData(endpoint, cl, query="", loading) {
  // url, options || return Promise
  fetch(`${BASE_URL}/${endpoint}${query}`, {
    method: "GET"
  })
  .then(res => {
    if(!res.ok){
      throw new Error("internal server error")
    }
    return res.json()
  })
  .then(data => {
    cl(data)
  })
  .catch(err => {
    console.error(err);
  })
  .finally(()=> {
   loading("none")
  })
}

window.onload = ()=>{
  fetchData("comments", createRecipes, `?limit=${limit}&skip=0`,manageLoading);
}



















// console.log(1);


// let promise = new Promise((resolve, reject)=>{
//   if(true){
//     resolve(5)
//   }else{
//     reject("xato")
//   }
// })


// promise
//   .then(res => res * 2)
//   .then(res => res * 10)
//   .then(res => console.log(res))
//   .catch(laylo  => console.error(laylo))
//   .finally(()=> {})



// console.log(2);
































// fetch("url", {method: "GET"})
// fetch("url", {method: "POST", body: JSON.stringfy(data)})
// fetch("url/id", {method: "PUT", body: JSON.stringfy(data)})
// fetch("url/id", {method: "DELETE"})
