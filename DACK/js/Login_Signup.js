var app = angular.module("myLogin",["firebase"]);
var refusers = new Firebase("https://dack-app.firebaseio.com/users");
var refadmin = new Firebase("https://dack-app.firebaseio.com/admins");
var ref=new Firebase("https://dack-app.firebaseio.com/");
app.controller('myLoginController',function($scope,$firebaseArray, $firebaseObject, $window,$firebaseAuth)
{
		$scope.isSignup=true;
        $scope.isAdmin = false;
        $scope.isUser = false;
        $scope.usersRef = $firebaseArray(refusers);
        $scope.adminRef = $firebaseArray(refadmin);
		$scope.authObj=$firebaseAuth(ref);
        
	$scope.KiemTraRong=function(str)
	{
		return angular.isUndefined(str);
	};
	$scope.KiemTraBangNhau=function(str1,str2)
	{
		return angular.equals(str1,str2);
	};
	$scope.KiemTraDoDai=function(str)
	{
		if(str.length>=6 && str.length<=20 )
		{
			return true;
		}
		else
		{
			return false;
		}
	};
	$scope.Clear=function()
	{
		$scope.UsernameSignup="";
		$scope.PasswordSignup="";
		$scope.RetypePasswordSignup="";
	}
	$scope.Signup=function()
	{
		if($scope.KiemTraRong($scope.UsernameSignup)==true || $scope.KiemTraDoDai($scope.UsernameSignup)==false)
		{
			alert("Độ dài Username phài từ 6 đến 20 kí tự");
			$scope.isSignup=false;
		}
		if($scope.KiemTraRong($scope.PasswordSignup)==true || $scope.KiemTraDoDai($scope.PasswordSignup)==false )
		{
			alert("Độ dài Password phài từ 6 đến 20 kí tự");
			$scope.isSignup=false;
		}
		if($scope.KiemTraBangNhau($scope.PasswordSignup,$scope.RetypePasswordSignup)==false)
		{
			alert("Password và RetypePassword phải trùng nhau");
			$scope.isSignup=false;
		}

		if($scope.isSignup==true) //m bỏ code push vào hàm này
		{       
                        angular.forEach($scope.usersRef, function(value){
                            if(value.tk==$scope.UsernameSignup){
                               alert("Tài khoản này đã tồn tại");
                               $scope.isSignup=false;
                            }
                        });
                        if($scope.isSignup==true){
                            $scope.usersRef.$add({
                                tk: $scope.UsernameSignup,
                                mk: $scope.PasswordSignup
                            });
                            alert("Signup thành công");
                            $scope.Clear();    
                        } 
                        $scope.isSignup=true;
		}
                 
	};
	$scope.google=function()
	{
		$scope.authObj.$authWithOAuthPopup("google").then(function(authData) {
			console.log("Logged in as:", authData.uid);
			$scope.login=true;
			$window.location.href = "index.html";
			//alert("Login with Google thành công ");
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
				alert("Login with Google thất bại ");
			} else {
				$scope.login = true;
				$window.location.href = "index.html";


			}
		});
	};
        $scope.Login=function()
	{
             angular.forEach($scope.adminRef, function(value){
                if(value.tk==$scope.Username && value.mk==$scope.Password){
                  // alert("Đăng nhập thành công");
                   $scope.isAdmin = true;
                   $window.location.href = "index.html"; // bỏ link trang admin vào
                }
            });
            angular.forEach($scope.usersRef, function(value){
                if(value.tk==$scope.Username && value.mk==$scope.Password){
                   //alert("Đăng nhập thành công");
                   $scope.isUser = true;
                   $window.location.href = "index.html"; //bỏ link trang user vào
                }
            });
            if($scope.isAdmin==false && $scope.isUser==false){
                    alert("Đăng nhập thất bại");
            }
        };
        $scope.loginindex=function(){
            $window.location.href = "login.html";
        };
});