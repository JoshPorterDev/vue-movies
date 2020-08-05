new Vue({
    el: '#app',
    data() {
        return {
            name: "Josh",
            movies: [],
            cart: [],
            subtotal: 0
        }
    },
    methods: {
        viewCart: function()
        {
            let moviesDiv = document.querySelector(".movies");
            moviesDiv.classList.add("hidden");

            let cartDiv = document.querySelector(".cart");
            cartDiv.classList.remove("hidden");
        },

        viewMovies: function()
        {
            let moviesDiv = document.querySelector(".movies");
            moviesDiv.classList.remove("hidden");

            let cartDiv = document.querySelector(".cart");
            cartDiv.classList.add("hidden");
        },

        addToCart: function(e)
        {
            let targetMovie = document.querySelector("#card-columns").childNodes[e.target.id].childNodes[2].childNodes[0].innerHTML;
            let cartItem = document.getElementById("itemAddedToCart");
            let quantityValue = document.querySelector('#card-columns').childNodes[e.target.id].childNodes[2].childNodes[4].childNodes[2].value
            let quantity = parseInt(quantityValue)
            let total = 0.00;
            let childOrAdult = e.target.innerHTML;
            //console.log(this.cart[0].movie);
            if (childOrAdult == 'Child ticket')
            {
                price = 5.99;
            }
            else 
            {
                price = 8.99;
            }
            total = price * quantity;
            this.subtotal += total;
            // console.log(quantity * 4)
            cartItem.innerHTML = targetMovie;
            this.cart.push({'movie': targetMovie, 'childOrAdult': childOrAdult, 'price': price, 'quantity': quantity});
        }
    },

    async mounted() {
        const res = await axios.get(" https://api.themoviedb.org/3/movie/popular?api_key=a7a0bfcaf8c21f720c31e7ce641cd135&language=en-US&page=1");
        const config = await axios.get(" https://api.themoviedb.org/3/configuration?api_key=a7a0bfcaf8c21f720c31e7ce641cd135");
        
        let base_url = config.data.images.base_url;

        for (let i = 0; i < res.data.results.length; i++)
        {
            let movie = res.data.results[i];
            let movie_title = movie.title;
            let movie_overview = movie.overview;
            let movie_poster = `${base_url}w342${movie.poster_path}`;
            let movie_id = i;
            // console.log(movie_poster)

            this.movies.push({"title": movie_title, "overview": movie_overview, "poster": movie_poster, "id": movie_id})
        }
    }
});