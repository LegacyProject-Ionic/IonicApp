angular.module('which.controllers.friends', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('FriendsCtrl', function($scope, $ionicHistory, $state, User, WhichFactory) {
  $scope.filters = {};
  $scope.userSearch=""; 

  $scope.message=''; 

  var getPotentialFriends= function () {
    User.getUsers()
      .then(function (response) {
        $scope.users= response; 
      })
  }

  getPotentialFriends(); 


  $scope.addFriend= function (friendName) {
    User.addFriend(friendName)
      .then(function (response) {
        if(response.status===200){ 
          $scope.message= 'Successfully added!'
        }  
        $scope.getFriendsWiches(); 
        $scope.userSearch=""; 
      })

  }

  $scope.removeFriend= function (friendId) {
    User.removeFriend(friendId)
      .then(function (response) {
        $scope.getFriendsWiches(); 
      })

  }


  $scope.getFriendsWiches= function () {
    User.getFriendsWiches()
      .then (function (friendsWiches){
        $scope.friends= friendsWiches.uniqueFriends;
        $scope.friendsWhiches= friendsWiches.whiches;
      })
  }

  $scope.storeId= function (id){
    $scope.storedId= id; 
  }

  $scope.goToWhich = function(id) {
    console.log('id', id); 
    WhichFactory.getWhichByID(id).then(function(which) {
      console.log(which);
      $state.go('app.whichInfo', {which: which});
    })
  }

 
  
});