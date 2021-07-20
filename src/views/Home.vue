<template>
  <v-main class="m-0 mt-0 grey lighten-5 fill-height" >
    <v-snackbar
        v-model="snackBar"
        bottom
        class="snack"
      >
        {{ snackBarText }}
        <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          aria-label="close"
          @click="snackBar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        </template>
    </v-snackbar>
    <v-container class="my-5 mb-12">
      <v-row
        fill-height
        align="center"
        justify="center"
        class="mt-0 pt-0"
      >
        <v-col md="6" lg="7" xl="5" sm="12" class="my-4">
          <v-img
            class="elevation-1"
            :src="require('@/assets/img/email.jpg')"
            style="border:1px solid #0005DF;border-radius:8px"
          ></v-img>
        </v-col>
      </v-row>

      <v-row
        fill-height
        align="center"
        justify="center"
        class="mt-0 pt-0 "
      >
        <!-- <v-col md="6" lg="7" xl="5" sm="12" class="my-0 pa-5" style="border: 1px solid #e0e0e0; border-radius: 7px;background:white">
          <h1 class="google-font">Coming Soon....</h1>
          <p>We're working hard to make this event successful</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nemo labore repellat nihil possimus suscipit incidunt ea fuga accusamus ut, delectus assumenda distinctio nam facilis facere repudiandae. Reiciendis, a beatae.</p>
          <p>For Testing Contact to admin </p>

          <v-btn color="#0005df" flat dark>Contact us</v-btn>
        </v-col> -->

        <v-col md="6" lg="7" xl="5" sm="12" class="my-0 py-0">
          <feedback v-if="FeedbackStatus && !ThankYouStatus && !CertificateStatus" @FeedbackSubmitedSuccess="feedbackSuccess"/>

          <thankyou v-if="!FeedbackStatus && ThankYouStatus && !CertificateStatus" @ThankYouSubmitedSuccess="thankyouSuccess" :userData="userData"  />

          <certificate v-if="!FeedbackStatus && !ThankYouStatus && CertificateStatus" :userData="userData" @showSnakeBar="showSnakeBar"/>
              
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Home",
  data:()=>({
    FeedbackStatus:true,
    ThankYouStatus: false,
    CertificateStatus: false,
    snackBarText: '',
    snackBar: false,
    userData:{}
  }),
  components: {
    feedback:()=>import('../components/home/feedback'),
    thankyou:()=>import('../components/home/thankyou'),
    certificate:()=>import('../components/home/certificate'),
  },
  methods:{
    showSnakeBar(result){
      this.snackBarText = result;
      this.snackBar = true;
    },
    feedbackSuccess(result){
      this.userData = result;
      this.FeedbackStatus = false;
      this.ThankYouStatus = true;
      this.CertificateStatus = false; 
      this.showSnakeBar("Feedback Added Success");
    },
    thankyouSuccess(result){
      this.FeedbackStatus = false;
      this.ThankYouStatus = false;
      this.CertificateStatus = true;
      this.showSnakeBar("Certificate Generated");
      this.userData = {
        ...this.userData,
        ...result,
      }
    },
  }
};
</script>
