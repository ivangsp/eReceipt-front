<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>eReceipt</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <SearchBar></SearchBar>
      </v-container>
    </v-content>


    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import SearchBar from './components/SearchBar'
  export default {

    components:{
      SearchBar
    },
    data: () => ({
      drawer: null
    })
  }
</script>
