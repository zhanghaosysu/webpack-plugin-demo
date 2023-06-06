// SyncLoopHook 是一个同步、循环类型的 Hook。
// 循环类型的含义是不停的循环执行事件函数，直到所有函数结果 result === undefined，不符合条件就调头重新开始执行。
const { SyncLoopHook } = require("tapable");

const hook = new SyncLoopHook([]); //先实例化，并定义回调函数的形参

let count = 5;

//通过tap函数注册事件
hook.tap("测试1", () => {
  console.log("测试1里面的count:", count);
  if ([1, 2, 3].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

hook.tap("测试2", () => {
  console.log("测试2里面的count:", count);
  if ([1, 2].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

hook.tap("测试3", () => {
  console.log("测试3里面的count:", count);
  if ([1].includes(count)) {
    return undefined;
  } else {
    count--;
    return "123";
  }
});

//通过call方法触发事件
hook.call();

// 测试1里面的count: 5
// 测试1里面的count: 4
// 测试1里面的count: 3
// 测试2里面的count: 3，由于第二个注册函数返回值不为 undefined，需要掉头重新执行，从第一个注册函数处重新执行
// 测试1里面的count: 2
// 测试2里面的count: 2
// 测试3里面的count: 2 由于第三个注册函数返回值不为 undefined，需要掉头重新执行，从第一个注册函数处重新执行
// 测试1里面的count: 1
// 测试2里面的count: 1
// 测试3里面的count: 1