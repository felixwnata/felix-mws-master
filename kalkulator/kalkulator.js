function validate(fnumber, snumber, action) {
  if (fnumber == "") {
    alert("First number cannot be empty");
    document.getElementById("txtFNumber").focus();
    return false;
  } else if (!isNaN(fnumber) == false) {
    alert("First number must be number");
    document.getElementById("txtFNumber").focus();
    return false;
  } else if (snumber == "") {
    alert("Second number cannot be empty");
    document.getElementById("txtSNumber").focus();
    return false;
  } else if (!isNaN(snumber) == false) {
    alert("Second number must be number");
    document.getElementById("txtSNumber").focus();
    return false;
  } else if (action == "") {
    alert("Please choose action !!!");
    return false;
  } else return true;
}

function changeaction(n) {
  document.getElementById("txtAction").value = n.value;
}

function calculate() {
  FNumber = document.getElementById("txtFNumber").value;
  SNumber = document.getElementById("txtSNumber").value;
  action = document.getElementById("txtAction").value;

  if (validate(FNumber, SNumber, action) == true) {
    Res = FNumber + action + SNumber;
    document.getElementById("txtResult").value = eval(Res);
    document.getElementById("txtResult").focus();
  }
}

function clearing() {
  document.getElementById("txtFNumber").value = "";
  document.getElementById("txtSNumber").value = "";
  document.getElementById("txtAction").value = "";
  document.getElementById("txtResult").value = "";
}
