<template>
  <div>
      <v-flex md6 style="margin-bottom: 50px;">
        <v-select
          class="company-select"
          :items="['Own receipts', 'Company\'s receipts' ]"
          label="Select what?"
          single-line
          hide-details
        ></v-select>
      </v-flex>
      <v-flex md12>
        <v-expansion-panel class="receipts-panel" v-for="(rs, day) in receipts">
          <v-expansion-panel-content>
            <div slot="header"  >{{ day| moment('DD.MM.YYYY')}}</div>
            <v-card class="receipt-card">
              <v-layout row wrap>
                <v-flex md2 v-for="receipt in rs">
                  <div class="receipt" @click="">
                    <div class="price">
                      {{receipt.total}}€
                    </div>
                    <div class="store">
                      {{receipt.store}}
                    </div>
                  </div>
                  <div class="tag">
                    #food
                  </div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
<!--     <v-expansion-panel expand>
      <v-expansion-panel-content v-for="item in receipts" :key="item.id" v-bind:value="item.id === 1">
        <div slot="header">{{item.date}}</div>
        <v-card>
          <v-card-text class="lighten-2">
            <v-layout row wrap class="receipt ">


              <v-flex sm2 >
                <v-btn @click.native.stop="dialog = true" class=" grey">
                  <div class="" >
                    <h1><sup>$</sup> 25 </h1>
                    <h5 class="">Remi supermarket</h5>
                  </div>
                </v-btn>
              </v-flex>

              <v-flex sm2>
                <v-btn @click.native.stop="dialog = true" class=" grey">
                  <div class="" >
                    <h1><sup>$</sup> 25 </h1>
                    <h5 class="">Remi supermarket</h5>
                  </div>
                </v-btn>
              </v-flex>

              <v-flex sm2>
                <v-btn @click.native.stop="dialog = true" class=" grey">
                  <div class="" >
                    <h1><sup>$</sup> 25 </h1>
                    <h5 class="">Remi supermarket</h5>
                  </div>
                </v-btn>
              </v-flex>

              <v-flex sm2>
                <v-btn @click.native.stop="dialog = true" class=" grey">
                  <div class="" >
                    <h1><sup>$</sup> 25 </h1>
                    <h5 class="">Remi supermarket</h5>
                  </div>
                </v-btn>
              </v-flex>

            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
 -->

    <v-layout row >
      <v-dialog v-model="dialog" max-width="450">
        <v-card>
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>Rimi super market</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <table class="table table-striped">
            <tbody>
            <tr>
              <td scope="col-md-9">Banana</td>
              <td scope="col-md-3">&euro; 2.0</td>
            </tr>
            <tr>
              <td scope="col-md-9">choclate</td>
              <td scope="col-md-3"> &euro;1.2</td>
            </tr>
            <tr>
              <td scope="col-md-9">Chicken</td>
              <td scope="col-md-3"> &euro; 4.0</td>
            </tr>

            </tbody>
          </table>

          <div class="row">
            <div class="col-auto">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">Add tag</div>
                </div>
                <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="eg fruits">
                  <button class="btn btn-primary md-2">Add</button>
              </div>
            </div>

          </div>
          <v-divider></v-divider>

          <div class="row">

            <div class="col-auto">
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="autoSizingCheck1">
                <label class="form-check-label" for="autoSizingCheck1">
                  Fruits
                </label>
              </div>
            </div><div class="col-auto">
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
                <label class="form-check-label" for="autoSizingCheck2">
                  cereals
                </label>
              </div>
            </div>
            <div class="col-auto">
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="autoSizingCheck">
                <label class="form-check-label" for="autoSizingCheck">
                  Alchol
                </label>
              </div>
            </div>
          </div>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>
  </div>

</template>

<script>
  import axios from 'axios';


  export default {
    data () {
      return {
        dialog: false,
        // receipts:[
        //   { id:   1,
        //     date: '08-feb-2018',
        //     place: 'Remi supermarket',
        //     total: 5.0,
        //     item: [
        //       {
        //         name:'banana',
        //         price:1.2,
        //       },
        //       {
        //         name:'milk',
        //         price: 2.0,
        //       }
        //     ]
        //
        //   },
        //   {
        //     id: 2,
        //     date: '07-feb-2018',
        //     place: 'Remi supermarket',
        //     total: 5.0,
        //     item: [
        //       {
        //         name:'banana',
        //         price:1.2,
        //       },
        //       {
        //         name:'milk',
        //         price: 2.0,
        //       }
        //     ]
        //
        //   }
        //
        // ],
        receipts: []
      }
    },

    mounted(){
      console.log("mounted2");
      this.getallReceipts();

    },

    methods:{
      getallReceipts() {
        axios.get('https://id.ereceipt.website/api/receipt/?client_id=-1')
          .then(response =>{
            this.receipts = response.data;
            const groupby = (arr, func) => {
              return arr.reduce(function(groups, item) {
                const val = func(item);
                groups[val] = groups[val] || [];
                groups[val].push(item);
                groups[val].sort((a, b) => {
                  return new Date(b.date) - new Date(a.date);
                });
                return groups;
              }, {});
            };
            this.receipts = groupby(this.receipts, (rec) => {
              let date = new Date(rec.date);
              date.setHours(0);
              date.setMinutes(0);
              date.setSeconds(0);
              date.setMilliseconds(0);
              return date;
            });
            console.log("receipts", this.receipts);
            for (let i in this.receipts){
              console.log("kkk", i);
            }
          })
          .catch(error =>{
            console.log("error", error)

          })
      },
    }

  }
</script>
<style lang="scss" scoped>
  // .receipt
  // .btn{
  //   min-height: 100px;
  // }

  // .receipt
  // .flex.md2 {
  //   -ms-flex-preferred-size: 16.666666666666664%;
  //   flex-basis: 16.666666666666664%;
  //   max-width: 12.666666666666664%;
  // }

  // .company-select {
  //   .input-group__input {
  //     background-color: red;
  //   }
  // }

  .receipt, .tag {
    margin: 0 15px;
  }
  .receipts-panel {
    color: #999;
    margin: 0 0;

    .receipt-card {
      border: none;

      .receipt {
        height: 150px;
        background-color: #d7d7d7;
        margin-top: 30px;
        text-align: center;
        color: #414040;
        box-shadow: none;

        .price {
          line-height: 100px;
          height: 100px;
          font-size: 22pt;
        }

        .store {
          line-height: 50px;
          height: 50px;
          font-size: 16pt;
        }
      }

      .tag {
        height: 20px;
        background-color: #9a9999;
        margin-bottom: 30px;
        color: #eeeeee;
        padding: 0 10px;
      }
    }
  }

</style>
