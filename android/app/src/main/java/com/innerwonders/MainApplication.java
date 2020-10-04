package com.innerwonders;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.shell.MainReactPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

// import com.facebook.CallbackManager;
// import com.facebook.FacebookSdk;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
// import com.facebook.appevents.AppEventsLogger;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
//           packages.add(new RNGestureHandlerPackage()); // Add manually
          // Packages that cannot be autolinked yet can be added manually here, for example:
//            packages.add(new RNGoogleSigninPackage());
          return packages;


        }


//          @Override
//          protected List<ReactPackage> getPackages() {
//              return Arrays.<ReactPackage>asList(
//                      new MainReactPackage(),
//            new ImagePickerPackage(),
//                      new PackageList(this).getPackages();
//                      new RNGoogleSigninPackage() // <-- this needs to be in the list
//              );
//          }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    //   // FacebookSdk.setApplicationId("1059514137759790");
    //   // FacebookSdk.sdkInitialize(this);
    //   // AppEventsLogger.activateApp(this);
    //  SoLoader.init(this, /* native exopackage */ false);
    // // SoLoader.init(this, /* native exopackage */ false);//----------facebook login
    // // FacebookSdk.sdkInitialize(getApplicationContext());//----------facebook login
    // AppEventsLogger.activateApp(this);
    // initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
