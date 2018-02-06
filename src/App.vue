<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile to="/receipts" exact>
          <v-list-tile-action>
            <v-icon>receipt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Receipts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="statistics" exact>
          <v-list-tile-action>
            <v-icon>multiline_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Statistics</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-subheader>Labels</v-subheader>
        <v-list-tile v-for="label in labels" :key="label.title" @click="">
          <v-list-tile-action>
            <v-icon>label</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ label.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="teal" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <img id="logo" src="./assets/logo.png" @click="$router.push('/receipts')">
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-x-transition mode="out-in">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </v-content>
    <v-footer color="teal" app>
      <span class="white--text">&copy; 2018 eReceipt</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      labels: [{
        title: 'Products'
      }, {
        title: 'Electronics'
      }]
    }),
    methods: {
      logout: () => {
        console.log('loging out...')
      }
    }
  }
</script>

<style lang="scss" scoped>
  img#logo {
    height: 150%;
    cursor: pointer;
  }
</style>