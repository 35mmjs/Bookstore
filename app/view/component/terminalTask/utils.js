export function openTimeStr(d1) { //di作为一个变量传进来
  let dateBegin = new Date(d1); //将-转化为/，使用new Date
  let dateEnd = new Date(); //获取当前时间
  let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  let leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  let seconds = Math.round(leave3 / 1000)
  // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
  // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
  //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
  return dayDiff + '天 ' + hours + '小时 ' + minutes + '分钟';
}
