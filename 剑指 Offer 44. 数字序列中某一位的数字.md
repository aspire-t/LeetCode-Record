## [剑指 Offer 44. 数字序列中某一位的数字](https://leetcode-cn.com/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/)

一位数一共有9个数即 9 × 1 个数字
二位数一共有90个数即 90 × 2 个数字
三位数一共有900个数即 900 × 3 个数字
······
发现规律：
设数字number，digit表示其为几位数，start表示该为位数的起始第一个数是多少（比如二位数起始第一个数字为10）。则该数字所在位数的所有数包含的数字个数为：count = digit * start * 9。

```js
/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    if(n.length<=10){
        return n;
    }      
    let digit=1,start=1,count=9;
    while(n>count){
        n-=count;
        digit+=1;
        start=start*10;
        count=start*digit*9;
    }
    // n - 1 是因为是从0开始算
    let num=start+(n-1)/digit;
    let index=(n-1)%digit;
    // '200'.chartAt(0) === '2' '200'.chartAt(1) === '0'
    return num.toString().charAt(index);
};
```

