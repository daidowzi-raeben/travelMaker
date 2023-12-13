<template>
  <div>
    <!-- <gmap-place-input :default-place="place"@place_changed="setPlace">
   </gmap-place-input> -->
    <gmap-map
      ref="googleMap"
      :center="center"
      :zoom="12"
      style="width: 100%; height: 500px"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
      </gmap-info-window>
      <gmap-cluster>
        <gmap-marker
          v-for="(m, index) in EVENT_DATA.MAKERS"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          :icon="makerImg"
          @click="onClickMaker(m, index)"
        >
        </gmap-marker>
      </gmap-cluster>
    </gmap-map>
    <!-- {{ EVENT_DATA.MAKERS }} -->
    <div>
      <table>
        <tr v-for="(v, i) in EVENT_DATA.LIST" :key="i">
          <td>{{ v.addr1 }}</td>
          <td>{{ v.title }}</td>
          <td>{{ v.tel }}</td>
          <td><img :src="v.firstimage" width="100" /></td>
          <td><img :src="v.firstimage2" width="100" /></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// import imgpath from '~/static/images/logo.svg';
const seoul = { lat: 37.5642135, lng: 127.0016985 }

export default {
  name: 'MapContent',
  layout: 'index',
  data() {
    return {
      place: 'Singapore',
      shape: {
        coords: [10, 10, 10, 15, 15, 15, 15, 10],
        type: 'poly',
      },
      makerImg: {
        url: 'https://an2-img.amz.wtchn.net/image/v2/gL_DmC5m7rzEdBNnml8ybQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1KbklsMHNJbkFpT2lJdmRqSXZjM1J2Y21VdmFXMWhaMlV2TVRZNE1EVXhOVFk1TnpBNE9ERTBOakV3TnlJc0luRWlPamd3TENKM0lqb3hPVEl3ZlEuOEtVTGZueEJKRnllcUlSdzdjZVVCR2dwdjJ4dV9lR2xfVVpIWDNMSGNZcw',
        scaledSize: { width: 20, height: 20 },
      },
      center: seoul,
      // info window
      infoWinOpen: false,
      infoWindowPos: null,
      currentMidx: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    }
  },
  computed: {
    ...mapState(['EVENT_DATA']),
  },
  created() {
    this.ACTION_MAP_LIST()
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
  methods: {
    ...mapMutations(['MUTATIONS_MAP_LIST']),
    ...mapActions(['ACTION_MAP_LIST']),

    onClickMaker(v, e) {
      console.log(v)
      console.log(e)
      this.$refs.googleMap.panTo({
        lat: v.position.lat,
        lng: v.position.lng,
      })

      this.infoWindowPos = v.position
      this.infoOptions.content = `<i>${v.detailData?.title}</i><br>
            <img src="${v.detailData?.firstimage}" width="40">
                `

      if (this.currentMidx === e) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = e
      }
    },
  },
  onClickCluster(v) {
    console.log(v)
  },
  setPlaceText(place) {
    this.place = place
  },
  setPlace(place) {
    this.latLng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }
  },
}
</script>

<style lang="scss">
.gmnoprint {
  > .gm-svpc {
    background: red !important;
  }
}
</style>
