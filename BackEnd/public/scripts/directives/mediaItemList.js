angular.module('babelrenting').directive('mediaItemList',
	function() {
		return {
			restrict: 'AE',
			scope: {
				model: '=items',
				user: '=',
				getDetailUrl: '&',
				saveRenter: '&',
				dateMode: '@'
			},
			templateUrl: 'views/mediaItemList.html'
		};
	}
);