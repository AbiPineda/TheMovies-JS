async function getTrendingMoviePreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();


    const movies = data.results;
    //iteramos el array de movies
    movies.forEach(movie => {

        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList') ;

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}

async function getCategoriesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();
    
    const categories = data.genres;

    //iteramos el array de categories
    categories.forEach(categoria => {

        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list') ;

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categorieTitle = document.createElement('h3');
        categorieTitle.classList.add('category-title');
        categorieTitle.setAttribute('id', 'id' + categoria.id);
        const categoryTitleText = document.createTextNode(categoria.name);

        categorieTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categorieTitle);
        previewCategoriesContainer.appendChild(categoryContainer);
        
    });
}

getTrendingMoviePreview();
getCategoriesPreview();