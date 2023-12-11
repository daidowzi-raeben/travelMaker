<template>
    <div>
     <gmap-map :center="center" :zoom="12" style="width: 100%; height: 500px">
          <gmap-cluster>
            <gmap-marker v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true" :draggable="true"
              @click="center = m.position"
              :key="index"
              ></gmap-marker>
          </gmap-cluster>
        </gmap-map>
    </div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'MapContent',
    layout: 'index',
    data() {
        return {
           center: {
                lat: 37.5666612,
                lng: 126.9783785
            },
            markers: [{
                position: {
                    lat: 10.0,
                    lng: 10.0
                }
            }, {
                position: {
                    lat: 11.0,
                    lng: 11.0
                }
            }]
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        //         navigator.geolocation.getCurrentPosition((position) => {
        //     console.log(position?.coords?.latitude, position?.coords?.longitude
        //     )
        //     this.center = {
        //         lat: position?.coords?.latitude,
        //         lng: position?.coords?.longitude
        //     }
        // });
    },
}
</script>

<style lang="scss" ></style>
