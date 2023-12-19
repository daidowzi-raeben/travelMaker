<template>
    <div class="wrap">

        <!-- <gmap-place-input :default-place="place"@place_changed="setPlace">
   </gmap-place-input> -->
   <div class="map-wrap" ref="map">
        <gmap-map ref="googleMap" :center="center" :zoom="zoom" class="map-view"
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
        <div class="map-list" :class="{ active: !listFold }">
            <button type="button" class="btn btn-fold" :class="{ active: !listFold }" @click="listFold = !listFold"></button>
            <div class="map-list--tit">근처 목록</div>
            <div class="scroll">
                <div v-for="v,i in EVENT_DATA.MAKERS_LIST" :key="i" class="item" >
                    <div class="img-wrap" @click="onClickListToCenter(v)">
                        <img v-if="v.detailData.firstimage" :src="v.detailData.firstimage" alt="" />
                        <img v-else src="../static/images/Thumbnail.svg" alt="" />
                    </div>
                    <div class="txt-wrap">
                        <div  @click="onClickListToCenter(v)">
                        <div class="tit">{{ v.detailData.title }}</div>
                        {{ v.detailData.eventstartdate }} ~ {{ v.detailData.eventenddate }}<br />
                        </div>
                        <el-button type="info" plain size="mini" @click="modalDetailOpen(v.detailData)">상세보기</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
        <div class="modal" v-bind:class="{ show: modalShow }">
            <div class="modal-dim"></div>
            <div class="modal-con full" v-if="modalShow">
                <button type="button" class="btn btn-close" @click="modalDetailClose">&times;</button>
                <div class="detail-wrap">
                    <div class="detail-img" >
                    <el-carousel :autoplay="false" arrow="always">
                        <template v-if="EVENT_DATA.PHOTOS_COMN.length === 0 && EVENT_DATA.PHOTOS.length === 0">
                            <el-carousel-item>
                        <img :src="EVENT_DATA.DETAIL?.detailPhoto"  height="100%"/>
                        </el-carousel-item>
                        </template>
                        <el-carousel-item v-for="item in EVENT_DATA.PHOTOS_COMN.length > 3 ? 4 : EVENT_DATA.PHOTOS_COMN.length"
                        :key="`comn${item}`">
                        <img
                            v-if="EVENT_DATA.PHOTOS_COMN && EVENT_DATA.PHOTOS_COMN[item - 1] && EVENT_DATA.PHOTOS_COMN[item - 1]?.originimgurl"
                            :src="EVENT_DATA.PHOTOS_COMN && EVENT_DATA.PHOTOS_COMN[item - 1] ? EVENT_DATA.PHOTOS_COMN[item - 1]?.originimgurl : ''"
                            height="100%" />
                        </el-carousel-item>
                        <template v-if="EVENT_DATA.PHOTOS_COMN.length === 0">
                        <el-carousel-item v-for="item in EVENT_DATA.PHOTOS.length > 3 ? 4 : EVENT_DATA.PHOTOS.length" :key="item">
                            <img v-if="EVENT_DATA.PHOTOS && EVENT_DATA.PHOTOS[item] && EVENT_DATA.PHOTOS[item]?.imgUrl"
                            :src="EVENT_DATA.PHOTOS && EVENT_DATA.PHOTOS[item] ? EVENT_DATA.PHOTOS[item]?.imgUrl : ''"
                            height="100%" />
                        </el-carousel-item>
                        </template>
                    
                    </el-carousel>
                    </div>
                    <div class="detail-info">
                    <div class="tit">{{ EVENT_DATA.DETAIL?.title }}</div>
                    <div class="info">
                        <p class="line">
                        <!-- <span class="text">{{ LOCATION_CODE[`do${EVENT_DATA.DETAIL?.}`] }}</span> / -->
                        <!-- <span class="text">축제</span> -->
                        <span class="text">
                            <el-rate disabled show-score text-color="#000" :colors="['#5345DB','#5345DB','#5345DB','#5345DB','#5345DB']"
                            :score-template="`{value} ${VIEW_TEXT.EvnPt}`"
                            :value="EVENT_DATA.DETAIL?.totalRating ? Number(EVENT_DATA.DETAIL?.totalRating) : 0">
                            </el-rate>
                        </span>
                        </p>
                        <!-- <p class="line">
                        <span class="text">{{ VIEW_TEXT.EvnOvrDsc }}</span>
                        </p> -->
                    </div>
                    </div>
                    <!-- <el-menu id="detailHeader" :default-active="activeIndex" class="el-menu-demo sticky" mode="horizontal"
                    @select="handleSelect">
                    <el-menu-item index="0">{{ VIEW_TEXT.evnBasInfo }}</el-menu-item>
                    <el-menu-item index="1">{{ VIEW_TEXT.evnUseInfo }}</el-menu-item>
                    <el-menu-item index="2">{{ VIEW_TEXT.EvnRev }}</el-menu-item>
                    <el-menu-item index="3">{{ VIEW_TEXT.evnDtlInfo }}</el-menu-item>
                    </el-menu> -->
                    <div class="detail-con" ref="index0">
                    <div class="detail-con--tit">기본정보</div>
                    <table class="table">
                        <colgroup>
                        <col width="100px" />
                        <col width="auto" />
                        </colgroup>
                        <tr>
                        <th>주소</th>
                        <td>
                            {{ EVENT_DATA.DETAIL?.addr1 }} {{ EVENT_DATA.DETAIL?.addr2 }}
                        </td>
                        </tr>
                        <tr>
                        <th>우편번호</th>
                        <td>
                            {{ EVENT_DATA.DETAIL?.comn_zipcode }}
                        </td>
                        </tr>
                        <tr>
                        <th>주최자</th>
                        <td>
                            {{ EVENT_DATA.DETAIL?.comn_telname }}
                        </td>
                        </tr>
                        <tr>
                        <th>전화번호</th>
                        <td>
                            {{ EVENT_DATA.DETAIL?.comn_tel }}
                        </td>
                        </tr>
                        <tr>
                        <th>홈페이지</th>
                        <td>
                            <div v-html="EVENT_DATA.DETAIL?.comn_homepage"></div>
                        </td>
                        </tr>
                    </table>
                    </div>
                    <div class="detail-con" ref="index1">
                    <div class="detail-con--tit">이용안내</div>
                    <table class="table">
                        <colgroup>
                        <col width="100px" />
                        <col width="auto" />
                        </colgroup>
                        <tr>
                        <th>진행기간</th>
                        <td>
                            {{ EVENT_DATA.DETAIL?.eventstartdate }} ~ {{ EVENT_DATA.DETAIL?.eventenddate }}
                        </td>
                        </tr>
                        <tr>
                        <th>진행시간</th>
                        <td>
                            <span v-html="EVENT_DATA.DETAIL?.playtime"></span>
                        </td>
                        </tr>
                        <tr>
                        <th>진행장소</th>
                        <td>
                            {{ EVENT_DATA.DETAIL?.eventplace }}
                        </td>
                        </tr>
                        <tr>
                        <th>연령제한</th>
                        <td>
                            {{ EVENT_DATA.DETAIL?.agelimit }}
                        </td>
                        </tr>
                    </table>
                    </div>
                    <div ref="index2" class="detail-con">
                    <div class="detail-con--tit">
                        구글리뷰
                        <router-link to="" class="right">더보기</router-link>
                    </div>
                    <div v-if="EVENT_DATA.REVIEW.length === 0" class="nodata type2">
                        <img src="../static/images/nodata.svg" alt="" />
                        리뷰가 없어요.
                    </div>
                    <template v-else>
                        <div v-for="v, i in EVENT_DATA.REVIEW" :key="i" class="review-wrap">
                        <div v-if="v.language.substr(0, 2) === lang">
                            <div class="info">
                            <div class="img">
                                <img :src="v.profile_photo_url" width="50">
                            </div>
                            <div>
                                <div class="text">
                                작성자 : {{ v.author_name }} ({{ v.relative_time_description }}) <br />
                                <el-rate disabled show-score text-color="#000" :colors="['#5345DB', '#5345DB', '#5345DB', '#5345DB', '#5345DB']"
                                    :score-template="`{value} ${VIEW_TEXT.EvnPt}`" :value="Number(v.rating)">
                                </el-rate>
                                </div>
                            </div>
                            </div>
                            <div class="con">
                            {{ v.text }}
                            </div>
                        </div>
                        </div>
                    </template>
                    </div>
                    <div class="detail-con" ref="index3">
                    <div class="detail-con--tit">상세정보</div>
                    <div v-html="EVENT_DATA.DETAIL?.comn_overview"></div>
                    <!-- <div v-for="v, i in EVENT_DATA.PHOTOS" :key="i">
                        <img :src="v.imgUrl" width="100%" />
                    </div> -->
                    </div>
                </div>
            </div>
        </div>
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
            listFold: true,
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
                url: './images/spot.svg',
                scaledSize: { width: 30, height: 40 },
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

            lang: 'ko',
            activeIndex: '0',
            scrollPostion: 0,
            indexOffset: [],

            modalShow:false,
        }
    },
     head() {
        return {
            title: '트립포인트 지도 보기'
        }
    },
    computed: {
        ...mapState(['EVENT_DATA', 'VIEW_TEXT']),
        ...mapState(['LOCATION_CODE'])
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
        ...mapActions(['ACTION_MAP_DETAIL']),

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
            if (v?.place_id) {
                this.$router.push(`/festival/detail?place=${v?.secretKey}`)
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
        onClickListToCenter( v) {
            this.$refs.googleMap.panTo({
            lat: v.position.lat,
            lng: v.position.lng
            });
            // this.zoom = 17
        },
        // handleSelect(key, keyPath) {
        //     if (!key) return
        //     const keyVal = Number(key)
        //     window.scroll({
        //         top: this.indexOffset[keyVal] - 20,
        //         left: 0,
        //         behavior: 'smooth'
        //     });
        // },
        modalDetailOpen(v){
            const params = {
                contentid: String(v?.secretKey)
            }
            this.ACTION_MAP_DETAIL(params)
            this.modalShow = true
        },
        modalDetailClose(){
            this.modalShow = false
            const params = {
                contentid: ''
            }
            this.ACTION_MAP_DETAIL(params)
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
