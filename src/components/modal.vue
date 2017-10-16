<template>
    <div class="modal" v-show="s">
        <h1>123123</h1>
        <div class="modal_bg" @click="s = false"></div>
        <div class="modal_div">
            <p class="modal_head">
                <i @click="s = false"></i >
            </p>
            <h1>{{title}}</h1>
            <div class="modal_con">
                <slot></slot>
            </div>
            <div class="modal_btn">
                <a @click="s = false">取消</a>
                <a @click="ok"><b>确定</b></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Modal',
        props : ['title'],
        data (){
            return {
                s : true
            }
        },
        methods: {
            ok(){
                //this.s = !this.s;
                this.$emit('on-ok');
            },
            show(){
                this.s = !this.s;
            }
        },
        created (){

        }
    }

</script>

<style scoped lang="scss">
    .modal{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 997;
        width: 100%;
        height: 100%;

        .modal_bg{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 998;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
        }

        .modal_div{
            position: absolute;
            top: 50%;
            left: 10%;
            z-index: 999;
            width: 80%;
            height: auto;
            background: #fff;
            border-radius: 3px;
            transform: translate(0, -50%);

            h1{
                margin: 0 0 17px;
                color: #000;
                font-size: 17px;
                line-height: 24px;
                text-align: center;
            }

            .modal_head{
                margin: 0;
                padding: 9px 9px 0;
                height: 27px;

                i{
                    float: right;
                    display: block;
                    width: 18px;
                    height: 18px;
                    // background: url(../../assets/img/x@3x.png) no-repeat center / 25px;
                }
            }
        }

    }
    .modal_con{
        padding: 0 13px 15px;
    }

    .modal_btn{
        display: flex;
        height: 49px;
        border-top: 1px solid #e7e7e7;

        a{
            flex: 1;
            position: relative;
            height: 100%;
            color: #000;
            line-height: 49px;
            font-size: 15px;
            text-align: center;

            &:first-child:before{
                position: absolute;
                display: block;
                content: '';
                top:0;
                right: 0;
                width: 1px;
                height: 100%;
                border-right: 1px solid #e7e7e7;
            }
        }
    }

</style> 