const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
  });
  
  //Utils
  function createMovies(movies, container){
    container.innerHTML = ''; //para evitar la carga duplicada de datos.

    movies.forEach(movie => {

      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

      //inicio: agregamos el evento para ver el detalle de cada pelicula
      movieContainer.addEventListener('click', () =>{
        location.hash = '#movie=' + movie.id;
      });
      //fin: agregamos el evento para ver el detalle de cada pelicula
     
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
  });
  }

  function createCategories(categories, container){
    container.innerHTML = "";

    //iteramos el array de categories
    categories.forEach(categoria => {
       
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categorieTitle = document.createElement('h3');
        categorieTitle.classList.add('category-title');
        categorieTitle.setAttribute('id', 'id' + categoria.id);
        categorieTitle.addEventListener('click', () => {
          location.hash = '#category='+ categoria.id+ '-' +categoria.name;
        });
        const categoryTitleText = document.createTextNode(categoria.name);

        categorieTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categorieTitle);
        container.appendChild(categoryContainer);
        
    });
  }
  //Llamados a la API

async function getTrendingMoviePreview(){
    const { data } = await api('trending/movie/day'); 

    const movies = data.results;
    
    createMovies(movies, trendingMoviesPreviewList);
   
}

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');

    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
}


async function getMoviesByCategory(id){
  const { data } = await api('discover/movie',{
    params: {
      with_genres: id,
    },
  }); 

  const movies = data.results;
  createMovies(movies, genericSection);
 
}

async function getMoviesBySearch(query){
  const { data } = await api('search/movie',{
    params: {
      query,
    },
  }); 

  const movies = data.results;
  createMovies(movies, genericSection);
 
}

async function getTrendingMovie(){
  const { data } = await api('trending/movie/day'); 

  const movies = data.results;
  
  createMovies(movies, genericSection);
 
}

async function getMovieById(id){
  const { data: movie } = await api('movie/' + id); 
  
  const movieImgUrl ='https://image.tmdb.org/t/p/w500' + movie.poster_path;
  headerSection.style.background = `
  linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
  url(${movieImgUrl}`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent =movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
}