# hash表

## [128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

### 方法一：set查找

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let num_set = new Set();
    for (const num of nums) {
        num_set.add(num);
    }

    let longestStreak = 0;

    for (const num of num_set) {
        // 如果num - 1不存在hash表中，说明当前num和上一个数是不连续
        if (!num_set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
		   // 计算最大长度
            while (num_set.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;   
};
```

### 方法二：Hash表

- key存数字，value存什么？
- 新存入的数字，如果它找到相邻的数，它希望从邻居数那里获取什么信息？
- 很显然它希望，左邻居告诉它左边能提供的连续长度，右邻居告诉它右边能提供的连续长度
- 加上它自己的长度，就有了自己处在的连续序列的长度

![](./images/128.png)

- 同处一个连续序列的数字的value理应都相同，这是它们共同特征
- 但没有必要每个的value都是序列长度，只需要两端的数存序列的长度就好
- 因为靠的是两端和新数对接，序列是连续的，中间没有空位
- 序列的一端找到邻居后，将另一端对应的value更新为最新的序列长度

![](./images/128-2.png)

```js
var longestConsecutive = (nums) => {
  let map = new Map()
  let max = 0
  for (const num of nums) { // 遍历nums数组
    if (!map.has(num)) { // 重复的数字不考察，跳过
      let preLen = map.get(num - 1) || 0  // 获取左邻居所在序列的长度 
      let nextLen = map.get(num + 1) || 0 // 获取右邻居所在序列的长度 
      let curLen = preLen + 1 + nextLen   // 新序列的长度
      map.set(num, curLen) // 将自己存入 map
      max = Math.max(max, curLen) // 和 max 比较，试图刷新max
      map.set(num - preLen, curLen)  // 更新新序列的左端数字的value
      map.set(num + nextLen, curLen) // 更新新序列的右端数字的value
    }
  }
  return max
}
```

