

app.controller("customersCtrl", function($scope,$firebaseArray, $firebaseObject,$firebaseAuth,$window) {
   var ref = new Firebase("https://dack-app.firebaseio.com/");
   var refgiohang=new Firebase("https://dack-app.firebaseio.com/giohang");
   $scope.datalaptop = $firebaseArray(ref.child("data").child("laptop"));
   $scope.datachuot = $firebaseArray(ref.child("data").child("chuot"));
   $scope.dataocung = $firebaseArray(ref.child("data").child("ocung"));
   $scope.datausb = $firebaseArray(ref.child("data").child("usb"));
   $scope.dataram = $firebaseArray(ref.child("data").child("ram"));
   $scope.isadmin = false;
   $scope.items = [];
   $scope.authObj=$firebaseAuth(ref);
   $scope.giohang=$firebaseArray(refgiohang);
   $scope.un="";
   $scope.islogin=false;
   $scope.isloginfbgg=false;
   $window.onload=function()

   {

      var x=sessionStorage.getItem("LOGIN");
      var y=JSON.parse(x);
      $scope.islogin=y.login;
      $scope.isadmin=y.loginadmin;
      $scope.tentaikhoan = y.user;

   }
   $scope.login = function(){
       $window.location.href="login.html";
   };
   $scope.xemgiohangclick= function(){
      //if danh nhap hoac k co hang
      $window.location.href="giohang.html";
   };
   $scope.logout=function(){
      if($scope.isloginfbgg){
         $scope.authObj.$unauth();
         $scope.islogin=false;
         $scope.isloginfbgg=false;

      }
      else{
         //xữ lý code


      }
      var ob={
         user:"",
         login:false,
         loginadmin:false
      }
      sessionStorage.setItem("LOGIN", JSON.stringify(ob));
      $window.location.href="index.html";
   };
   $scope.Muahang = function(src,info,pri){

      //xử lý. Nếu chưa đăng nhập thì gọi sang form đăng nhập
      if($scope.islogin==false || $scope.islogin==undefined)
      {
         $window.location.href="login.html";
      }
      else {
         if ($scope.giohang.length == 0) {
            $scope.hang = [];
            $scope.hang.push({information: info,img:src,price:pri});
            /*
             var ob = {
             img: src,
             infomation: info,
             price: pri
             };
             */

            $scope.giohang.$add({
               hang: $scope.hang,
               tenuser: $scope.tentaikhoan
            });
            alert("Đã thêm vào giỏ hàng =)))");
         }
         else
         {
            var tontai = false;
            angular.forEach($scope.giohang,function(value) {

               if (value.tenuser == $scope.tentaikhoan)
               {
                  var strid="https://dack-app.firebaseio.com/giohang/"+value.$id.toString()+"/hang";

                  var temp=new Firebase(strid);
                  $scope.hangtemp=$firebaseArray(temp);




                  $scope.hangtemp.$add({
                     img:src,
                     information:info,
                     price:pri
                  });
                  tontai = true;
                  alert("Đã thêm vào giỏ hàng =)))");
               }

            });
            if(!tontai){
               $scope.hang = [];
               $scope.hang.push({img:src,
                  information:info,
                  price:pri});


               $scope.giohang.$add({
                  hang: $scope.hang,
                  tenuser: $scope.tentaikhoan
               });
               alert("Đã thêm vào giỏ hàng =)))");
            }

         }


      }


   };
   $scope.google=function()
   {
      $scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
         console.log("Logged in as:", authData);
         //$scope.login=true;
         //$window.location.href = "index.html";
         //alert("Login with Google thành công ");
         $scope.islogin = true;
         var ob={
            user:authData.google.displayName.toString(),
            login:true,
            loginadmin:false
         }
         sessionStorage.setItem("LOGIN", JSON.stringify(ob));
         $window.location.href = "index.html";

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
            $scope.islogin = true;
            var ob={
               user:authData.facebook.displayName.toString(),
               login:true,
               loginadmin:false
            }
            sessionStorage.setItem("LOGIN", JSON.stringify(ob));
            $window.location.href = "index.html";


         }
      });
   };

   $scope.xemdondathang=function () {
     $window.location.href="xemdathang.html";
   };
   $scope.themsampham = function () {
      $window.location.href="themsanpham.html";
   }

   $scope.xemgiohang=function () {
      $window.location.href="giohang.html";
   }
   
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

