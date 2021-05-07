// 两数之和
// hash表解法
function twoSum(nums, target) {
	let map = new Map();
	for (let i = 0; i < nums.length; i++) {
		if (map.get(nums[i])) {
			return [map.get(nums[i]), i];
		} else {
			map.set(target - nums[i], i.toString());
		}
	}
}

// 双指针
function twoSum(nums, target) {
	let left = 0;
	let right = nums.length - 1;
	let res = [];
	while (left < right) {
		if (nums[left] + nums[right] === target) {
			res.push([nums[left], nums[right]]);
		} else if (nums[left] + nums[right] > target) {
			while (nums[right] === nums[--right]) {
			}
		} else {
			while (nums[left] === nums[++left]) {
			}
		}
	}
	return res;
}

// twoSum([2, 7, 11, 15], 9);

// 两数相加
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
class ListNode {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

const l1 = new ListNode(9);
l1.next = new ListNode(8);
const l2 = new ListNode(1);

function addTwoNumbers(l1, l2) {
	let needAdd = 0;
	let cur1 = l1;
	let cur2 = l2;
	let head = new ListNode();
	let node = head;
	while (cur1 && cur2) {
		let val = cur1.val + cur2.val + needAdd;
		if (needAdd) {
			needAdd--;
		}
		if (val >= 10) {
			needAdd++;
			val = val - 10;
		}
		node.val = val;
		cur1 = cur1.next;
		cur2 = cur2.next;
		if (cur1 || cur2) {
			node.next = new ListNode();
			node = node.next;
		}
	}
	while (cur1 && !cur2) {
		let val = cur1.val + needAdd;
		if (needAdd) {
			needAdd--;
		}
		if (val >= 10) {
			needAdd++;
			val = val - 10;
		}
		node.val = val;
		cur1 = cur1.next;
		if (cur1) {
			node.next = new ListNode();
			node = node.next;
		}
	}
	while (!cur1 && cur2) {
		let val = cur2.val + needAdd;
		if (needAdd) {
			needAdd--;
		}
		if (val >= 10) {
			needAdd++;
			val = val - 10;
		}
		node.val = val;
		cur2 = cur2.next;
		if (cur2) {
			node.next = new ListNode();
			node = node.next;
		}
	}
	if (needAdd) {
		node.next = new ListNode(needAdd);
	}
	return head;
}

// addTwoNumbers(l1, l2);

// 无重复字符的最长子串
function lengthOfLongestSubstring(s) {
	if (s.length === 0) {
		return 0;
	}
	let map = new Map();
	// const sArr = s.split('');
	let maxLen = 1;
	let start = 0;
	map.set(s[start], start + 1);
	for (let end = 1; end < s.length; end++) {
		if (map.get(s[end])) {
			// if(map.get(sArr[end]) > start) {
			//     start = map.get(sArr[end]);
			// }
			start = map.get(s[end]) > start ? map.get(s[end]) : start;
			// start = Math.max(map.get(sArr[end]), start);
		}
		map.set(s[end], end + 1);
		maxLen = Math.max(maxLen, end - start + 1);
	}
	return maxLen;
}

// lengthOfLongestSubstring("pwwkew");

// 寻找两个有序数组的中位数，要求时间复杂度为log(m+n)，m，n为两个数组的长度
function findMedianSortedArrays(nums1, nums2) {
	const m = nums1.length;
	const n = nums2.length;
	
	// 判断m+n长度奇偶
	let isOdd = (m + n) % 2;
	let kNext, k;
	if (!isOdd) {
		k = (m + n) / 2;
		kNext = k + 1;
	} else {
		k = Math.floor((m + n) / 2);
	}
	
	let kTh = findKthInSortedArr(nums1, nums2, k);
	let kNextTh = kNext ? findKthInSortedArr(nums1, nums2, kNext) : kTh;
	return (kTh + kNextTh) / 2;
}

function findKthInSortedArr(nums1, nums2, k) {
	if (!nums1.length && nums2.length) {
		return nums2[k - 1];
	}
	if (nums1.length && !nums2.length) {
		return nums1[k - 1];
	}
	if (k === 1) {
		if (nums1.length > 0 && nums2.length > 0) return Math.min(nums1[0], nums2[0]);
	}
	let mid = parseInt((k / 2).toString());
	let tempNums1 = JSON.parse(JSON.stringify(nums1));
	let tempNums2 = JSON.parse(JSON.stringify(nums2));
	let compare = tempNums1.length < tempNums2.length ? tempNums1.length : tempNums2.length;
	if (mid > compare) {
		mid = compare;
	}
	if (tempNums1[mid - 1] <= tempNums2[mid - 1]) {
		tempNums1.splice(0, mid);
	} else {
		tempNums2.splice(0, mid);
	}
	let nextK = k - mid;
	return findKthInSortedArr(tempNums1, tempNums2, nextK);
}

// 暴力解法
// function findMedianSortedArrays(nums1, nums2) {
//     let arr = nums1.concat(nums2);
//     arr.sort((a, b) => {
//         return a - b;
//     });
//     let isOdd = arr.length % 2;
//     let kNext, k;
//     if (!isOdd) {
//         k = arr.length / 2 - 1;
//         kNext = k + 1;
//     } else {
//         k = Math.floor(arr.length / 2);
//     }
//     return !isOdd ? (arr[k] + arr[kNext]) / 2 : arr[k];
// }

// findMedianSortedArrays([1,2], [3, 4]);

// function longestPalindrome(str) {
//     if (!str) return '';
//     if (str.length === 1) return str;
//     let res = '';
//     let maxLen = 0;
//     for (let i = 0; i < str.length; i++) {
//         let s1 = str[i];
//         if(str.length - i < maxLen) break;
//         for (let j = i + 1; j < str.length; j++) {
//             if (s1 === str[j]) {
//                 let tempStr = str;
//                 let subStr = tempStr.slice(i, j + 1);
//                 if(subStr.length > maxLen) {
//                     if(subStr === subStr.split('').reverse().join('')) {
//                         res = subStr;
//                         maxLen = res.length;
//                     }
//                 }
//             }
//         }
//     }
//     if (!res) {
//         return str[0];
//     }
//     return res;
// }

// 最长回文子串，@动态规划
function longestPalindrome(str) {
	if (!str) return '';
	let matrix = [];
	let maxLen = 0;
	let start = 0;
	for (let i = 0; i < str.length; i++) {
		let arr = [];
		matrix.push(arr);
		for (let j = 0; j <= i; j++) {
			if (i - j < 2) {
				// map.set('' + j + i, str[j] === str[i]);
				arr[j] = str[j] === str[i];
			} else {
				arr[j] = matrix[i - 1][j + 1] && str[i] === str[j];
				// map.set('' + j + i, map.get((j + 1) + '' + (i - 1)) && str[i] === str[j]);
			}
			if (matrix[i][j]) {
				if (i - j + 1 > maxLen) {
					maxLen = i - j + 1;
					start = j;
				}
			}
		}
	}
	let res = str.substr(start, maxLen);
	return res;
}

// longestPalindrome("cbbd");

// Z字形反转
function convert(s, numRows) {
	if (numRows === 1) return s;
	let sArr = s.split('');
	let matrix = [];
	let lineArr = [];
	let index = 0;
	let res = '';
	const minusNum = numRows - 1;
	while (sArr.length) {
		if (lineArr.length >= numRows) {
			matrix.push(lineArr);
			lineArr = [];
			index++;
		}
		const tempNum = index % minusNum; //1 2
		if (!tempNum) {
			while (lineArr.length !== numRows) {
				let char = sArr.shift();
				lineArr.push(char);
			}
		} else {
			while (lineArr.length !== numRows) {
				if (minusNum - lineArr.length === tempNum) {
					lineArr.push(sArr.shift());
				} else {
					lineArr.push(0);
				}
			}
		}
		if (!sArr.length) {
			matrix.push(lineArr);
		}
	}
	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < matrix.length; j++) {
			if (matrix[j][i]) {
				res += matrix[j][i];
			}
		}
	}
	return res;
}

// convert('leetcodeisharing', 4);

// 整数反转
//给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
function revert(x) {
	let tag = '';
	if (x < 0) {
		x = -x;
		tag = '-';
	}
	let numStr = x.toString().split('').reverse().join('');
	if (numStr.length > 10 || numStr === 10 && parseInt(numStr) > (tag ? 2147483648 : 2147483647)) return 0;
	if (tag) {
		numStr = tag + numStr;
	}
	return numStr;
}

// console.log(revert(1534236469));

//给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
//
// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
//
// 说明:
//
// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。

// 暴力解法
// function isMatch(s, p) {
//     let sIndex = 0;
//     let pIndex = 0;
//     let breakPIndex;
//     while (pIndex !== p.length) {
//         if(sIndex === s.length) {
//             if(!breakPIndex) breakPIndex = pIndex;
//             if(p[pIndex + 1] === '*') {
//                 pIndex += 2;
//                 continue;
//             }
//             if(p[pIndex] === '.' || p[pIndex] === s[s.length - 1]) {
//                 if(p[breakPIndex - 1] !== '*' && p[breakPIndex] !== '*') {
//                     return false;
//                 }
//                 pIndex ++;
//                 continue;
//             }
//             if(p[pIndex] === '*') {
//                 pIndex ++;
//                 continue;
//             }
//             return false;
//         }
//         if (p[pIndex] === '.' || p[pIndex] === s[sIndex]) {
//             sIndex++;
//             pIndex++;
//             continue;
//         }
//         if (p[pIndex] === '*') {
//             while (s[sIndex] === p[pIndex - 1] || p[pIndex - 1] === '.') {
//                 if (sIndex === s.length) break;
//                 sIndex++;
//             }
//             pIndex++;
//             continue;
//         }
//         if (p[pIndex] !== s[sIndex] && p[pIndex + 1] !== '*') {
//             return false;
//         }
//         if (p[pIndex] !== s[sIndex] && p[pIndex + 1] === '*') {
//             pIndex += 2;
//         }
//     }
//     return sIndex === s.length;
// }

// 动态规划
// 利用dp[i][j]表示长度为i的s能不能被长度为j的p匹配
// ① 如果s[i] === p[j] || p[j] === '.'，则dp[i][j] === dp[i-1][j-1];
// ② 如果p[j] === '*'，有以下两种情况：
//   a. p[j-1] !== s[i]时，dp[i][j] === dp[i][j-2]，即p[j] = '*', p[j-1] != s[i]，当p[j-1]取1个或多个时，dp[i][j]必然不匹配。
//   b. p[j-1] === s[i]时，dp[i][j] === dp[i][j-2] or dp[i-1][j] or dp[i][j-1]。其中，取p[j-1]的个数分别为0个、多个、1个，逐个尝试是否能匹配，若能匹配，则为true

function isMatch(s, p) {
	let dp = new Array(s.length);
	for (let i = 0; i < dp.length; i++) {
		dp[i] = new Array(p.length).fill(false);
	}
	if (s[0] === p[0] || p[0] === '.') {
		dp[0][0] = true;
	} else {
		dp[0][0] = false;
	}
	// 生成首行
	for (let j = 1; j < p.length; j++) {
		if (p[j] === '*') {
			if (j === 1) {
				dp[0][j] = dp[0][0];
			} else {
				dp[0][j] = dp[0][j - 1] || dp[0][j - 2];
			}
		}
	}
	// 生成首列
	for (let i = 1; i < s.length; i++) {
		dp[i][0] = false;
	}
	for (let i = 1; i < s.length - 1; i++) {
		for (let j = 1; j < p.length - 1; j++) {
			if (s[i + 1] === p[j + 1] || p[j + 1] === '.') {
				dp[i + 1][j + 1] = dp[i][j];
				break;
			}
			if (p[j] === '*') {
				if (p[j - 1] !== s[i] && p[j - 1] !== '.') {
					dp[i + 1][j + 1] = dp[i][j - 1];
				} else {
					dp[i + 1][j + 1] = dp[i + 1][j - 1] || dp[i + 1][j] || dp[i][j - 1];
				}
			}
		}
	}
	return dp[s.length - 1][p.length - 1];
}

// console.log(isMatch("abc", "a*b*c*"));

// 判断一个数是否为回文数
function isPalindrome(x) {
	const str = x.toString();
	return str === str.split('').reverse().join('');
};

// 请你来实现一个 atoi 函数，使其能将字符串转换成整数。
//
// 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
//
// 当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
//
// 该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。
//
// 注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。
//
// 在任何情况下，若函数不能进行有效的转换时，请返回 0。
//
// 说明：
//
// 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。
function myAtoi(str) {
	str.trim();
	let res = parseInt(str);
	if (!res) {
		return 0;
	}
	if (res < -2147483648) return -2147483648;
	if (res > 2147483647) return 2147483647;
	return res;
};

// 动态规划，经典三角形问题
// n = 5; // 三角形层数
// triArr = [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]
//
// let map = new Map();
//
// function findShortestPath(triArr, x, y) {
//     if (x === triArr.length - 1) {
//         map.set(x + '' + y, triArr[x][y]);
//         return triArr[x][y];
//     }
//     if (map.get(x + '' + y)) {
//         return map.get(x + '' + y);
//     }
//     let res = Math.max(findShortestPath(triArr, x + 1, y), findShortestPath(triArr, x + 1, y + 1)) + triArr[x][y];
//     map.set(x + '' + y, res);
//     return res;
// }
//
// console.log(findShortestPath(triArr, 0, 0));

// 将整数转换为罗马数字
function intToRoman(num) {
	let res = '';
	let a = Math.floor(num / 1000);
	for (let i = 0; i < a; i++) {
		res += 'M';
	}
	let b = Math.floor((num - a * 1000) / 100);
	res = calcRoman('C', 'D', 'M', b, res);
	let c = Math.floor((num - a * 1000 - b * 100) / 10);
	res = calcRoman('X', 'L', 'C', c, res);
	let d = Math.floor(num - a * 1000 - b * 100 - c * 10);
	res = calcRoman('I', 'V', 'X', d, res);
	return res;
};

function calcRoman(oneSign, fiveSign, tenSign, number, res) {
	if (number > 5) {
		if (number === 9) {
			res += oneSign + tenSign;
		} else {
			for (let i = 5; i < number; i++) {
				if (i === 5) {
					res += fiveSign;
				}
				res += oneSign;
			}
		}
	} else if (number < 5) {
		if (number === 4) {
			res += oneSign + fiveSign;
		} else {
			for (let i = 0; i < number; i++) {
				res += oneSign;
			}
		}
	} else {
		res += fiveSign;
	}
	return res;
}

// console.log(intToRoman(68));

// 罗马数转整数
function romanToInt(str) {
	const obj = {
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000,
	};
	let num = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === 'I') {
			if (str[i + 1] === 'V') {
				i++;
				num += 4;
			} else if (str[i + 1] === 'X') {
				i++;
				num += 9;
			} else {
				num += 1;
			}
			continue;
		}
		if (str[i] === 'X') {
			if (str[i + 1] === 'L') {
				i++;
				num += 40;
			} else if (str[i + 1] === 'C') {
				i++;
				num += 90;
			} else {
				num += 10;
			}
			continue;
		}
		if (str[i] === 'C') {
			if (str[i + 1] === 'D') {
				i++;
				num += 400;
			} else if (str[i + 1] === 'M') {
				i++;
				num += 900;
			} else {
				num += 100;
			}
			continue;
		}
		if (obj[str[i]]) {
			num += obj[str[i]];
		}
	}
	return num;
}

// console.log(romanIntoInt('MCMXCIV'));

// 最长公共前缀
function longestCommonPrefix(strs) {
	if (!strs.length) return '';
	let res = '';
	let index = 0;
	let char = '';
	let minLen = Number.MAX_SAFE_INTEGER;
	while (true) {
		if (index >= minLen) break;
		for (let i = 0; i < strs.length; i++) {
			if (strs[i].length < minLen) {
				minLen = strs[i].length;
			}
			if (i === 0) {
				char = strs[i].charAt(index);
			} else {
				if (char !== strs[i].charAt(index)) {
					return res;
				}
			}
		}
		res += char;
		index++;
	}
	return res;
	
}

// console.log(longestCommonPrefix(['flow', 'flex']));

// 双指针问题
// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
//
// 注意：答案中不可以包含重复的三元组。
//  
// 示例：
//
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
//
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

function threeSum(nums) {
	let res = [];
	nums.sort((a, b) => {
		return a - b;
	});
	let index = 0;
	let i = index + 1;
	let j = nums.length - 1;
	if (nums[index] > 0) return [];
	while (index < nums.length - 2) {
		while (i < j) {
			let sum = nums[index] + nums[i] + nums[j];
			if (sum === 0) {
				res.push([nums[index], nums[i], nums[j]]);
				while (nums[i] === nums[++i]) {
				}
				while (nums[j] === nums[--j]) {
				}
			}
			if (sum > 0) {
				while (nums[j] === nums[--j]) {
				}
			}
			if (sum < 0) {
				while (nums[i] === nums[++i]) {
				}
			}
		}
		while (nums[index] === nums[++index]) {
		}
		i = index + 1;
		j = nums.length - 1;
	}
	return res;
}

// [-4, -1, -1, 0, 1, 2];
// console.log(threeSum([0,0,0,0]));

// 双指针问题
// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
//
// 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.
//
// 与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/3sum-closest
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function threeSumClosest(nums, target) {
	
	nums.sort((a, b) => {
		return a - b;
	});
	let res;
	let absVal = Number.MAX_SAFE_INTEGER;
	for (let i = 0; i < nums.length; i++) {
		let left = i + 1;
		let right = nums.length - 1;
		while (left < right) {
			if ((nums[i] + nums[left] + nums[right]) === target) {
				return target;
			}
			if (Math.abs(target - (nums[i] + nums[left] + nums[right])) < absVal) {
				absVal = Math.abs(target - (nums[i] + nums[left] + nums[right]));
				res = nums[i] + nums[left] + nums[right];
			}
			if ((nums[i] + nums[left] + nums[right]) < target) {
				left++;
			} else {
				right--;
			}
		}
	}
	return res;
}

// console.log(threeSumClosest([-1,2,1,-4],1));

//给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
//
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
// 示例:
//
// 输入："23"
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function letterCombinations(str) {
	if (!str) return [];
	const map = {
		'2': ['a', 'b', 'c'],
		'3': ['d', 'e', 'f'],
		'4': ['g', 'h', 'i'],
		'5': ['j', 'k', 'l'],
		'6': ['m', 'n', 'o'],
		'7': ['p', 'q', 'r', 's'],
		'8': ['t', 'u', 'v'],
		'9': ['w', 'x', 'y', 'z'],
	};
	let res = [];
	let index = 0;
	let curStr = '';
	letterCombinationsHelp(res, curStr, index, str, map);
	return res;
}

function letterCombinationsHelp(res, str, index, rawStr, map) {
	const arr = map[rawStr.charAt(index)];
	for (let item of arr) {
		let temp = str;
		let tempIndex = index;
		temp += item;
		tempIndex++;
		if (tempIndex === rawStr.length) {
			res.push(temp);
		} else {
			letterCombinationsHelp(res, temp, tempIndex, rawStr, map);
		}
	}
}

// console.log(letterCombinations('23'));

// 四数之和
function fourSum(nums, target) {
	if (nums.length < 4) {
		return [];
	}
	nums.sort((a, b) => {
		return a - b;
	});
	let res = [];
	for (let k = 0; k < nums.length; k++) {
		if (k > 0 && nums[k] === nums[k - 1]) continue;
		if (nums[k] + nums[k + 1] + nums[k + 2] + nums[k + 3] > target) {
			break;
		}
		const minusTarget = target - nums[k];
		for (let i = k + 1; i < nums.length; i++) {
			if (i > k + 1 && nums[i] === nums[i - 1]) continue;
			let left = i + 1;
			let right = nums.length - 1;
			while (left < right) {
				if (nums[i] + nums[left] + nums[right] === minusTarget) {
					res.push([nums[k], nums[i], nums[left], nums[right]]);
					while (nums[left] === nums[++left]) {
					}
					while (nums[right] === nums[--right]) {
					}
				} else if (nums[i] + nums[left] + nums[right] > minusTarget) {
					while (nums[right] === nums[--right]) {
					}
				} else {
					while (nums[left] === nums[++left]) {
					}
				}
			}
		}
	}
	return res;
};

// console.log(fourSum([0,0,0,0], 0));

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
let node5 = new ListNode(5);
node1.next = node2;
// node2.next = node3;
// node3.next = node4;

const removeNthFromEnd = function (head, n) {
	if (!head) return null;
	let cur = head;
	let arr = [];
	while (cur) {
		arr.push(cur.val);
		cur = cur.next;
	}
	arr.splice(arr.length - n, 1);
	if (!arr.length) return null;
	let res = new ListNode(arr.shift());
	let node = res;
	while (arr.length) {
		node.next = new ListNode(arr.shift());
		node = node.next;
	}
	return res;
};

// console.log(removeNthFromEnd(node1, 5));

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
//
// 有效字符串需满足：
//
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-parentheses
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(str) {
	let stack = [];
	if (str.length % 2 !== 0) return false;
	for (let i = 0; i < str.length; i++) {
		const char = str.charAt(i);
		if (char === '(' || char === '[' || char === '{') {
			stack.push(char);
		} else {
			switch (stack[stack.length - 1]) {
				case '(':
					if (char === ')') {
						stack.pop();
					} else {
						return false;
					}
					break;
				case '[':
					if (char === ']') {
						stack.pop();
					} else {
						return false;
					}
					break;
				case '{':
					if (char === '}') {
						stack.pop();
					} else {
						return false;
					}
					break;
				
			}
		}
	}
	return !stack.length;
}

// console.log(isValid("]"));

// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
//
// 示例：
//
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/merge-two-sorted-lists
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists(l1, l2) {
	if (!l1 && !l2) return null;
	let cur1 = l1;
	let cur2 = l2;
	let head = new ListNode();
	let cur = head;
	while (cur1 && cur2) {
		let val;
		if (cur1.val >= cur2.val) {
			val = cur2.val;
			cur2 = cur2.next;
		} else {
			val = cur1.val;
			cur1 = cur1.next;
		}
		cur.val = val;
		cur.next = new ListNode();
		cur = cur.next;
	}
	while (cur1) {
		cur.val = cur1.val;
		cur1 = cur1.next;
		if (cur1) {
			cur.next = new ListNode();
			cur = cur.next;
		}
	}
	while (cur2) {
		cur.val = cur2.val;
		cur2 = cur2.next;
		if (cur2) {
			cur.next = new ListNode();
			cur = cur.next;
		}
	}
	return head;
}

// console.log(mergeTwoLists(node1, node2));

//给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
//
// 例如，给出 n = 3，生成结果为：
//
// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/generate-parentheses
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 暴力破解
// function generateParenthesis(n) {
//     let str = '(';
//     let res = [];
//     if (n === 1) return ['()'];
//     const len = n - 1;
//     generateString(str, '(', res, 1, 0, len);
//     generateString(str, ')', res, 0, 1, len);
//     return res;
// }
//
// function generateString(str, char, res, leftCount, rightCount, len) {
//     str += char;
//     if (leftCount === len && rightCount === len) {
//         str += ')';
//         if (isValid(str)) {
//             res.push(str);
//             return;
//         }
//     }
//     if (leftCount < len) {
//         let num = leftCount + 1;
//         generateString(str, '(', res, num, rightCount, len);
//     }
//     if (rightCount < len) {
//         let num = rightCount + 1;
//         generateString(str, ')', res, leftCount, num, len);
//     }
// }

// 动态规划    dp[i] = ['(' + dp[0] + ')' + dp[i - 1], ... , '(' + dp[p] + ')' + dp[i - 1 - p], ... , '(' + dp[i - 1] + ')' + dp[0]];
// 解题的核心在于，增加的那个括号放的位置，可以放在最左边，可以放在最右边，也可以放在中间；
// 放中间的情况是最复杂的： 思路就是，定死左括号在开头，右括号往中间移动，而右括号也不能随便放，每次左右括号中间都得是部分的dp，就是i<n时满足条件的情况。
function generateParenthesis(n) {
	let dp = new Array(n);
	dp[0] = [''];
	dp[1] = ['()'];
	for (let i = 2; i <= n; i++) {
		dp[i] = [];
		for (let p = 0; p <= i - 1; p++) {
			let q = i - 1 - p;
			for (let pItem of dp[p]) {
				for (let qItem of dp[q]) {
					dp[i].push('(' + pItem + ')' + qItem);
				}
			}
			
		}
	}
	return dp[n];
}

// console.log(generateParenthesis(4));

// 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
//
// 示例:
//
//     输入:
//         [
//             1->4->5,
//     1->3->4,
//     2->6
// ]
// 输出: 1->1->2->3->4->4->5->6
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
//     著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists) {
	if (lists.length === 0) return null;
	const arr = [];
	for (let list of lists) {
		let cur = list;
		while (cur) {
			arr.push(cur.val);
			cur = cur.next;
		}
	}
	arr.sort((a, b) => {
		return a - b;
	});
	if (arr.length === 0) return null;
	let resHead = new ListNode();
	let cur = resHead;
	for (let i = 0; i < arr.length; i++) {
		cur.val = arr[i];
		if (i === arr.length - 1) break;
		cur.next = new ListNode();
		cur = cur.next;
	}
	return resHead;
}

// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// 示例:
// 给定 1->2->3->4, 你应该返回 2->1->4->3.

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 迭代
function swapPairs(head) {
	if (!head) return null;
	if (!head.next) return head;
	let index = 1;
	let cur = head;
	let curNext = head.next;
	let newHead = curNext;
	let pre;
	while (cur && curNext) {
		cur.next = curNext.next;
		curNext.next = cur;
		if (pre) {
			pre.next = curNext;
		}
		pre = cur;
		cur = cur.next;
		if (cur) curNext = cur.next;
	}
	return newHead;
}

// 递归
function swapPairs(head) {
	if (!head || !head.next) {
		return head;
	}
	let next = head.next;
	head.next = swapPairs(next.next);
	next.next = head;
	return next;
}

// console.log(swapPairs(node1));

//给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
//
// k 是一个正整数，它的值小于或等于链表的长度。
//
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
//
// 示例 :
//
// 给定这个链表：1->2->3->4->5
//
// 当 k = 2 时，应当返回: 2->1->4->3->5
//
// 当 k = 3 时，应当返回: 3->2->1->4->5
//
// 说明 :
//
// 你的算法只能使用常数的额外空间。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reverse-nodes-in-k-group
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const listNode1 = new ListNode(1);
const listNode2 = new ListNode(2);
const listNode3 = new ListNode(3);
const listNode4 = new ListNode(4);
const listNode5 = new ListNode(5);
listNode1.next = listNode2;
listNode2.next = listNode3;
listNode3.next = listNode4;
listNode4.next = listNode5;

function reverseKGroup(head, k) {
	if (!head) return head;
	let dummy = new ListNode(0);
	dummy.next = head;
	let pre = dummy;
	let stack = [];
	let index = 0;
	let cur = head;
	while (cur) {
		while (index < k && cur) {
			stack.push(cur);
			cur = cur.next;
			index++;
		}
		let node;
		index = 0;
		if (stack.length < k) {
			node = stack.shift();
			pre.next = node;
			break;
		}
		node = stack.pop();
		let first = node;
		while (stack.length) {
			node.next = stack.pop();
			node = node.next;
		}
		pre.next = first;
		node.next = null;
		pre = node;
	}
	return dummy.next;
}

// console.log(reverseKGroup(listNode1, 2));

// 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
//
// 返回被除数 dividend 除以除数 divisor 得到的商。
//
// 示例 1:
//
// 输入: dividend = 10, divisor = 3
// 输出: 3
// 示例 2:
//
// 输入: dividend = 7, divisor = -3
// 输出: -2
// 说明:
//
//     被除数和除数均为 32 位有符号整数。
// 除数不为 0。
// 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/divide-two-integers
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function divide(dividend, divisor) {
	let flag = false;
	let a = dividend < 0 ? -dividend : dividend;
	let b = divisor < 0 ? -divisor : divisor;
	if ((dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0)) {
		flag = true;
	}
	
	let res = divideHelp(a, b);
	return flag ? -res : res;
}

function divideHelp(a, b) {
	if (a < b) return 0;
	let count = 1;
	let totalNum = b;
	let pre;
	let preCount = count;
	while (a >= totalNum) {
		pre = totalNum;
		totalNum += totalNum;
		preCount = count;
		count += count;
	}
	totalNum -= pre;
	return preCount += divideHelp(a - totalNum, b);
}

//给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
//
// 注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。
//
//输入：
//   s = "barfoothefoobarman",
//   words = ["foo","bar","zoo"]
// 输出：[0,9]
// 解释：
// 从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
// 输出的顺序不重要, [9,0] 也是有效答案。

// 暴力破解，ac不了，暴力法在性能上简直就是垃圾。一遇到冗长的数据马上GG
// function findSubstring(s, words) {
//     let res = [];
//     findSubstringHelp(s, words, res, '');
//     return [...new Set(res)];
// }
//
// function findSubstringHelp(s, words, res, target) {
//     if (!words.length) {
//         let reg = new RegExp(target, 'g');
//         let info = reg.exec(s);
//         while(info) {
//             res.push(info.index);
//             reg.lastIndex -= target.length - 1;
//             info = reg.exec(s);
//         }
//         return;
//     }
//     for (let i = 0; i < words.length; i++) {
//         let tempArr = JSON.parse(JSON.stringify(words));
//         let tempStr = target + tempArr[i];
//         tempArr.splice(i, 1)[0];
//         findSubstringHelp(s, tempArr, res, tempStr);
//     }
// }

// 有点类似滑动窗口的解法，但是每次移动的是words长度的子串，还能优化。哭了，至少ac了
// function findSubstring(s, words) {
//     let res = [];
//     if(!s || !words.length) return res;
//     let wordLen = words[0].length;
//     let len = words.length * wordLen;
//     let map = {};
//     for (let item of words) {
//         map[item] = map[item] ?  ++map[item] : 1;
//     }
//     for(let k = 0; k < wordLen; k ++) {
//         for (let i = k; i <= s.length - len; i += wordLen) {
//             let tempMap = Object.assign({}, map);
//             let subStr = s.substring(i, i + len);
//             let isMatch = true;
//             for (let j = 0; j < words.length; j++) {
//                 let word = subStr.substring(j * wordLen, j * wordLen + wordLen);
//                 let val = tempMap[word];
//                 if (val) {
//                     tempMap[word] = --val;
//                     continue;
//                 }
//                 if(val === 0) {
//                     let index = subStr.indexOf(word);
//                     i += index;
//                     isMatch = false;
//                     break;
//                 }
//                 if(!val && val !== 0) {
//                     i += j * wordLen;
//                     isMatch = false;
//                     break;
//                 }
//
//             }
//             if (isMatch) {
//                 res.push(i);
//             }
//         }
//     }
//     return res;
// }

// 优化完的滑动窗口解法，按照题解的思路来的，ac的时间复杂度反而变高了
function findSubstring(s, words) {
	let res = [];
	if (!s || !words.length) return res;
	let wordLen = words[0].length;
	let len = words.length * wordLen;
	let map = {};
	for (let item of words) {
		map[item] = map[item] ? ++map[item] : 1;
	}
	for (let k = 0; k < wordLen; k++) {
		let l = k;
		let r = k;
		let count = 0;
		let subMap = Object.assign({}, map);
		while (r + wordLen <= s.length) {
			let word = s.substring(r, r + wordLen);
			r += wordLen;
			if (subMap[word]) {
				subMap[word]--;
				count++;
			} else if (subMap[word] === 0) {
				let leftWord = s.substring(l, l + wordLen);
				while (leftWord !== word) {
					subMap[leftWord]++;
					count--;
					l += wordLen;
					leftWord = s.substring(l, l + wordLen);
				}
				l += wordLen;
			} else {
				subMap = Object.assign({}, map);
				count = 0;
				l = r;
			}
			if (count === words.length) {
				res.push(l);
				let leftWord = s.substring(l, l + wordLen);
				subMap[leftWord]++;
				count--;
				l += wordLen;
			}
		}
	}
	return res;
}

// console.log(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"]));

// 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
//
// 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
//
// 必须原地修改，只允许使用额外常数空间。
//
// 以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
// 1,2,3 → 1,3,2
// 3,2,1 → 1,2,3
// 1,1,5 → 1,5,1
function nextPermutation(nums) {
	if (nums.length <= 1) return nums;
	let i = nums.length - 1;
	let j = nums.length - 2;
	while (nums[i] <= nums[j]) {
		i--;
		j--;
	}
	if (j < 0) {
		nums.sort((a, b) => {
			return a - b;
		});
		return nums;
	}
	let minus = nums[i] - nums[j];
	let changeIndex = i;
	for (let index = i + 1; index < nums.length; index++) {
		if (nums[index] > nums[j] && nums[index] - nums[i] < minus) {
			changeIndex = index;
		}
	}
	let temp = nums[j];
	nums[j] = nums[changeIndex];
	nums[changeIndex] = temp;
	
	for (let k = i; k < nums.length - 1; k++) {
		for (let j = k + 1; j < nums.length; j++) {
			let temp = nums[k];
			nums[k] = nums[j];
			nums[j] = temp;
		}
	}
	return nums;
}

// console.log(nextPermutation([5, 1, 1]));

function longestValidParentheses(s) {
	if (!s) return 0;
	let stack = [];
	let maxCount = 0;
	stack.push(-1);
	for (let i = 0; i < s.length; i++) {
		if (s[i] === '(') {
			stack.push(i);
		} else {
			stack.pop();
			if (!stack.length) {
				stack.push(i);
			} else {
				maxCount = Math.max(maxCount, i - stack[stack.length - 1]);
			}
		}
	}
	return maxCount;
}

// console.log(longestValidParentheses(")()())"));

// 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
//
// ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [2,4,5,6,7,0,1])。
//
// 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
//
// 你可以假设数组中不存在重复的元素。
//
// 你的算法时间复杂度必须是 O(log n) 级别。
//
// 示例 1:
//
// 输入: nums = [1,2,4,5,6,7,0], target = 0
// 输出: 4
function search(nums, target) {
	if (!nums.length) return -1;
	let left = 0;
	let right = nums.length - 1;
	while (left <= right) {
		let mid = left + Math.floor((right - left) / 2);
		if (nums[left] === target) return left;
		if (nums[right] === target) return right;
		if (nums[mid] === target) return mid;
		if (nums[mid] > target) {
			if (nums[left] < nums[right]) {
				right = mid - 1;
				continue;
			}
			if (target < nums[left]) {
				if (nums[mid] > nums[left]) {
					left = mid + 1;
				} else {
					right = mid - 1;
				}
			} else if (target > nums[left]) {
				right = mid - 1;
			}
		} else if (nums[mid] < target) {
			if (nums[left] < nums[right]) {
				left = mid + 1;
				continue;
			}
			if (target < nums[left]) {
				left = mid + 1;
			} else if (target > nums[left]) {
				if (nums[mid] > nums[left]) {
					left = mid + 1;
				} else {
					right = mid - 1;
				}
			}
		}
	}
	return -1;
}

// console.log(search([4,5,6,7,8,1,2,3], 8));
// console.log(search([8, 1, 2, 3, 4, 5, 6, 7], 6));

// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
//
// 你的算法时间复杂度必须是 O(log n) 级别。
//
// 如果数组中不存在目标值，返回 [-1, -1]。
//
// 示例 1:
//
// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: [3,4]
// 示例 2:
//
// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: [-1,-1]
function searchRange(nums, target) {
	if (!nums.length) return [-1, -1];
	let res = [];
	let left = 0;
	let right = nums.length - 1;
	while (left <= right) {
		let mid = left + Math.floor((right - left) / 2);
		if (target === nums[left]) {
			if (!res.length) res.push(left);
			if (res.length) {
				if (res.length === 2) {
					res.pop();
				}
				res.push(left);
			}
			left += 1;
			continue;
		}
		if (target === nums[right]) {
			if (!res.length) res.unshift(right);
			if (res.length) {
				if (res.length === 2) {
					res.shift();
				}
				res.unshift(right);
			}
			right -= 1;
			continue;
		}
		if (target === nums[mid]) {
			res.push(mid);
			let index = mid;
			while (nums[--index] === target) {
				if (res.length === 2) {
					res.shift();
				}
				res.unshift(index);
			}
			index = mid;
			while (nums[++index] === target) {
				if (res.length === 2) {
					res.pop();
				}
				res.push(index);
			}
			break;
		} else if (nums[mid] > target) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
	if (res.length === 1) {
		res.push(res[0]);
	}
	if (!res.length) {
		res = [-1, -1];
	}
	return res;
}

function pushResArr(res, nums, index) {

}

// console.log(searchRange([0,0,0,1,2,3], 0));

// 判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。
// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
// 上图是一个部分填充的有效的数独。
// 数独部分空格内已填入了数字，空白格用 '.' 表示。
// 示例 1:
// 输入:
//     [
//         ["5","3",".",".","7",".",".",".","."],
//         ["6",".",".","1","9","5",".",".","."],
//         [".","9","8",".",".",".",".","6","."],
//         ["8",".",".",".","6",".",".",".","3"],
//         ["4",".",".","8",".","3",".",".","1"],
//         ["7",".",".",".","2",".",".",".","6"],
//         [".","6",".",".",".",".","2","8","."],
//         [".",".",".","4","1","9",".",".","5"],
//         [".",".",".",".","8",".",".","7","9"]
//     ]
// 输出: true
// 示例 2:
// 输入:
//     [
//         ["8","3",".",".","7",".",".",".","."],
//         ["6",".",".","1","9","5",".",".","."],
//         [".","9","8",".",".",".",".","6","."],
//         ["8",".",".",".","6",".",".",".","3"],
//         ["4",".",".","8",".","3",".",".","1"],
//         ["7",".",".",".","2",".",".",".","6"],
//         [".","6",".",".",".",".","2","8","."],
//         [".",".",".","4","1","9",".",".","5"],
//         [".",".",".",".","8",".",".","7","9"]
//     ]
// 输出: false
// 解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
//      但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
// 说明:
//
// 一个有效的数独（部分已被填充）不一定是可解的。
// 只需要根据以上规则，验证已经填入的数字是否有效即可。
// 给定数独序列只包含数字 1-9 和字符 '.' 。
// 给定数独永远是 9x9 形式的。

function isValidSudoku(board) {
	let colMap = {};
	let boxMap = {};
	for (let i = 0; i < board.length; i++) {
		let lineMap = {};
		for (let j = 0; j < board.length; j++) {
			if (board[i][j] !== '.') {
				if (lineMap[board[i][j]]) {
					return false;
				} else {
					lineMap[board[i][j]] = 1;
				}
				if (!colMap[j]) colMap[j] = {};
				if (!colMap[j][board[i][j]]) {
					colMap[j][board[i][j]] = 1;
				} else {
					return false;
				}
				let x = Math.floor(i / 3);
				let y = Math.floor(j / 3);
				let boxIndex = y * 3 + x;
				if (!boxMap[boxIndex]) boxMap[boxIndex] = {};
				if (!boxMap[boxIndex][board[i][j]]) {
					boxMap[boxIndex][board[i][j]] = 1;
				} else {
					return false;
				}
			}
		}
	}
	return true;
}

// console.log(isValidSudoku([
//     ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//     ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//     [".", "9", "8", ".", ".", ".", ".", "6", "."],
//     ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//     ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//     ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//     [".", "6", ".", ".", ".", ".", "2", "8", "."],
//     [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//     [".", ".", ".", ".", "8", ".", ".", "7", "9"]
// ]));

// 解数独
function solveSudoku(board) {
	let colMap = {};
	let boxMap = {};
	let lineMap = {};
	let space = [];
	for (let i = 0; i < 9; i++) {
		colMap[i] = {};
		lineMap[i] = {};
		boxMap[i] = {};
	}
	for (let i = 0; i < board.length; i++) {
		let line = lineMap[i];
		for (let j = 0; j < board.length; j++) {
			if (board[i][j] !== '.') {
				if (!line[board[i][j]]) {
					line[board[i][j]] = 1;
				}
				if (!colMap[j][board[i][j]]) {
					colMap[j][board[i][j]] = 1;
				}
				let x = Math.floor(i / 3);
				let y = Math.floor(j / 3);
				let boxIndex = x * 3 + y;
				if (!boxMap[boxIndex][board[i][j]]) {
					boxMap[boxIndex][board[i][j]] = 1;
				}
			} else {
				space.push(i + '-' + j);
			}
		}
	}
	solveSudokuHelper(colMap, lineMap, boxMap, space, board);
}

function solveSudokuHelper(colMap, lineMap, boxMap, space, board) {
	if (Object.keys(space).length === 0) {
		return true;
	}
	for (let item of space) {
		const arr = item.split('-');
		const i = arr[0];
		const j = arr[1];
		let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
		space.shift();
		for (let x = 1; x <= 9; x++) {
			if (!lineMap[i][x] && !colMap[j][x] && !boxMap[boxIndex][x]) {
				board[i][j] = x.toString();
				lineMap[i][x] = 1;
				colMap[j][x] = 1;
				boxMap[boxIndex][x] = 1;
				if (solveSudokuHelper(colMap, lineMap, boxMap, space, board)) {
					return true;
				} else {
					board[i][j] = '.';
					delete (lineMap[i][x]);
					delete (colMap[j][x]);
					delete (boxMap[boxIndex][x]);
				}
			}
		}
		space.unshift(item);
		return false;
	}
}

// console.log(solveSudoku([[".",".","9","7","4","8",".",".","."],["7",".",".",".",".",".",".",".","."],[".","2",".","1",".","9",".",".","."],[".",".","7",".",".",".","2","4","."],[".","6","4",".","1",".","5","9","."],[".","9","8",".",".",".","3",".","."],[".",".",".","8",".","3",".","2","."],[".",".",".",".",".",".",".",".","6"],[".",".",".","2","7","5","9",".","."]]))

// 外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。前五项如下：
// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
// 1 被读作  "one 1"  ("一个一") , 即 11。
// 11 被读作 "two 1s" ("两个一"）, 即 21。
// 21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。
function countAndSay(n) {
	if (n === 1) return '1';
	let pre = '11';
	for (let i = 2; i < n; i++) {
		let str = '';
		for (let j = 0; j < pre.length; j++) {
			let count = 1;
			while (pre[j] === pre[j + 1]) {
				count++;
				j++;
			}
			str += count + '' + pre[j];
		}
		pre = str;
	}
	return pre;
}

// console.log(countAndSay(6));

// 给定一个无重复元素的数组 arr 和一个目标数 target ，找出 arr 中所有可以使数字和为 target 的组合。
// arr 中的数字可以无限制重复被选取。
// 说明：
// 所有数字（包括 target）都是正整数。
// 解集不能包含重复的组合。
function combinationSum(arr, target) {
	if (!arr.length) return [];
	arr.sort((a, b) => {
		return a - b;
	});
	let resList = [];
	let res = [];
	combinationSumHelper(arr, target, res, resList, 0);
	return resList;
}

function combinationSumHelper(arr, target, res, resList, index) {
	if (!target) {
		const temp = JSON.parse(JSON.stringify(res));
		resList.push(temp);
		res.pop();
		return;
	}
	for (let i = index; i < arr.length; i++) {
		if (target < arr[i]) {
			res.pop();
			return;
		}
		res.push(arr[i]);
		combinationSumHelper(arr, target - arr[i], res, resList, i);
	}
}

// console.log(combinationSum([2, 3, 5], 8));

function combinationSum2(arr, target) {
	if (!arr.length) return [];
	arr.sort((a, b) => {
		return a - b;
	});
	let resList = [];
	let res = [];
	let map = {};
	combinationSumHelper2(arr, target, res, resList, 0, map);
	return resList;
}

function combinationSumHelper2(arr, target, res, resList, index, map) {
	if (!target) {
		const temp = JSON.parse(JSON.stringify(res));
		let str = '';
		for (let item of temp) {
			str += item;
		}
		if (!map[str]) {
			resList.push(temp);
			map[str] = 1;
		}
		// resList.push(temp);
		res.pop();
		return;
	}
	for (let i = index; i < arr.length; i++) {
		if (target < arr[i]) {
			res.pop();
			return;
		}
		res.push(arr[i]);
		combinationSumHelper2(arr, target - arr[i], res, resList, i + 1, map);
	}
	res.pop();
}

// console.log(combinationSum2([3, 1, 3, 5, 1, 1], 8));

// 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。
// 示例 1:
// 输入: [1,2,0]
// 输出: 3
// 示例 2:
// 输入: [3,4,-1,1]
// 输出: 2
// 示例 3:
// 输入: [7,8,9,11,12]
// 输出: 1
function firstMissingPositive(nums) {
	if (!nums.length) return 1;
	const map = {};
	for (let num of nums) {
		if (num <= 0) {
			if (!map[0]) {
				map[0] = 1;
			} else {
				map[0]++;
			}
		} else {
			if (!map[num]) {
				map[num] = 1;
			} else {
				map[num]++;
			}
		}
	}
	// 1为最小正整数的情况
	if (!map[1]) return 1;
	
	// 最小正整数在中间的情况
	let res = 1;
	let keys = Object.keys(map);
	for (let i = 0; i < keys.length; i++) {
		const num = parseInt(keys[i]);
		if (num === res + 1) {
			res = num;
		} else if (num > res && num !== res + 1) {
			res++;
			return res;
		}
	}
	// n + 1的情况
	if (res >= 1) res++;
	return res;
}

// console.log(firstMissingPositive([0]));

// 接雨水问题
function trap(heights) {
	if (!heights.length) return 0;
	let left = 0;
	let leftIndex = 0;
	let storage = 0;
	let right = 0;
	let rightIndex = 0;
	for (let i = 0; i < heights.length; i++) {
		const height = heights[i];
		if (!left) {
			left = height;
			leftIndex = i;
			continue;
		} else {
			if (leftIndex === i - 1 && left <= height) {
				left = height;
				leftIndex = i;
				continue;
			}
			if (leftIndex !== i - 1 && height >= left) {
				right = height;
				rightIndex = i;
				let min = Math.min(left, right);
				for (let k = leftIndex + 1; k < rightIndex; k++) {
					if (heights[k] < min) {
						storage += (min - heights[k]);
					}
				}
				leftIndex = rightIndex;
				left = right;
				right = 0;
				continue;
			}
			
			if (leftIndex !== i - 1 && i + 1 <= heights.length && height > right && height > heights[i - 1]) {
				right = height;
				rightIndex = i;
			}
			if (leftIndex !== i - 1 && i === heights.length - 1) {
				right = right > height ? right : height;
				rightIndex = right > height ? rightIndex : i;
				let min = Math.min(left, right);
				for (let k = leftIndex + 1; k < rightIndex; k++) {
					if (heights[k] < min) {
						storage += (min - heights[k]);
					}
				}
				left = right;
				leftIndex = rightIndex;
				right = 0;
				i = leftIndex;
				continue;
			}
		}
	}
	return storage;
}

// console.log(trap([2, 6, 3, 8, 2, 7, 2, 5, 0]));


// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
//
// 示例 1:
//
// 输入: num1 = "2", num2 = "3"
// 输出: "6"
// 示例 2:
//
// 输入: num1 = "123", num2 = "456"
// 输出: "56088"
// 说明：
//
// num1 和 num2 的长度小于110。
// num1 和 num2 只包含数字 0-9。
// num1 和 num2 均不以零开头，除非是数字 0 本身。
// 不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。
function multiply(num1, num2) {
	if (num1 === '0' || num2 === '0') {
		return '0';
	}
	let arr = [];
	let maxLen = 0;
	let res = '';
	for (let i = num2.length - 1; i >= 0; i--) {
		let numArr = [];
		let carry = 0;
		for (let j = num1.length - 1; j >= 0; j--) {
			let num = num1[j] * num2[i];
			num += carry;
			if (j !== 0) {
				carry = num >= 10 ? parseInt(num / 10) : 0;
				num = num % 10;
			} else {
				if (num >= 10) {
					numArr.unshift(num % 10);
					numArr.unshift(parseInt(num / 10));
				} else {
					numArr.unshift(num);
				}
				break;
			}
			numArr.unshift(num);
		}
		if (num2.length - 1 - i >= 1) {
			let temp = num2.length - 1 - i;
			while (temp) {
				numArr.push(0)
				temp--;
			}
		}
		// numArr处理完毕，numArr中存储了num1 * num2[i]的结果
		
		carry = 0;
		if (!arr.length) {
			arr.concat(numArr);
			continue;
		}
		for (let k = numArr.length - 1; k >= 0; k--) {
			let index = res.length - 1 - k;
			let singNum = index >= 0 ? res[index] + numArr[k] : numArr[k];
			singNum = res[res.length - 1 - k] + numArr[k];
		}
		maxLen = numArr.length > maxLen ? numArr.length : maxLen;
		arr.push(numArr);
	}
	let carry = 0;
	for (let i = 0; i < maxLen; i++) {
		let singleNum = 0;
		for (let item of arr) {
			let index = item.length - 1 - i
			if (item[index]) {
				singleNum += item[index];
			}
		}
		singleNum += carry;
		if (i !== maxLen - 1) {
			carry = singleNum >= 10 ? parseInt(singleNum / 10) : 0;
			singleNum = singleNum % 10;
		}
		res = singleNum.toString() + res;
		
	}
	return res;
}

// console.log(multiply("498828660196","840477629533"));

/**
给定一个字符串(s) 和一个字符模式(p) ，实现一个支持'?'和'*'的通配符匹配。

'?' 可以匹配任何单个字符。
'*' 可以匹配任意字符串（包括空字符串）。
两个字符串完全匹配才算匹配成功。

说明:
s可能为空，且只包含从a-z的小写字母。
p可能为空，且只包含从a-z的小写字母，以及字符?和*。
示例1:

输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。


示例2:
输入:
s = "aa"
p = "*"
输出: true
解释:'*' 可以匹配任意字符串。
示例3:

输入:
s = "cb"
p = "?a"
输出: false
解释:'?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
示例4:

输入:
s = "adceb"
p = "*a*b"
输出: true
解释:第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
示例5:

输入:
s = "acdcb"
p = "a*c?b"
输入: false
 */
// 这种方案暴力枚举，效率较低
// function isMatch (s, p) {
//     // p中仅有*，则为true
//     if(isOnlyStar(p)) {
//         return true;
//     }
//
//     // s、p为空串，则为true
//     if(p === '' && s === '') {
//         return true;
//     }
//
//     // s、p中有一个为空串另一个不为空串，则为false
//     if(s === '' && p !== '') {
//         return false;
//     }
//     if(s !== '' && p === '') {
//         return false;
//     }
//
//     // 如果s和p相等，则肯定匹配
//     if(s === p) {
//         return true;
//     }
//
//     // 如果s和p不相等，且p里面又没有*和?，则肯定不匹配
//     if(s !== p && p.indexOf('*') === -1 && p.indexOf('?') === -1) {
//         return false;
//     }
//
//     // s只有一位，p为?，则为true
//     if(s.length === 1 && p === '?') {
//         return true;
//     }
//
//     // 不为上面的情况
//     const sArr = s.split('');
//     const pArr = p.split('');
//     if(sArr[0] === pArr[0] || pArr[0] === '?') {
//         sArr.shift();
//         pArr.shift();
//         return isMatch(sArr.join(''), pArr.join(''));
//     } else {
//         if(pArr[0] !== '*') {
//             return false;
//         }
//         /**
//          * s=adceb，p=*a*b，有两种情况：
//          * ① *用来匹配，下一步便判断dceb和*a*b
//          * ② *置空，下一步判断adceb和a*b
//          */
//         const tempSArr = JSON.parse(JSON.stringify(sArr));
//         const tempPArr = JSON.parse(JSON.stringify(pArr));
//         sArr.shift();
//         pArr.shift();
//
//         // 前后分别为情况①和情况②
//         return isMatch(sArr.join(''), tempPArr.join('')) || isMatch(tempSArr.join(''), pArr.join(''));
//     }
// };
// function isOnlyStar(p){
//     // 若p为''，则返回false
//     if(!p) return false;
//     for(const str of p) {
//         if(str !== '*') {
//             return false;
//         }
//     }
//     return true;
// }
// 动态规划解法
function isMatch(s, p) {
	const m = s.length;
	const n = p.length;
	const dp = [];
	
	// 二维数组长度取成m+1和n+1，是为了在[0][0]位置处放置空字符串
	for (let i = 0; i < m + 1; i++) {
		dp[i] = new Array(n + 1).fill(false);
	}
	// 对于dp[0][i]来说，s此时为空字符串，p除了空字符串以及*外都匹配不了，则都为false，此处先不对p为空串或者*的情况做处理
	for (let j = 1; j < n + 1; j++) {
		if (p.charAt(j - 1) == '*') {
			dp[0][j] = true;
		} else {
			break;
		}
	}
	
	dp[0][0] = true;
	
	// 填表，填充dp这个二维数组
	for (let i = 1; i < m + 1; i++) {
		for (let j = 1; j < n + 1; j++) {
			/**
			 * 判断dp[i][j]时，有以下几种情况
			 * ① s[i]和p[j]相等，或者p[j]=？，此时，dp[i][j] = dp[i-1][j-1]
			 * ② p[j]为*时，在判断dp[i][j]时，有两种情况
			 *      1、可以选择用*来匹配s[i]，因为*可以匹配任何字母，所以只要p[j-1]加入*后可以匹配s[i-1]字符串，
			 *      那么p[j-1]加入*后肯定也能匹配s[i]，因为*可以顶替任意多个字符，这种情况为dp[i][j] = dp[i-1][j]
			 *      2、可以选择不用*来做匹配，即*当成空字符串，此时，只要p[j-1]可以匹配s[i]，则p[j]也就可以匹配s[i]，
			 *      因为p[j-1] = p[j]，这种情况为 dp[i][j] = dp[i][j-1]
			 * ③ 不为上述两种情况，则为false
			 * */
			if (s.charAt(i - 1) === p.charAt(j - 1) || p.charAt(j - 1) === '?') {
				dp[i][j] = dp[i - 1][j - 1];
			} else if (p.charAt(j - 1) === '*') {
				dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
			} else {
				dp[i][j] = false;
			}
		}
	}
	return dp[m][n];
}

// console.log(isMatch("adceb", "*a*b"));

/**
 *
给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

示例:

输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
从下标为 0 跳到下标为 1 的位置，跳1步，然后跳3步到达数组的最后一个位置。
说明:
假设你总是可以到达数组的最后一个位置。
 * */
// 暴力破解，时间超时了，什么垃圾玩意。。。
// function jump(nums) {
//     let min = {
//         minJunpCount: Number.MAX_SAFE_INTEGER
//     }
//     jumpHelp(nums, 0, min);
//     return min.minJunpCount;
// }
// function jumpHelp(arr, jumpCount, min){
//     if(arr.length === 1) {
//         if(jumpCount < min.minJunpCount) {
//             min.minJunpCount = jumpCount;
//             return;
//         }
//     }
//     const jumpLen = arr.shift();
//     jumpCount++;
//     for(let i = 1; i <= jumpLen; i ++) {
//         const tempArr = JSON.parse(JSON.stringify(arr));
//         tempArr.splice(0, i - 1);
//         jumpHelp(tempArr, jumpCount, min);
//     }
// }

// 贪心算法
function jump(nums) {
	// 如果nums为[0]之类，直接返回0
	if (nums.length === 1) return 0;
	// 步数
	let count = 0;
	// 辅助函数
	count = jumpHelp(nums, count);
	return count;
}

function jumpHelp(arr, count) {
	// 取出第一个值
	const jumpLen = arr.shift();
	// 步数+1
	count++;
	// 递归出口，如果当前能走的最大距离已经大于剩下数组的长度了，则直接返回count
	if (jumpLen >= arr.length) {
		return count;
	}
	// 如果没有return，则计算当前能走的最大距离，最大距离由能走的长度中的数值和该数值所在的位置组成
	let max = 0;
	let maxIndex = 0;
	// 遍历所能达到的位置，找出最大值，如: [4,2,1,1,1,1,2];
	for (let i = 0; i < jumpLen; i++) {
		if (arr[i] + i >= max) {
			maxIndex = i;
			max = arr[i] + i;
		}
	}
	// 如果最大值还没有比当前所在位置本身所能走的位置更远，则直接走到最远位置，如：[10,9,8,7,6,5,4,3,2,1,1,0]
	if (jumpLen > max + maxIndex) {
		arr.splice(0, jumpLen - 1);
	} else {
		// 否则直接跳到最大值的位置，然后继续递归，如：[4,1,1,3,1,1,1]
		arr.splice(0, maxIndex);
	}
	return jumpHelp(arr, count);
}

// console.log(jump([4, 1, 1, 3, 1, 1, 1]));

/**
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 * 示例:
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
 * */
function permute(nums) {
	// 如果数组为空，则返回[]
	if (!nums.length) return [];
	// 如果数组长度为1，则返回[nums]
	if (nums.length === 1) return [nums];
	const len = nums.length;
	const res = [];
	// 回溯
	for (let i = 0; i < len; i++) {
		const arr = JSON.parse(JSON.stringify(nums));
		const curArr = [];
		curArr.push(arr[i]);
		arr.splice(i, 1);
		permuteHelp(arr, curArr, res);
	}
	return res;
}

function permuteHelp(arr, curArr, res) {
	// 递归出口，当arr剩下1位的时候，把结果放入res中
	if (arr.length === 1) {
		curArr.push(arr[0]);
		res.push(curArr);
		curArr = [];
		return;
	}
	for (let i = 0; i < arr.length; i++) {
		const tempArr = JSON.parse(JSON.stringify(arr));
		const tempCurArr = JSON.parse(JSON.stringify(curArr));
		// 每次循环取出一位，继续递归
		tempCurArr.push(tempArr[i]);
		tempArr.splice(i, 1);
		permuteHelp(tempArr, tempCurArr, res);
	}
}

// console.log(permute([1]));


/**
 * 给定一个可包含重复数字的序列，返回所有不重复的全排列。

示例:

输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
 */
function permuteUnique(nums) {
	if (!nums.length) return [];
	if (nums.length === 1) return [nums];
	const uniqueMap = new Map();
	const len = nums.length;
	const curArr = [];
	for (let i = 0; i < len; i++) {
		curArr.push(nums[i]);
		const temp = nums.splice(i, 1);
		permuteUniqueHelp(nums, curArr, uniqueMap);
		nums.splice(i, 0, temp[0]);
		curArr.pop();
	}
	const res = [];
	for (const item of uniqueMap.values()) {
		const arr = item.split(',').map((num) => {
			return parseInt(num);
		});
		res.push(arr);
	}
	return res;
}

function permuteUniqueHelp(arr, curArr, uniqueMap) {
	if (arr.length === 1) {
		curArr.push(arr[0]);
		const key = curArr.join(',');
		if (!uniqueMap.get(key)) {
			uniqueMap.set(key, key);
		}
		curArr.pop();
		return;
	}
	for (let i = 0; i < arr.length; i++) {
		curArr.push(arr[i]);
		const temp = arr.splice(i, 1);
		permuteUniqueHelp(arr, curArr, uniqueMap);
		arr.splice(i, 0, temp[0]);
		curArr.pop();
	}
}

// console.log(permuteUnique([-1,2,-1,2,1,-1,2,1]));

/**
给定一个 n×n 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

说明：

你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。
 
 示例 1:

给定 matrix =
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
 */
function rotate(matrix) {
	if (!matrix.length || matrix.length === 1) return matrix;
	let len = matrix.length;
	let circle = parseInt((len / 2).toFixed(0));
	let curCircle = 0;
	let temp1;
	let temp2;
	let temp3;
	let temp4;
	while (curCircle < circle) {
		temp1 = [];
		temp2 = [];
		temp3 = [];
		temp4 = [];
		for (let i = curCircle; i < len - curCircle; i++) {
			temp1[i] = matrix[curCircle][i];// 上
			temp2[i] = matrix[i][len - curCircle - 1];// 右
			temp3[i] = matrix[len - 1 - curCircle][len - 1 - i];// 下
			temp4[i] = matrix[len - 1 - i][curCircle];// 左
		}
		
		for (let i = curCircle; i < len - curCircle; i++) {
			matrix[i][len - 1 - curCircle] = temp1[i];// 上 ---> 右
			matrix[len - 1 - curCircle][len - 1 - i] = temp2[i];// 右 ---> 下
			matrix[len - 1 - i][curCircle] = temp3[i]; // 下 ---> 左
			matrix[curCircle][i] = temp4[i]; // 左 ---> 上
		}
		
		curCircle++;
	}
	return matrix;
}

// console.log(rotate([[1,2,3], [4, 5,6], [7,8,9]]));


/**
 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

示例:
	
	输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
输出:
	[
		["ate","eat","tea"],
		["nat","tan"],
		["bat"]
	]
说明：

所有输入均为小写字母。
不考虑答案输出的顺序。
 */
// 垃圾算法，又超时。。。时间复杂度到了O(n^3)
// function groupAnagrams(strs){
// 	if(!strs.length) return [];
// 	const strMap = new Map();
// 	const res =  [];
// 	for(const str of strs) {
// 		if(!str) {
// 			strMap.get('1') ? strMap.get('1').push('') : strMap.set('1', ['']);
// 			continue;
// 		}
// 		const strArr = str.split('');
// 		let isFind = false;
// 		for(const key of strMap.keys()) {
// 			const keyArr = key.split('');
// 			for(const char of strArr) {
// 				if(keyArr.indexOf(char) !== -1) {
// 					keyArr.splice(keyArr.indexOf(char), 1);
// 				} else {
// 					break;
// 				}
// 			}
// 			if(!keyArr.length && str.length === key.length) {
// 				strMap.get(key).push(str);
// 				isFind = true;
// 				break;
// 			}
// 		}
// 		if(!isFind) {
// 			strMap.set(str, [str]);
// 		}
// 	}
// 	for(const value of strMap.values()) {
// 		res.push(value);
// 	}
// 	return res;
// }

// 新的思路，复杂度O(n^2)，快多了
function groupAnagrams(strs) {
	if (!strs.length) return [];
	const strMap = new Map();
	const alphaArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	const res = [];
	for (const str of strs) {
		if (!str) {
			strMap.get('1') ? strMap.get('1').push('') : strMap.set('1', ['']);
			continue;
		}
		let keyArr = new Array(26).fill(0);
		// let key = '0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0';
		for (let i = 0; i < str.length; i++) {
			let index = alphaArr.indexOf(str.charAt(i));
			keyArr[index]++;
		}
		let key = keyArr.join('-');
		if (!strMap.get(key)) {
			strMap.set(key, [str]);
		} else {
			strMap.get(key).push(str);
		}
	}
	for (const value of strMap.values()) {
		res.push(value);
	}
	return res;
}

// console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat","ac","bd","aac","bbd","aacc","bbdd","acc","bdd"]));


/**
 *
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。
 * 示例 1:
 * 输入: 2.00000, 10 输出: 1024.00000
 *
 * 示例 2:
 * 输入: 2.10000, 3 输出: 9.26100
 *
 *
 * 示例 3:
 * 输入: 2.00000, -2 输出: 0.25000
 * 解释: 2^-2 = 1/2^2 = 1/4 = 0.25
 *
 * 说明: -100.0 < x < 100.0
 * n是 32 位有符号整数，其数值范围是[−2^31,2^31− 1] 。
 *
 * */

function myPow(x, n) {
	if (!n) return 1;
	let res = 1;
	let isMinus = false;
	if (n < 0) {
		isMinus = true;
		n = n * -1;
	}
	for (let i = 1; i <= n; i++) {
		res = res * x;
	}
	if (isMinus) {
		res = 1 / res;
	}
	return res;
}

// console.log(myPow(2,10));


/**
 * 请实现有重复数字的有序数组的二分查找。
 * 输出在数组中第一个大于等于查找值的位置，如果数组中不存在这样的数，则输出数组长度加一。
 * */

/**
 * 二分查找
 * @param len int整型 数组长度
 * @param target int整型 查找值
 * @param arr int整型一维数组 有序数组
 * @return int整型
 */
function upper_bound_(len, target, arr) {
	if (len === 0) {
		return 1;
	}
	let left = 0;
	let right = len - 1;
	while (left < right) {
		let mid = Math.floor(left + (right - left) / 2);
		if (target === arr[mid]) {
			return mid;
		} else if (target > arr[mid]) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return len + 1;
}


// console.log(upper_bound_(10,2,[1,1,2,3,7,7,7,9,9,10]));


/**
 * 输入一个链表，反转链表后，输出新链表的表头。
 *
 * */
function reverseList(pHead) {
	// write code here
	if (!pHead) return null;
	let cur = pHead;
	const arr = [];
	while (cur) {
		arr.unshift(cur.val);
		cur = cur.next;
	}
	let newHead = new ListNode(arr.shift());
	cur = newHead;
	while (arr.length) {
		cur.next = new ListNode(arr.shift());
		cur = cur.next;
	}
	return newHead;
}

// console.log(reverseList(listNode1));

/**
 * 判断给定的链表中是否有环
 * 扩展：
 * 你能给出空间复杂度O(1)的解法么？
 * */

function hasCycle(head) {
	// write code here
	if (!head) return false;
	let cur = head;
	while (cur) {
		if (cur.next = head) {
			return true;
		}
		cur = cur.next;
	}
	return false;
}


/**
 * 模具题，计算倒模之后的重量
 * 或者：leetcode 接雨水题
 * */
function calcWeight(arr) {
	const heights = [];
	let diffs = 0;
	let maxIndex = -1;
	let max = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][1] >= max) {
			maxIndex = i;
			max = arr[i][1];
		}
		heights.push(arr[i][1]);
		diffs += arr[i][0];
	}
	let left = 0;
	let right = 1;
	let count = 0;
	while (left < maxIndex) {
		while (heights[left] > heights[right]) {
			right++;
		}
		for (let i = left + 1; i < right; i++) {
			let min = Math.min(heights[left], heights[right]);
			count += (min - heights[i]);
		}
		
		left = right;
		right++;
	}
	right = heights.length - 1;
	left = heights.length - 2;
	while (left > maxIndex) {
		while (heights[right] > heights[left]) {
			left--;
		}
		for (let i = right - 1; i > left; i--) {
			let min = Math.min(heights[left], heights[right]);
			count += (min - heights[i]);
		}
		right = left;
		left--;
	}
	return count + diffs;
}

// let arr = [[0,1,0,2,1,0,1,3,2,1,2,1]]
// [4,2,0,3,2,5]

// let arr = [[0,0], [0,2], [0, 1], [0, 4], [0, 2], [0, 6], [3, 5], [0, 0], [0, 0], [1, 3], [0, 7], [0, 2], [0, 5]];
// let arr = [[0,0], [0,1], [0, 0], [0, 2], [0, 1], [0, 0], [0, 1], [0, 3], [0, 2], [0, 1], [0, 2], [0, 1]];
// let arr = [[0,4], [0,2], [0, 0], [0, 3], [0, 2], [0, 5]];
// console.log(calcWeight(arr));


/**
 * 小明手中有 1，5，10，50，100 五种面额的纸币，每种纸币对应张数分别为 5，2，2，3，5 张。若小明需要支付 456 元，则需要多少张纸币？
 */
function getMinCountOfMoney(moneyCountArr, target) {
	const n = 5;
	const moneyArr = [1, 5, 10, 50, 100];
	let count = 0;
	for (let i = n - 1; i >= 0; i--) {
		while (target >= moneyArr[i] && moneyCountArr[i]) {
			target -= moneyArr[i];
			moneyCountArr[i]--;
			count++;
		}
	}
	return count;
}

// console.log(getMinCountOfMoney([5,2,2,5,3], 456));

/**
 *
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 * */

function lengthOfLongestSubstring(str) {
	// 若字符串为空，则返回0
	if (!str.length) return 0;
	// 若字符串长度为1，则返回1
	if (str.length === 1) return 1;
	// 记录当前已有的最长子串长度
	let maxCount = 0;
	// 右指针
	let j = 1;
	// 设置一个map用于去重
	let map = new Map();
	// 将str第一位先置入map中
	map.set(str.charAt(0), 0);
	// 左指针遍历str
	for (let i = 0; i < str.length; i++) {
		// 如果右指针所在的字母在map中不存在，且右指针不位于str最后的位置，则将右指针所在的字母置入map中，右指针往右移动一位
		while (!map.has(str.charAt(j)) && j <= str.length - 1) {
			map.set(str.charAt(j), j);
			j++;
		}
		// 右指针所在字母已经在map中存在了，弹出while循环，记录右指针所在字母在子串中的位置k，将左指针移动到k的位置，左指针每移动一位
		// map就相应删除左指针移动过的字母
		let k = map.get(str.charAt(j));
		// 记录当前子串的长度并与最大长度做对比
		let count = map.size;
		if (count > maxCount) {
			maxCount = count;
		}
		// 左指针往右移动，每移动一位，删除map中相应的字母
		while (i < k) {
			map.delete(str.charAt(i));
			i++;
		}
		// 特殊情况，当i === k时，i不能再++，因为下次for循环i会自动+1，有重复
		if (i === k) {
			map.delete(str.charAt(i));
		}
	}
	return maxCount;
}

// console.log(lengthOfLongestSubstring("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ "));

// let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ "

/**
 * 数组乱序
 * */
function shuffle(arr) {
	let m = arr.length;
	while (m > 1) {
		let index = Math.floor(Math.random() * m--);
		[arr[m], arr[index]] = [arr[index], arr[m]];
	}
	return arr;
}

// const arr = ['李宝平', '黄文佳', '谢明浩','熊博','王豪','赖圳明','何彦军','陆家总','杜辉','殷昕','胡学明','匡家琳','李江','高春明','何育骞'];
// console.log(shuffle(arr));


/**
 * 前序遍历：根结点 -> 左子树 -> 右子树
 * 中序遍历：左子树 -> 根结点 -> 右子树
 * 后序遍历：左子树 -> 右子树 -> 根结点
 * */
class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class BinaryTree {
	constructor(root) {
		if (root) {
			this.root = root;
		} else {
			this.root = null;
		}
	}
}

const nodeA = new TreeNode('a');
const nodeB = new TreeNode('b');
const nodeC = new TreeNode('c');
const nodeD = new TreeNode('d');
const nodeE = new TreeNode('e');
const nodeF = new TreeNode('f');

nodeA.left = nodeB;
nodeA.right = nodeC;
nodeB.left = nodeD;
nodeB.right = nodeE;
nodeC.right = nodeF;

/**
 * DFS
 * */
function preTraverse(root) {
	if (!root) return;
	console.log(root.val);
	preTraverse(root.left);
	preTraverse(root.right);
}

function inTraverse(root) {
	if (!root) return;
	inTraverse(root.left);
	console.log(root.val);
	inTraverse(root.right);
}

function postTraverse(root) {
	if (!root) return;
	postTraverse(root.left);
	postTraverse(root.right);
	console.log(root.val);
}

// postTraverse(nodeA);


/**
 * BFS
 * */
function BFSTraverse(root) {
	if (!root) return;
	const queue = [];
	queue.push(root);
	while (queue.length) {
		const node = queue.shift();
		console.log(node.val);
		if (node.left) {
			queue.push(node.left);
		}
		if (node.right) {
			queue.push(node.right);
		}
	}
}

// BFSTraverse(nodeA);


/**
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 * 例如：
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 * */
function buildTreeByPreOrderAndInOrder(preArr, inArr) {
	if (!preArr.length) return null;
	// 递归出口：如果数组里面只剩下1个数了，则直接返回以该数为val的treeNode
	if (preArr.length === 1) {
		return new TreeNode(preArr.shift());
	}
	// 取出root节点
	const rootVal = preArr.shift();
	const root = new TreeNode(rootVal);
	
	// 获取root节点在中序遍历中的位置，便可得到左子树和右子树的长度
	const rootIndex = inArr.indexOf(rootVal);
	
	// 获取到左子树的前序和中序
	const leftPreArr = [].concat(preArr.splice(0, rootIndex));
	const leftInArr = [].concat(inArr.splice(0, rootIndex));
	
	// 获取右子树的前序和中序
	inArr.shift();
	const rightPreArr = preArr;
	const rightInArr = inArr;
	
	// 递归生成左子树和右子树
	if (leftPreArr.length) {
		root.left = buildTreeByPreOrderAndInOrder(leftPreArr, leftInArr);
	}
	if (rightPreArr.length) {
		root.right = buildTreeByPreOrderAndInOrder(rightPreArr, rightInArr);
	}
	return root;
}

// console.log(buildTreeByPreOrderAndInOrder( [3, 9, 8, 5, 4, 10, 20, 15, 7], [4, 5, 8, 10, 9, 3, 15, 20, 7]));

/**
 * 迭代法求解，时间复杂度只需要O(n)
 * */
function buildTree(preOrder, inOrder) {
	if (!preOrder.length) return null;
	const stack = [];
	let inOrderIndex = 0;
	const root = new TreeNode(preOrder[0]);
	let curNode = root;
	stack.push(root);
	for (let i = 1; i < preOrder.length; i++) {
		const node = new TreeNode(preOrder[i]);
		if (stack[stack.length - 1].val === inOrder[inOrderIndex]) {
			while (stack.length && stack[stack.length - 1].val === inOrder[inOrderIndex]) {
				curNode = stack.pop();
				inOrderIndex++;
			}
			curNode.right = node;
			curNode = curNode.right;
		} else {
			curNode.left = node;
			curNode = curNode.left;
		}
		stack.push(node);
	}
	return root;
}

// console.log(buildTree([3, 9, 8, 5, 4, 10, 20, 15, 7], [4, 5, 8, 10, 9, 3, 15, 20, 7]));


/**
 * 134. 加油站
 * 贪心算法解题效率最高，时间复杂度为O(N)
 * 思路：反证法
 * 前提条件：从x加油站开始，无法绕一圈，只能到达y加油站
 * 有z是x和y中间的一个加油站，那么z肯定也无法达到y+1加油站
 * 反证：假设z可以到达y+1加油站，那么x可以到达z，那么x也可以到达y+1，与前提条件不符
 *
 * 由上述的结论可以得出：发现x只能到达y之后，下一次直接从y开始进行判断，无需再判断x和y之间的加油站
 * */

function canCompleteCircuit(gas, cost) {
	if (!gas.length) return -1;
	for (let i = 0; i < gas.length; i++) {
		// 初始汽油为0
		let curGas = 0;
		// 临时指针指向当前走到的位置
		let index = i;
		// 获取当前加油站的汽油
		curGas += gas[i];
		while (curGas >= cost[index]) {
			// 减去走到下一站需要消耗的汽油
			curGas -= cost[index];
			// 如果当前站点是最后一站，则回到第一个加油站，否则直接往前++
			if (index === gas.length - 1) {
				index = 0;
			} else {
				index++;
			}
			// 如果已经绕圈了，则返回即是答案
			if (index === i) {
				return index;
			}
			// 还没玩成绕圈，获取当前加油站的汽油
			curGas += gas[index];
		}
		// 贪心算法精髓的一步，直接越过x到y之间所有加油站，从y+1站点继续判断
		if (index > i) {
			i = index;
		}
	}
	return -1;
}

// console.log(canCompleteCircuit([3,3,4], [3,4,4]));


/**
 * 快速排序，时间复杂度O(nlogn)，最差情况O(n^2)
 * */
function quickSort(arr) {
	if (!arr.length) return [];
	const left = [];
	const right = [];
	const pivot = Math.floor(arr.length / 2);
	const pivotNum = arr.splice(pivot, 1);
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] <= pivotNum) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat(pivotNum, quickSort(right));
}

// console.log(quickSort([1,3,4,2,8,0,1]));

// /***
//  * 初始化大根堆
//  */
// function buildHeap(arr) {
// 	const len = arr.length - 1;
// 	let i = Math.floor(len / 2);
// 	while (i) {
// 		maxHeapTransfer(arr, i, len);
// 		--i;
// 	}
// 	maxHeapTransfer(arr, i, len);
// }
//
// function maxHeapTransfer(arr, i, len) {
// 	if(!len) return;
// 	if(len === 1) {
// 		if(arr[0] < arr[1]) {
// 			let temp = arr[0];
// 			arr[0] = arr[1];
// 			arr[1] = temp;
// 		}
// 		return;
// 	}
// 	let leftChildIndex = 2 * i + 1;
// 	let rightChildIndex = 2 * i + 2;
// 	let max = i;
// 	if (i >= Math.floor(len / 2)) {
// 		return;
// 	}
// 	if (i <= len && arr[leftChildIndex] > arr[max]) {
// 		max = leftChildIndex;
// 	}
// 	if (i <= len && arr[rightChildIndex] > arr[max]) {
// 		max = rightChildIndex;
// 	}
// 	if (max !== i) {
// 		let temp = arr[i];
// 		arr[i] = arr[max];
// 		arr[max] = temp;
// 		maxHeapTransfer(arr, max, len);
// 	}
// }
//
// const arr = [4, 6, 8, 5, 9]; // 96854
// // buildHeap(arr);
// // console.log(arr);
//
// /***
//  * 堆排序
//  */
// function heapSort(arr) {
// 	if (arr.length === 1) {
// 		return arr;
// 	}
// 	let i = arr.length - 1;
// 	let temp;
// 	buildHeap(arr);
// 	while(i > 0) {
// 		temp = arr[i];
// 		arr[i] = arr[0];
// 		arr[0] = temp;
// 		maxHeapTransfer(arr, 0, i - 1);
// 		i--;
// 	}
// 	console.log(arr);
// }

// heapSort(arr);

/**
 * 初始化堆
 * */
function buildHeap(data) {
	let i = Math.floor((data.length - 1) / 2);
	while (i) {
		transfer(data, i, data.length - 1);
		i--;
	}
	transfer(data, i, data.length - 1);
}

function transfer(data, i, len) {
	let left = 2 * i + 1;
	let right = 2 * i + 2;
	let max = i;
	let temp;
	if (i > Math.floor(len / 2)) {
		return;
	}
	if (left <= len && data[left] < data[max]) {
		max = left;
	}
	if (right <= len && data[right] < data[max]) {
		max = right;
	}
	
	if (max !== i) {
		temp = data[i];
		data[i] = data[max];
		data[max] = temp;
		transfer(data, max, len);
	}
	
}

/**
 * 堆排序
 * */
function heapSort(data) {
	if (data.length === 1) {
		return data;
	}
	let i = data.length - 1;
	let temp;
	buildHeap(data);
	console.log(data);
	while (i > 0) {
		temp = data[i];
		data[i] = data[0];
		data[0] = temp;
		transfer(data, 0, i - 1);
		i--;
	}
	console.log(data);
	return data;
}


// heapSort([4, 6, 8, 5, 9]);


/**
 * 二分法查找
 * */
function binarySearch(arr, target) {
	if (!arr.length) {
		return -1;
	}
	let left = 0;
	let right = arr.length - 1;
	let mid;
	while (left <= right) {
		mid = left + Math.floor((right - left) / 2);
		if (target === arr[mid]) {
			return mid;
		} else if (target < arr[mid]) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
	return -1;
}

// console.log(binarySearch([1,3,3,3,3,5,6,7,8,9], 3));

/**
 * 返回第一个大于等于target的索引
 * */
function binarySearchLowerBound(arr, target) {
	let pos = 0;
	let left = 0;
	let right = arr.length - 1;
	while (left < right) {
		let mid = left + Math.floor((right - left) / 2);
		if (arr[mid] < target) {
			left = mid + 1;
			pos = left;
		} else {
			right = mid;
			pos = right;
		}
	}
	return pos;
}

// console.log(binarySearchLowerBound([1,3,3,3,3,5,6,7,8,9], 3));

/**
 * 返回第一个大于target的索引
 * */
function binarySearchUpperBound(arr, target) {
	let pos = 0;
	let left = 0;
	let right = arr.length - 1;
	while (left < right) {
		let mid = left + Math.floor((right - left) / 2);
		if (arr[mid] > target) {
			right = mid;
			pos = right;
		} else {
			left = mid + 1;
			pos = left;
		}
	}
	return pos;
}

// console.log(binarySearchUpperBound([1,3,3,3,3,5,6,7,8,9], 3));

/**

给你一个整数 n ，表示比赛中的队伍数。比赛遵循一种独特的赛制：

如果当前队伍数是 偶数 ，那么每支队伍都会与另一支队伍配对。总共进行 n / 2 场比赛，且产生 n / 2 支队伍进入下一轮。
如果当前队伍数为 奇数 ，那么将会随机轮空并晋级一支队伍，其余的队伍配对。总共进行 (n - 1) / 2 场比赛，且产生 (n - 1) / 2 + 1 支队伍进入下一轮。
返回在比赛中进行的配对次数，直到决出获胜队伍为止。


示例 1：

输入：n = 7
输出：6
解释：比赛详情：
- 第 1 轮：队伍数 = 7 ，配对次数 = 3 ，4 支队伍晋级。
- 第 2 轮：队伍数 = 4 ，配对次数 = 2 ，2 支队伍晋级。
- 第 3 轮：队伍数 = 2 ，配对次数 = 1 ，决出 1 支获胜队伍。
总配对次数 = 3 + 2 + 1 = 6
示例 2：

输入：n = 14
输出：13
解释：比赛详情：
- 第 1 轮：队伍数 = 14 ，配对次数 = 7 ，7 支队伍晋级。
- 第 2 轮：队伍数 = 7 ，配对次数 = 3 ，4 支队伍晋级。
- 第 3 轮：队伍数 = 4 ，配对次数 = 2 ，2 支队伍晋级。
- 第 4 轮：队伍数 = 2 ，配对次数 = 1 ，决出 1 支获胜队伍。
总配对次数 = 7 + 3 + 2 + 1 = 13


提示：

1 <= n <= 200

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/count-of-matches-in-tournament
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * */
function numberOfMatches(n) {
	let count = 0;
	while (n !== 1) {
		if (n % 2 === 0) {
			n = n / 2;
			count += n;
		} else {
			n = (n - 1) / 2 + 1;
			count += n - 1;
		}
	}
	return count;
}

// console.log(numberOfMatches(14));


/**
你要开发一座金矿，地质勘测学家已经探明了这座金矿中的资源分布，并用大小为 m * n 的网格 grid 进行了标注。每个单元格中的整数就表示这一单元格中的黄金数量；如果该单元格是空的，那么就是 0。

为了使收益最大化，矿工需要按以下规则来开采黄金：

每当矿工进入一个单元，就会收集该单元格中的所有黄金。
矿工每次可以从当前位置向上下左右四个方向走。
每个单元格只能被开采（进入）一次。
不得开采（进入）黄金数目为 0 的单元格。
矿工可以从网格中 任意一个 有黄金的单元格出发或者是停止。

示例 1：

输入：grid = [[0,6,0],[5,8,7],[0,9,0]]
输出：24
解释：
[[0,6,0],
 [5,8,7],
 [0,9,0]]
一种收集最多黄金的路线是：9 -> 8 -> 7。
示例 2：C

输入：grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
输出：28
解释：
[[1,0,7],
 [2,0,6],
 [3,4,5],
 [0,3,0],
 [9,0,20]]
一种收集最多黄金的路线是：1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/path-with-maximum-gold
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * */
function getMaximumGold(grid) {
	let y = grid.length; // 高
	let x = grid[0].length; // 宽
	
	let path = [];
	for (let i = 0; i < y; i++) {
		// 宽
		path.push([]);
		for (let j = 0; j < x; j++) {
			path[i].push(0);
		}
	}
	let max = 0;
	let store = {};
	store.path = path;
	store.max = max;
	// 高
	for (let i = 0; i < y; i++) {
		// 宽
		for (let j = 0; j < x; j++) {
			if (grid[i][j]) {
				getMaximumGoldAssist(grid, i, j, 0, store);
				path[i][j] = 0;
			}
		}
	}
	return store.max;
}

function getMaximumGoldAssist(grid, i, j, count, store) {
	let y = grid.length; // 高
	let x = grid[0].length; // 宽
	store.path[i][j] = 1;
	let isNext = false;
	// 下
	if (i + 1 < y && grid[i + 1][j] !== 0 && !store.path[i + 1][j]) {
		isNext = true;
		getMaximumGoldAssist(grid, i + 1, j, count + grid[i][j], store);
		store.path[i + 1][j] = 0;
	}
	// 右
	if (j + 1 < x && grid[i][j + 1] !== 0 && !store.path[i][j + 1]) {
		isNext = true;
		getMaximumGoldAssist(grid, i, j + 1, count + grid[i][j], store);
		store.path[i][j + 1] = 0;
	}
	// 上
	if (i - 1 >= 0 && grid[i - 1][j] !== 0 && !store.path[i - 1][j]) {
		isNext = true;
		getMaximumGoldAssist(grid, i - 1, j, count + grid[i][j], store);
		store.path[i - 1][j] = 0;
		
	}
	// 左
	if (j - 1 >= 0 && grid[i][j - 1] !== 0 && !store.path[i][j - 1]) {
		isNext = true;
		getMaximumGoldAssist(grid, i, j - 1, count + grid[i][j], store);
		store.path[i][j - 1] = 0;
	}
	if (!isNext && count + grid[i][j] > store.max) {
		store.max = count + grid[i][j];
	}
}

// console.log(getMaximumGold([[0, 6, 0], [5, 8, 7], [0, 9, 0]]));


/**
 *
 * 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。


示例 1：


输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
输出：2
示例 2：


输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
输出：3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/number-of-provinces
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * */

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
function findCircleNum(isConnected) {
	let circle = 0;
	let visited = new Set();
	for (let i = 0; i < isConnected.length; i++) {
		for (let j = 0; j < isConnected[i].length; j++) {
			if (isConnected[i][j] && !visited.has(j)) {
				visited.add(j);
				circle++;
				findCircleNumDFS(isConnected, visited, j);
			}
		}
	}
	return circle;
}

function findCircleNumDFS(isConnected, visited, cityIndex) {
	for (let i = 0; i < isConnected[cityIndex].length; i++) {
		if (isConnected[cityIndex][i] && !visited.has(i)) {
			visited.add(i);
			findCircleNumDFS(isConnected, visited, i);
		}
	}
}

// console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]]));


/**
 *
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。

	示例：
	
	输入：nums = [1,2,3,4]
	输出：[1,3,2,4]
	注：[3,1,2,4] 也是正确的答案之一。
 */

function exchange(nums) {
	if (!nums.length) return nums;
	let left = 0;
	let right = nums.length - 1;
	while (left < right) {
		if (nums[left] % 2 === 0 && nums[right] % 2 !== 0) {
			let temp = nums[left];
			nums[left] = nums[right];
			nums[right] = temp;
			left++;
			right--;
		}
		if (nums[left] % 2 !== 0) {
			left++;
		}
		if (nums[right] % 2 === 0) {
			right--;
		}
	}
	return nums;
}

/**
 
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器。

 

示例 1：输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
示例 2：

输入：height = [1,1]
输出：1
示例 3：

输入：height = [4,3,2,1,4]
输出：16
示例 4：

输入：height = [1,2,1]
输出：2
 

提示：

n = height.length
2 <= n <= 3 * 104
0 <= height[i] <= 3 * 104


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 
 * */
function maxArea(arr) {
	let left = 0;
	let right = arr.length - 1;
	let max = 0;
	let area = 0;
	while (left !== right) {
		let min = arr[left] > arr[right] ? arr[right] : arr[left];
		area = min * (right - left);
		if (area > max) {
			max = area
		}
		if (min === arr[left]) {
			left++;
		} else {
			right--;
		}
	}
	return max;
}

console.log(maxArea(
	[1, 2, 1]
));







































