<template>
  <div>
    <v-layout row wrap>
      <v-flex sm8 offset-sm2>
        <v-expansion-panel expand>
          <v-expansion-panel-content v-for="item in receipts" :key="item.id" v-bind:value="item.id === 1">
            <div slot="header">{{item.date}}</div>
            <v-card>
              <v-card-text class="lighten-2">
                <v-layout row  class="receipt ">

                  <v-flex  >
                    <v-btn @click.native.stop="dialog = true" class=" grey">
                      <div class="" >
                        <h1><sup>$</sup> 25 </h1>
                        <h5 class="">Remi supermarket</h5>
                      </div>
                    </v-btn>
                  </v-flex>

                  <v-flex >
                    <v-btn @click.native.stop="dialog = true" class=" grey">
                      <div class="" >
                        <h1><sup>$</sup> 25 </h1>
                        <h5 class="">Remi supermarket</h5>
                      </div>
                    </v-btn>
                  </v-flex>

                  <v-flex >
                    <v-btn @click.native.stop="dialog = true" class=" grey">
                      <div class="" >
                        <h1><sup>$</sup> 25 </h1>
                        <h5 class="">Remi supermarket</h5>
                      </div>
                    </v-btn>
                  </v-flex>

                  <v-flex >
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
      </v-flex>
    </v-layout>


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

            <tfoot>
              <tr>
                <td><b>Total</b></td>
                <td> <b>&euro; 6.0</b></td>
              </tr>
            </tfoot>
          </table>

          <div class="row">
            <div class="col-auto">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">Add tag</div>
                </div>
                <input type="text" v-model="newTag" class="form-control" id="inlineFormInputGroup" placeholder="eg fruits">
                  <button class="btn btn-primary md-2" v-model="addedtags">Add</button>
              </div>
            </div>

          </div>
          <v-divider></v-divider>

          <div class="row" >

            <div class="col-auto">
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

          <div class="row" >
            <div class="col-auto" v-for="tag in tags">
              <div class="form-check mb-2">
                <input class="form-check-input" checked type="checkbox" id="autoSizingCheck1">
                <label class="form-check-label" for="autoSizingCheck1">
                  {{tag}}
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
  export default {
    data(){
      return{
        dialog: false,

        tags:[
          'fruits', 'alcohol', 'food'
        ],
        newTag:'',

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
    },
    computed:{
        addedtags: function () {
          console.log("newtag", this.newTag);
          if(this.newTag.length !== 0){
            console.log("dhdh", this.tags);
           return  this.tags.push(this.newTag);

          }


        }
    },

    methods:{
      // addTag(){
      //   console.log("newtag", this.newTag);
      //   if(this.newTag.length !== 0){
      //     this.tags.push(this.newTag);
      //     this.newTag ='';
      //
      //   }
      // }
    }

  }
</script>
<style lang="scss" scoped>
  .receipt
  .btn{
    min-height: 100px;
  }

 .expansion-panel__header {
    background-color: #FAFAFA;
  }

</style>
