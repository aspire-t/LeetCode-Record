## [剑指 Offer 62. 圆圈中最后剩下的数字](https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/)

[约瑟夫环](https://blog.csdn.net/u011500062/article/details/72855826)

### 方法一：数学 + 递归

```js
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
 	return f(n, m);
}
function f(n, m) {
    if (n == 1) {
        return 0;
    }
    let x = f(n - 1, m);
    return (m + x) % n;
}
```

### 方法二：数学 + 迭代

```js
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
    let f = 0;
    for (let i = 2; i != n + 1; ++i) {
        f = (m + f) % i;
    }
    return f;
}
```

