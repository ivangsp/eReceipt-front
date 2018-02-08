<template>
  <v-app>
   <div v-if="visible">
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
             prepend-icon="search"
             label="Search"
           ></v-text-field>
         </v-flex>
         <v-flex md6>
           <div class="inline-heading">Filter search by:</div>
         </v-flex>
         <v-flex  md6>
           <v-radio-group row>
             <v-radio label="Price"></v-radio>
             <v-radio label="Place"></v-radio>
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
             drag-color="#22b4fc"
             select-color="#0092da"
             :month-labels='["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]'
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
               <v-list-tile v-for="tag in tags" :key="tag.title" @click="">
                 <v-list-tile-content>
                   <v-list-tile-title>
                     <v-icon>chevron_right</v-icon>
                     {{ tag.title }}
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
       <img id="logo" src="./assets/logo.svg" @click="$router.push('/receipts')">
       <v-toolbar-items id="menu">
         <v-btn class="menu-item" active-class="active-menu-item" depressed to="/receipts" exact>Receipts</v-btn>
         <v-btn class="menu-item" active-class="active-menu-item" depressed to="/statistics" exact>Statistics</v-btn>
       </v-toolbar-items>
       <div class="align-center" style="margin-left: auto">
         <div class="hello-user">Hello, Ucha!</div>
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
               <v-list-tile-title>Logout</v-list-tile-title>
             </v-list-tile>
           </v-list>
         </v-menu>
       </div>

     </v-toolbar>
   </div>
    <v-content class="white">
      <v-container fluid>
        <v-slide-x-transition mode="out-in">
          <router-view>

          </router-view>
        </v-slide-x-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import SearchBar from './components/SearchBar';
  import Receipt from './components/Receipts';
  export default {
    components:{
      SearchBar,
      Receipt
    },
    data: () => ({
      path_url: '',
      visible: true,

      tags: [{
        title: 'Gas'
      }, {
        title: 'Food'
      }, {
        title: 'Clothing'
      }],
      selectedDate: {
        start: new Date(2018, 0, 9),
        end: new Date(2018, 0, 18)
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
      }
    }),
    methods: {
      logout: () => {
        console.log('loging out...')
      }
    },

    mounted() {
      if(this.$route.path === '/'){
        this.visible = false
      }
      console.log("path", this.$route.path)
    }
  }
</script>

<style lang="scss" scoped>
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
      width: 300px;
      border-radius: 0px;
      background-color: #c3c3c3;
    }
  }
  .active-menu-item {
    background-color: #0092da !important;
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
