//btn buscar
searchFormBtn.addEventListener('click', ()=>{
    location.hash='#search=' + searchFormInput.value.split(" ").join('');
  });

 //btn ver mas (tendencias)
trendingBtn.addEventListener('click',()=>{
    location.hash = '#trends';
});

//btn flechita
let historial = [];
arrowBtn.addEventListener('click',()=>{
    historial.pop()
    if (historial.length > 0) {
        location.hash = '#search=' + historial[historial.length - 1]
    } else {
        location.hash = '#home'
    }
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){
    console.log({location});
    
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }
    else if(location.hash.startsWith('#search=')){
        searchPage();
    }
    else if(location.hash.startsWith('#movie=')){
        moviePage();
    }
    else if(location.hash.startsWith('#category=')){
        categoriesPage();
    }
    else{
        homePage();
    }
    //Para que envie el scroll al inicio.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function homePage(){
    console.log('HOME');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    
    getTrendingMoviePreview();
    getCategoriesPreview();
}

function categoriesPage(){
    console.log('CATEGORIES!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive'); //oculto buscador

    trendingPreviewSection.classList.add('inactive'); //oculto seccion de tendencias
    categoriesPreviewSection.classList.add('inactive'); //oculto seccion de categorias
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('='); 
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML =categoryName;
    getMoviesByCategory(categoryId);


}

function moviePage(){
    console.log('MOVIE!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}

function searchPage(){
    console.log('SEARCH!');

    headerSection.classList.remove('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#search', 'buscado']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage(){
    console.log('TRENDS!');
    headerSection.classList.remove('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML ='Tendencias';

    getTrendingMovie();
}

