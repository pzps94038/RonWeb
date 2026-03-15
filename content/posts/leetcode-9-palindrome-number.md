---
{
  'title': '9. Palindrome Number',
  'categoryId': 5,
  'categoryName': 'Leetcode',
  'labels': [{ 'labelId': 9, 'labelName': 'Typescript' }],
  'createDate': '2023-05-22T20:22:53.830Z',
  'references': ['https://leetcode.com/problems/palindrome-number/description/'],
  'flag': 'Y',
}
---

Given an integer `x`, return `true` _if_ `x` _is a_ _**palindrome**\_\_, and_ `false` _otherwise_.

何謂回文 → 正讀反讀都能讀通的句子

意思是會給一個數字，如果是回文就回傳 true,不是就回傳 false

**Example 1:**

```plaintext
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```

**Example 2:**

```plaintext
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

**Example 3:**

```plaintext
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

**Constraints:**

```plaintext
-231 <= x <= 231 - 1
```

## 解法

把提供的數字轉成字串，再切割反轉後串連，跟原始字串做比較。

```typescript
const isPalindrome = (num: number) => {
  const str = num.toString();
  return str === str.split('').reverse().join('');
};
```
