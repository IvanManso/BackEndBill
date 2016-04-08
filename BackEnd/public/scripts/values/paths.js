angular.module("babelrenting").constant("paths", {

    url: {
	    home: "/",
	    movies: "/bills",
	    movieNew: "/bill/new",
	    movieDetail: "/bills/:id",
	    notFound: "/sorry",
	    newUser: "/userNew"
    },

    titles: {
    	home: "Babel Bills",
	    bills: "Bills",
	    billNew: "Save Bill",
	    movieDetail: "Info",
	    notFound: "Sorry not found",
	    newUser: "Create User"
    }
});

