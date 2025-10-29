package org.example;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.classes.OutOfRangeException;
import org.example.classes.Validator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Map;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String x = req.getParameter("x");
        String y = req.getParameter("y");
        String r = req.getParameter("r");
        String source = req.getParameter("source");

        if (x == null || y == null || r == null) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing required parameters: x, y, r");
            return;
        }

        req.setAttribute("x", x);
        req.setAttribute("y", y);
        req.setAttribute("r", r);
        req.setAttribute("source", source);

        req.getRequestDispatcher("/areaCheck").forward(req, resp);
    }
}
