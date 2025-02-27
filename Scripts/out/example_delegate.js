"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Example_1 = require("Example");
if (module == require.main) {
    let actions = new Example_1.DelegateTest();
    print("testcase: 无参数的委托");
    console.log("********** add");
    actions.onAction("add", function () {
        console.log("js action call");
    });
    console.log("********** call");
    actions.CallAction();
    actions.onAction("set", null);
    console.log("********** after clear, call again");
    actions.CallAction();
    print("testcase: 带参数的委托");
    actions.onActionWithArgs("set", (a, b, c) => {
        console.log(a, b, c);
    });
    actions.CallActionWithArgs("string", 123, 456);
    actions.onFunc("set", v => v * 2);
    console.log(actions.CallFunc(111));
    actions.onFunc("set", undefined);
    print("testcase: instance event");
    actions.onEvent("add", v => print("instance event test 1:", v));
    function instanceEventHandler(v) { print("instance event test 2:", v); }
    actions.onEvent("add", instanceEventHandler);
    actions.DipatchEvent(123);
    actions.onEvent("remove", instanceEventHandler);
    actions.DipatchEvent(123);
    print("testcase: static event");
    Example_1.DelegateTest.onStaticEvent("add", v => print("static event test 1:", v));
    function staticEventHandler(v) { print("static event test 2:", v); }
    Example_1.DelegateTest.onStaticEvent("add", staticEventHandler);
    Example_1.DelegateTest.DipatchStaticEvent(123);
    Example_1.DelegateTest.onStaticEvent("remove", staticEventHandler);
    Example_1.DelegateTest.DipatchStaticEvent(123);
    try {
        print("testcase: delegate with ref/out parameters");
        actions.complexCall("add", (b, a, v) => {
            a.value += b;
            v.value = 999;
            return 789;
        });
        actions.complexCall2("add", v => {
            v.value.Set(v.value.x * 2, v.value.y * 2, v.value.z * 2);
        });
        actions.TestComplexCall();
    }
    catch (err) {
        console.warn(err);
        console.warn("dynamic code emitting doesn't work properly");
    }
}
//# sourceMappingURL=example_delegate.js.map