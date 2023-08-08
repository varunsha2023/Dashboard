// Simulate IoT data
const simulateData = () => {
    const temperatureValue = Math.random() * 50; // Random value between 0 and 50
    const humidityValue = Math.random() * 100; // Random value between 0 and 100
    const onlineStatus = Math.random() < 0.8; // 80% chance of being online
  
    return {
      temperature: temperatureValue.toFixed(2),
      humidity: humidityValue.toFixed(2),
      online: onlineStatus,
    };
  };
  
  // Update dashboard with new data and update the graph
  const updateDashboard = () => {
    const data = simulateData();
    document.getElementById('temperature').innerText = data.temperature;
    document.getElementById('humidity').innerText = data.humidity;
    document.getElementById('device-status-text').innerText = data.online ? 'Online' : 'Offline';
    document.getElementById('device-status-text').style.color = data.online ? 'green' : 'red';
  
    updateGraph(data.temperature, data.humidity);
  };
  
  // Initialize the graph
  let graphData = {
    labels: [],
    datasets: [{
      label: 'Temperature (°C)',
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      data: [],
      fill: true,
    }, {
      label: 'Humidity (%)',
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      data: [],
      fill: true,
    }]
  };
  
  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  
  const ctx = document.getElementById('graph').getContext('1d');
  const lineChart = new Chart(ctx, {
    type: 'line',
    data: graphData,
    options: graphOptions,
  });
  
  // Function to update the graph with new data
  const updateGraph = (temperature, humidity) => {
    const timeNow = new Date().toLocaleTimeString();
    graphData.labels.push(timeNow);
    graphData.datasets[0].data.push(temperature);
    graphData.datasets[1].data.push(humidity);
  
    // Remove old data if the dataset is longer than 10 points
    if (graphData.labels.length > 10) {
      graphData.labels.shift();
      graphData.datasets[0].data.shift();
      graphData.datasets[1].data.shift();
    }
  
    lineChart.update();
  };
  
  // Refresh the dashboard every 3 seconds
  setInterval(updateDashboard, 3000);
  