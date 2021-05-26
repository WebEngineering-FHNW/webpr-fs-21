
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
    assert.is(ary[-1]    , cpy[-1]);

    // array.reverse mit reduce

});
