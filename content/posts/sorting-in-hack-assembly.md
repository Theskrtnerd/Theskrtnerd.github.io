---
author: ["xineohperif"]
title: "Sort everything in Hack Assembly"
date: "2024-05-03"
description: "Imagine spending 6 hours just to put a ball into the net. That's what happened with me the other day when I tried doing my Computer Systems assignment..."
summary: "Imagine spending 6 hours just to put a ball into the net. That's what happened with me the other day when I tried doing my Computer Systems assignment..."
tags: ["sorting", "coding", "uni", "random"]
categories: ["coding", "uni"]
series: ["Uni Interesting Stuff"]
section: posts
ShowToc: true
---

## Introduction

This semester, I had the chance to study the course [Computer Systems](https://www.adelaide.edu.au/course-outlines/001956/2/sem-1/). This course is (kinda) based on the course [nand2tetris](https://www.nand2tetris.org) and the book [The Elements of Computing Systems](https://www.amazon.com/Elements-Computing-Systems-Building-Principles/dp/0262640686/). The course is famous and notorious for being hard, but it teaches you all the fundamentals of Computing Systems, from high-level languages like Python and C++, all the way down to machine code with 0 and 1 bits. 

So it might be obvious that this course is regarded as the hardest in my entire CS degree. Furthermore, you can probably guess how hard the assignments were. Especially in the recent assignment, we were tasked with writing [Hack Assembly](https://www.jk-quantized.com/experiments/HomebrewComputer/Cheatsheets/hackASM.html) code, which is an Assembly language that is created for the Hack Platform, with all basic components of a normal computer with CPU and RAM, etc. This language at first looks super hard to read, with some weird syntax. Below is a small snippet of what the code looks like.

```sample.asm
@R1
D=M
@x
M=D // x = R1

@R2
D=M
@y
M=D // y = R2

@0
D=A
@R3
M=D // R3 = 0
```

## Struggling with Sorting

I struggled with this assignment a lot. But of all the tasks, the task that interested me the most was the task of writing a sorting algorithm in a file called `ArrSort.asm` using this language.

This task was not that difficult, but what was challenging was the bonus part, where you can receive bonus marks for implementing an algorithm in `O(nlog(n))` time complexity. My friend Khanh even talked about not being able to solve this before I started this assignment.

At first, I thought this was going to be a simple task. But then I was (obviously) wrong. The two most famous sorting algorithms that have a ```O(nlog(n))``` time complexity are **Merge Sort** and **Quick Sort**.

I first started by trying to implement **Quick Sort** in Assembly. But after trying to implement it for 3 hours, I realized a major issue with this algorithm: This algorithm needs to be implemented recursively, while Hack Assembly cannot implement recursion because this language doesn't have a return address after jumping and PC (Program Counter) integrated. This was a huge shock and letdown for me, as I've spent 3 hours (late night) for nothing.

After that, I changed to **Merge Sort** and this was a much better solution that can be implemented iteratively. With help from ChatGPT, I was able to come up with this Python code for a high-level implementation:

```python
def merge(arr, r4, r5, r6):
    i = r4
    j = r5 + 1
    while i <= r5 and j <= r6:
        if arr[i] <= arr[j]:
            i += 1
        else:
            temp = arr[j]
            for k in range(j, i, -1):
                arr[k] = arr[k - 1]
            arr[i] = temp
            i += 1
            j += 1
            r5 += 1
    
def merge_sort(arr):
    r2 = len(arr)
    r3 = 1
    while r3 < r2:
        r4 = 0
        while r4 < r2 - 1:
            r7 = r2 - 1
            r5 = r3+r4-1
            r5 = min(r5, r7)
            r6 = r5+r3
            r6 = min(r6, r7)
            merge(arr, r4, r5, r6)
            r4 += 2 * r3
        r3 *= 2
```

Notice how the variables are named from `r2` to `r7`. This is because in the Hack Assembly, the variables you use will mostly be from `R1` to `R15`. With this naming, it will be easier for me to convert all this code to Hack Assembly. And after another 2 hours of work, I finally came up with this super-long code:

```asm
@3
M=1 // r3=1
(WHILEA)
@3
D=M
@2
D=D-M
@END
D;JGE // while r3<r2
@4
M=0 // r4 = 0
(WHILEB)
@4
D=M+1
@2
D=D-M
@ENDWHILEB
D;JGE // while r4 < r2-1
@2
D=M
@7
M=D-1 // r7 = r2-1
@3
...
```

For the full code, access my Github repo [here](https://github.com/Theskrtnerd/computer-systems). This will have all my tasks, with completed test cases to test if the code works.

## Conclusion

So in conclusion, I've spent six hours (an all-nighter) just for one extra mark. But at least for me, it was super worth it, as I was able to understand assembly code deep down to the RAM and ROM level. Furthermore, I now understand more about sorting algorithms and how they work.

What's even funnier is that I neglected all testing, which contributes many more marks than this bonus part. And luckily, with the automatic extension, I was able to submit all the testing files just one day before the final deadline.

Although I loved this experience, I hope this is the last time I have to write stuff like this, as I'm too tired to spend another 6 hours.