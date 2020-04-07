
const baseUrl = 'https://movie-list.alphacamp.io/'
const indexUrl = baseUrl + 'api/v1/movies'
const posterUrl = baseUrl + 'posters/'
const dataPanel = document.getElementById('data-panel')
const genresPanel = document.getElementById('genres-panel')

axios.get(indexUrl)
  .then((response) => {
    data.push(...response.data.results)
    displayPage()
  })
  .catch((err) => console.log(err))

//電影資料
const data = []
//分類過後電影資料
let genresPageData = []

const genresList = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

dataPanel.addEventListener('click', event => {
  console.log(event.target)
})
// 右方電影頁面顯示
function moviesPage(data) {
  let htmlContent = ''
  data.forEach(function (item) {
    let tag = ''
    item.genres.forEach(function (item, index) {
      tag += `<span class="badge badge-${index}" data-id="${item}">
        ${genresList[item]}</span>`
    })
    htmlContent += `
        <div class="col-6 col-md-4 col-lg-3">
          <div class="card">
            <img class="card-img-top" src="${posterUrl}${item.image}">
            <div class="card-body movie-item-body">
            <h6>${item.title}</h6>${tag}
            </div >
         </div >
        </div >`
  })
  dataPanel.innerHTML = htmlContent
}

function noMovieData() {
  let htmlContent = ''
  htmlContent += `<h3>No Movie</h3>`
  dataPanel.innerHTML = htmlContent
}

// 左側電影分類清單
function genresListPage() {
  let genresValues = Object.values(genresList)
  genresValues.map((genre, index) => {
    let htmlContent = `<li class="nav-item" >
  <a class="nav-link" data-id="${index + 1}" data-toggle="dropdown" href="#">${genre}</a></li > `
    genresPanel.innerHTML += htmlContent
  })
}

// 執行畫面
function displayPage() {
  moviesPage(data)
  genresListPage()
}

// 監聽左側分類標籤
genresPanel.addEventListener('click', event => {
  genresPageData = data.filter(item =>
    item.genres.includes(Number(event.target.dataset.id))
  )
  if (genresPageData.length > 0) {
    moviesPage(genresPageData)
  } else {
    noMovieData()
  }
})




//------ 下方 MVC 版本 some problems --------//
// 一開始直接用MVC分類包裝函式但最後遇到了一些問題只好重寫回一般版本
// 在view.moviesPage()函式中代入model.data資料
// 掛上監聽器想把model.genresPageData資料重新帶入moviesPage()卻沒有反應
// 不知道如何更改moviesPage()的參數設定


// axios.get(indexUrl)
//   .then((response) => {
//     model.data.push(...response.data.results)
//     controller.displayPage()
//   })
//   .catch((err) => console.log(err))

// //---------- Model ----------//
// const model = {
//   //電影資料
//   data: [],
//   genresList: {
//     "1": "Action",
//     "2": "Adventure",
//     "3": "Animation",
//     "4": "Comedy",
//     "5": "Crime",
//     "6": "Documentary",
//     "7": "Drama",
//     "8": "Family",
//     "9": "Fantasy",
//     "10": "History",
//     "11": "Horror",
//     "12": "Music",
//     "13": "Mystery",
//     "14": "Romance",
//     "15": "Science Fiction",
//     "16": "TV Movie",
//     "17": "Thriller",
//     "18": "War",
//     "19": "Western"
//   },
//   //分類過後電影資料
//   genresPageData: []
// }
// //---------- View ----------//
// const view = {
//   moviesPage(data) {
//     let htmlContent = ''
//     //model.genresPageData.forEach(function (item) {
//     model.data.forEach(function (item) {
//       let tag = ''
//       item.genres.forEach(function (item) {
//         tag += `<span class="badge badge-${item}" data-id="${item}">
//         ${model.genresList[item]}</span>`
//       })
//       htmlContent += `
//         <div class="col-4">
//           <div class="card">
//             <img class="card-img-top" src="${posterUrl}${item.image}">
//             <div class="card-body movie-item-body">
//             <h6>${item.title}</h6>${tag}
//             </div >
//          </div >
//         </div >`
//     })
//     dataPanel.innerHTML = htmlContent
//   },
//   genresListPage() {
//     let genresValues = Object.values(model.genresList)
//     genresValues.map((genre, index) => {
//       let htmlContent = `<li class="nav-item bg-light" >
//   <a class="nav-link" data-id="${index + 1}" data-toggle="pill" href="#">${genre}</a></li > `
//       genresPanel.innerHTML += htmlContent
//     })
//   }
// }

// //---------- Controller ----------//
// const controller = {
//   displayPage() {
//     view.moviesPage(model.data)
//     view.genresListPage()
//   }
// }

// //---------- Listener ----------//
// genresPanel.addEventListener('click', event => {
//   model.genresPageData = model.data.filter(item =>
//     item.genres.includes(Number(event.target.dataset.id))
//   )
//   view.moviesPage(model.genresPageData)
// })