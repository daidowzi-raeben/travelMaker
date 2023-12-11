// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want
import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId:
    '326804284084-no57a7j7m7ifgund1ukiut04bkhdm6q4.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: false,
}
Vue.use(GAuth, gauthOption)
