/**
 * Created by Hoang Son on 6/3/2016.
 */
app.service('myService',function()
{
    this.KiemTraRong=function(str)
    {
        return angular.isUndefined(str);
    }
    this.KiemTraBangNhau=function(str1,str2)
    {
        return angular.equals(str1,str2);
    }
    this.KiemTraDoDai=function(str)
    {
        if(str.length>=6 && str.length<=20 )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
});