<template>
  <v-form>
    <v-layout row wrap>
      <v-flex xsm12 offset-md2>
        <v-text-field
          name="input-1-3"
          label="search"
          single-line
          prepend-icon="search">

        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xsm4 >
        <v-checkbox
          label="Date"
          v-model="checkbox"
        ></v-checkbox>
      </v-flex>  <v-flex xsm4 >
        <v-checkbox
          label="Date"
          v-model="checkbox"
        ></v-checkbox>
      </v-flex>  <v-flex xsm4 >
        <v-checkbox
          label="Date"
          v-model="checkbox"
        ></v-checkbox>
      </v-flex>
    </v-layout>
  </v-form>

</template>

<script>
  export default {
    data () {
      return {
        param: 'search for product'
      }
    }
  }
</script>
