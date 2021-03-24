
// atoms
const id    = x =>      x;
const konst = x => y => x;

// id(id) === id
// const M = f => f(f);       // Mockingbird
// M(M)                       // replace by definition
// (f => f(f)) (f => f(f))    // alpha translation
// (f => f(f)) (g => g(g))    // beta reduction, apply function
// ((g => g(g))((g => g(g)))) // collapse parentheses
// (g => g(g)) (g => g(g))    // alpha translate
// (f => f(f)) (f => f(f))    // reproduction reached
// const rec = M(M);          // core of y-combinator

// derived
const F = konst (id);
const T = konst;

const pair = x => y => f => f(x)(y);
const fst  = p => p(T);
const snd  = p => p(F);

const Left   = x => f => g => f(x);
const Right  = x => f => g => g(x);
const either = e => f => g => e (f) (g);
