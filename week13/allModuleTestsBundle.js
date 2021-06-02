/**
 * @module The mod module as an example for ES6 modules
 */

const pi = Math.PI;

// use module as a singleton

// make a single state that is only exposed as values, not references to objects

let a = null; // these variables are exported as read-only
let b = null;

const setA = v => a = v;
const setB = v => b = v;

// x = 2 // introduction of new globals is not allowed in modules
// bundlers accept it, though, and produce code without the restriction.

function Assert() {
    const results = [];
    return {
        results: results,
        true: (testResult) => {
            if (!testResult) { console.error("test failed"); }
            results.push(testResult);
        },
        is: (actual, expected) => {
            const testResult = actual === expected;
            if (!testResult) {
                console.error("test failure. Got '"+ actual +"', expected '" + expected +"'");
            }
            results.push(testResult);
        }
    }
}

function test(name, callback) {
    const assert = Assert();
    callback(assert);
    report(name, assert.results);
}

function Suite(suiteName) {
    const tests = [];
    const suite = {
        test: (testName, callback) => test(suiteName + "-"+ testName, callback),
        add:  (testName, callback) => tests.push([testName, callback]),
        run:  () => {
            tests.forEach( ([testName, callback]) => suite.test(testName, callback) );
        }
    };
    return suite;
}

// test result report
// report :: String, [Bool] -> DOM ()
function report(origin, ok) {
    const extend = 20;
    if ( ok.every( elem => elem) ) {
        write(" "+ padLeft(ok.length, 3) +" tests in " + padRight(origin, extend) + " ok.");
        return;
    }
    let reportLine = "    Failing tests in " + padRight(origin, extend);
    bar(reportLine.length);
    write("|" + reportLine+ "|");
    for (let i = 0; i < ok.length; i++) {
        if( ! ok[i]) {
            write("|    Test #"+ padLeft(i, 3) +" failed                     |");
        }
    }
    bar(reportLine.length);
}

function write(message) {
    const out = document.getElementById('out');
    out.innerText += message + "\n";
}

function bar(extend) {
    write("+" + "-".repeat(extend) + "+");
}

// padRight :: String, Int -> String
function padRight(str, extend) {
    return "" + str + fill(str, extend);
}

function padLeft(str, extend) {
    return "" + fill(str, extend) + str;
}

function fill(str, extend) {
    const len = str.toString().length; // in case str is not a string
    if (len > extend) {
        return str;
    }
    return " ".repeat(extend - len);
}

const modSuite = Suite('mod');

modSuite.add("const", assert => {

    assert.true( pi > 0 ) ;

});

modSuite.add("singleton", assert => {

    assert.is(a, null);
    assert.is(b, null);

    setA("Dierk"); // there is no object exposed and so no target to attack
    setB("König");

    assert.is(a, "Dierk");
    assert.is(b, "König");

    // console.log(x); // newly introduced global x should not be visible but when using bundlers, it is

    // this kind of test does not work with the bundler as it checks the erroneous assignment
    // try {
    //     a = "shall not work";
    //     assert.true(false);
    // } catch (e) {
    //     assert.true("exported variables are read-only.")
    // }

});

modSuite.run();

// execute asynchronous tasks in strict sequence, aka "reactive stream", "flux architecture"
const Scheduler = () => {
    let inProcess = false;
    const tasks = [];
    function process() {
        if (inProcess) { return; }
        if (tasks.length === 0) { return; } // guard clause
        inProcess = true;
        const task = tasks.pop();
        const doit = new Promise( (resolve, reject) => {
            task(resolve);
        }). then ( () => {
            inProcess = false;
            process();
        });
    }
    function add(task) {
        tasks.unshift(task);
        process();
    }
    return {
        add: add,
        addOk: task => add( ok => { task(); ok(); }) // convenience
    }
};


// a dataflow abstraction that is not based on concurrency but on laziness

const DataFlowVariable = howto => {
    let value = undefined;
    return () => undefined === value
                 ? value = howto()
                 : value;
};

// requires dataflow.js

const suite = Suite("dataflow");
suite.add("scheduler", assert => {

    const result = [];

    const scheduler = Scheduler();
    scheduler.add(ok => {
        setTimeout(_ => {   // we wait before pushing
            result.push(1);
            ok();
        }, 100);
    });
    scheduler.add(ok => {   // we push "immediately"
        result.push(2);
        ok();
    });
    scheduler.addOk ( () => result.push(3)); // convenience

    scheduler.add(ok => {
        assert.is(result[0], 1); // sequence is still ensured
        assert.is(result[1], 2);
        assert.is(result[2], 3);
    });

    assert.true(true); // any assertion error will appear in the console, not in the report

});

suite.add("value", assert => {

    const z = DataFlowVariable(() => x() + y());   // z depends on x and y, which are set later...
    const x = DataFlowVariable(() => y());         // x depends on y, which is set later...
    const y = DataFlowVariable(() => 1);

    assert.is(z(), 2);
    assert.is(x(), 1);
    assert.is(y(), 1);

});

suite.add("cache", assert => { // value must be set at most once

    let counter = 0;
    const x = DataFlowVariable(() => {
        counter++;
        return 1;
    });

    assert.is(counter, 0);
    assert.is(x(), 1);
    assert.is(counter, 1);
    assert.is(x(), 1);
    assert.is(counter, 1);

});

suite.run();

// importing all tests that make up the suite of tests that are build on the ES6 module system
