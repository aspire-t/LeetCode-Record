## [剑指 Offer 43. 1～n 整数中 1 出现的次数](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/)

#### 方法一：枚举每一数位上 1 的个数

```js
/**
从低往高位，计算每一位的数量：
第1位上的1有：1+(n-1)/10
第2位上的1有：(1+(n/10-1)/10)*10
第3位上的1有：(1+(n/100-1)/10)*100
……
第k+1位上的1有：(1+(n/(10^k)-1)/10)*(10^k)
如果n的第k+1位上是1，则说明可能没有填满该位，计算第k+1位的数量时还要 -10^k+1+n%(10^k)，相当于独立计算
 */
var countDigitOne = function(n) {
    // mulk 表示 10^k
    // 在下面的代码中，可以发现 k 并没有被直接使用到（都是使用 10^k）
    // 但为了让代码看起来更加直观，这里保留了 k
    let mulk = 1;
    let ans = 0;
    for (let k = 0; n >= mulk; ++k) {
        ans += (Math.floor(n / (mulk * 10))) * mulk + Math.min(Math.max(n % (mulk * 10) - mulk + 1, 0), mulk);
        mulk *= 10;
    }
    return ans;
};
```

### 方法二：递归

获取4666中出现的1
可以拆成 999 + (1999 - 1000) + (2999 - 2000) + (3999 - 3000) + (4666 - 4000) 这几个区间的1出现次数
其中(1999 - 1000)区间中的1出现在最高位和其他位中，所有要额外算上高位为1时，高位1出现的次数
其中(4666 - 4000)区间的数量和其他区间不一样，也要额外算
最后要算上剩下4个区间999中出现1的次数

所以4666出现的1有：高位为1时高位为1的次数 + 最大高位区间出现的1 + 剩余区间出现1的次数

```js
// 自顶向下
var countDigitOne = function (n) {
    if (n < 10) return Math.ceil(n / 10);
    const s = n + '';
    // 10 ** n的位数
    const m = 10 ** (s.length - 1);
    // 获取n的高位数
    const hi = +s[0];
    // 高位数为1时，获取高位1出现的数量
    const one = hi === 1 ? n % m + 1 : m;
    // (1)xxx 高位的1 + (hi)xxx xxx里1 + [0, hi)xxx xxx里的1 
    return one + countDigitOne(n % m) + hi * countDigitOne(m - 1);
};
```

