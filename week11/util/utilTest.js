
// requires util.js

// extending the prototype of many objects
test("util-times", assert => {

    const collect = [];

    (10).times( n => collect.push(n) );

    assert.is(collect.length, 10);
    assert.is(collect[0], 0);
    assert.is(collect[9], 9);

});

test("util-refresher", assert => {
    const ary = [0,1,2,3,4];
    const sum  = ary.reduce( (acc, current) => acc + current, 0);
    assert.is(sum, 10);
    const prod = ary.reduce( (acc, current) => acc * current, 1);
    assert.is(prod, 0);

    const cpy = ary.reduce( (acc, current) => {
        acc.push(current);
        return acc;
    }, []);
    assert.is(ary.length , cpy.length);
    assert.is(ary[0]     , cpy[0]);
    assert.is(ary[ary.length-1]    , cpy[ary.length-1]);

    // array.reverse mit reduce
    const rvs = ary.reduce((acc, current) => (acc.unshift(current), acc), []);
    assert.is(ary.length            , rvs.length);
    assert.is(ary[0]                , rvs[ary.length-1]);
    assert.is(ary[ary.length-1]     , rvs[0]);

    // variante mit rest operator
    const rvs2 = ary.reduce((acc, current) => [current, ...acc], []);
    assert.is(ary.length        , rvs2.length);
    assert.is(ary[0]            , rvs2[ary.length-1]);
    assert.is(ary[ary.length-1] , rvs2[0]);

    const mixedBools = [true, false, false, true, false];
    const trueBools  = [true, true, true];
    const falseBools = [false, false, false, false];

    const hasTrue = bools => bools.reduce((acc , current) => acc || current, false);
    assert.is(hasTrue([]), false);
    assert.is(hasTrue([true]), true);
    assert.is(hasTrue([false]), false);
    assert.is(hasTrue(mixedBools), true);
    assert.is(hasTrue(trueBools),  true);
    assert.is(hasTrue(falseBools), false);

});
