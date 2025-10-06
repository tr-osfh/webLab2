package org.example.classes;

import java.util.ArrayList;
import java.util.Arrays;

public class Validator {



    public static boolean validateX(double x) {
        return (x <= 5 && x >= -3);
    }

    public static boolean validateY(double y){
        return (y <= 5 && y >= -3);
    }

    public static boolean validateR(double r){
        return (r <= 5 && r >= 2);
    }
    public static boolean validateGraphY(double y){
        return (y <= 6 && y >= -6);
    }

    public static boolean validateGraphX(double x){
        return (x <= 6 && x >= -6);
    }
}
