<template>
    <div class="wrap">

        <!-- <gmap-place-input :default-place="place"@place_changed="setPlace">
   </gmap-place-input> -->
   <div style="position:absolute; top:100px; background:yellow; padding:20px; z-index:9999;">
    <h3>근처목록</h3>
<div v-for="v,i in EVENT_DATA.MAKERS_LIST" :key="i">
<div @click="onClickListToCenter(v)">
    {{ v.detailData.title }}
</div>
</div>
</div>
        <gmap-map ref="googleMap" :center="center" :zoom="zoom" style="width: 100%; height: calc(100vh - 47px)"
            @bounds_changed="onChangeMap" @dragend="onLoadMapData" @tilesloaded="tilesloaded">
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen"
                @closeclick="infoWinOpen = false">
            </gmap-info-window>
            <gmap-cluster>
                <gmap-marker v-for="(m, index) in EVENT_DATA.MAKERS" :key="index" :position="m.position" :clickable="true"
                    :draggable="false" @click="onClickMaker(m, index)" :icon="makerImg">
                </gmap-marker>
            </gmap-cluster>
        </gmap-map>
        <!-- {{ EVENT_DATA.MAKERS }} -->
        <!-- <div>
            <table>
                <template v-for="(v, i) in EVENT_DATA.LIST">
                    <tr :key="i" @click="onClickToDetail(v)">
                        <td>{{ v.addr1 }} {{ v.addr2 }} {{ v.addr3 }}
                        </td>
                        <td>{{ v.title }}</td>
                        <td>{{ v.tel }}</td>
                        <td>{{ v.mapy }}</td>
                        <td>{{ v.mapx }}</td>
                        <td><img :src="v.firstimage" width="100"></td>
                        <td><img :src="v.firstimage2" width="100"></td>
                    </tr>
                </template>
            </table>
        </div> -->

        <router-link to="/festival/list" class="bottom-btn"><span class="icon icon-list"></span>리스트보기</router-link>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// import imgpath from '~/static/images/logo.svg';
const seoul = { lat: 37.5642135, lng: 127.0016985 };

export default {
    name: 'MapContent',
    layout: 'index',
    data() {
        return {
            place: 'Singapore',
            zoom:12,
            isNowList: {
                La: {},
                em: {}
            },
            shape: {
                coords: [10, 10, 10, 15, 15, 15, 15, 10],
                type: 'poly'
            },
            makerImg: {
                url: 'https://an2-img.amz.wtchn.net/image/v2/gL_DmC5m7rzEdBNnml8ybQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1KbklsMHNJbkFpT2lJdmRqSXZjM1J2Y21VdmFXMWhaMlV2TVRZNE1EVXhOVFk1TnpBNE9ERTBOakV3TnlJc0luRWlPamd3TENKM0lqb3hPVEl3ZlEuOEtVTGZueEJKRnllcUlSdzdjZVVCR2dwdjJ4dV9lR2xfVVpIWDNMSGNZcw',
                scaledSize: { width: 30, height: 30 },
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
                    height: -35
                }
            },
        }
    },
    computed: {
        ...mapState(['EVENT_DATA'])
    },
    created() {
        this.ACTION_MAP_LIST()
    },
    mounted() {
        this.$nextTick(() => {
         navigator.geolocation.getCurrentPosition((position) => {
                console.log(position?.coords?.latitude, position?.coords?.longitude
                )
                this.center = {
                    lat: position?.coords?.latitude,
                    lng: position?.coords?.longitude
                }
            });
       })
    },
    methods: {
        ...mapMutations(['MUTATIONS_MAP_LIST','MUTATIONS_MAP_MAKERS_LIST']),
        ...mapActions(['ACTION_MAP_LIST', 'ACTION_MAP_PLACE_ID']),

        onClickMaker(v, e) {
            console.log(v)
            console.log(e)
            this.$refs.googleMap.panTo({
                lat: v.position.lat,
                lng: v.position.lng
            });

            this.infoWindowPos = v.position;
            this.infoOptions.content =
                `<i>${v.detailData?.title}</i><br>
            <img src="${v.detailData?.firstimage}" width="40">
                `;

            if (this.currentMidx === e) {
                this.infoWinOpen = !this.infoWinOpen;
            }
            else {
                this.infoWinOpen = true;
                this.currentMidx = e;

            }
        },

        onClickCluster(v) {
            console.log(v)
        },
        setPlaceText(place) {
            this.place = place;
        },
        setPlace(place) {
            this.latLng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };
        },
        onClickToDetail(v, p) {
            console.log(v)
            if (v?.place_id) {
                this.$router.push(`/detail?place=${v?.secretKey}`)
            } else {
                this.ACTION_MAP_PLACE_ID(v)
            }
        },
        onChangeMap(v) {
            console.log(v?.La, v?.eb)
            this.isNowList = v
        },
        onLoadMapData(v) {
            console.log('drag')
        },
        tilesloaded(v) {
            console.log('tilesloaded',v)
            if(this.isNowList) {
                this.MUTATIONS_MAP_MAKERS_LIST(this.isNowList)
            }
        },
        onClickListToCenter(v) {
              this.$refs.googleMap.panTo({
                lat: v.position.lat,
                lng: v.position.lng
              });
            this.zoom = 17
        }
    }
}
</script>

<style lang="scss" >
.gmnoprint {
    >.gm-svpc {
        background: red !important;
    }
}
</style>
