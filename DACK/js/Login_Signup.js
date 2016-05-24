var app = angular.module("myLogin",["firebase"]);
var appindex = angular.module("appSaleb",["firebase"]);
var refusers = new Firebase("https://dack-app.firebaseio.com/users");
var refadmin = new Firebase("https://dack-app.firebaseio.com/admins");
app.controller('myLoginController',function($scope,$firebaseArray, $firebaseObject, $window)
{
	$scope.isSignup=true;
        $scope.isAdmin = false;
        $scope.isUser = false;
        $scope.usersRef = $firebaseArray(refusers);
        $scope.adminRef = $firebaseArray(refadmin);
        
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
});
appindex.controller('myIndexController',function($scope,$window)
{
        $scope.loginindex = function(){
            $window.location.href = "login.html";
        };
});