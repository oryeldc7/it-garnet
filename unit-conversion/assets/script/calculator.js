function calculate() {
    if ($("#myform").valid()) {
        var fromValue = $("#FromValue").val();
        var fromUnits = $("input[name='FromUnit']:checked").map(function() { return this.value; }).get();
        var toUnits = $("input[name='ToUnit']:checked").map(function() { return this.value; }).get();
        var url = "https://brucebauer.info/assets/ITEC3650/unitsconversion.php";
        var data = {
            FromValue: fromValue,
            FromUnit: fromUnits.join(","),
            ToUnit: toUnits.join(",")
        };

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response) {
                $("#Result").text(response);
            },
            error: function(xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    }
}

function clearform() {
    $("#FromValue").val("");
    $("input[name='FromUnit']").prop("checked", false);
    $("input[name='ToUnit']").prop("checked", false);
    $("#Result").text("");
    $(".error").text("");
}
