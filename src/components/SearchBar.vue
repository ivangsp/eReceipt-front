<template>
    <v-form >
      <v-layout row wrap>
        <v-flex md6 offset-md3>
          <v-text-field
            name="input-1-3"
            label="search"
            single-line
            prepend-icon="search">
          </v-text-field>
        </v-flex>
      </v-layout>

      <!--<v-layout row wrap>-->
        <!--<v-flex md3 offset-md4>-->
          <!--<v-radio-group row>-->
            <!--<v-radio label="Date" v-model="date" value="true"></v-radio>-->
            <!--<v-radio label="Price" value="1" v-model="price"></v-radio>-->
            <!--<v-radio label="Place" value="2" v-model="place"></v-radio>-->
          <!--</v-radio-group>-->
        <!--</v-flex>-->
      <!--</v-layout>-->

      <v-layout row wrap>
        <v-flex md3 offset-md4>
          <v-btn round color="error" dark block>Search</v-btn>        </v-flex>
      </v-layout>


    </v-form>
  </template>

<script>
  export default {
    data () {
      return {
        param: 'search for product',
        place: false,
        date: false,
        price: false
      }
    }
  }
</script>
