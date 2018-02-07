<template>
  <v-layout row wrap>
    <v-flex md4 sm12>
      <line-chart :chart-data="monthlyChart"></line-chart>
    </v-flex>
    <v-flex md4 sm12>
      <pie-chart :chart-data="shopsChart"></pie-chart>
    </v-flex>
    <v-flex md4 sm12>
      <pie-chart :chart-data="monthlyChart"></pie-chart>
    </v-flex>
  </v-layout>
</template>

<script>
  import LineChart from './LineChart.js'
  import PieChart from './PieChart.js'

  export default {
    components: { LineChart, PieChart },
    data: () => ({
      monthlyChart: {
        labels: [...Array(4).keys()],
        datasets: [
          {
            label: 'Monthly spending',
            backgroundColor: ['#f87929','#f81979','#f17979','#f87974'],
            data: [40, 20, 10, 40]
          }
        ]
      },
      shopsChart: {
        labels: ['Rimi', 'Maksi', 'Comarket', 'Konsum'],
        datasets: [
          {
            label: 'Shops',
            backgroundColor: ['#f87929','#f81979','#f17979','#f87974'],
            data: [40, 20, 10, 40]
          }
        ]
      }
    }),
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {}
    }
  }
</script>