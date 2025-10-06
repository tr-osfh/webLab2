package org.example.classes;

public record Result(double x, double y, double r, boolean value) {

    @Override
    public String toString(){
        return ("{\"x\":\"" + x + "\", " +
                "\"y\":\"" + y + "\", " +
                "\"r\":\"" + r + "\", " +
                "\"value\":\"" + value + "\"}");
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getValue(){
        return value;
    }
}
