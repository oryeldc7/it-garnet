function calculate() {
    
    /* Make sure that the form is valid */
    if ($( "#myform" ).valid()) {
        
        /* get the operands from the form */
        var operand1 = document.getElementById("Operand1").value;
        var operand2 = document.getElementById("Operand2").value;
       
        
        /* convert the operands from string to floating point */
        var operand1fp = parseFloat (operand1);
        var operand2fp = parseFloat (operand2);
        
        
        /* figure out which operator was checked and place the value in operator */
        if (document.getElementById("AddSign").checked) {
            var result = operand1fp + operand2fp;
            document.getElementById ("Result").innerHTML=result;
        }
        if (document.getElementById("SubtractSign").checked) {
            var result = operand1fp - operand2fp;
            document.getElementById ("Result").innerHTML=result;
        }
        if (document.getElementById("MultiplySign").checked) {
            var result = operand1fp * operand2fp;
            document.getElementById ("Result").innerHTML=result;
        }
        if (document.getElementById("DivideSign").checked) {
            var result = operand1fp / operand2fp;
            document.getElementById ("Result").innerHTML=result;
        }


    }
}

function clearform() {
    
    /* Set all of the form values to blank or false */
    document.getElementById("Operand1").value = "";
    document.getElementById("Operand2").value = "";
    document.getElementById("Operand1Error").innerHTML = "";
    document.getElementById("Operand2Error").innerHTML = "";
    document.getElementById("AddSign").checked = false;
    document.getElementById("SubtractSign").checked = false;
    document.getElementById("MultiplySign").checked = false;
    document.getElementById("DivideSign").checked = false;
    document.getElementById("OperatorError").innerHTML = "";
    document.getElementById("Result").innerHTML = "";
}

/* Form Validation */
$( "#myform" ).validate({
 
});