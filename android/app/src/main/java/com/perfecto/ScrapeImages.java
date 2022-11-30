package com.perfecto;


import android.util.Log;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.net.URL;
import java.net.URLConnection;

public class ScrapeImages extends ReactContextBaseJavaModule {
    ScrapeImages(ReactApplicationContext context) {
        super(context);
    }

    // add to CalendarModule.java
    @Override
    public String getName() {
        return "ScrapeImages";
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location, Callback callback) {
        Log.d("ScrapeImages", "Create event called with name: " + name
                + " and location: " + location);
        callback.invoke(231, "Create event called with name: " + name
                + " and location: " + location);
    }

    @ReactMethod
    public static String extractImageUrl(String url, Callback callback) throws IOException {
        URL oracle = new URL(url);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(oracle.openStream()));

        String inputLine;
        String data="";
        while ((inputLine = in.readLine()) != null){
            System.out.println(inputLine);
            data += inputLine;
        }


        in.close();
        callback.invoke(data+" ************* "+url);
        return data;




        // String data = new URL(url).openConnection().getContent();
        // callback.invoke(data);

        // Document document = Jsoup.connect(url).get();

        // String imageUrl = null;

        // imageUrl = getImageFromSchema(document);
        // if (imageUrl != null) {
        // callback.invoke("Image url: " + imageUrl);
        // return imageUrl;
        // }

        // imageUrl = getImageFromOpenGraph(document);
        // if (imageUrl != null) {
        // callback.invoke("Image url: " + imageUrl);
        // return imageUrl;
        // }

        // imageUrl = getImageFromTwitterCard(document);
        // if (imageUrl != null) {
        // callback.invoke("Image url: " + imageUrl);
        // return imageUrl;
        // }

        // imageUrl = getImageFromTwitterShared(document);
        // if (imageUrl != null) {
        // callback.invoke("Image url: " + imageUrl);
        // return imageUrl;
        // }

        // imageUrl = getImageFromLinkRel(document);
        // if (imageUrl != null) {
        // callback.invoke("Image url: " + imageUrl);
        // return imageUrl;
        // }

        // imageUrl = getImageFromGuess(document);
        // if (imageUrl != null) {
        // callback.invoke("Image url: " + imageUrl);
        // return imageUrl;
        // }

        // return imageUrl;
    }

    private static String getImageFromTwitterShared(Document document) {
        Element div = document.select("div.media-gallery-image-wrapper").first();
        if (div == null) {
            return null;
        }
        Element img = div.select("img.media-slideshow-image").first();
        if (img != null) {
            return img.absUrl("src");
        }
        return null;
    }

    private static String getImageFromGuess(Document document) {
        // TODO
        return null;
    }

    private static String getImageFromLinkRel(Document document) {
        Element link = document.select("link[rel=image_src]").first();
        if (link != null) {
            return link.attr("abs:href");
        }
        return null;
    }

    private static String getImageFromTwitterCard(Document document) {
        Element meta = document.select("meta[name=twitter:card][content=photo]").first();
        if (meta == null) {
            return null;
        }
        Element image = document.select("meta[name=twitter:image]").first();
        return image.attr("abs:content");
    }

    private static String getImageFromOpenGraph(Document document) {
        Element image = document.select("meta[property=og:image]").first();
        if (image != null) {
            return image.attr("abs:content");
        }
        Element secureImage = document.select("meta[property=og:image:secure]").first();
        if (secureImage != null) {
            return secureImage.attr("abs:content");
        }
        return null;
    }

    private static String getImageFromSchema(Document document) {
        Element container = document.select("*[itemscope][itemtype=http://schema.org/ImageObject]").first();
        if (container == null) {
            return null;
        }

        Element image = container.select("img[itemprop=contentUrl]").first();
        if (image == null) {
            return null;
        }
        return image.absUrl("src");
    }

}