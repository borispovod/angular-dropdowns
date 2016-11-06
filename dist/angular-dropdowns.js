/**
 * @license MIT http://jseppi.mit-license.org/license.html
 */
(function (window, angular) {
  'use strict';

  var dd = angular.module('ngDropdownsImage', []);

  dd.run(['$templateCache', function ($templateCache) {
    $templateCache.put('ngDropdowns/templates/dropdownSelectImage.html', [
      '<div ng-class="{\'disabled\': dropdownDisabled}" class="wrap-dd-select" tabindex="0">',
      '<img class="selected-img" ng-if="dropdownModel && dropdownModel.image" ng-src="{{dropdownModel.image}}"><span class="selected">{{dropdownModel[labelField]}}</span>',
      '<ul class="dropdown">',
      '<li ng-repeat="item in dropdownSelect"',
      ' class="dropdown-item"',
      ' dropdown-select-item-image="item"',
      ' dropdown-item-label="labelField">',
      '</li>',
      '</ul>',
      '</div>'
    ].join(''));

    $templateCache.put('ngDropdowns/templates/dropdownSelectItemImage.html', [
      '<li ng-class="{divider: (dropdownSelectItem.divider && !dropdownSelectItem[dropdownItemLabel]), \'divider-label\': (dropdownSelectItem.divider && dropdownSelectItem[dropdownItemLabel])}">',
      '<a href="" class="dropdown-item"',
      ' ng-if="!dropdownSelectItem.divider"',
      ' ng-href="{{dropdownSelectItem.href}}"',
      ' ng-click="selectItem()">',
      '<img class="item-image" ng-if="dropdownSelectItem.image" ng-src="{{dropdownSelectItem.image}}"><span class="item">{{dropdownSelectItem[dropdownItemLabel]}}</span>',
      '</a>',
      '<span ng-if="dropdownSelectItem.divider">',
      '{{dropdownSelectItem[dropdownItemLabel]}}',
      '</span>',
      '</li>'
    ].join(''));
  }]);

  dd.directive('dropdownSelectImage', ['DropdownServiceImage',
    function (DropdownService) {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          dropdownSelect: '=',
          dropdownModel: '=',
          dropdownItemLabel: '@',
          dropdownOnchange: '&',
          dropdownDisabled: '='
        },

        controller: ['$scope', '$element', function ($scope, $element) {
          $scope.labelField = $scope.dropdownItemLabel || 'text';

          DropdownService.register($element);

          this.select = function (selected) {
            if (!angular.equals(selected, $scope.dropdownModel)) {
                $scope.dropdownModel = selected;
            }
            $scope.dropdownOnchange({
              selected: selected
            });
            $element[0].blur(); //trigger blur to clear active
          };

          $element.bind('click', function (event) {
            event.stopPropagation();
            if (!$scope.dropdownDisabled) {
              DropdownService.toggleActive($element);
            }
          });

          $scope.$on('$destroy', function () {
            DropdownService.unregister($element);
          });
        }],
        templateUrl: 'ngDropdowns/templates/dropdownSelectImage.html'
      };
    }
  ]);

  dd.directive('dropdownSelectItemImage', [
    function () {
      return {
        require: '^dropdownSelectImage',
        replace: true,
        scope: {
          dropdownItemLabel: '=',
          dropdownSelectItem: '='
        },

        link: function (scope, element, attrs, dropdownSelectCtrl) {
          scope.selectItem = function () {
            if (scope.dropdownSelectItem.href) {
              return;
            }
            dropdownSelectCtrl.select(scope.dropdownSelectItem);
          };
        },

        templateUrl: 'ngDropdowns/templates/dropdownSelectItemImage.html'
      };
    }
  ]);


  dd.factory('DropdownServiceImage', ['$document',
    function ($document) {
      var body = $document.find('body'),
        service = {},
        _dropdowns = [];

      body.bind('click', function () {
        angular.forEach(_dropdowns, function (el) {
          el.removeClass('active');
        });
      });

      service.register = function (ddEl) {
        _dropdowns.push(ddEl);
      };

      service.unregister = function (ddEl) {
        var index;
        index = _dropdowns.indexOf(ddEl);
        if (index > -1) {
          _dropdowns.splice(index, 1);
        }
      };

      service.toggleActive = function (ddEl) {
        angular.forEach(_dropdowns, function (el) {
          if (el !== ddEl) {
            el.removeClass('active');
          }
        });

        ddEl.toggleClass('active');
      };

      service.clearActive = function () {
        angular.forEach(_dropdowns, function (el) {
          el.removeClass('active');
        });
      };

      service.isActive = function (ddEl) {
        return ddEl.hasClass('active');
      };

      return service;
    }
  ]);
})(window, window.angular);
