---
title: 'Day 1: Getting Started with Zig'
publishedAt: '2024-10-31'
updatedAt: '2024-11-04'
author: 'Tulsi Sapkota'
tags:
  - Zig
  - Systems Programming
  - Learning Journey
---

Today marks my first day exploring Zig, a modern systems programming language.

I like to learn languages by doing to get a better sense of how things work.
Along the way, we will also dive into the fundamentals of Zig and explore its features.
So, we will start by building a simple "Hello, World!" program in Zig.

### Installation

To get started with Zig, we need to install Zig on our system. I am using [zvm](https://github.com/tristanisham/zvm)
to manage Zig versions. You can install `zvm` using the following command:

> [!TIP]
> If you are not running Linux, BSD, MacOS or \*nix, please refer to `zvm` installation guide.

```bash
curl https://raw.githubusercontent.com/tristanisham/zvm/master/install.sh | bash
```

### Hello World in Zig

Let's start with the classic "Hello, World!" program in Zig:

Create a folder for our project "hello-zig":

```bash
mkdir hello-zig
cd hello-zig
```

Now, let initialize a Zig project:

```bash
zig init
```

Your project structure should look like this:

```
  src
     main.zig
     root.zig
 build.zig
 build.zig.zon
```

Now, let's update `main.zig` with the following code:

```zig
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, Zig!\n", .{});
}
```
