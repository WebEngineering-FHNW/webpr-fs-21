
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

    const cpy = ary.reduce( (acc, current) => [...acc, current], []);
    assert.is(ary.length , cpy.length);
    assert.is(ary[0]     , cpy[0]);
    assert.is(ary[ary.length-1]    , cpy[ary.length-1]);

    // array.reverse mit reduce
    const rvs = ary.reduce((acc, current) => [current, ...acc], []);
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

    const hasTrue2 = bools => bools.find( bool => bool ) !== undefined;
    assert.is(hasTrue2([]), false);
    assert.is(hasTrue2([true]), true);
    assert.is(hasTrue2([false]), false);
    assert.is(hasTrue2(mixedBools), true);
    assert.is(hasTrue2(trueBools),  true);
    assert.is(hasTrue2(falseBools), false);

    // const foo = ["a", "b", "c", "d", "b", "c", "d"];
    // foo.find( it => {
    //     console.log(it);
    //     return it === "d";
    // });

    const arrayIsEqual = (first, second) => {
        if (first.length !== second.length) {
            return false;
        }
        return first.every( (it, idx) => it === second[idx] )
    }
    assert.is(arrayIsEqual([],[]),      true);
    assert.is(arrayIsEqual([1],[]),     false);
    assert.is(arrayIsEqual(["0"],[0]),  false);
    assert.is(arrayIsEqual(ary,cpy),    true);



});
