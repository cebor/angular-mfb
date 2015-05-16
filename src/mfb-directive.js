(function(angular, undefined) {

  'use strict';

  var mfb = angular.module('ngMfb', []);

  mfb.run(['$templateCache', function($templateCache) {
    $templateCache.put('ng-mfb-menu.tpl.html',
      '<ul class="mfb-component--{{position}} mfb-{{effect}}"' +
      '    data-mfb-toggle="{{togglingMethod}}" data-mfb-state="{{menuState}}">' +
      '  <li class="mfb-component__wrap">' +
      '    <a ng-click="click()"' +
      '       style="background: transparent; box-shadow: none;"' +
      '       ng-attr-data-mfb-label="{{label}}" class="mfb-component__button--main">' +
      '     <md-button class="md-fab" aria-label={{label}} style="position:relative; margin: 0; padding:0;">' +
      '       <md-icon style="left: 0; position: relative;" md-svg-icon="{{resting}}"' +
      '         class="mfb-component__main-icon--resting"></md-icon>' +
      '       <md-icon style="position:relative;" md-svg-icon="{{active}}"' +
      '         class="mfb-component__main-icon--active"></md-icon>' +
      '     </md-button>' +
      '    </a>' +
      '    <ul class="mfb-component__list" ng-transclude>' +
      '    </ul>' +
      '</li>' +
      '</ul>'
    );

    $templateCache.put('ng-mfb-button.tpl.html',
      '<li>' +
      '  <a href="" data-mfb-label="{{label}}" class="mfb-component__button--child" ' +
      '     style="background: transparent; box-shadow: none;">' +
      '     <md-button style="margin: 0;" class="md-fab" aria-label={{label}}>' +
      '       <md-icon md-svg-icon="{{icon}}"></md-icon>' +
      '     </md-button>' +
      '  </a>' +
      '</li>'
    );
  }]);

  mfb.directive('mfbMenu', [function() {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        position: '@',
        effect: '@',
        label: '@',
        menuClass: '@',
        resting: '@restingIcon',
        active: '@activeIcon',
        mainAction: '&',
        togglingMethod: '@'
      },
      templateUrl: 'ng-mfb-menu.tpl.html',
      link: function(scope) {
        var openState = 'open';
        var closedState = 'closed';

        function _isHoverActive() {
          return scope.togglingMethod === 'hover';
        }

        function toggle() {
          scope.menuState = scope.menuState === openState ? closedState : openState;
        }

        scope.click = function () {
          // If there is a main action, let's fire it
          if (scope.mainAction) {
            scope.mainAction();
          }

          if (!_isHoverActive()) {
            toggle();
          }
        };

        // Initialize menuStae
        if (!scope.menuState) {
          scope.menuState = closedState;
        }

      }
    };
  }]);

  mfb.directive('mfbButton', [function() {
    return {
      require: '^mfbMenu',
      restrict: 'EA',
      replace: true,
      scope: {
        icon: '@',
        label: '@',
        buttonClass: '@'
      },
      templateUrl: 'ng-mfb-button.tpl.html'
    };
  }]);

})(angular);
