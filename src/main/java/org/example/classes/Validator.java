package org.example.classes;

import java.util.ArrayList;
import java.util.Arrays;

public class Validator {

    private static ArrayList<Float> possibleR = new ArrayList<Float>(Arrays.asList(1.f, 2.f, 3.f, 4.f, 5.f));

    public static boolean validateX(float x) {
        return (x <= 3 && x >= -3);
    }

    public static boolean validateY(float y){
        return (y <= 3 && y >= -3);
    }

    public static boolean validateR(float r){
        return possibleR.contains(r);
    }

    public static boolean validateGraphY(float y){
        return (y <= 6 && y >= -6);
    }

    public static boolean validateGraphX(float x){
        return (x <= 6 && x >= -6);
    }
}
