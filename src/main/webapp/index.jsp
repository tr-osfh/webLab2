<%@page contentType="text/html; charset=UTF-8" %>
<html>
<style>
    <%@include file="style.css" %>
</style>
<head><title>ЛАБА ДВА</title>
    <meta charset="UTF-8">
</head>
<body>
<table cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <th colspan="3">
            <div class="header">
                <h1>Лабораторная работа НОМЕР ДэВэАа</h1>
                <h2>Красногорский Тимофей, Р3220 <br>Вариант какой Бог послал</h2>
            </div>
        </th>
    </tr>

    <th>
    <td width="30%" style="vertical-align: top; padding: 20px;">
        <div class="graph" id="area">
            <svg width="400" height="400" id="graph">


                <ellipse  cx="200" cy="200" rx="100" ry="100" style="fill:blue;fill-opacity:0.1" />
                <polygon points="200,200 200,0 0,0 0,400 400,400 400,200" style="fill:white" />
                <rect x="200" y="200" width="100" height="50" style="fill:blue;fill-opacity:0.1" />
                <polygon points="200,200 200,100 100,200" style="fill:blue;fill-opacity:0.1" />

                <text x="133" y="190" class="graph-minus-r-2">-R/2</text>
                <text x="300" y="190" class="graph-r">R</text>
                <text x="240" y="190" class="graph-r-2">R/2</text>
                <text x="90" y="190" class="graph-minus-r">-R</text>

                <text x="210" y="155" class="graph-r-2">R/2</text>
                <text x="210" y="305" class="graph-minus-r">-R</text>
                <text x="210" y="253" class="graph-minus-r-2">-R/2</text>
                <text x="210" y="90" class="graph-r">R</text>

                <text x="210" y="50">y</text>
                <text x="350" y="190">x</text>



                <!-- Оси -->
                <line x1="200" y1="50" x2="200" y2="350" stroke="black" />
                <line x1="50" y1="200" x2="350" y2="200" stroke="black" />

                <line x1="350" y1="200" x2="330" y2="205" stroke="black" />
                <line x1="350" y1="200" x2="330" y2="195" stroke="black" />

                <line x1="200" y1="50" x2="195" y2="70" stroke="black" />
                <line x1="200" y1="50" x2="205" y2="70" stroke="black" />


                <!-- Rx -->
                <line x1="100" y1="195" x2="100" y2="205" stroke="black" />
                <line x1="300" y1="195" x2="300" y2="205" stroke="black" />

                <!-- R/2x -->
                <line x1="150" y1="195" x2="150" y2="205" stroke="black" />
                <line x1="250" y1="195" x2="250" y2="205" stroke="black" />

                <!-- Ry -->
                <line x1="195" y1="100" x2="205" y2="100" stroke="black" />
                <line x1="195" y1="300" x2="205" y2="300" stroke="black" />

                <!-- R/2y -->
                <line x1="195" y1="150" x2="205" y2="150" stroke="black" />
                <line x1="195" y1="250" x2="205" y2="250" stroke="black" />
            </svg>
        </div>

        <input type="hidden" id="selected-x" name="x">
        <input type="hidden" id="selected-y" name="r">
        <input type="hidden" id="selected-r" name="r">

        <div id="form-error" class="form-error" style="display: none;"></div>

        <form id="coordinates">
            <div class="user-input">
                <label>Координата X:</label>
                <div>
                    <input type="text" maxlength="10" id="text-x" name="x" placeholder="-3...3">
                    <div id="x-error" class="error-message"></div>
                </div>
            </div>

<!--
            <div class="user-input">
                <label>Координата Y:</label>
                <div>
                    <input type="text" maxlength="10" id="text-y" name="y" placeholder="-3...3">
                    <div id="y-error" class="error-message"></div>
                </div>
            </div>
-->
<!--
            <div class="user-input">
                <label>Координата Y (radio):</label>
                <div id="y-radio-buttons">
                    <label><input type="radio" name="radio-y" value="1">1</label>
                    <label><input type="radio" name="radio-y" value="2">2</label>
                    <label><input type="radio" name="radio-y" value="3">3</label>
                </div>
                <div id="y-radio-error" class="error-message"></div>
            </div>
-->
            <div class="user-input">
                <label>Выберите Y (checkbox)</label>
                <label><input type="checkbox" name="checkbox-y" value="1">1</label>
                <label><input type="checkbox" name="checkbox-y" value="2">2</label>
                <label><input type="checkbox" name="checkbox-y" value="3">3</label>
            </div>


            <div class="user-input">
                <label>Параметр R:</label>
                <table id="r-buttons" class="buttons">
                    <tr>
                        <th><button type="button" class="r-button" value="1">1</button></th>
                        <th><button type="button" class="r-button" value="2">2</button></th>
                        <th><button type="button" class="r-button" value="3">3</button></th>
                        <th><button type="button" class="r-button" value="4">4</button></th>
                        <th><button type="button" class="r-button" value="5">5</button></th>
                    </tr>
                </table>
            </div>



            <div class="user-input">
                <input type="submit" class="data-button" value="Отправить данные">
                <input type="reset" class="data-button" value="Сбросить данные">
            </div>
        </form>
    </td>
    </th>

    <td width="70%" style="vertical-align: top; padding: 20px;">
        <input type="button" id="deleteCookiesBtn" class="deleteBtn" value="Сбросить таблицу">
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
            </table>
        </div>
    </td>
</table>


<script src="script.js"></script>
<script src="link.js"></script>
</body>
</html>