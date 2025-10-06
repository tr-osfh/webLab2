<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="org.example.classes.Result" %>
<%@ page import="org.example.classes.SessionStorage" %>
<%@ page import="java.util.ArrayList" %>
<html>
<style>
    <%@include file="style.css"%>
</style>
<head><title>ЛАБА ДВА</title>
    <meta charset="UTF-8">
</head>
<body>
<header style="text-align: center">
    <div class="header">
        <h1>Лабораторная работа НОМЕР ДэВэАа</h1>
        <h2>Красногорский Тимофей, Р3220 <br>Вариант какой Бог послал</h2>
    </div>
</header>

        <div class="table">
            <table cellspacing="4" cellpadding="15" width="100%">
                <caption>
                    <b>Результаты</b>
                </caption>
                <tr>
                    <th width="25%">Координата X</th>
                    <th width="25%">Координата Y</th>
                    <th width="25%">Параметр R</th>
                    <th width="25%">Факт попадания в область</th>
                </tr>
            </table>
            <table id="result_table" cellspacing="4" cellpadding="15" width="100%">
                <%ArrayList<Result> list = SessionStorage.getList();%>
                <%if(list != null && !list.isEmpty()) {
                    Result result = list.get(0);%>
                    <tr>
                        <td><%= result.getX() %></td>
                        <td><%= result.getY() %></td>
                        <td><%= result.getR() %></td>
                        <td><%= result.getValue() %></td>
                    </tr>
                <%}%>
            </table>
        <button type="button" class="back-btn" value="1" onclick="window.location.href='/labDVA/';">
            Гет бэк
        </button>
        </div>

<script src="script.js"></script>
<script src="link.js"></script>
</body>
</html>