const xId = "text-x";
const yId = "text-y";
const rId = "text-r";



function changeR(){
    if (document.getElementById(rId).value !== "") {
        const rValue = document.getElementById(rId).value;

        document.querySelectorAll(".graph-r").forEach((sign) => {
            sign.textContent = rValue;
        });
        document.querySelectorAll(".graph-r-2").forEach((sign) => {
            sign.textContent = (rValue / 2).toString();
        });
        document.querySelectorAll(".graph-minus-r").forEach((sign) => {
            sign.textContent = "-" + rValue;
        });
        document.querySelectorAll(".graph-minus-r-2").forEach((sign) => {
            sign.textContent = "-" + (rValue / 2).toString();
        });
    }
}

function drawPoint(x, y, r, hit) {
    let svgPointX = (parseFloat(x) * 100 / r) + 200;
    let svgPointY = 200 - (parseFloat(y) * 100 / r);
    let svg = document.getElementById("graph");
    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", svgPointX.toString());
    dot.setAttribute("cy", svgPointY.toString());
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", hit === "true" ? "green" : "red");
    svg.appendChild(dot);
}

function drawPoints(points) {
    console.log('drawing')
    let r = document.getElementById(rId).value;
    if (r === "") r = 3;

    const svg = document.getElementById("graph");
    const oldPoints = svg.querySelectorAll("circle");
    oldPoints.forEach(point => point.remove());

    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        drawPoint(point.x, point.y, r, point.value);
    }
}

function resetForm() {
  document.querySelectorAll(".x-button, .y-button, .r-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById("selected-x").value = "";
  document.getElementById("selected-y").value = "";
  document.getElementById("selected-r").value = "";

  const xInput = document.getElementById("text-x");
  xInput.value = "";
  xInput.classList.remove("error");

  const yInput = document.getElementById("text-y");
  yInput.value = "";
  yInput.classList.remove("error");

  //const rInput = document.getElementById("text-r");
  //rInput.value = "";
  //rInput.classList.remove("error");

  const yError = document.getElementById("y-error");
  if (yError) {
    yError.textContent = "";
  }


  const formError = document.getElementById("form-error");
  if (formError) {
    formError.textContent = "";
    formError.style.display = "none";
  }
  //const xButtons = document.getElementById("x-buttons");
  //const yButtons = document.getElementById("x-buttons");
  const rButtons = document.getElementById("r-buttons");
  //if (xButtons) xButtons.classList.remove("error");
  //if (yButtons) xButtons.classList.remove("error");
  if (rButtons) rButtons.classList.remove("error");

}


function validateBtn(element, possibles){
    let x = element.value;
    let availableX = possibles; // строки

    if (isNaN(x) || x === "" || x == undefined) {
        return "1"; // Выбирите значение
    } else if (availableX.includes(x)) {
        return "0";// все хорошо
    } else {
        return "2"; // недопустимое значение
    }
}

function validateText(element, inf, sup){
    let x = element.value;
    if (isNaN(x) || x === "") {
        return "1"; // Выбирите значение
    } else if (inf <= x && x <= sup) {
        return "0"; // все хорошо
    } else {
        return "2"; // недопустимое значение
    }
}

function validateRadio(element, possibles) {
    let x = element.value;
    let availableX = possibles;

    if (isNaN(x) || x === "" || x == undefined) {
        return "1"; // Выбирите значение
    } else if (availableX.includes(x)) {
        return "0";// все хорошо
    } else {
        return "2"; // недопустимое значение
    }
}

function validateCheckbox(element, possibles){
    let x = element.value;

    if (x === "" || x == undefined) {
        return "1"; // Выберите значение
    }

    const selectedValues = x.split(',').filter(val => val !== '');

    const invalidValues = selectedValues.filter(val => !possibles.includes(val));

    if (invalidValues.length > 0) {
        return "2"; // Недопустимое значение
    } else {
        return "0"; // Все хорошо
    }
}


function validate(event) {
    const formError = document.getElementById("form-error");

    formError.textContent = ""; // Очищаем предыдущие ошибки
    formError.style.display = "none";

    let x = document.getElementById(xId);
    let y = document.getElementById(yId);
    let r = document.getElementById(rId);

    let validCodeX = ["X", validateText(x, -3, 5)];
    let validCodeY = ["Y", validateText(y, -3, 5)];
    let validCodeR = ["R", validateText(r, 2, 5)];

    let hasErrors = false;
    let errorMessages = [];

    let codes = [validCodeX, validCodeY, validCodeR];

    for (let code of codes){
        if (code[1] === "1"){
            errorMessages.push(`Выберите значение ${code[0]}!`);
            hasErrors = true;
        } else if (code[1] === "2"){
            errorMessages.push(`Недопустимое значение ${code[0]}!`);
            hasErrors = true;
        }
    }

    if (hasErrors) {
        formError.textContent = errorMessages.join('\n');
        formError.style.display = "block";
        return false;
    }

    return true;
}

let start = performance.now();


document.getElementById("area").addEventListener("click", function (e) {
    const point = document.getElementById("graph").createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;

    const svgPoint = point.matrixTransform(document.getElementById('graph').getScreenCTM().inverse());
    let r = document.getElementById(rId);
    if (r.value !== ""){
        let userPointX = (((svgPoint.x - 200) / 100 * r.value).toFixed(2));
        let userPointY = (((200 - svgPoint.y) / 100 * r.value).toFixed(2));
        console.log(`Координаты на плоскости: x=${userPointX}, y=${userPointY}, Координаты в svg: (${svgPoint.x.toFixed(2)}, ${svgPoint.y.toFixed(2)}), r = ${r.value}`);
        sendFromGraph(userPointX, userPointY, r.value);
    } else {
        const formError = document.getElementById("form-error");
        if (formError) {
            formError.textContent = "";
            formError.style.display = "none";
        }
        formError.style.display = "block";
        formError.textContent = "Выбеrите паrаметr Rэ!";
    }

})

document.addEventListener("DOMContentLoaded", function () {
  //document.querySelectorAll(".x-button").forEach((button) => {
  //  button.addEventListener("click", function () {
  //    xSelection(this);
  //  });
  //});

  //document.querySelectorAll(".y-button").forEach((button) => {
  //    button.addEventListener("click", function () {
  //        ySelection(this);
  //    });
  //});

  document.getElementById(rId).addEventListener("change", function() {
      const tableData = getCookie(COOKIE_KEY);
      if (tableData && tableData.length > 0) {
          drawPoints(tableData);
      }
      changeR();


  });

  document.querySelectorAll(".r-button").forEach((button) => {
      button.addEventListener("click", function() {
          rSelection(this);
          // Перерисовываем точки после выбора R
          const tableData = getCookie(COOKIE_KEY);
          if (tableData && tableData.length > 0) {
              drawPoints(tableData);
          }
      });
  });

  document.querySelectorAll('input[name="radio-y"]').forEach(radio => {
      radio.addEventListener('change', function() {
          yRadioSelection(this);
      });
  });

  document.querySelectorAll('input[name="checkbox-y"]').forEach(checkbox => {
      checkbox.addEventListener("change", function () {
          yCheckBoxSelection(this);
      })
  })

  document
    .getElementById("coordinates")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (validate(event)) {
        send(
         document.getElementById(xId),
         document.getElementById(yId),
         document.getElementById(rId)
        );
      }

      validate(event);
    });

    document
        .getElementById("deleteCookiesBtn")
        .addEventListener("click", function (event) {
            event.preventDefault();
            deleteCookie(COOKIE_KEY);
            document.getElementById("result_table").innerHTML = "";
        });

  document
    .querySelector('input[type="reset"]')
    .addEventListener("click", resetForm);

    loadTableFromCookie();
});

























function send(x, y, r) {
    start = performance.now();

    fetch(
        `http://localhost:13121/labDVA/controller?x=${x.value}&y=${y.value.replace(/,/g, ".")}&r=${r.value}&source=form`, {
        method: "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then((html) => {
        console.log("HTML response received");
        document.documentElement.innerHTML = html;
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Ошибка при получении данных");
    });
}

function sendFromGraph(x, y, r) {
   start = performance.now();
   const data = JSON.stringify({x, y, r});

   console.log(data);
   fetch(
       `http://localhost:13121/labDVA/controller?x=${x}&y=${y}&r=${r}&source=graph`,
       {
           mode: "cors",
           method: "GET",
       }
   ).then((response) => {
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }
       return response.text();
   })
       .then((html) => {
           console.log("HTML response received");
           document.documentElement.innerHTML = html;
       })
       .catch((error) => {
           console.error("Error:", error);
           alert("Ошибка при получении данных");
       });
}

function showResponse(response) {
  const resultTable = document.getElementById("result_table");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
        <td width="25%">${response.x}</td>
        <td width="25%">${response.y}</td>
        <td width="25%">${response.r}</td>
        <td width="25%">${response.value}</td>
    `

    if (resultTable.firstChild) {
        resultTable.insertBefore(newRow, resultTable.firstChild);
    } else {
        resultTable.appendChild(newRow);
    }

    saveTableToCookie();

    drawPoint(response.x, response.y, response.r, response.value);
}


function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            const cookieValue = c.substring(nameEQ.length, c.length);
            try {
                return JSON.parse(decodeURIComponent(cookieValue));
            } catch (e) {
                console.error("Error parsing cookie:", e);
                return [];
            }
        }
    }
    return [];
}



function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/";
}


function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

}


const COOKIE_KEY = 'savedResults';


function saveTableToCookie() {
    const resultTable = document.getElementById("result_table");
    const rows = resultTable.querySelectorAll("tr");
    const tableData = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll("td");
        if (cells.length === 4) {
            tableData.push({
                x: cells[0].textContent,
                y: cells[1].textContent,
                r: cells[2].textContent,
                value: cells[3].textContent
            });
        }
    }

    setCookie(COOKIE_KEY, tableData, 30);
    console.log('Таблица сохранена в куки');
}



function loadTableFromCookie() {
    const tableData = getCookie(COOKIE_KEY);

    if (tableData && tableData.length > 0) {
        const resultTable = document.getElementById("result_table");

        while (resultTable.rows.length > 1) {
            resultTable.deleteRow(1);
        }

        tableData.forEach(rowData => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td width="15%">${rowData.x}</td>
                <td width="15%">${rowData.y}</td>
                <td width="10%">${rowData.r}</td>
                <td width="20%">${rowData.value}</td>
            `;
            resultTable.appendChild(newRow);
        });

        console.log('Таблица загружена из куки:', tableData.length, 'строк');

        drawPoints(tableData);
    }
}
