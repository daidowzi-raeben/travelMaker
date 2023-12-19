<template>
  <div class="wrap">
    <div class="content">
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
              <!-- <span class="text">서울</span> /
              <span class="text">축제</span> -->
              <span class="text">
                <el-rate disabled show-score text-color="#000" :colors="['#fff', '#fff', '#5345DB']"
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
        <el-menu id="detailHeader" :default-active="activeIndex" class="el-menu-demo sticky" mode="horizontal"
          @select="handleSelect">
          <el-menu-item index="0">{{ VIEW_TEXT.evnBasInfo }}</el-menu-item>
          <el-menu-item index="1">{{ VIEW_TEXT.evnUseInfo }}</el-menu-item>
          <el-menu-item index="2">{{ VIEW_TEXT.EvnRev }}</el-menu-item>
          <el-menu-item index="3">{{ VIEW_TEXT.evnDtlInfo }}</el-menu-item>
        </el-menu>
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
            <img src="../../static/images/nodata.svg" alt="" />
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
                      <el-rate disabled show-score text-color="#000" :colors="['#fff', '#5345DB', '#5345DB']"
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
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// import imgpath from '~/static/images/logo.svg';
// const seoul = { lat: 37.5642135, lng: 127.0016985 };

export default {
  name: 'MapContentDetail',
  layout: 'index',
  data() {
    return {
      search: '',
      activeIndex: '0',
      lang: 'ko',
      scrollPostion: 0,

      indexOffset: [],
    }
  },
  head() {
    return {
      title: `${this.EVENT_DATA.DETAIL?.title}`,
      meta: [
        {
          hid: 'description',
          name: 'og:description',
          content: this.EVENT_DATA.DETAIL?.comn_overview,
        },
        {
          hid: 'description',
          name: 'og:image',
          property: 'og:image',
          content: this.EVENT_DATA.DETAIL?.detailPhoto
        },
      ]
    }
  },
  computed: {
    ...mapState(['EVENT_DATA', 'VIEW_TEXT'])
  },
  created() {
    console.log('>>', this.$route.query?.place)
  },
  async mounted() {
    const params = {
      contentid: String(this.$route.query?.place)
    }
    await this.ACTION_MAP_DETAIL(params)
    this.$nextTick(() => {
      document.addEventListener('scroll', this.scrollHandler)
      this.indexOffsetSeting()
    })
  },
  unmounted() {
    document.removeEventListener('scroll', this.scrollHandler)
  },
  beforeMount() {
    document.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    ...mapMutations(['MUTATIONS_MAP_LIST']),
    ...mapActions(['ACTION_MAP_DETAIL']),
    handleSelect(key, keyPath) {
      if (!key) return
      const keyVal = Number(key)
      // this.indexOffsetSeting()
      window.scroll({
        top: this.indexOffset[keyVal] - 20,
        left: 0,
        behavior: 'smooth'
      });

    },
    indexOffsetSeting() {
      const headerHeight = document.querySelector('.header').offsetHeight
      this.indexOffset[0] = this.$refs.index0.offsetTop - headerHeight
      this.indexOffset[1] = this.$refs.index1.offsetTop - headerHeight
      this.indexOffset[2] = this.$refs.index2.offsetTop - headerHeight
      this.indexOffset[3] = this.$refs.index3.offsetTop - headerHeight
    },
    scrollHandler() {
      if (this.$route.path !== '/festival/detail') return
      this.indexOffsetSeting()
      this.$nextTick(() => {
        const nowScroll = window.scrollY
        const isOffsetTop = []
        const isClientHeight = []
        this.indexOffset.forEach((v, i) => {
          isOffsetTop[i] = this.$refs[`index${i}`].offsetTop
          isClientHeight[i] = this.$refs[`index${i}`].clientHeight + isOffsetTop[i]
          if (nowScroll >= isOffsetTop[i] - 70 && nowScroll <= isClientHeight[i] - 70) {
            this.activeIndex = String(i)
          }
          // console.log(isOffsetTop[i], isClientHeight[i], nowScroll)
        });
      })

    },
  }
}
</script>

<style lang="scss" ></style>
