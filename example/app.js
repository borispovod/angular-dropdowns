'use strict';

var app = angular.module('app', ['ngDropdownsImage']);

app.controller('AppCtrl', function($scope) {
  $scope.ddSelectOptions = [
    {
      text: 'Label',
		value: '123',
		image: '123'
    }
  ];

});
