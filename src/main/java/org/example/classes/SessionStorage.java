package org.example.classes;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;

public class SessionStorage {

    private static ArrayList<Result> storage = new ArrayList<>();

    public static void add(Result result, HttpSession session){
        storage.add(0, result);
        session.setAttribute("savedResults", storage);
    }

    public static Result receive(){
        return storage.get(0);
    }

    public static ArrayList<Result> getList(){
        return storage;
    }

    public static void clear(HttpSession session) {
        storage.clear();
        session.setAttribute("savedResults", storage);
    }
}
