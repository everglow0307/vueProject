<!--사용자의 모든 일기목록이 보여지는 화면으로, 검색기능 / 글작성/ 글삭제 / 글상세보기 기능으로 구성된다. -->
<template>
        <div id="diary-wrapper">
            <div class="diary-list-bar">
                <el-radio-group v-model = "listMode" class="list__mode">
                    <el-radio-button label="card"><i class="el-icon-postcard"></i></el-radio-button>
                    <el-radio-button label="timeline"><i class="el-icon-timer"></i></el-radio-button>
                </el-radio-group>
                <el-button icon="el-icon-edit" circle @click = "write" class="post"></el-button>
                <el-input v-model.trim = "keyword" prefix-icon="el-icon-search"  @keypress.native.enter = "searchList" class="list__search" clearable/>
            </div>
            <div class="list-wrapper">

            <el-divider></el-divider>
             <div v-show = "diaryList.length == 0">
                    <el-empty description="작성된 글이 없습니다."></el-empty>
            </div>
             <!--============================================================ 일기장 카드모드 ==========================================================-->
                <div class="list-card-wrapper" v-show = "listMode==='card' && diaryList.length != 0">
                    <el-card v-for = "(diary, index) in diaryList" :key = "diary.id" class="card__diary">
                        <div @mouseover = "toggleDeleteBtn(index, true)" @mouseout = "toggleDeleteBtn(index, false)" >
                            <el-button icon="el-icon-close" size="mini" class="btn__delete" v-show = "diary.showDelete" @click = "remove(diary.id)" circle></el-button>
                            <ul class="card__inner" @click = "showDetail(diary.id)">
                                <li class="card__date">{{ getDay(diary.regDate) }} </li>
                                <li class="card__title"><strong>{{diary.title}}</strong></li>
                                <li class="card__contents">{{diary.contents}}</li>
                            </ul>
                        </div>
                    </el-card>
                </div>
             <!--============================================================ 일기장 타임라인모드 ==========================================================-->
                <div class="list-timeline-wrapper" v-show = "listMode==='timeline' && diaryList.length != 0">
                    <el-timeline v-show = "diaryList">
                        <el-timeline-item v-for = "(diary, index) in diaryList" :key = "diary.id" placement="top">
                            <div class="timeline__date">{{getDay(diary.regDate)}}</div>
                            <el-card  @mouseover.native = "toggleDeleteBtn(index, true)" @mouseout.native = "toggleDeleteBtn(index, false)"> 
                                    <el-button icon="el-icon-close" size="mini" class="btn__delete" v-show = "diary.showDelete" @click = "remove(diary.id)" circle></el-button>
                                <div @click = "showDetail(diary.id)">
                                    <h4 class="timeline__title"> {{ diary.title }}</h4>
                                    <p class="timeline__datetime">{{getDay(diary.regDate)+" "+getTime(diary.regDate)}}작성</p>
                                </div>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            <!--============================================================================================================================================-->
                <el-divider></el-divider>
            </div>
        </div>
</template>
<script>
export default ({
    data(){
        return {
            deleteFlag : null,
            keyword : '',
            listMode : null,
            searchFlag: false,
        };
    },
    computed: {
        /**
         * 검색키워드가 입력되면 현재사용자의 일기목록 중 키워드와 일치하는 일기목록을 반환해주고,
         * 검색키워드가 없을경우 현재사용자의 모든 일기목록을 반환한다.
        */
        diaryList() {
            if(!this.searchFlag){
                return this.$store.getters.userDiary;
            }else{
                return this.$store.state.diaryList.filter(diary => diary.user.match(this.$store.state.currentUser)&&diary.title.includes(this.keyword));
            }
        },
    },
    // store에 저장된 목록 모드의 기본 값(card)을 세팅한다. 
    mounted() {
        this.listMode = this.$store.state.listMode;
    },
    /**
     * mode값 변경 시마다 store에 저장된 값을 변경하고,
     * 글작성, 글 상세보기로 이동 후 다시 목록으로 돌아왔을 때 이전의 목록 모드를 유지하기 위함이다.
     */
    updated() {  
        this.$store.commit('changeListMode', this.listMode);
    },
    methods: {
        write() {
            this.$router.push({ name: 'DiaryWrite', params: { formMode : '작성' }});
        },
        remove(id) {
            this.$store.commit('deleteOne', id);
            this.$message({
                message: '글이 삭제되었습니다.',
                type: 'success'
            });
        },
        /**
         * 검색창에 키워드를 입력하면 키워드와 일치하는 일기목록만 보여주고,
         * 키워드 미입력시 안내문구를 띄운다.
         * */
        searchList(){
            if(this.keyword){
                this.searchFlag = true;
            }else{
                this.$message({
                    message: '검색어를 입력해주세요.',
                    type: 'info'
                });
            }
        },
        showDetail(id) {
            console.log("리스트에서 확인 : "+this.$store.getters.userDiary.filter(item => item.id === id)[0]);
            this.$router.push({ name: "DiaryDetailByNo", params: { no : id , diary : this.$store.getters.userDiary.filter(item => item.id === id)[0] }});
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
         /*** 
         * 일기목록에 마우스를 올리면 동적으로 showDelete속성값을 추가하여 일기삭제버튼을 보여주고,
         * 마우스가 벗어나면 일기삭제버튼이 사라진다.
         *  */ 
        toggleDeleteBtn(index, isShow) {
            this.$set(this.diaryList[index], 'showDelete', isShow );
        },
    }
})
</script>
<style scoped>
    #diary-wrapper {
        width: 60%;
        margin: 0 auto;
    }
    
    /* 목록보기 모드 선택, 글작성 버튼 */
    .list__mode, .post{
        float:left;
        margin: 0 10px 20px 10px; 
    }

    /* 검색창 */
    .list__search{
        width: 20%;
        min-width: 100px;
    }

    /* 검색창위치조정 */
    .list__search, .btn__reset {
        float: right;
        margin: 0 10px;
    }

    .list-wrapper{
        clear:both;
    }

    /* 버튼스타일 */
    .btn__reset, .post {
        background : gold;
        color: white;
        border: none;
    }
    
    /* 카드모드 */
    .list-card-wrapper {
        clear:both;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    .card__diary{
        position: relative;
        width: 30%;
        min-width: 250px;
        height: 200px;
        margin: 10px 0;
    }
    .card__diary:hover {
        background: gold;
    }
    .card__inner{
        list-style: none;
        height: 160px;
    }
    .card__date{
        text-align: left;
    }
    .card__title, .card__contents{
        margin-top:10px;
    }
    .el-card:hover{
        background: gold;
    }

    /* 타임라인모드 */
    .list-timeline-wrapper{
        clear:both;
    }
    .timeline__date, .timeline__title, .timeline__datetime {
        text-align: left;
    }
    .timeline__title {
        margin-bottom: 20px;
    }
    .timeline__datetime {
        color:gray;
    }

    .btn__delete {
        position: absolute;
        right:20px;
    }
    .list-card-wrapper, .list-timeline-wrapper {
        height: 600px;
        overflow: auto;
    }

</style>
