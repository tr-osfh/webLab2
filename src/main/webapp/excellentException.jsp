<%@page contentType="text/html; charset=UTF-8" %>
<%@page isErrorPage="true" %>
<html>
<style>
    <%@include file="style.css" %>
</style>
<head><title>ЛАБА ДВА</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>ОШИБКА!</h1>
    <h3>Stack trace: <%= exception.getMessage() %></h3>
</body>
</html>


