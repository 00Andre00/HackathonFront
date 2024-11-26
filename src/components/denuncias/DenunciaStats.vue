<template>
    <div>
      <h3>Estadísticas de Denuncias</h3>
      <canvas id="denunciaStats"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    mounted() {
      const ctx = document.getElementById('denunciaStats').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Admitido', 'No Admitido', 'En proceso'],
          datasets: [
            {
              label: 'Cantidad de Denuncias',
              data: [12, 5, 8], // Simula los datos
            },
          ],
        },
      });
    },
  };
  </script>
  