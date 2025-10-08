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

        let tableData = getTableData();

        drawPoints(tableData);
    }
}

function getTableData() {
    const table = document.getElementById("result_table");
    const rows = table.getElementsByTagName('tr');
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length >= 4) {
            data.push({
                x: parseFloat(cells[0].textContent),
                y: parseFloat(cells[1].textContent),
                r: parseFloat(cells[2].textContent),
                value: cells[3].textContent.trim().toLowerCase() === 'true'
            });
        }
    }

    return data;
}

function drawPoint(x, y, r, hit, isActiveR) {
    let svgPointX = (parseFloat(x) * 100 / r) + 200;
    let svgPointY = 200 - (parseFloat(y) * 100 / r);
    let svg = document.getElementById("graph");
    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", svgPointX.toString());
    dot.setAttribute("cy", svgPointY.toString());
    dot.setAttribute("r", "4");
    if (isActiveR) {
        dot.setAttribute("fill", hit ? "green" : "red");
    } else {
        dot.setAttribute("fill", "grey");
    }

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
        if (point.r == r){
            drawPoint(point.x, point.y, r, point.value, true);
        } else {
            drawPoint(point.x, point.y, r, point.value, false);
        }
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
    let availableX = possibles;

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
    if (x === "") {
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

    formError.textContent = "";
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
    let valr = validateText(r, 2, 5);
    const formError = document.getElementById("form-error");
    if (valr === "0"){
        let userPointX = (((svgPoint.x - 200) / 100 * r.value).toFixed(2));
        let userPointY = (((200 - svgPoint.y) / 100 * r.value).toFixed(2));
        console.log(`Координаты на плоскости: x=${userPointX}, y=${userPointY}, Координаты в svg: (${svgPoint.x.toFixed(2)}, ${svgPoint.y.toFixed(2)}), r = ${r.value}`);
        sendFromGraph(userPointX, userPointY, r.value);
        formError.style.display = "none";
        formError.textContent = "";
    } else if (valr === "1") {
        formError.textContent = "Выберите значение R!"
        formError.style.display = "block";
    } else {
        formError.textContent = "Недопустимое значение для R!"
        formError.style.display = "block";
    }

})


document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".r-button").forEach((button) => {
      button.addEventListener("click", function() {
          rSelection(this);
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

  if (getCookie("r") !== undefined) {
      document.getElementById(rId).value = getCookie("r");
      changeR();
  }

  document.querySelectorAll('input[name="text-r"]').forEach(checkbox => {
      checkbox.addEventListener("change", function () {
          const formError = document.getElementById("form-error");
          let val = validateText(document.getElementById(rId), 2, 5);
          if (val === "0"){
              formError.style.display = "none";
              setCookie("r", document.getElementById(rId).value, 30);
              changeR();
          } else if (val === "1") {
              formError.textContent = "Выберите значение R!"
              formError.style.display = "block";
          } else {
              formError.textContent = "Недопустимое значение для R!"
              formError.style.display = "block";
          }
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
    .querySelector('input[type="reset"]')
    .addEventListener("click", resetForm);

});

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
    return false;
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

























function send(x, y, r) {
    start = performance.now();

    fetch(
        `proxy.php?x=${x.value}&y=${y.value}&r=${r.value}&source=form`, {
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
    });
}

function sendFromGraph(x, y, r) {
   start = performance.now();
   const data = JSON.stringify({x, y, r});

   console.log(data);
   fetch(
       `proxy.php?x=${x}&y=${y}&r=${r}&source=graph`,
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
