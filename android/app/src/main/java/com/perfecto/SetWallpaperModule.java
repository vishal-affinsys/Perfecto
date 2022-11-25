package com.perfecto;

import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.os.Build;
import android.telecom.Call;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.CustomTarget;
import com.bumptech.glide.request.transition.Transition;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.logging.Handler;
import java.util.logging.LogRecord;

public class SetWallpaperModule extends ReactContextBaseJavaModule {
    SetWallpaperModule(ReactApplicationContext context) {
        super(context);
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return "SetWallpaperModule";
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location, Callback callback) {
        Log.d("SetWallpaperModule", "Create event called with name: " + name
                + " and location: " + location);
        callback.invoke(231, 213);
    }

    @ReactMethod(isBlockingSynchronousMethod = false)
    public void setWallpaper(String url, Callback callback) throws IOException {

        new Thread(new Runnable() {
            public void run() {

                setWallpaperUsingThread(url);
                callback.invoke(121, "Successfully changed wallpaper");

            }
        }).start();

    }

    public void setWallpaperUsingThread(String url) {
        try {
            Bitmap result = Glide.with(getReactApplicationContext())
                    .asBitmap()
                    .load(url).submit().get();
            WallpaperManager wallpaperManager = WallpaperManager.getInstance(getReactApplicationContext());
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    wallpaperManager.setBitmap(result, null, true, WallpaperManager.FLAG_SYSTEM);
                }


            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }


    }

}
