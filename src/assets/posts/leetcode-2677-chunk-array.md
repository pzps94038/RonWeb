---
{
  "title": "2677. Chunk Array",
  "categoryId": 5,
  "categoryName": "Leetcode",
  "labels": [
    {
      "labelId": 9,
      "labelName": "Typescript"
    }
  ],
  "createDate": "2023-05-24T21:27:29.925Z",
  "references": [
    "https://leetcode.com/problems/chunk-array/description/"
  ],
  "flag": "Y"
}
---
Given an array `arr` and a chunk size `size`, return a **chunked** array. A **chunked** array contains the original elements in `arr`, but consists of subarrays each of length `size`. The length of the last subarray may be less than `size` if `arr.length` is not evenly divisible by `size`.

You may assume the array is the output of `JSON.parse`. In other words, it is valid JSON.

Please solve it without using lodash's `_.chunk` function.

**Example 1:**

```plaintext
Input: arr = [1,2,3,4,5], size = 1
Output: [[1],[2],[3],[4],[5]]
Explanation: The arr has been split into subarrays each with 1 element.
```

**Example 2:**

```plaintext
Input: arr = [1,9,6,3,2], size = 3
Output: [[1,9,6],[3,2]]
Explanation: The arr has been split into subarrays with 3 elements. However, only two elements are left for the 2nd subarray.
```

**Example 3:**

```plaintext
Input: arr = [8,5,3,2,6], size = 6
Output: [[8,5,3,2,6]]
Explanation: Size is greater than arr.length thus all elements are in the first subarray.
```

**Example 4:**

```plaintext
Input: arr = [], size = 1
Output: []
Explanation: There are no elements to be chunked so an empty array is returned.
```

**Constraints:**

```plaintext
arr is a valid JSON array
2 <= JSON.stringify(arr).length <= 105
1 <= size <= arr.length + 1
```

## 解法

這題是給定一個陣列，以及指定每個區塊的數量。

遍歷陣列，檢查該分塊是否已存在，有的話就把元素推進該區塊，沒有的話就推一個新的空區塊並把當前元素帶入。

```typescript
const chunk = (arr: any[], size: number) => {
    const res: any[][] = [];
    for(let i = 1; i <= arr.length; i++){
        const scope = Math.ceil(i/size) - 1;
        if(res[scope]){
            res[scope].push(arr[i - 1]);
        }else{
            res.push([arr[i - 1]]);
        }
    }
    return res;
};
```
