<!--일기의 상세내용이 보여지는 화면으로, 제목/글내용/작성시간으로 구성된다. 목록 돌아가기/일기 수정/일기 삭제기능으로 구성된다. -->
<template>
    <div class="wrapper">
        <div class="diary__add-info">
            <span v-if = "diary.weather=='sunny'"><i class="el-icon-sunny"></i></span>
            <span v-if = "diary.weather=='cloudy'"><i class="el-icon-cloudy"></i></span>
            <span v-if = "diary.weather=='rain'"><i class="el-icon-heavy-rain"></i></span>
            <span v-if = "diary.weather=='snow'"><i class="el-icon-light-rain"></i></span>
            <span>{{diary.emotion}}</span>
        </div>
        <div class="diary__title">
            <strong>{{diary.title}}</strong>
            <el-button-group>
                <el-button icon="el-icon-back"  @click = "showList"></el-button>  
                <el-button icon="el-icon-edit-outline" @click = "showUpdate(diary.id)"></el-button>  
                <el-button icon='el-icon-delete' @click = "remove(diary.id)"></el-button>  
            </el-button-group>
        </div>
        <div class="diary__datetime">
            {{getDay(diary.regDate)+" "+getTime(diary.regDate)}}
        </div>
        <el-divider></el-divider>
        <div>
            {{diary.contents}}
        </div>
    </div>
</template>
<script>

export default ({
    name: 'DiaryDetail',
    data() {
        return {
            // diary : '',
        }
    },
    computed: {
        //현재 사용자의 일기내역 중 요청한 일기id와 일치하는 일기내용을 반환한다.
        diary() {
            // return this.$store.state.diaryList.filter(item => item.user === this.$store.state.currentUser&&item.id === this.$route.params.no)[0];            
            return this.$route.params.diary;
        },
    },
    // mounted() {
    //     console.log(this.$route.params.no);
    //     this.getList();
    //     console.log('다이어리 값에 들어왔는지 확인'+this.diary);
    // },
    methods: {
        getList() {
            const no = this.$route.params.no;
            this.diary = this.$store.getters.userDiary.filter(function(item) {
                item.id === no
             })[0];
             console.log(this.diary);
        },
        showList() {
            this.$router.push('/diary/list');
        }, 
        showUpdate(id) {
            this.$router.push({name: 'DiaryUpdateByNo', params: { no : id , formMode : '수정' }});
        },
        remove(id) {
            this.$confirm('작성하신 글을 삭제하겠습니까?', 'Warning', {
                confirmButtonText: '예',
                cancelButtonText: '아니오',
                type: 'warning'
            }).then(() => {
                this.$store.commit('deleteOne',id);
                this.$router.push('/diary/list');
                this.$message({
                type: 'success',
                message: '글이 삭제되었습니다.'
            });        
            });
        },
        //작성일을 YYYY-MM-DD 형태로 반환한다.
        getDay(date) {
            let year = date.getFullYear();
            let month = ('0'+(1+date.getMonth())).slice(-2);
            let day = ('0'+date.getDate()).slice(-2);

            return year+"-"+month+"-"+day;
        },
        //작성시간을 hh:mm:ss 형태로 반환한다.
        getTime(date) {   
            let hours = ('0' + date.getHours()).slice(-2); 
            let minutes = ('0' + date.getMinutes()).slice(-2);
            let seconds = ('0' + date.getSeconds()).slice(-2); 
                return  hours + ':' + minutes  + ':' + seconds;
        },
    }
})
</script>
<style scoped>
    /* 전체 비율 조정 */
    .wrapper {
        width: 60%;
        margin: 0 auto;
        padding-top: 25px;
    }
    /* 날씨, 기분 */
    .diary__add-info, .diary__title, .diary__datetime{
        text-align: left;
    }

    .diary__title{
        margin: 10px 0;
    }

    .el-button-group {
        float: right;
    }

    .diary__datetime {
        color: gray;
        font-size: 14px;
    }
</style>
