<template>
    <div class="wrapper">
        <label> 제목
            <input type="text" v-model = "diary.title">
        </label><br>
        <textarea v-model = "diary.contents" cols="30" rows="10"></textarea><br/>
        <button @click = "save" >수정</button>
        <button @click = "cancel(diary.id)">취소</button>
    </div>
</template>
<script>

export default ({
    data() {
        return {
            updateDiary : null,
        };
    },
    computed: {
        //현재 사용자의 일기목록 중 일기id와 일치하는 일기내용을 반환한다.
        diary() {
            return this.$store.state.diaryList.filter(item => item.user === this.$store.state.currentUser&&item.id === this.$route.params.no)[0];        
        }
    },
    methods: {
        //입력한 수정내역을 변수에 담아 보내고, 수정내용을 저장한다.
        save() {
            this.updateDiary = Object.assign({},this.diary);
            console.log(Object.is(this.updateDiary, this.diary));
            this.$store.commit('updateOne', this.updateDiary);
            this.$router.push("/diary/list");
            alert("글이 수정되었습니다.");
        },
        cancel(id) {
            this.$router.push({ name: "DiaryDetailByNo", params: { no : id}})
        }
    }
})
</script>
<style scoped>
    .wrapper {
        margin: 50px auto;
        width: 60%;
    }
    input {
        width : 80%;
        margin: 20px;
        height: 30px;
        border : 1px solid #cccc;
        border-radius: 5px;
    }
    textarea {
        width : 80%;
        height: 600px;
        border : 1px solid #cccc;
        border-radius: 5px;
    }
    button {
        width : 100px;
        height : 40px;
        background : gold;
        box-shadow: none;
        color: white;
        font-size: 16px;
        margin : 10px;
    }
</style>
