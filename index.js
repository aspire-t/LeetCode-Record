let num = 0; // 局变量或者成员变量

function count (a, n) {
		num = 0; // 全局变量
		mergeSortCounting(a, 0, n - 1)
		console.log(num)
}

function mergeSortCounting(a, p, r) {
		if (p >= r) return;
		let q = (p + r) / 2
		mergeSortCounting(a, p, q)
		mergeSortCounting(a, q + 1, r)
		merge(a, p, q, r)
}

function merge(a, p, q, r) {
		let i = p, j = q + 1, k = 0
		let tmp = [r - p + 1];

		while (i <= q && j <= r) {
			if (a[i] <= a[j]) {
				tmp[k++] = a[i++]
			} else {
				num += (q - i + 1) // 统计p-q之间，比a[j]大的元素个数
				tmp[k++] = a[j++]
			}
		}
		while (i <= q) { // 处理剩下的
			tmp[k++] = a[i++]
		}
		while (j <= r) { // 处理剩下的
			tmp[k++] = a[j++]
		}
		for (i = 0; i <= r - p; ++i) { // 从tmp拷贝回a
			a[p + i] = tmp[i]
		}
}

// count([1,5,6,2,3,4], 6);



let maxW = Number.MIN_SAFE_INTEGER // 结果放到maxW中
let weight = [2, 2, 4, 6, 3] // 物品重量
let n = 5 // 物品个数
let w = 9 // 背包承受的最大重量
// let mem = new Array[5][10] // 备忘录，默认值false
let mem = [[], [], [], [], []]
// mem.forEach(element => {
// 	element.push([false, false, false, false, false, false, false, false, false, false])
// })

// console.log(mem)

function f(i, cw) { // 调用f(0, 0)
	if (cw == w || i == n) { // cw==w表示装满了， i==n表示物品都考察完了
		if (cw > maxW) maxW = cw
		return
	}
	// console.log(mem, cw, i)
	if (mem[i][cw]) return // 重复状态
	mem[i][cw] = true // 记录(i, cw)这个状态
	f(i + 1, cw) // 选择不装第i个物品
	if (cw + weight[i] <= w) {
		f(i + 1, cw + weight[i]) // 选择装第i个物品
	}
}
f(0, 0)

console.log(mem)
