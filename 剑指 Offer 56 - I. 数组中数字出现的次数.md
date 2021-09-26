## 剑指 Offer 56 - I. 数组中数字出现的次数

### 方法一：两次循环

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
  const res=[]
  nums.sort((a,b)=>a-b)
  for(let i=0;i<nums.length;i++){
    if(nums[i]===nums[i+1]){
        i++
        continue
    }
    res.push(nums[i])
  }
  return res
}

// 优化，单次循环
const singleNumbers = (nums) => {
  const obj = {}
  nums.forEach(item => {
    if (obj[item]) {
      delete obj[item]
    } else {
      obj[item] = true
    }
  })
  return Object.keys(obj)
}
```

### 方法二：位运算

- 遍历数组，将所有的数据做异或运算，最后的结果记为num1,由于相同的数异或运算是0，所以最后的结果一定是那两个不同的数据异或出来的结果，而且一定不是0，不为0意味着转化为二进制一定有一个位置上为1。(核心))
- 通过与(&)运算，选定一个位为1的位置i，再次遍历数组，当前数据二进制位i上为0的数据放在a组，当前数据二进制位i上为1的数据放在b组【思考：相同的数据，一定会被分在同一组，不同的两个数一定会在不同的组（因为异或计算为1表明当前位上的数据一个为0，一个为1）】
- 最后将a组和b组分别做异或运算就会得到这两个不同的数
- 【思考：思路2是否满足空间复杂度是O(1)的条件？】
- 其实是满足的，我们不用记录中间数组，直接计算异或值，只需要4个变量即可：
- num1:记录所有数据的异或运算结果num1，用来选定分组位i
- count:选定分组依据count
- num2:记录第二次遍历数据与count的与运算结果为0的异或结果
- num3:记录第二次遍历数据与count的与运算结果不为0的异或结果

```js
const singleNumbers = (nums) => {
  // 计算异或值
  let num1 = 0
  for (let i = 0; i < nums.length; i++) {
    num1 = num1 ^ nums[i];
  }
  // 通过与(&)选定1的位置
  let count = 1
  while((num1&count) === 0) {
    count = count * 2
  }
  // 分组
  let num2 = 0
  let num3 = 0
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if ((num & count) === 0) {
      num2 = num2^num
    } else {
      num3 = num3^num
    }
  }
  return [num2, num3]
}
```



## [剑指 Offer 56 - II. 数组中数字出现的次数 II](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/)

### 方法一：哈希

```js
const singleNumber = nums => {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], (map.get(nums[i]) || 0) + 1);
    }
    for (const item of map) {
        if (item[1] === 1) return item[0];
    }
}
```

### 方法二：循环

```js
var singleNumber = function(nums) {
  let res=0
  nums.sort((a,b)=>a-b)
  for(let i=0;i<nums.length;i++){
    if(nums[i]===nums[i+1]){
        i+=2
        continue
    }
    res=nums[i]
  }
  return res
};

```

### 方法三： 数学计算

假设对于 a、b、c、d 来说，d 出现了 1 次，其他数字出现 3 次。那么求 d 的值的表达式是：2 * d = 3*(a + b + c + d) - (3a + 3b + 3c + d)

为了计算(a + b + c + d)，可以将数组去重后，再求和。去重借助的是集合（Set）。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    const set = new Set(nums);
    let sum1 = 0;
    for (let num of set.values()) {
        sum1 += num;
    }
    let sum2 = 0;
    for (let num of nums) {
        sum2 += num;
    }

    return Math.floor((3 * sum1 - sum2) / 2);
};
```

### 方法四：位运算

最符合题目要求的解决方法就是：位运算。能在不开辟额外空间的情况下，完成要求。

按照位数（最高 32 位）去考虑，这种方法的关键就是找到对于只出现一次的数字，它的哪些二进制位是 1。

整体算法流程如下：

- 从第 1 位开始
- 创建掩码（当前位为 1，其他为 0），count 设置为 0
- 将每个数字和掩码进行&运算，如果结果不为 0，count 加 1
- 如果 count 整除 3，说明出现一次的数字这一位不是 1；否则，说明出现一次的数字这一位是 1
- 继续检查第 2 位，一直到 32 位，结束

```js
// ac地址：https://leetcode-cn.com/problems/single-number-ii/
// 原文地址：https://xxoo521.com/2020-03-25-single-number-ii/
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let res = 0;
    for (let bit = 0; bit < 32; ++bit) {
        let mask = 1 << bit;
        let count = 0;
        for (let num of nums) {
            if (num & mask) ++count;
        }
        if (count % 3) {
            res = res | mask;
        }
    }
    return res;
};
```



