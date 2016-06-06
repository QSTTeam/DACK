

app.controller("customersCtrl", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window) {
   var ref = new Firebase("https://dack-app.firebaseio.com/")
   $scope.datalaptop = $firebaseArray(ref.child("data").child("laptop"));

   $scope.loginindex = function(){
      $window.location.href="login.html";
   };

   $scope.Muahang = function(){

      //xử lý. Nếu chưa đăng nhập thì gọi sang form đăng nhập
      $window.location.href="nhapthongtindathang.html";
   }

});

