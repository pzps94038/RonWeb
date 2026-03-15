---
{
  'title': '1. Two Sum 兩數之和',
  'categoryId': 5,
  'categoryName': 'Leetcode',
  'labels': [{ 'labelId': 9, 'labelName': 'Typescript' }],
  'createDate': '2023-05-22T06:02:13.507Z',
  'references': ['https://leetcode.com/problems/two-sum/description/'],
  'flag': 'Y',
}
---

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to_ `_target_`.

You may assume that each input would have _**exactly**_ **one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

**Example 1:**

```xml
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**

```xml
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**

```xml
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**

```plaintext
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
```

## 解法

題意是在陣列當中找到兩個元素相加等於 target 的值，並返回兩個元素的位置索引。

遍歷每個元素，當 target 減去當前元素的剩餘值存在於 map 當中，就返回 \[map 中另一個元素的位置, 當前位置\]。

```typescript
const twoSum = (nums: number[], target: number) => {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    if (map.get(target - nums[i]) !== undefined) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [0, 0];
};
```
