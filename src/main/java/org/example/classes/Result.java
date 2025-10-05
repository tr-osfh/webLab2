package org.example.classes;

public record Result(float x, float y, float r, boolean result) {

    @Override
    public String toString(){
        return ("{\"x\":\"" + x + "\", " +
                "\"y\":\"" + y + "\", " +
                "\"r\":\"" + r + "\", " +
                "\"value\":\"" + result + "\"}");
    }
}
