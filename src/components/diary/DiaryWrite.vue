<template>
    <div class="wrapper">
        <label> <strong>제목</strong>
            <input type="text" v-model.trim = "diary.title">
        </label><br/>
        <textarea v-model.trim = "diary.contents" cols="30" rows="10"></textarea><br/>
        <button @click = "save" ><b>저장</b></button>
        <button @click = "cancel"><b>취소</b></button>
    </div>
</template>
<script>

export default ({
    data() {
        return {
            diary : {
                user: '',
                id: '',
                title: '',
                contents: '',
                regDate: ''
            },
        };
    },
    methods: {
        save() {
            if(!this.diary.title&&!this.diary.contetns){
                alert("제목과 내용을 입력해주세요.");
            }else{
                this.diary.user = this.$store.state.currentUser;
                this.diary.regDate = this.getToday()+" "+this.getTime();
                this.$store.commit('writeOne', this.diary);
                this.$router.push('/diary/list');
            }
        },
        cancel() {
            this.$router.push('/diary/list');
        },
        //작성일을 YYYY-MM-DD 형태로 반환한다.
        getToday() {
            let date = new Date();
            let year = date.getFullYear();
            let month = ('0'+(1+date.getMonth())).slice(-2);
            let day = ('0'+date.getDate()).slice(-2);

            return year+"-"+month+"-"+day;
        },
        //작성시간을 hh:mm:ss 형태로 반환한다.
        getTime() {
            let today = new Date();   
            let hours = ('0' + today.getHours()).slice(-2); 
            let minutes = ('0' + today.getMinutes()).slice(-2);
            let seconds = ('0' + today.getSeconds()).slice(-2); 
                return  hours + ':' + minutes  + ':' + seconds;
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
