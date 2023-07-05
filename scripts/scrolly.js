// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");
var dataChart;

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {

    $step = d3.select(response.element);

    $step.classed("is-active", true);

    const key = parseInt($step.attr("data-step"));

    const horario = parseInt($step.attr("horario"));

    let img = figure.select("img");
    let backgroundColor;
    let fontColor;
    switch (horario) {
        case 1:
            backgroundColor = "#FEDCBA"; // Amanecer
            fontColor = "#000000";
            img.attr("src","img/spotify_morning.png");
            break;
        case 2:
            backgroundColor = "#FFFFFF"; // Mediodía
            fontColor = "#000000"
            img.attr("src","img/spotify_day.png")
            break;
        case 3:
            backgroundColor = "#000000"; // Noche
            fontColor = "#FFFFFF"
            img.attr("src","img/spotify_night.png")
            break;
    }

    // Actualiza el color de fondo del body, article y figure
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = fontColor;
    createChart(key);
}

function handleStepExit(response) {
    if (response.index === 0) {
        // Restablecer el color de fondo original
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#ffffff";
    }
    //podria hacer que se vaya antes
    d3.select(response.element).classed("is-active", false);
}

function handleStepProgress(response) {
    // console.log(response);
    // $figure.style("opacity", response.progress);
    // $step = d3.select(response.element);
    // console.log($step.attr("data-step"));
    step.select(".progress").text(d3.format(".1%")(response.progress));
  }

function init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit)
        .onStepProgress(handleStepProgress);

        
}

// kick things off
// fetch data
d3.dsv(';', "./data/procesado1.csv", d3.autoType).then(function (data) {
    dataChart = data;
    // kick things off
    init();
});


//funciones ima
function roundDownHour(time) {
    const [hour] = time.split(':');
    return hour.padStart(2, '0');
}

function groupDataByHour(csvData) {
    const dataMap = new Map();

    csvData.forEach(({ endTime, valence, danceability }) => {
        const timePart = endTime.split(' ')[1];
        const hour = roundDownHour(timePart.split(':')[0]);

        const key = `${hour}`;

        if (danceability !== "M" && valence !== "M") {
            if (dataMap.has(key)) {
                const hourData = dataMap.get(key);
                hourData.valences.push(parseFloat(valence));
                hourData.danceabilities.push(parseFloat(danceability));
            } else {
                dataMap.set(key, {
                    valences: [parseFloat(valence)],
                    danceabilities: [parseFloat(danceability)]
                });
            }
        }
    });

    dataMap.forEach((value, key) => {
        const valenceSum = value.valences.reduce((sum, valence) => sum + valence, 0);
        const danceabilitySum = value.danceabilities.reduce((sum, danceability) => sum + danceability, 0);
        const count = value.valences.length;

        value.valence = valenceSum / count;
        value.danceability = danceabilitySum / count;

        value.valenceMin = Math.min(...value.valences);
        value.valenceMax = Math.max(...value.valences);
        value.danceabilityMin = Math.min(...value.danceabilities);
        value.danceabilityMax = Math.max(...value.danceabilities);

        delete value.valences;
        delete value.danceabilities;
    });

    return dataMap;
}



/*data viz*/
function createChart(key) {
    d3.select("#scrolly figure svg").remove();
    if (key != 0) {
        let data = dataChart;
        const groupedData = groupDataByHour(data);
        
        let xDomain = ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "01", "02", "03", "04", "05"];
        // Función para ordenar los datos según el dominio personalizado
        const sortByCustomDomain = (a, b) => {
            const indexA = xDomain.indexOf(a);
            const indexB = xDomain.indexOf(b);
            return indexA - indexB;
        };
        let sortedData = Array.from(groupedData).sort(([a], [b]) => sortByCustomDomain(a, b));
        sortedData = sortedData.slice(0,key);
        xDomain = xDomain.slice(0,key);
        const valenceData = sortedData.map(([hour, value]) => ({ hour, valence: value.valence }));
        const danceabilityData = sortedData.map(([hour, value]) => ({ hour, danceability: value.danceability }));

        const minMaxDanceability = sortedData.map(([hour, value]) => ({
            hour,
            min: value.danceabilityMin,
            max: value.danceabilityMax,
        }));

        const minMaxValence = sortedData.map(([hour, value]) => ({
            hour,
            min: value.valenceMin,
            max: value.valenceMax,
        }));

        let ancho = 1000;

        console.log(valenceData);

        const chart = Plot.plot({
            width: ancho,
            style: {
                backgroundColor: 'rgba(0, 0, 0, 0)', // Color de fondo transparente
            },
            marks: [
                Plot.areaY(minMaxDanceability, {
                    x: 'hour',
                    y1: 'min',
                    y2: 'max',
                    fill: '#950474',
                    fillOpacity: 0.3,
                }),
                
                
                Plot.areaY(minMaxValence, {
                    x: 'hour',
                    y1: 'min',
                    y2: 'max',
                    fill: '#FFF3B0',
                    fillOpacity: 0.3,
                }),
                Plot.lineY(danceabilityData, { x: 'hour', y: 'danceability', stroke: 'purple',strokeWidth: 3 }),
                Plot.lineY(valenceData, { x: 'hour', y: 'valence', stroke: 'orange',strokeWidth: 3 }),
                Plot.text([{hour: '07', danceability: 0.3928372093023256}], {
                    x: 'hour',
                    y: 'danceability',
                    text: d => 'Energia', // Aquí puedes reemplazar 'Texto debajo de la línea' con el texto que deseas mostrar
                    dy: -18,
                    fontSize: '16px',
                    fill: 'purple',
                    fontWeight: 'bold'
                  }),
                Plot.text([{hour: '07', valence: 0.3204883720930233}], {
                    x: 'hour',
                    y: 'valence',
                    text: d => 'Felicidad', // Aquí puedes reemplazar 'Texto debajo de la línea' con el texto que deseas mostrar
                    dy: 18,
                    fontSize: '16px',
                    fill: 'orange',
                    fontWeight: 'bold'
                  }),
            ],
            x: {
                domain: xDomain,
                tickFormat: 'd',
            },
            y: {
                grid: true,
            },
            line: true,
        });
        d3.select("#scrolly figure").append(() => chart);
    }
}