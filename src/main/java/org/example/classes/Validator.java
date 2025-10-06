package org.example.classes;

import java.util.ArrayList;
import java.util.Arrays;

public class Validator {



    public static boolean validateX(float x) {
        return (x <= 5 && x >= -3);
    }

    public static boolean validateY(float y){
        return (y <= 5 && y >= -3);
    }

    public static boolean validateR(float r){
        return (r <= 5 && r >= 2);
    }
    public static boolean validateGraphY(float y){
        return (y <= 6 && y >= -6);
    }

    public static boolean validateGraphX(float x){
        return (x <= 6 && x >= -6);
    }
}
