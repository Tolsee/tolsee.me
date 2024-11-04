---
title: 'Day 2: Calculator in Zig'
publishedAt: '2024-11-02'
author: 'Learning Engineer'
tags:
  - Zig
  - Systems Programming
  - Learning Journey
---

Today, we are going to built a simple calculator in Zig.
As this is our second day with Zig, we will learn how to read user input and perform arithmetic operations.
We will also learn about how basic assignments and control flow works in Zig.

> [!TIP]
> If you haven't installed Zig yet, please refer to [Day 1: Getting Started with Zig](/posts/day-1-getting-started-with-zig) for installation instructions.
> Also, create a new Zig project `calculator` using `zig init` command.

Before we start, lets learn about how to get user input in Zig.

### Reading User Input

To read user input in Zig, we can use the `std.io.getStdIn().reader()` function.
This function returns a [`std.io.Reader`](https://ziglang.org/documentation/master/std/#std.io.GenericReader) object that we can use to read user input.

Here is an example of reading user input in Zig:

```zig
const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    const stdout = std.io.getStdOut().writer();

    try stdout.writeAll("Addition calculator\n\n");

    try stdout.writeAll("Enter your first number: ");
    var buffer: [1024]u8 = undefined;
    const input = (try stdin.readUntilDelimiterOrEof(&buffer, '\n')) orelse {
        std.debug.print("Failed to read input\n", .{});
        return;
    };
    std.debug.print("You entered: {s}\n", .{input});
}
```

### Calculator

To convert user input to a number, we can use the [`std.fmt.parseFloat`](https://ziglang.org/documentation/master/std/#std.fmt.parse_float.parseFloat) function.
Now, let's update our code to read two numbers from the user and add them together.

```zig
const std = @import("std");

pub fn main() !void {
    const stdin = std.io.getStdIn().reader();
    const stdout = std.io.getStdOut().writer();

    try stdout.writeAll("Addition calculator\n\n");

    var buffer: [1024]u8 = undefined;

    try stdout.writeAll("Enter your first number: ");
    const firstNumberString = (try stdin.readUntilDelimiterOrEof(&buffer, '\n')) orelse {
        std.debug.print("Failed to read input\n", .{});
        return;
    };
    const firstNumber = try std.fmt.parseFloat(f64, firstNumberString);

    try stdout.writeAll("Enter your second number: ");
    const secondNumberString = (try stdin.readUntilDelimiterOrEof(&buffer, '\n')) orelse {
        std.debug.print("Failed to read input\n", .{});
        return;
    };
    const secondNumber = try std.fmt.parseFloat(f64, secondNumberString);

    const result = firstNumber + secondNumber;
    // Ref: https://ziglang.org/documentation/master/std/#std.fmt.format
    std.debug.print("Result: {d}\n", .{result});
}
```
