package org.example;

import org.example.classes.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;


@WebServlet("/areaCheck")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try{
        BigDecimal x = (BigDecimal) req.getAttribute("x");
        BigDecimal y = (BigDecimal) req.getAttribute("y");
        BigDecimal r = (BigDecimal) req.getAttribute("r");
        String source = (String) req.getAttribute("source");


            if (source.equals("form")){
                if (Validator.validateX(x) && Validator.validateY(y) && Validator.validateR(r)) {
                    boolean value = Checker.check(x, y, r);
                    req.setAttribute("x", x);
                    req.setAttribute("y", y);
                    req.setAttribute("r", r);
                    req.setAttribute("value", value);

                    Result result = new Result(x, y, r, value);

                    SessionStorage.add(result, req.getSession());


                    var dispatcher = req.getRequestDispatcher("./result.jsp");
                    dispatcher.forward(req, resp);
                } else {
                    resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Нужно было ставить запятые");
                }
            } else if (source.equals("graph")) {
                if (Validator.validateR(r) && Validator.validateGraphX(x) && Validator.validateGraphY(y)){
                    boolean value = Checker.check(x, y, r);
                    req.setAttribute("x", x);
                    req.setAttribute("y", y);
                    req.setAttribute("r", r);
                    req.setAttribute("value", value);

                    Result result = new Result(x, y, r, value);

                    SessionStorage.add(result, req.getSession());

                    var dispatcher = req.getRequestDispatcher("./result.jsp");
                    dispatcher.forward(req, resp);
                }
            } else {
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Проблема с источником");
            }

        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
