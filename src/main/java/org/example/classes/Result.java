package org.example.classes;

public record Result(float x, float y, float r, boolean value) {

    @Override
    public String toString(){
        return ("{\"x\":\"" + x + "\", " +
                "\"y\":\"" + y + "\", " +
                "\"r\":\"" + r + "\", " +
                "\"value\":\"" + value + "\"}");
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    public boolean getValue(){
        return value;
    }
}
