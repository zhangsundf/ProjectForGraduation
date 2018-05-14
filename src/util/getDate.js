export default{
    install(Vue){
        Date.prototype.format = function() {  
            var s = '';  
            var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));  
            var day = this.getDate()>=10?this.getDate():('0'+this.getDate());  
            s += this.getFullYear() + '-'; // 获取年份。  
            s += mouth + "-"; // 获取月份。  
            s += day; // 获取日。  
            return (s); // 返回日期。  
        };  

       
    }
}