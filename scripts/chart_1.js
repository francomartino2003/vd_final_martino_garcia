// Función para redondear la hora al entero inferior
function roundDownHour(time) {
  const [hour] = time.split(':');
  return hour.padStart(2, '0');
}

// Función para agrupar los datos en Maps
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

d3.dsv(';', 'data/gud2.csv', d3.autoType).then(data => {
  const groupedData = groupDataByHour(data);
  const xDomain = ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "01", "02", "03", "04", "05"];

  // Función para ordenar los datos según el dominio personalizado
  const sortByCustomDomain = (a, b) => {
    const indexA = xDomain.indexOf(a);
    const indexB = xDomain.indexOf(b);
    return indexA - indexB;
  };

  const sortedData = Array.from(groupedData).sort(([a], [b]) => sortByCustomDomain(a, b));

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

  const chart = Plot.plot({
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
      Plot.lineY(danceabilityData, { x: 'hour', y: 'danceability', stroke: 'purple' }),
      Plot.areaY(minMaxValence, {
        x: 'hour',
        y1: 'min',
        y2: 'max',
        fill: '#FFF3B0',
        fillOpacity: 0.3,
      }),
      Plot.lineY(valenceData, { x: 'hour', y: 'valence', stroke: 'yellow' }),
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

  console.log(chart);
  
  d3.select('#chart_1').append(() => chart);
});
