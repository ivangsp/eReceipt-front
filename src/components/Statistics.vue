<template>
  <v-layout row wrap class="mt-5">
    <v-flex (md10|sm10) offset-md1>
      <v-layout row wrap>
        <v-flex md8 sm10 class="ml-3"  >
          <p >Total Expences per quarter</p>
          <v-divider ></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-3">
        <v-flex md12 sm12>
          <img src="../assets/chart1ereceipt.svg" id="chart1" alt="chart1">
        </v-flex>
      </v-layout>
      <v-spacing></v-spacing>

      <v-layout row wrap class="mt-5">
        <v-flex md8 sm10 class="ml-3"  >
          <p >Expences by category</p>
          <v-divider ></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-3">
        <v-flex md4 xsm12 >
          <img src="../assets/chart2ereceipt.svg" class="piechart" alt="chart1">
        </v-flex>

        <v-flex md4 xsm12 >
          <img src="../assets/chart3ereceipt.svg" class="piechart" alt="chart1">
        </v-flex>

        <v-flex md4 xsm12>
          <img src="../assets/chart4ereceipt.svg" class="piechart" alt="chart1">
        </v-flex>
      </v-layout>

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

<style>
  #chart1{
    width: 100%;
    height: auto;
  }

  .piechart{
    height: 30%;
    width: auto;
  }
</style>
