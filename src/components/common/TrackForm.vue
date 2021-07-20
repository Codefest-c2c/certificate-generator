<template>
  <div class="ml-3" style="width:100%;">
    <div class="google-font mb-1" style="font-size: 105%; color: black !important">
      {{track}}
      <span style="color: #ff5252">*</span>
    </div>
    <v-radio-group
      :rules="[(v) => !!v || 'This field is required.']"
      style="width:100%"
      v-model="field"
      :row="getMobileBTN()"
      class="ma-0"
    >
      <v-radio color="#0005DF" value="1" v-slot:label class="mr-4">
        <div style="color: black">1</div>
      </v-radio>
      <v-radio color="#0005DF" value="2" v-slot:label class="mr-4">
        <div style="color: black">2</div>
      </v-radio>
      <v-radio color="#0005DF" value="3" v-slot:label class="mr-4">
        <div style="color: black">3</div>
      </v-radio>
      <v-radio color="#0005DF" value="4" v-slot:label class="mr-4">
        <div style="color: black">4</div>
      </v-radio>
      <v-radio color="#0005DF" value="5" v-slot:label class="mr-4">
        <div style="color: black">5</div>
      </v-radio>
      <v-radio color="#0005DF" value="0" v-slot:label class="mr-4">
        <div style="color: black">Not attended</div>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
    props:["model", "track"],
    computed: {
        field: {
            get: function() {
                return this.model
            },
            set: function(value) {
                this.$emit('update:model', value)
            }
        }
    },
    methods:{
      getMobileBTN() {
      if (window.innerWidth < 500) return false;
        else return true;
      },
    }
};
</script>

<style>
</style>