const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
Array.prototype.removeArray = function( _obj) {//删除数组中某个对象
  var length = this.length;
  var that = this
  for (var i = 0; i < length; i++) {
    if (isObjectValueEqual(that[i], _obj)) {
      if (i == 0) {
        that.shift(); //删除并返回数组的第一个元素
        return that;
      }
      else if (i == length - 1) {
        that.pop();  //删除并返回数组的最后一个元素
        return that;
      }
      else {
        that.splice(i, 1); //删除下标为i的元素
        return that;
      }
    }
  } 
}

function isObjectValueEqual(a, b) {//比对两个数组
//取对象a和b的属性名
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  //判断属性名的length是否一致
  if (aProps.length != bProps.length) {
    return false;
  }
  //循环取出属性名，再判断属性值是否一致
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}
