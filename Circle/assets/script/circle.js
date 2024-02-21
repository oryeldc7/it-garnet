// circle_calculations.js

function calcDiameter(radius) {
    return 2 * radius;
}

function calcCircumference(radius) {
    return 2 * Math.PI * radius;
}

function calcArea(radius) {
    return Math.PI * radius * radius;
}

function clearForm() {
    document.getElementById('radius').value = '';
    document.getElementById('diameter').textContent = '';
    document.getElementById('circumference').textContent = '';
    document.getElementById('area').textContent = '';
    document.getElementById('radiuserror').textContent = '';
}

$(document).ready(function() {
    $("#CircleForm").validate();

    $('#btnSubmit').click(function(event) {
        event.preventDefault(); 
                
        var radiusStr = $('#radius').val();
        var radius = parseFloat(radiusStr);

        if (!isNaN(radius) && radius > 0) {
            var diameter = calcDiameter(radius);
            var circumference = calcCircumference(radius);
            var area = calcArea(radius);

            $('#diameter').text(diameter.toFixed(2));
            $('#circumference').text(circumference.toFixed(2));
            $('#area').text(area.toFixed(2));
        } else {
            $('#radiuserror').text('Invalid radius. Please enter a positive number.');
        }
    });

    $('#btnClear').click(function(event) {
        event.preventDefault(); 
        clearForm();
    });
});
