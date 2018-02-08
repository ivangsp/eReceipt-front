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
                    <template v-for="tag in receipt.tags">{{ "#" + tag }} </template>
                  </div>
                </v-flex>
              </v-layout>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

    <v-dialog v-model="dialog" max-width="600">
      <div v-if="dialogReceipt" class="receipt-dialog">
        <div class="dialog-logo">
          <img src="../assets/logo_black.svg" height="80px;">
        </div>
        <div class="dialog-header">
          {{ dialogReceipt.store }}<br>
          Voru, 50410 Tartu, tel 8002 121
        </div>
        <div class="dialog-content">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex md6 class="cont-1 bord1 text-md-left">TOTAL:</v-flex>
              <v-flex md6 class="cont-1 bord1 text-md-right">{{ dialogReceipt.total }}€</v-flex>

              <v-flex md6 class="cont-2 text-md-left">Receipt number:</v-flex>
              <v-flex md6 class="cont-2 text-md-right">34966</v-flex>
              <v-flex md6 class="cont-2 text-md-left">Date:</v-flex>
              <v-flex md6 class="cont-2 text-md-right">{{ dialogReceipt.date | moment('DD.MM.YYYY') }}</v-flex>
              <v-flex md6 class="cont-2 text-md-left">Cashier:</v-flex>
              <v-flex md6 class="cont-2 text-md-right">209</v-flex>
              <v-flex md6 class="cont-2 bord1 text-md-left">Client:</v-flex>
              <v-flex md6 class="cont-2 bord1 text-md-right">{{ dialogReceipt.client_id }}</v-flex>
              <v-flex md6 class="cont-2 bord2 text-md-left">Product</v-flex>
              <v-flex md3 class="cont-2 bord2 text-md-right">Amount</v-flex>
              <v-flex md3 class="cont-2 bord2 text-md-right">Price</v-flex>

              <template v-for="product in dialogReceipt.items">
                <v-flex md6 class="cont-3 text-md-left">{{ product.name }}</v-flex>
                <v-flex md3 class="cont-3 text-md-right">{{ product.amount }}</v-flex>
                <v-flex md3 class="cont-3 text-md-right">{{ product.price_per }}€</v-flex>
              </template>

              <v-flex md8 class="cont-3 bord2 text-md-left">Debit Card (SWEDBANK *****87593):</v-flex>
              <v-flex md4 class="cont-3 bord2 text-md-right">{{ dialogReceipt.total }}€</v-flex>
              <v-flex md8 class="cont-1 text-md-left">TOTAL:</v-flex>
              <v-flex md4 class="cont-1 text-md-right">{{ dialogReceipt.total }}€</v-flex>
            </v-layout>
          </v-container>
        </div>
        <div class="dialog-footer">
          {{ dialogReceipt.store }} Eesti OU, Peterburi tee 47, 11415, Tallinn, Eesti<br>
          Reg.code: 74927502, KMKR: EE840284502
        </div>
        <div class="tags">
          <input-tag placeholder="Add Tag" :tags.sync="receiptTags"></input-tag>
        </div>
        <div class="text-md-center">
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex md6>
                <v-btn block @click="download" outline color="grey darken-2" class="white--text">
                  Download
                  <v-icon right dark>cloud_download</v-icon>
                </v-btn>
              </v-flex>
              <v-flex md6>
                <v-btn @click="sendToBusiness" block outline color="blue darken-2" class="white--text">
                  Send to work account
                  <v-icon right dark>send</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
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
        dialogReceipt: null,
        receiptTags: [],
        rawReceipts: []
      }
    },
    computed: {
      receipts: function() {
        const groupby = (arr, func) => {
          return arr.reduce(function(groups, item) {
            const val = func(item)
            groups[val] = groups[val] || []
            groups[val].push(item)
            groups[val].sort((a, b) => {
              return new Date(b.date) - new Date(a.date)
            })

            return groups
          }, {})
        }

        return groupby(this.rawReceipts, (rec) => {
          let date = new Date(rec.date)

          date.setHours(0)
          date.setMinutes(0)
          date.setSeconds(0)
          date.setMilliseconds(0)

          return date
        })
      }
    },
    watch: {
      receiptTags: function(newTags, oldTags) {
        var tagToAdd = newTags.filter(e => !oldTags.find(a => e == a))
        var tagToDelete = oldTags.filter(e => !newTags.find(a => e == a))
        
        tagToAdd.forEach((tag) => {
          axios.post('https://id.ereceipt.website/api/receipt/tag', {
            receipt_id: this.dialogReceipt._id,
            tag_name: tag
          }).then((response) => {
            this.$emit('update')
          }).catch(error => {
            console.log("error", error)
          })
        })

        tagToDelete.forEach((tag) => {
          axios.delete('https://id.ereceipt.website/api/receipt/tag', {
            data: {
              receipt_id: this.dialogReceipt._id,
              tag_name: tag
            }
          }).then((response) => {
            this.$emit('update')
          }).catch(error => {
            console.log("error", error)
          })
        })

        this.dialogReceipt.tags = newTags
        this.rawReceipts = this.rawReceipts.map(el => {
          return el._id == this.dialogReceipt._id ? this.dialogReceipt : el
        })
      }
    },

    mounted(){
      this.getReceipts({ client_id: -1 })
    },

    methods:{
      getReceipts(searchParams) {
        axios.get('https://id.ereceipt.website/api/receipt', {
          params: searchParams
        })
        .then(response =>{
          this.rawReceipts = response.data.map((el) => {
            el.tags = el.tags.map((el) => (el.name))
            return el
          })
        })
        .catch(error =>{
          console.log("error", error)
        })
      },

      openReceipt: function(receipt) {
        this.dialog = true
        this.dialogReceipt = receipt
        this.receiptTags = receipt.tags
      },

      sendToBusiness() {
        this.$toasted.success('You have successfuly sent the receipt to your work account!', {
          theme: "primary", 
          position: "bottom-left", 
          duration : 2000
        })
      },

      download() {
        this.$toasted.info('This receipt will be downloaded when this feature will be added!', {
          theme: "primary", 
          position: "bottom-left", 
          duration : 2000
        })
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

        &.bord2 {
          border-top: 3px solid #c8c8c8;
        }
      }
    }

    .tags {
      margin: 20px 8px 0 8px;
    }
  }

  .receipt, .tag {
    margin: 0 25px;
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
