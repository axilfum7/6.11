const BASE_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".wrapper")
const btnEl = document.querySelector(".btn")
const loadingEl = document.querySelector(".loading")


let offset = 0
const limit = 4

btnEl.addEventListener("click", ()=>{
  offset++
  manageLoading("flex")
  fetchData("products", createRecipes, `?limit=${limit}&skip=${offset * limit}`,  manageLoading);
})

function createRecipes(data) {
  const fragment = document.createDocumentFragment()
  data.products.forEach((item) => {
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    cardEl.innerHTML = `
      <img src=${item.images[0]} alt="">
      <h3>${item.title}</h3>         
      <p>${item.description}</p>
      <p>${item.price}</p>
    `
    fragment.appendChild(cardEl)
  })
  wrapperEl.appendChild(fragment)
}

function manageLoading(type){
 loadingEl.style.display = type
}

function fetchData(endpoint, cl, query="", loading) {

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
  fetchData("products", createRecipes, `?limit=${limit}&skip=0`,manageLoading);
}