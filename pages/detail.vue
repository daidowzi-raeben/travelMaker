<template>
    <div>

       <div>
        <div>
            <img :src="EVENT_DATA.DETAIL?.detailPhoto" width="200" />
           </div>
           <div>행사명 : {{ EVENT_DATA.DETAIL?.title }}</div>
           <div>행사기간 : {{ EVENT_DATA.DETAIL?.eventstartdate }} ~ {{ EVENT_DATA.DETAIL?.eventenddate }}</div>
           <div>행사시간 : {{ EVENT_DATA.DETAIL?.playtime }}</div>
           <div>연락처 : {{ EVENT_DATA.DETAIL?.sponsor1tel }}</div>
           <div>가격 : {{ EVENT_DATA.DETAIL?.usetimefestival }}</div>
           <div>주소 : {{ EVENT_DATA.DETAIL?.addr1 }} {{ EVENT_DATA.DETAIL?.addr2 }}</div>
           <div>장소 : {{ EVENT_DATA.DETAIL?.eventplace }}</div>
           <div>홈페이지 : {{ EVENT_DATA.DETAIL?.eventhomepage }}</div>
           <div>주최자 : {{ EVENT_DATA.DETAIL?.sponsor1 }}</div>
           <div>주최자연락처 : {{ EVENT_DATA.DETAIL?.sponsor1tel }}</div>
           <div>주최자2 : {{ EVENT_DATA.DETAIL?.sponsor2 }}</div>
           <div>주최자연락처2 : {{ EVENT_DATA.DETAIL?.sponsor2tel }}</div>
           <div>평점 : {{ EVENT_DATA.DETAIL?.totalRating }}</div>
       </div>
       
       <div style="margin:20px 0;">
        <el-button @click="lang='ko'">한국</el-button>
        <el-button @click="lang='ja'">일본</el-button>
        <el-button @click="lang='zh'">중국</el-button>
       </div>
       <div v-for="v, i in EVENT_DATA.REVIEW" :key="i">
            <div v-if="v.language.substr(0,2) === lang">
                <div>
                    <img :src="v.profile_photo_url" width="50">
                </div>
            <div>
                작성자 : {{ v.author_name }} ({{ v.relative_time_description }}) / 별점: {{ v.rating }}
            </div>
            <div>
                {{ v.text }}
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
            lang:'ko'
        }
    },
    computed: {
        ...mapState(['EVENT_DATA'])
    },
    created() {
        console.log('>>', this.$route.query?.place)
    },
    mounted() {
        const params = {
            contentid: String(this.$route.query?.place)
        }
        this.ACTION_MAP_DETAIL(params)
    },
    methods: {
        ...mapMutations(['MUTATIONS_MAP_LIST']),
        ...mapActions(['ACTION_MAP_DETAIL']),
    }
}
</script>

<style lang="scss" ></style>
