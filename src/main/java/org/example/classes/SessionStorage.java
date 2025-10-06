package org.example.classes;

import java.util.ArrayList;

public class SessionStorage {

    private static ArrayList<Result> storage = new ArrayList<>();

    public static void add(Result result){
        storage.add(0, result);
    }

    public static Result receive(){
        return storage.get(0);
    }

    public static ArrayList<Result> getList(){
        return storage;
    }
}
