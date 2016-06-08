

app.controller("customersCtrl", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window) {
   var ref = new Firebase("https://dack-app.firebaseio.com/")
   $scope.datalaptop = $firebaseArray(ref.child("data").child("laptop"));
   $scope.datachuot = $firebaseArray(ref.child("data").child("chuot"));
   $scope.dataocung = $firebaseArray(ref.child("data").child("ocung"));
   $scope.datausb = $firebaseArray(ref.child("data").child("usb"));
   $scope.dataram = $firebaseArray(ref.child("data").child("ram"));
   $scope.isadmin = false;
   $scope.items = [];
   $scope.authObj=$firebaseAuth(ref);

   $scope.isloginfbgg=false;
   $scope.login = function(){
      $scope.islogin = true;
       $window.location.href="login.html";
      $scope.isadmin = true;
   };
   $scope.xemgiohangclick= function(){
      //if danh nhap hoac k co hang
      $window.location.href="giohang.html";
   };
   $scope.logout=function(){
      if($scope.isloginfbgg){
         $scope.authObj.$unauth();
         $scope.authObj.$onAuth(function(authData) {
            if (authData) {
               console.log("Authenticated with uid:", authData.uid);
               $scope.isloginfbgg = false;
            } else {
               $scope.islogin=false;
               $scope.$apply();
               console.log("Client unauthenticated.")

            }
         });
      }
      else{
         //xữ lý codek8
      }
   };
   $scope.Muahang = function(){

      //xử lý. Nếu chưa đăng nhập thì gọi sang form đăng nhập
      $window.location.href="nhapthongtindathang.html";
   };
   $scope.google=function()
   {
      $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
         console.log("Logged in as:", authData);
         //$scope.login=true;
         //$window.location.href = "index.html";
         //alert("Login with Google thành công ");
         $scope.tentaikhoan = authData.google.displayName;
         $scope.islogin= true;
         $scope.isloginfbgg=true;
      }).then(function() {
         // Never called because of page redirect
      }).catch(function(error) {
         console.error("Authentication failed:", error);
         alert("Login with Google thất bại ");
      });

   };
   $scope.facebook=function()
   {
      ref.authWithOAuthPopup("facebook", function (error, authData) {
         if (error) {
            console.log("Login Failed!", error);
            alert("Login with Facebook thất bại ");
         } else {
            console.log(authData.facebook.displayName);
            $scope.islogin = true;
            $scope.isloginfbgg=true;
            //$window.location.href = "index.html";
            $scope.tentaikhoan = authData.facebook.displayName;
            $scope.$apply();

         }
      });
   };

   //xu lý category

   $scope.selectlaptop = false;
   $scope.laptopall = true;
   $scope.asusfind = function(){
      $scope.selectlaptop = true;
      $scope.laptopall = false;
      $scope.chuotall = false;
      $scope.ocungall = false;
      $scope.usball = false;
      $scope.ramall = false;
      $scope.asusdata = [];
      angular.forEach($scope.datalaptop, function(value){
         if(value.hang == 'Asus'){
            $scope.asusdata.push({ten:value.ten,hang:value.hang,manhinh:value.manhinh,cpu:value.cpu,ram:value.ram,hdh:value.hdh,vga:value.vga,gia:value.gia,img:value.img});
         }
      });
   };
   $scope.dellfind = function(){
      $scope.selectlaptop = true;
      $scope.laptopall = false;
      $scope.chuotall = false;
      $scope.ocungall = false;
      $scope.usball = false;
      $scope.ramall = false;
      $scope.asusdata = [];
      angular.forEach($scope.datalaptop, function(value){
         if(value.hang == 'Dell'){
            $scope.asusdata.push({ten:value.ten,hang:value.hang,manhinh:value.manhinh,cpu:value.cpu,ram:value.ram,hdh:value.hdh,vga:value.vga,gia:value.gia,img:value.img});
         }
      });
   };
   $scope.acerfind = function(){
      $scope.selectlaptop = true;
      $scope.laptopall = false;
      $scope.chuotall = false;
      $scope.ocungall = false;
      $scope.usball = false;
      $scope.ramall = false;
      $scope.asusdata = [];
      angular.forEach($scope.datalaptop, function(value){
         if(value.hang == 'Acer'){
            $scope.asusdata.push({ten:value.ten,hang:value.hang,manhinh:value.manhinh,cpu:value.cpu,ram:value.ram,hdh:value.hdh,vga:value.vga,gia:value.gia,img:value.img});
         }
      });
   };
   $scope.hpfind = function(){
      $scope.selectlaptop = true;
      $scope.laptopall = false;
      $scope.chuotall = false;
      $scope.ocungall = false;
      $scope.usball = false;
      $scope.ramall = false;
      $scope.asusdata = [];
      angular.forEach($scope.datalaptop, function(value){
         if(value.hang == 'HP'){
            $scope.asusdata.push({ten:value.ten,hang:value.hang,manhinh:value.manhinh,cpu:value.cpu,ram:value.ram,hdh:value.hdh,vga:value.vga,gia:value.gia,img:value.img});
         }
      });
   };
   $scope.chuotfind = function(){
      $scope.laptopall = false;
      $scope.selectlaptop = false;
      $scope.chuotall = true;
      $scope.ocungall = false;
      $scope.usball = false;
      $scope.ramall = false;
   };
   $scope.ocungfind = function(){
      $scope.laptopall = false;
      $scope.selectlaptop = false;
      $scope.chuotall = false;
      $scope.ocungall = true;
      $scope.usball = false;
      $scope.ramall = false;
   };
   $scope.usbfind = function(){
      $scope.laptopall = false;
      $scope.selectlaptop = false;
      $scope.chuotall = false;
      $scope.ocungall = false;
      $scope.usball = true;
      $scope.ramall = false;
   };
   $scope.ramfind = function(){
      $scope.laptopall = false;
      $scope.selectlaptop = false;
      $scope.chuotall = false;
      $scope.ocungall = false;
      $scope.usball = false;
      $scope.ramall = true;
   };


});

