

	   //$('#user-email').on('input',function() {
	  // var email = $('#user-email').val()
	  // var message = 'Welcome Back, ' + email;
	  // $('.welcome-message').text(message);
     //});

//food app controller
	 var foodieApp = angular.module('foodieApp',['ngRoute']);    //routing used here
	 foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{                                       //route provider condition
		templateUrl: 'pages/login.html',           //addresses
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})
	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

//restaurant controller
	foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
$scope.restaurantId = $routeParams.id;
var restaurants = [{                                        //array of objects used for  details of restaurants
	name: 'Farzi Cafe',
	address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
	location: 'Connaught Place',
	category: 'Casual Dining, Bar',
	vote: '4.2',
	id : 1,
	cuisines: 'Modern Indian',
	cost: '2200',
	hours: '12 Noon to 1 AM (Mon-Sun)',
	image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
},
{
	name: 'Barbeque Nation',
	address: 'SCO 39, Madhya Marg, Sector 26, Chandigarh',
	location: 'Sector 26, Chandigarh',
	category: 'Casual Dining',
	vote: '4.6',
		id : 2,
	cuisines: 'North Indian, Chinese',
	cost: '1300',
	hours: '12 Noon to 3 PM, 6:30 PM to 11 PM (Mon-Sun) ',
},
{
		name: 'Virgin Courtyard',
		address: 'Backside, SCO 1A, Madhya Marg, Sector 7, Chandigarh',
		location: 'Sector 7, Chandigarh',
		category: 'Fine Dining',
		vote: '4.3',
			id : 3,
		cuisines: 'Italian',
		cost: '2200',
		hours: '11:30 AM to 11:30 PM (Mon-Sun) ',
		image: 'https://b.zmtcdn.com/data/pictures/0/121120/6509dcdce78d8d0046bba6f98542442b.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Uncle Jack',
		address: 'Booth 11, Sector 8, Chandigarh',
		location: 'Sector 8, Chandigarh',

		vote: '4.2',
			id : 4,
		cuisines: 'American,Beverages,Desserts',
		cost: '600',
		hours: '10 AM to 10:30 PM (Mon-Fri),10 AM to 11 PM (Sat-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/0/122830/e65c53e0fbc78af6cb86ad5d4bd0f28c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},
	{
		name: 'Burgill',
		address: 'Booth 70, Sector 8, Chandigarh',
		location: 'Sector 8, Chandigarh',
		category: 'Quick Bites',
		vote: '4.5',
			id : 5,
		cuisines: 'Burger, Fast Food, Beverages',
		cost: '500',
		hours: '12 Noon to 11 PM (Mon-Sun) ',
		image: 'https://b.zmtcdn.com/data/reviews_photos/ab1/c2b343682cbb4331b63fac7c2dab6ab1_1478363486.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	},

	{
		name: 'Pirates of Grill',
		address: '313, Third Floor, Elante Mall, Phase 1, Chandigarh Industrial',
		location: 'Elante Mall, Chandigarh Industrial',
		category: 'Casual Dining',
		vote: '4.0',
			id : 6,
		cuisines: 'North Indian, Continental, Asian',
		cost: '1200',
		hours: '11 AM to 4 PM, 6:30 PM to 11 PM (Mon-Sun) ',
		image: 'https://b.zmtcdn.com/data/reviews_photos/6b3/43cf511633ce2a717b1d0be23d23e6b3_1414519778.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
	}]
	$scope.restaurant = restaurants[$routeParams.id - 1];
	$scope.getIngredients = function(url) {
// Do something
var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
$http({                                                                        // used to call clarifai
		'method': 'POST',
		'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
		'headers': {
				'Authorization': 'Key f5534695ec9d4ed6a0a90a974e637dfd',
				'Content-Type': 'application/json'
		},


// 		success: function (response) {
// 				var ingredients = response.outputs[0].data.concepts;
// 				var list = '';
// 				for (var i =0;i < ingredients.length;i++) {
// 						list += '<div class="ingredient">' + ingredients[i].name + '</div>'
// 				}
// 				$('.ingredients').html(list);
// 		},
// error: function (xhr) {
// 				console.log(xhr);
// 		}
// })
'data': data
}).then(function (response) {
	var ingredients = response.data.outputs[0].data.concepts;
	for (var i =0;i < ingredients.length;i++) {
	$scope.ingredients.push(ingredients[i].name);
	}
		}, function (xhr) {
				console.log(xhr);
			})

}
$scope.ingredients = [];              //array
		$scope.probabilityvalue=[];

		$scope.toDoList = function(){           //to do list for getting ingredients


			 var todoarray = angular.copy($scope.ingredients);

				$scope.todoList = [];
				for(var i = 0 ; i<todoarray.length; i++){
				  $scope.todoList.push({todoText:todoarray[i], done:false});
				}

			   $scope.remove = function() {                     // for removing the ingredients which are not required
			       var oldList = $scope.todoList;
			       $scope.todoList = [];
			       angular.forEach(oldList, function(x) {
			           if (!x.done) $scope.todoList.push(x);
			       });
			   };

			   $scope.done = function() {

			   		console.log("hhhh");
			   	//	donee=!donee;
			   		//$.text-decoration: overline;

			   }



		}

	});



	 foodieApp.controller('loginController',function($scope,$location) {           //controller for login page
		 $scope.goToHome = function() {
		 		//console.log('Do Something')
				$location.url('home')
		 	}
})


	 foodieApp.controller('mainController',function($scope) {          //controller for main restaurant data
			$scope.restaurants = [{                                       //array of objects used for  details of restaurants
				name: 'Farzi Cafe',
				address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
				location: 'Connaught Place',
				category: 'Casual Dining, Bar',
				vote: '4.2',
					id : 1,
				cuisines: 'Modern Indian',
				cost: '2200',
				hours: '12 Noon to 1 AM (Mon-Sun)',
				image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
			},
			{
				name: 'Barbeque Nation',
				address: 'SCO 39, Madhya Marg, Sector 26, Chandigarh',
				location: 'Sector 26, Chandigarh',
				category: 'Casual Dining',
				vote: '4.6',
					id : 2,
				cuisines: 'North Indian, Chinese',
				cost: '1300',
				hours: '12 Noon to 3 PM, 6:30 PM to 11 PM (Mon-Sun) ',
				image: 'https://b.zmtcdn.com/data/pictures/chains/4/120014/481a8438b57d25815e87ee14c75aa3e5.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
			},
			{
					name: 'Virgin Courtyard',
					address: 'Backside, SCO 1A, Madhya Marg, Sector 7, Chandigarh',
					location: 'Sector 7, Chandigarh',
					category: 'Fine Dining',
					vote: '4.3',
						id : 3,
					cuisines: 'Italian',
					cost: '2200',
					hours: '11:30 AM to 11:30 PM (Mon-Sun) ',
					image: 'https://b.zmtcdn.com/data/pictures/0/121120/6509dcdce78d8d0046bba6f98542442b.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
				},
				{
					name: 'Uncle Jack',
					address: 'Booth 11, Sector 8, Chandigarh',
					location: 'Sector 8, Chandigarh',

					vote: '4.2',
						id : 4,
					cuisines: 'American,Beverages,Desserts',
					cost: '600',
					hours: '10 AM to 10:30 PM (Mon-Fri),10 AM to 11 PM (Sat-Sun)',
					image: 'https://b.zmtcdn.com/data/pictures/chains/0/122830/e65c53e0fbc78af6cb86ad5d4bd0f28c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
				},
				{
					name: 'Burgill',
					address: 'Booth 70, Sector 8, Chandigarh',
					location: 'Sector 8, Chandigarh',
					category: 'Quick Bites',
					vote: '4.5',
						id : 5,
					cuisines: 'Burger, Fast Food, Beverages',
					cost: '500',
					hours: '12 Noon to 11 PM (Mon-Sun) ',
					image: 'https://b.zmtcdn.com/data/reviews_photos/ab1/c2b343682cbb4331b63fac7c2dab6ab1_1478363486.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
				},

				{
					name: 'Pirates of Grill',
					address: '313, Third Floor, Elante Mall, Phase 1, Chandigarh Industrial',
					location: 'Elante Mall, Chandigarh Industrial',
					category: 'Casual Dining',
					vote: '4.0',
						id : 6,
					cuisines: 'North Indian, Continental, Asian',
					cost: '1200',
					hours: '11 AM to 4 PM, 6:30 PM to 11 PM (Mon-Sun) ',
					image: 'https://b.zmtcdn.com/data/reviews_photos/6b3/43cf511633ce2a717b1d0be23d23e6b3_1414519778.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
				}



]

	 })
