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
        <v-expansion-panel class="receipts-panel" v-for="(rs, day) in receipts" :key='day'>
          <v-expansion-panel-content>
            <div slot="header">{{day | moment('DD.MM.YYYY') }}</div>
            <v-card class="receipt-card">
              <v-layout row wrap>
                <v-flex md2 v-for="receipt in rs" :key='receipt.id'>
                  <div class="receipt" @click="openReceipt(receipt)">
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

    <v-dialog v-model="dialog" max-width="600">
      <div class="receipt-dialog">
        <div class="dialog-logo">
          <img src="../assets/logo_black.svg" height="80px;">
        </div>
        <div class="dialog-header">
          Maxima XX<br>
          Voru, 50410 Tartu, tel 8002 121
        </div>
        <div class="dialog-content">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs6 class="cont-1 bord1 text-md-left">KOKKU:</v-flex>
              <v-flex xs6 class="cont-1 bord1 text-md-right">5.34€</v-flex>

              <v-flex xs6 class="cont-2 text-md-left">Kassa:</v-flex>
              <v-flex xs6 class="cont-2 text-md-right">46059</v-flex>
              <v-flex xs6 class="cont-2 text-md-left">Kviitungi nr:</v-flex>
              <v-flex xs6 class="cont-2 text-md-right">34966</v-flex>
              <v-flex xs6 class="cont-2 text-md-left">Aeg:</v-flex>
              <v-flex xs6 class="cont-2 text-md-right">01.01.2018</v-flex>
              <v-flex xs6 class="cont-2 text-md-left">Teenindaja:</v-flex>
              <v-flex xs6 class="cont-2 text-md-right">209</v-flex>
              <v-flex xs6 class="cont-2 bord1 text-md-left">Kliendikaart:</v-flex>
              <v-flex xs6 class="cont-2 bord1 text-md-right">Aitah Kaart (*****576)</v-flex>
              <v-flex xs6 class="cont-2 bord2 text-md-left">Nimetus</v-flex>
              <v-flex xs3 class="cont-2 bord2 text-md-right">Kogus</v-flex>
              <v-flex xs3 class="cont-2 bord2 text-md-right">Summa</v-flex>

              <v-flex xs6 class="cont-3 text-md-left">Piim Farmi 1.5L</v-flex>
              <v-flex xs3 class="cont-3 text-md-right">1</v-flex>
              <v-flex xs3 class="cont-3 text-md-right">1.05€</v-flex>
              <v-flex xs6 class="cont-3 text-md-left">Markmepaberid</v-flex>
              <v-flex xs3 class="cont-3 text-md-right">10</v-flex>
              <v-flex xs3 class="cont-3 text-md-right">1.75€</v-flex>
              <v-flex xs6 class="cont-3 text-md-left">Kupsis sokolaadis</v-flex>
              <v-flex xs3 class="cont-3 text-md-right">1</v-flex>
              <v-flex xs3 class="cont-3 text-md-right">0.74€</v-flex>
              <v-flex xs6 class="cont-3 bord1 text-md-left">Belgia vahvel</v-flex>
              <v-flex xs3 class="cont-3 bord1 text-md-right">1</v-flex>
              <v-flex xs3 class="cont-3 bord1 text-md-right">1.80€</v-flex>
              <v-flex xs8 class="cont-3 text-md-left">Pangakaart (SWEDBANK *****87593):</v-flex>
              <v-flex xs4 class="cont-3 text-md-right">5.24€</v-flex>
              <v-flex xs8 class="cont-3 text-md-left">Boonusmakse:</v-flex>
              <v-flex xs4 class="cont-3 text-md-right">0.10€</v-flex>
              <v-flex xs8 class="cont-1 text-md-left">KOKKU:</v-flex>
              <v-flex xs4 class="cont-1 text-md-right">0.10€</v-flex>
            </v-layout>
          </v-container>
        </div>
        <div class="dialog-footer">
          Maxima Eesti OU, Peterburi tee 47, 11415, Tallinn, Eesti<br>
          Reg.kood: 74927502, KMKR: EE840284502
        </div>
        <div class="tags">
          <input-tag placeholder="Add Tag" :tags="receiptTags"></input-tag>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import InputTag from 'vue-input-tag'

  export default {
    components: { InputTag },
    data () {
      return {
        dialog: false,
        receiptTags: [],
        dialogReceipt: null,
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
      openReceipt: function(receipt) {
        this.dialog = true
        this.dialogReceipt = receipt
      } 
    }

  }
</script>
<style lang="scss" scoped>
  .receipt-dialog {
    background-color: white;
    padding: 10px;
    position: relative;

    .dialog-logo {
      img {
        display: block;
        margin: 0 auto;
      }
    }

    .dialog-header {
      color: #6a6767;
      font-size: 16pt;
      text-align: center;
    }

    .dialog-footer {
      margin-top: 10px;
      color: #a29f9f;
      font-size: 12pt;
      text-align: center;
    }

    .dialog-content {
      color: #696767;
      font-size: 14pt;
      font-weight: 500;

      .cont-1 {
        font-weight: 600;

        &.bord1 {
          border-bottom: 3px solid #0097cb;
        }
      }
      .cont-2 {
        line-height: 20px;

        &.bord1 {
          border-bottom: 3px solid #909090;
        }

        &.bord2 {
          border-bottom: 2px solid #c8c8c8;
        }
      }

      .cont-3 {
        line-height: 20px;
        font-weight: 400;

        &.bord1 {
          border-bottom: 3px solid #c8c8c8;
        }
      }
    }

    .tags {
      margin-top: 20px;
    }
  }

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
