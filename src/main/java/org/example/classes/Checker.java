package org.example.classes;

public class Checker {

    public static boolean check(float x, float y, float r){
        if (x >= 0 && y >= 0){ // вп
            return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2);
        } else if (x <= 0 && y <= 0) { // нп
            return ((Math.round(y * 100.0) / 100.0) ==  Math.round((-2 * x - r) * 100.0) / 100.0);
        } else if (x <= 0 && y >= 0){ //вл
            return (y <= r / 2.0f && x <= r);
        } else if (x >= 0 && y <= 0){ //нл
            return false;
        } else{
            return false;
        }
    }
}
