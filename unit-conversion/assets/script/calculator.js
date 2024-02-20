function convertUnits() {
    var FromValue = document.getElementById('FromValue').value;
    var FromUnit = document.getElementById('FromUnit').value;
    var ToUnit = document.getElementById('ToUnit').value;

    // AJAX call to unitsconversion.php
    $.ajax({
        url: 'https://brucebauer.info/assets/ITEC3650/unitsconversion.php',
        type: 'GET',
        data: {
            FromValue: FromValue,
            FromUnit: FromUnit,
            ToUnit: ToUnit
        },
        success: function (response) {
            // Display the result in the Result span
            document.getElementById('Result').innerText = response;
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function clearform() {
    // Clear all inputs, error messages, and results
    document.getElementById('FromValue').value = '';
    document.getElementById('FromUnit').value = '';
    document.getElementById('ToUnit').value = '';
    document.getElementById('Result').innerText = '';
    document.getElementById('FromValueMsg').innerText = '';
    document.getElementById('FromUnitMsg').innerText = '';
    document.getElementById('ToUnitMsg').innerText = '';
}
