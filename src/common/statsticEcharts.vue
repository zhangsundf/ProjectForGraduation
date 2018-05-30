<template>
    <div class = "rightEcharts" @mouseout = "showRight">
        <div class = "abstract">
        </div>
        <div class = "gradeScore"></div>
    </div>
</template>

<script>
export default {
    name:'rightEcharts',
    data () {
        return {
            subshowRightEcharts: this.showRightEcharts,
            excellent: 0,
            medium:0,
            general:0,
            failed:0,
            excellentList: [],
            mediumList:[],
            generalList: [],
            failedList: [],
            gradeList: []
        }
    },
    props: {
        'showRightEcharts': {
            type:Boolean,
            require:true
        },
        'result': {
            type:Array,
            require:true
        }
    },
    methods: {
        ratingGrade() {
            for (let i = 0 ; i < this.result.length; i++) {
                if (this.result[i].sum >= 85) {
                    this.excellent ++
                }
                if ( this.result[i].sum >= 70 && this.result[i].sum < 85) {
                    this.medium ++
                }
                if ( this.result[i].sum >= 60 && this.result[i].sum < 70) {
                    this.general ++
                }
                if ( this.result[i].sum < 60) {
                    this.failed ++
                }
            }
        },
        ratingGradeByClass () {
            for (let i = 0; i < this.result.length; i ++ ) {
                if (this.gradeList.indexOf(this.result[i].grade) === -1) {
                    this.gradeList.push(this.result[i].grade)
                } 
            }
            for (let j = 0; j < this.gradeList.length; j ++) {
                let excellent = 0
                let medium = 0
                let general = 0
                let failed = 0
                for (let k = 0; k < this.result.length; k ++) {
                    if (this.gradeList[j] === this.result[k].grade) {
                        if (this.result[k].sum >= 85) {
                            excellent ++
                        }
                        if ( this.result[k].sum >= 70 && this.result[k].sum < 85) {
                            medium ++
                        }
                        if ( this.result[k].sum >= 60 && this.result[k].sum < 70) {
                            general ++
                        }
                        if ( this.result[k].sum < 60) {
                            failed ++
                        }
                    }  
                }
                this.excellentList.push (excellent)
                this.mediumList.push (medium)
                this.generalList.push(general)
                this.failedList.push(failed)
            }
        },
        showRight (){
            this.subshowRightEcharts = !this.showRightEcharts
            this.$emit('showEcharts',this.subshowRightEcharts)
        },
        drawCircle () {
            this.ratingGrade()
            var myecharts=this.$echarts.init(document.getElementsByClassName("abstract")[0]);
            var option=({
                title:{
                    text: '成绩统计情况',//主标题文本，支持\n换行
                    x:'center'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['优秀','中等','良好','不及格']
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
                        name: '成绩分布',
                        type: 'pie',//每个系列，通过type决定自己的系列型号
                        radius: '50%',
                        center: ['50%', '70%'],
                        data:[
                            {value:this.excellent, name:'优秀',itemStyle:{color:'#00FF7F'}},
                            {value:this.medium, name:'中等',itemStyle:{color:'#FFD700'}},
                            {value:this.general, name:'良好',itemStyle:{color:'#FFA500'}},
                            {value:this.failed, name:'不及格',itemStyle:{color:'#FF0000'}}
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
            this.ratingGradeByClass()
            var signByGrade = this.$echarts.init(document.getElementsByClassName('gradeScore')[0])
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
        }

       let  option = {
            color: ['#00FF7F', '#FFD700','#FFA500','#FF0000'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['优秀','中等','良好','不及格']
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
                    name: '优秀',
                    type: 'bar',
                    barGap: 0,
                    label: labelOption,
                    data: this.excellentList
                },
                {
                    name: '中等',
                    type: 'bar',
                    label: labelOption,
                    data:this.mediumList
                },
               {
                    name: '良好',
                    type: 'bar',
                    barGap: 0,
                    label: labelOption,
                    data: this.generalList
                },
                {
                    name: '不及格',
                    type: 'bar',
                    label: labelOption,
                    data:this.failedList
                }
            ]
                }
            signByGrade.setOption(option);
            } 
        },
        mounted () {
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
    .abstract {
        position:relative;
        width:100%;
        height:45%;
    }
    .gradeScore {
        position:relative;
        margin-top:10%;
        width:100%;
        height:45%;
    }
</style>
