package org.example.classes;

public class Checker {

    public static boolean check(double x, double y, double r){
        if (x >= 0 && y >= 0){ // вп
            return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2);
        } else if (x <= 0 && y <= 0) { // нп
            return (y >= (-2 * x - r - (1e-10))) && (x >= -r/2.0) && (y >= -r);
        } else if (x <= 0 && y >= 0){ //вл
            return (y <= r / 2.0f && x <= r);
        } else if (x > 0 && y < 0){ //нл
            return false;
        } else{
            return false;
        }
    }
}