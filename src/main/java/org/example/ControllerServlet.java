package org.example;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");

        try {
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            try (BufferedReader reader = req.getReader()) {
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line);
                }
            }

            String jsonString = stringBuilder.toString();
            ObjectMapper mapper = new ObjectMapper();

            Map<String, Object> jsonMap = mapper.readValue(jsonString, Map.class);

            String x = jsonMap.get("x") != null ? jsonMap.get("x").toString() : null;
            String y = jsonMap.get("y") != null ? jsonMap.get("y").toString() : null;
            String r = jsonMap.get("r") != null ? jsonMap.get("r").toString() : null;
            String source = jsonMap.get("source") != null ? jsonMap.get("source").toString() : null;

            if (x == null || y == null || r == null || source == null) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST,
                        "Missing required parameters in JSON. Received: " + jsonString);
                return;
            }

            req.setAttribute("x", x);
            req.setAttribute("y", y);
            req.setAttribute("r", r);
            req.setAttribute("source", source);

            req.getRequestDispatcher("/areaCheck").forward(req, resp);

        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JSON format: " + e.getMessage());
        }
    }

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
