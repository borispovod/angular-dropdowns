'use strict';

var app = angular.module('app', ['ngDropdownsImage']);

app.controller('AppCtrl', function($scope) {
  $scope.ddSelectOptions = [
    {
      text: 'Label',
      divider: true
    }, {
      text: 'Option1',
      value: 'one',
      iconCls: 'someicon'
    }, {
      text: 'Option2',
      someprop: 'somevalue'
    }, {
      divider: true
    }, {
      text: 'Option4',
      href: 'http://www.google.com'
    }
  ];

  $scope.ddSelectSelected = {
    text: "Select an Option"
  };

});
