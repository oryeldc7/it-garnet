function getResults() {
    const formElements = ["baseCurrency", "toCurrency", "FromDate", "ToDate"];
    let isValid = true;

    formElements.forEach(element => {
        const value = document.getElementById(element).value;
        const errorElement = document.getElementById(element + "Error");

        if (!value) {
            errorElement.innerHTML = element === "baseCurrency" ? "Base Currency is required" : 
                                      element === "toCurrency" ? "Convert to Currency is required" :
                                      element === "FromDate" ? "From Date is required" :
                                      "To Date is required";
            isValid = false;
        } else {
            errorElement.innerHTML = "";
        }
    });

    if (!isValid) {
        return;
    }

    const baseCurrency = document.getElementById("baseCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const fromDate = document.getElementById("FromDate").value;
    const toDate = document.getElementById("ToDate").value;
    const apiKey = "ZrkD1AzCKvZPK2_UfAHBQ7pBq3rO8OsW";
    const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${baseCurrency}${toCurrency}/range/1/day/${fromDate}/${toDate}?apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK" && data.results && data.results.length > 0) {
                const results = data.results;
                const labels = results.map(result => result.t);
                const values = results.map(result => result.c);
                renderChart(labels, values);
            } else {
                throw new Error("Failed to fetch currency value history.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching currency value history. Please try again.");
        });
}

function renderChart(labels, values) {
    const ctx = document.getElementById("chartjs-0").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Currency Value History",
                    data: values,
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.1)",
                    fill: true,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        type: "time",
                        time: {
                            unit: "day",
                        },
                    },
                ],
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Currency Value",
                        },
                    },
                ],
            },
        },
    });
}

function clearForm() {
    document.getElementById("myform").reset();
    const errorElements = ["baseCurrencyError", "toCurrencyError", "FromDateError", "ToDateError"];
    errorElements.forEach(element => {
        document.getElementById(element).innerHTML = "";
    });
}

window.onload = function () {
    document.getElementById("showResults").onclick = getResults;
    document.getElementById("clear").onclick = clearForm;
};
