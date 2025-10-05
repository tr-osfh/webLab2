package org.example.classes;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.text.SimpleDateFormat;


public class SharedDo {
    public static void doHttp(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yy HH:mm:ss");

            float x = Float.parseFloat(req.getAttribute("x").toString());
            float y = Float.parseFloat(req.getAttribute("y").toString());
            float r = Float.parseFloat(req.getAttribute("r").toString());
            String source = req.getAttribute("source").toString();

            if (source.equals("form")){
                if (Validator.validateX(x) && Validator.validateY(y) && Validator.validateR(r)) {
                    Result result = new Result(x, y, r, Checker.check(x, y, r));

                    resp.setContentType("application/json");
                    PrintWriter out = resp.getWriter();
                    out.print(result);
                    out.flush();
                } else {
                    resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Нужно было ставить запятые");
                }
            } else if (source.equals("graph")) {
                if (Validator.validateR(r) && Validator.validateGraphX(x) && Validator.validateGraphY(y)){
                    Result result = new Result(x, y, r, Checker.check(x, y, r));

                    resp.setContentType("application/json");
                    PrintWriter out = resp.getWriter();
                    out.print(result);
                    out.flush();
                }
            } else {
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Проблема с источником");
            }

        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
