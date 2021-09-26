## [剑指 Offer 65. 不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/)

```js
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function(a, b) {
    /* 
        和s = 非进位和n + 进位c
        观察可知 n、c的计算公式
        n = a[i] ^ b[i] 异或运算 相同为0 不同为1
        c = a[i] & b[i] << 1 进位：与运算 + 左移一位 
        循环求n和c 知道进位c=0 此时的n即为我们所求和 
        eg: 1 + 1
        a                   b
        xx001            xx001
        -> 1. 第一次迭代 进位c 
        a & b        -> xx001
        (a & b) << 1 -> xx010
        -> 非进位和n（a）
        a ^ b -> xx000
        -> 更新b b = c	
        xx000          xx010
        -> 2. 第二次迭代 进位c   -> c = xx000    
        -> 非进位n ->  a = xx010
        -> 3. 第三次迭代 测试的b = c = xx000 进位为0 结束迭代循环 返回此时的n即 a的值xx010 即为所求
    */
    while (b) {
        let c = (a & b) << 1 // 进位
        a ^= b               // 非进位和
        b = c                // 进位
    }
    return a
};
```

