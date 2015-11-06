// http://angulartutorial.blogspot.com/2014/03/rating-stars-in-angular-js-using.html

angular.module('qrate.directives.starRating', [])
  .directive('starRating', starRating);

function starRating() {
  return {
    restrict: 'EA',
    templateUrl: 'directives/starRating/starRating.html',
    scope: {
      ratingValue: '=ngModel',
      max: '=?', // optional (default is 5)
      onRatingSelect: '&?',
      readonly: '=?'
    },
    link: function(scope, element, attributes) {
      if (scope.max == undefined) {
        scope.max = 5;
      }
      updateStars();
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          console.log(i, scope.ratingValue)
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        if (scope.readonly == undefined || scope.readonly === false){
          scope.ratingValue = index + 1;
          if (scope.onRatingSelect) {
            scope.onRatingSelect({
              rating: index + 1
            });
          }
        }
      };
      scope.$watch('ratingValue', function(newValue) {
        if (newValue) {
          updateStars();
        }
      });
    }
  };
}