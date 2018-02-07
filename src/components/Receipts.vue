<template>
  <v-expansion-panel expand>
    <v-expansion-panel-content v-for="item in receipts" :key="item.id" v-bind:value="item.id === 1">
      <div slot="header">{{item.date}}</div>
      <v-card>
        <v-card-text class="lighten-2">
         <v-layout row wrap>
           <v-flex md2>
             <div class="receipt grey text-md-center">
               <h1><sup>$</sup> 25 </h1>
               <h5 class="">Remi supermarket</h5>
             </div>
           </v-flex> <v-flex md2>
             <div class="receipt grey text-md-center">
               <h1><sup>$</sup> 25 </h1>
               <h5 class="">Remi supermarket</h5>
             </div>
           </v-flex> <v-flex md2>
             <div class="receipt grey text-md-center ">
               <h1><sup>$</sup> 25 </h1>
               <h5 class="">Remi supermarket</h5>
             </div>
           </v-flex> <v-flex md2>
             <div class="receipt grey text-md-center">
               <h1><sup>$</sup> 25 </h1>
               <h5 class="">Remi supermarket</h5>
             </div>
           </v-flex>
         </v-layout>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
  export default {
    data(){
      return{
        receipts:[
          { id:   1,
            date: '08-feb-2018',
            place: 'Remi supermarket',
            total: 5.0,
            item: [
              {
                name:'banana',
                price:1.2,
              },
              {
                name:'milk',
                price: 2.0,
              }
            ]

          },
          {
            id: 2,
            date: '07-feb-2018',
            place: 'Remi supermarket',
            total: 5.0,
            item: [
              {
                name:'banana',
                price:1.2,
              },
              {
                name:'milk',
                price: 2.0,
              }
            ]

          }

        ]
      }
    }

  }
</script>
<style lang="scss" scoped>
  .receipt{
    margin-right: 5px;

  }

</style>
