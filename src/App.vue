<template>
  <v-app>
      <v-navigation-drawer
        class="white"
        width="400"
        floating
        clipped
        fixed
        app
      >
        <v-layout row wrap>
          <v-flex md12>
            <v-text-field
              v-model='searchField'
              prepend-icon="search"
              label="Search"
              @keyup.enter="filterReceipts"
            ></v-text-field>
          </v-flex>
          <v-flex md5>
            <div class="inline-heading">Filter search by:</div>
          </v-flex>
          <v-flex  md7>
            <v-radio-group v-model="selectedSort" row>
              <v-radio label="Product" value="product"></v-radio>
              <v-radio label="Store" value="store"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex md12>
            <div class="inline-heading">Search by date:</div>
          </v-flex>
          <v-flex md12>
            <vc-date-picker
              mode='range'
              v-model='selectedDate'
              is-inline
              show-caps
              is-expanded
              :theme-styles='calendarStyles'
              drag-color='#f6f58b'
              select-color='#f0e347'
              :month-labels='["January", "February", "March", "April", "May", "June", "July", "August",
               "September", "October", "November", "December"]'
              :weekday-labels='["MO", "TU", "WE", "TH", "FR", "SA", "SU"]'
            ></vc-date-picker>
          </v-flex>
          <v-flex md12>
            <v-divider></v-divider>
            <v-list>
              <v-list-group>
                <v-list-tile slot="item">
                  <v-list-tile-action>
                    <v-icon>flag</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Tags</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-for="tag in tags" :key="tag.name" @click="">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <v-checkbox :label="tag.name" v-model="selectedTags" :value="tag.name"></v-checkbox>

                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list-group>
            </v-list>
          </v-flex>
        </v-layout>
      </v-navigation-drawer>
      <v-toolbar
        class="black"
        height="100px"
        clipped-left
        flat
        fixed
        app
      >
        <img id="logo" src="./assets/logo.svg" @click="$router.push('/')">
        <v-toolbar-items id="menu">
          <v-btn class="menu-item" active-class="active-menu-item" depressed to="/" exact>Receipts</v-btn>
          <v-btn class="menu-item" active-class="active-menu-item" depressed to="/statistics" exact>Statistics</v-btn>
        </v-toolbar-items>
        <div class="align-center" style="margin-left: auto">
          <div class="hello-user">Hello, {{username}}!</div>
          <v-menu offset-y>
            <v-avatar size="50px" slot="activator">
              <img src="./assets/icon.svg">
            </v-avatar>
            <v-list>
              <v-list-tile @click="">
                <v-list-tile-action>
                  <v-icon>account_circle</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Profile</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="logout">
                <v-list-tile-action>
                  <v-icon>power_settings_new</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                  <a href="../simple_html/landing_page/index.html"> Logout</a></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>

      </v-toolbar>
    <v-content class="white">
      <v-container fluid style="padding: 50px;">
        <v-slide-x-transition mode="out-in">
          <router-view @update="fetchTags"></router-view>
        </v-slide-x-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import SearchBar from './components/SearchBar'
  import Receipt from './components/Receipts'
  export default {

    components:{
      SearchBar,
      Receipt
    },
    data: () => ({
      username: 'Ucha',
      tags: [],
      searchField: '',
      selectedSort: 'product',
      selectedTags: [],
      selectedDate: {
        start: new Date(2018, 1, 2),
        end: new Date(2018, 1, 8)
      },
      calendarStyles: {
        wrapper: {
          border: 0,
          background: 'white'
        },
        weekdaysHorizontalDivider: {
          borderTop: 'solid #ccc 1px',
          width: '100%'
        },
      },
    }),

    mounted(){
      this.login()
      this.fetchTags()
    },
    methods: {
      login () {
        axios.get('https://id.ereceipt.website/api/whoami')
          .then(response => {
            this.username = response.data
          }).catch(error => {
          console.log("error", error)
        })
      },

      fetchTags () {
        axios.get('https://id.ereceipt.website/api/tag')
          .then(response => {
            this.tags = response.data
          }).catch(error => {
          console.log("error", error)
        })
      },

      logout(){
        console.log("logedout....")
      },

      filterReceipts () {
        if (this.$route.path != "/") return;

        var params = {client_id: -1}

        if (this.searchField != '') {
          if (this.selectedSort == 'product') {
            params.item_search = this.searchField
          } else if (this.selectedSort == 'store') {
            params.store_search = this.searchField
          }
        }

        if (this.selectedTags.length != 0) {
          params.tags = JSON.stringify(this.selectedTags)
        }

        params.start_time = this.selectedDate.start.toISOString()
        params.end_time = this.selectedDate.end
        params.end_time.setDate(params.end_time.getDate() + 1)
        params.end_time = params.end_time.toISOString()

        this.$route.matched[0].instances.default.getReceipts(params)
      }
    },

  }
</script>

<style lang="scss" scoped>
  .application {
    font-family: "Avenir";
  }

  img#logo {
    height: 60px;
  }
  .hello-user {
    display: inline-block;
    font-size: 12pt;
    font-weight: bold;
    letter-spacing: 1px;
    color: #ababab;
  }

  #menu {
    padding-top: 60px;
    margin-left: auto;

    .menu-item {
      width: 200px;
      border: none;
      border-bottom: 5px solid rgba(255, 255, 255, 0);
      border-radius: 0px;
      background-color: rgba(255, 255, 255, 0);
      color: #c1c1c1;

      &:focus {
        box-shadow: none;
      }
    }
  }

  .active-menu-item {
    background-color: rgba(255, 255, 255, 0);
    border-bottom-color: rgba(0, 124, 185, 1) !important;
  }

  .navigation-drawer {
    padding: 50px;
  }

  .radio-group {
    padding: 0px;
  }

  .inline-heading {
    line-height: 30px;
    font-size: 12pt;
    color: #666;
  }
</style>
