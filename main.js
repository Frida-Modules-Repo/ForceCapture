//ref:https://github.com/VarunS2002/Xposed-Disable-FLAG_SECURE/blob/main/app/src/main/java/com/varuns2002/disable_flag_secure/DisableFlagSecure.kt
Java.perform(function (){
  Java.use('android.view.Window').setFlags.overload('int','int').implementation=function (a,b){
    return this.setFlags(a&0x00002000,b);
  }
  Java.use('android.view.SurfaceView').setSecure.overload('boolean').implementation=function (sec){
    return this.setSecure(false);
  }
  try{
    Java.use('com.android.server.wm.WindowState').isSecureLocked.implementation=function (){
      return false;
    }
  }catch (e){}

  try{
    Java.use('com.android.server.wm.WindowManagerService').isSecureLocked.implementation=function (){
      return false;
    }
  }catch (e){}

  try{
    Java.use('android.view.WindowManagerGlobal').addView.overload(
        'android.view.View',
        'android.view.ViewGroup$LayoutParams',
        'android.view.Display',
        'android.view.Window','int').implementation=function (a,b,c,d,e){
      b.flags.value=b.flags.value&0x00002000;
      return this.addView(a,b,c,d,e);
    }
  }catch (e){}
  try{
    Java.use('android.view.WindowManagerGlobal').addView.overload(
        'android.view.View',
        'android.view.ViewGroup$LayoutParams',
        'android.view.Display',
        'android.view.Window').implementation=function (a,b,c,d){
      b.flags.value=b.flags.value&0x00002000;
      return this.addView(a,b,c,d);
    }
  }catch (e){}
  try{
    Java.use('android.view.WindowManagerGlobal').updateViewLayout.overload(
        'android.view.View',
        'android.view.ViewGroup$LayoutParams').implementation=function (a,b){
      b.flags.value=b.flags.value&0x00002000;
      return this.updateViewLayout(a,b);
    }
  }catch (e){}

})
