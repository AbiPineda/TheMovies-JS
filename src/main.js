const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
  });
  

async function getTrendingMoviePreview(){
    const { data } = await api('trending/movie/day'); 

    const movies = data.results;
    
    trendingMoviesPreviewList.innerHTML="";
    
    //iteramos el array de movies
    movies.forEach(movie => {

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });
}

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');

    const categories = data.genres;

    categoriesPreviewList.innerHTML = "";

    //iteramos el array de categories
    categories.forEach(categoria => {
       
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categorieTitle = document.createElement('h3');
        categorieTitle.classList.add('category-title');
        categorieTitle.setAttribute('id', 'id' + categoria.id);
        const categoryTitleText = document.createTextNode(categoria.name);

        categorieTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categorieTitle);
        categoriesPreviewList.appendChild(categoryContainer);
        
    });
}

