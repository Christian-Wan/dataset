const ctx = document.getElementById('myChart');
let graphData = new Map
let xLabels = []
let graphValues = [0]
async function getData() {
    const response = await fetch("shopping_trends.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    rows.forEach((elem) => {
        const row = elem.split(",");
        const label = row[3];
        if (Array.from(graphData.keys()).includes(label)) {
            graphData.set(label, graphData.get(label) + 1)
        }
        else {
            graphData.set(label, 1)
        }
    });
    console.log(graphData)
    for (let key of graphData.keys()) {
        xLabels.push(key)
    }
    for (let value of graphData.values()) {
        graphValues.push(value)
    }
    xLabels.pop()
    graphValues.pop()
    graphValues.splice(0, 1)
    console.log(xLabels)
    console.log(graphValues)
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xLabels,
            datasets: [{
                label: '# of Votes',
                data: graphValues,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
getData()
