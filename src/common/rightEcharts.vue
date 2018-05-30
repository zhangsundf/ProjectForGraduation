<template>
    <div class = "rightEcharts" @mouseout = "showRight">
        <div class = "todaySign">
        </div>
        <div class = "signByGrade"></div>
    </div>
</template>

<script>
export default {
    name:'rightEcharts',
    data () {
        return {
            subshowRightEcharts: this.showRightEcharts,
            sign:0,
            noSign:0,
            gradeList:[],
            nosignList:[],
            issignList:[]
        }
    },
    props: {
        'showRightEcharts': {
            type:Boolean,
            require:true
        },
        'signList': {
            type:Array,
            require:true
        }
        },
    methods: {
        caculateSign () {
            for (let i = 0; i < this.signList.length; i++) {
                if (this.signList[i].isSignin == true) {
                    this.sign += 1
                }
                if (this.signList[i].isSignin == false) {
                    this.noSign += 1
                }
            }
        },
        caculateSignByGrade () {
            for (let i = 0; i < this.signList.length; i ++ ) {
                if (this.gradeList.indexOf(this.signList[i].grade) === -1) {
                    this.gradeList.push(this.signList[i].grade)
                } 
            }
            for (let j = 0; j < this.gradeList.length; j ++) {
                let sign = 0
                let noSign = 0
                for (let k = 0; k < this.signList.length; k ++) {
                    if (this.gradeList[j] === this.signList[k].grade) {
                        if (this.signList[k].isSignin == true) {
                            sign ++
                        }
                        else {
                            noSign ++
                        }
                    }  
                }
                this.issignList.push (sign)
                this.nosignList.push (noSign)
            }
            
        },
        showRight (){
            this.subshowRightEcharts = !this.showRightEcharts
            this.$emit('showEcharts',this.subshowRightEcharts)
        },
        drawCircle () {
            this.caculateSign()
            var myecharts=this.$echarts.init(document.getElementsByClassName("todaySign")[0]);
            var option=({
                title:{
                    text:this.signList[0].date,//主标题文本，支持\n换行
                    x:'center'
                },
                legend: {
                    orient: 'axis',
                    left: 'left',
                    data: ['签到','未签到']
                },
                textStyle: {
                            color: 'rgb(0, 0, 0)'//文字的颜色
                        },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c}"
                },
                series : [
                    {
                        name: '签到情况',
                        type: 'pie',//每个系列，通过type决定自己的系列型号
                        radius: '50%',

                        data:[
                            {value:this.sign, name:'签到',itemStyle:{color:'#00FF7F'}},
                            {value:this.noSign, name:'未签到',itemStyle:{color:'#FFD700'}},
                            // {value:30, name:'良好',itemStyle:{color:'#FFA500'}},
                            // {value:30, name:'不及格',itemStyle:{color:'#FF0000'}}
                        ],
                        itemStyle: {//图形样式 normal，emphasis
                            emphasis: {
                                shadowBlur: 400,
                                shadowColor: 'rgb(0, 0, 0)'
                            }
                        },
                        label: {//饼形图上的文本标签
                            normal: {
                                textStyle: {
                                    color:'#f7f7f7'
                                }
                            }
                        },
                        labelLine: {//标签的视觉引导线
                            normal: {
                                lineStyle: {
                                    color:'#f7f7f7'
                                }
                            }
                        }
                    }
                ]
            });
            myecharts.setOption(option);
        },
        drawBar() {
            this.caculateSignByGrade()
            var signByGrade = this.$echarts.init(document.getElementsByClassName('signByGrade')[0])
            var labelOption = {
            normal: {
                show: true,
            
                fontSize: 16,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        };

       let  option = {
            color: ['green', 'yellow'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['签到','未签到']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: this.gradeList
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '签到',
                    type: 'bar',
                    barGap: 0,
                    label: labelOption,
                    data: this.issignList
                },
                {
                    name: '未签到',
                    type: 'bar',
                    label: labelOption,
                    data:this.nosignList
                }
            ]
                }
                signByGrade.setOption(option);
            } 
        },
    mounted() {
        this.drawCircle()
        this.drawBar()
    }
}
</script>

<style scoped>
    .rightEcharts {
        position: fixed;
        top:0px;
        right:0px;
        height: 100%;
        width:24%;
        z-index: 999;
        background-color:rgb(199, 193, 193);
        padding-top:5%;
    }
    .todaySign {
        position:relative;
        width:100%;
        height:45%;
    }
    .signByGrade {
        position:relative;
        width:100%;
        height:45%;
    }
</style>
