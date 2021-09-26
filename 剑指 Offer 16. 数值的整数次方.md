## [剑指 Offer 16. 数值的整数次方](https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/)

### 方法一：递归

使用递归的方法：

- n=0时，任何x都返回1
- n=1时，返回x
- n=-1时，返回1/x

对于其他n值：

- 当n为偶数时，myPow(x,n) = myPow(x,n/2)* myPow(x,n/2)
- 当n为奇数时：myPow(x,n) = myPow(x,(n-1)/2) * myPow(x,(n-1)/2) * x

注意
递归时先用一个变量取得myPow(x,n/2)的值再平方，可以降低时间复杂度（减少递归调用的次数）

```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if(n === 0) return 1;
    if(n === 1) return x;
    if(n === -1) return 1/x;
    if(n%2===0){
        let a = myPow(x,n/2);
        return a * a
    }
    else{
        let b = myPow(x,(n-1)/2);
        return b*b*x
    }
}

```

### 方法二: 二分法

为了方便讨论，假设指数exponent是正数。那么递归式如下：

- 如果exponent是偶数，Power(base, exponent) = Power(base, exponent / 2) * Power(base, exponent / 2)
- 如果exponent是奇数，Power(base, exponent) = base * Power(base, exponent / 2) * Power(base, exponent / 2)
  对于负指数exponent的情况，取其绝对值先计算。将最后结果取倒数即可。

时间复杂度是 O(logN)；由于采用递归结构，空间复杂度是 O(logN)。

```js
// ac地址：https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/
// 原文地址：https://xxoo521.com/2019-12-31-pow/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    const isNegative = n < 0; // 是否是负指数
    const result = absMyPow(x, Math.abs(n));
    return isNegative ? 1 / result : result;
};

function absMyPow(base, exponent) {
    if (exponent === 0) {
        return 1;
    }

    if (exponent === 1) {
        return base;
    }

    const subResult = absMyPow(base, Math.floor(exponent / 2));
    return exponent % 2 ? subResult * subResult * base : subResult * subResult;
}
```

### 方法三：位运算

第 2 种解法可以转换为迭代写法。迭代写法和位运算有关。

为了理解，假设 base=3，exponent= 5。那么 5 的二进制是：101。所以，3 的 5 次方可以写成下图的格式：

![](./images/剑指offer/16.jpg)

可以看到，对 base 进行自乘，导致 base 的指数每次都扩大 2 倍。与 exponent 的二进制相对应。

以上图为例，整个算法的流程如下：

- 结果值 result 初始为 1
- base 初始为 3，此时 exponent 的二进制最右位为 1，更新结果为：base * result
- exponent 右移一位。base 进行累乘，base 更新为 3 的 2 次方。由于 exponent 的二进制最右位为 0，不更新结果
- exponent 右移一位。base 进行累乘，base 更新为 3 的 4 次方。此时 exponent 的二进制最右位为 1，更新结果为：base * result
  结束

```js
// ac地址：https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/
// 原文地址：https://xxoo521.com/2019-12-31-pow/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0) {
        return 1;
    }
    if (n === 1) {
        return x;
    }

    const isNegative = n < 0; // 是否是负指数
    let absn = Math.abs(n);
    let result = 1;
    while (absn) {
        // 如果n最右位是1，将当前x累乘到result
        if (absn & 1) {
            result = result * x;
        }

        x = x * x; // x自乘法
        absn = Math.floor(absn / 2); // n右移1位
    }

    return isNegative ? 1 / result : result;
};
```

