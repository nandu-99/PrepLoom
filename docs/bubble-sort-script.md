# Bubble Sort Narration

Updated beginner-friendly script. Bracketed notes are not spoken. Numbers change automatically for custom inputs.

## A. Complete walkthrough

Input: [6, 3, 8, 2, 5]

### Step 1: Put the numbers in order

State: ready; pass: 0; current list: [6, 3, 8, 2, 5]

Let's put these numbers in order, from smallest to biggest.

[Pause 500 ms.]

We'll look at two numbers next to each other. If the left number is bigger, we'll swap them. Swap just means change places.

[Pause 500 ms.]

We'll start on the left and work our way to the right. The biggest number will end up at the end.

[Pause 500 ms.]

### Step 2: Pass 1: start from the left

State: pass; pass: 1; current list: [6, 3, 8, 2, 5]

Start with the first two numbers. After each check, move one position right to check the next pair.

[Pause 500 ms.]

One trip across the numbers we're checking is called a pass.

[Pause 500 ms.]

### Step 3: Compare 6 and 3

State: compare; pass: 1; current list: [6, 3, 8, 2, 5]

6 is bigger than 3. We want the smaller number first, so let's swap them.

[Pause 650 ms.]

### Step 4: Swap 6 and 3

State: swap; pass: 1; current list: [3, 6, 8, 2, 5]

[Move the numbers as this sentence starts.]

3 moves left, and 6 moves right.

[Pause 650 ms.]

The bigger number moved one place to the right. We still need to check the rest of the list.

[Pause 500 ms.]

### Step 5: Compare 6 and 8

State: compare; pass: 1; current list: [3, 6, 8, 2, 5]

6 is smaller than 8. They're already in the right order.

[Pause 500 ms.]

### Step 6: Compare 8 and 2

State: compare; pass: 1; current list: [3, 6, 8, 2, 5]

8 is bigger than 2. We want the smaller number first, so let's swap them.

[Pause 650 ms.]

### Step 7: Swap 8 and 2

State: swap; pass: 1; current list: [3, 6, 2, 8, 5]

[Move the numbers as this sentence starts.]

2 moves left, and 8 moves right.

[Pause 650 ms.]

### Step 8: Compare 8 and 5

State: compare; pass: 1; current list: [3, 6, 2, 8, 5]

8 is bigger than 5. We want the smaller number first, so let's swap them.

[Pause 650 ms.]

### Step 9: Swap 8 and 5

State: swap; pass: 1; current list: [3, 6, 2, 5, 8]

[Move the numbers as this sentence starts.]

5 moves left, and 8 moves right.

[Pause 650 ms.]

8 has reached the end of the part we're checking.

[Pause 500 ms.]

### Step 10: 8 is in its final place

State: settled; pass: 1; current list: [3, 6, 2, 5, 8]

8 is now in its final place. We won't need to check it again.

[Pause 500 ms.]

Each time we checked a pair, the bigger number stayed on the right. That's how the biggest reached the end.

[Pause 500 ms.]

The numbers before it may still be mixed up. Let's start another pass.

[Pause 500 ms.]

### Step 11: Pass 2: start from the left

State: pass; pass: 2; current list: [3, 6, 2, 5, 8]

Start again from the left. Leave the numbers with a check mark alone. They're already in the right place.

[Pause 500 ms.]

### Step 12: Compare 3 and 6

State: compare; pass: 2; current list: [3, 6, 2, 5, 8]

3 is smaller than 6. They're already in the right order.

[Pause 500 ms.]

### Step 13: Compare 6 and 2

State: compare; pass: 2; current list: [3, 6, 2, 5, 8]

6 is bigger than 2. We want the smaller number first, so let's swap them.

[Pause 650 ms.]

### Step 14: Swap 6 and 2

State: swap; pass: 2; current list: [3, 2, 6, 5, 8]

[Move the numbers as this sentence starts.]

2 moves left, and 6 moves right.

[Pause 650 ms.]

### Step 15: Compare 6 and 5

State: compare; pass: 2; current list: [3, 2, 6, 5, 8]

6 is bigger than 5. We want the smaller number first, so let's swap them.

[Pause 650 ms.]

### Step 16: Swap 6 and 5

State: swap; pass: 2; current list: [3, 2, 5, 6, 8]

[Move the numbers as this sentence starts.]

5 moves left, and 6 moves right.

[Pause 650 ms.]

6 has reached the end of the part we're checking.

[Pause 500 ms.]

### Step 17: 6 is in its final place

State: settled; pass: 2; current list: [3, 2, 5, 6, 8]

6 is now in its final place. We won't need to check it again.

[Pause 500 ms.]

The numbers before it may still be mixed up. Let's start another pass.

[Pause 500 ms.]

### Step 18: Pass 3: start from the left

State: pass; pass: 3; current list: [3, 2, 5, 6, 8]

Start again from the left. Leave the numbers with a check mark alone. They're already in the right place.

[Pause 500 ms.]

### Step 19: Compare 3 and 2

State: compare; pass: 3; current list: [3, 2, 5, 6, 8]

3 is bigger than 2. We want the smaller number first, so let's swap them.

[Pause 650 ms.]

### Step 20: Swap 3 and 2

State: swap; pass: 3; current list: [2, 3, 5, 6, 8]

[Move the numbers as this sentence starts.]

2 moves left, and 3 moves right.

[Pause 650 ms.]

### Step 21: Compare 3 and 5

State: compare; pass: 3; current list: [2, 3, 5, 6, 8]

3 is smaller than 5. They're already in the right order.

[Pause 500 ms.]

### Step 22: 5 is in its final place

State: settled; pass: 3; current list: [2, 3, 5, 6, 8]

5 is now in its final place. We won't need to check it again.

[Pause 500 ms.]

Only the first two numbers still need a final check.

[Pause 500 ms.]

### Step 23: Pass 4: start from the left

State: pass; pass: 4; current list: [2, 3, 5, 6, 8]

Just the first two numbers still need a final check. Let's check them.

[Pause 500 ms.]

### Step 24: Compare 2 and 3

State: compare; pass: 4; current list: [2, 3, 5, 6, 8]

2 is smaller than 3. They're already in the right order.

[Pause 500 ms.]

### Step 25: A whole pass with no swaps

State: settled; pass: 4; current list: [2, 3, 5, 6, 8]

We finished this pass without making a single swap.

[Pause 500 ms.]

The part we just checked is in order. The numbers with check marks were already finished.

[Pause 500 ms.]

### Step 26: Everything is in order. We can stop.

State: done; pass: 4; current list: [2, 3, 5, 6, 8]

A whole pass with no swaps tells us the list is sorted.

[Pause 500 ms.]

Everything is in order, so we're done. Return the sorted list.

[Pause 500 ms.]

That's bubble sort: check two numbers next to each other, swap if the left one is bigger, and keep going until the list is in order.

[Pause 500 ms.]

## B. Other possible branches

### Equal neighbors

Example input: [2, 2]

Both numbers are 2. They're equal, so there's no need to swap them.

[Pause 500 ms.]

### Last position left

Example input: [3, 2, 1]

2 is now in its final place. We won't need to check it again.

[Pause 500 ms.]

Only one position is left. That number must be in the right place too.

[Pause 500 ms.]

### Finished after all passes

Example input: [3, 2, 1]

The whole list is now in order, from smallest to biggest.

[Pause 500 ms.]

Everything is in order, so we're done. Return the sorted list.

[Pause 500 ms.]

That's bubble sort: check two numbers next to each other, swap if the left one is bigger, and keep going until the list is in order.

[Pause 500 ms.]

### First pass without swaps

Example input: [1, 2, 3, 4]

We finished this pass without making a single swap.

[Pause 500 ms.]

Every pair was already in order.

[Pause 500 ms.]

### Actual early stopping

Example input: [1, 2, 3, 4]

A whole pass with no swaps tells us the list is sorted.

[Pause 500 ms.]

We can stop early. There's no need for another pass.

[Pause 500 ms.]

That's bubble sort: check two numbers next to each other, swap if the left one is bigger, and keep going until the list is in order.

[Pause 500 ms.]

### One-number introduction

Example input: [7]

There's only one number, so there's nothing to compare. It's already sorted.

[Pause 500 ms.]

### One-number completion

Example input: [7]

We're done. Return the list as it is.

[Pause 500 ms.]

### Empty-list introduction

Example input: []

This list is empty. There are no numbers to sort.

[Pause 500 ms.]
