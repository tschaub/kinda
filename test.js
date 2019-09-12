const expect = require('@hapi/code').expect;
const lab = (exports.lab = require('@hapi/lab').script());
const kinda = require('./index');

const cases = [
  {
    needle: 'foo',
    haystack: 'foo',
    match: 1
  },
  {
    needle: 'foo',
    haystack: 'FOO',
    match: 1
  },
  {
    needle: 'foo',
    haystack: 'bar',
    match: 0
  },
  {
    needle: 'foo',
    haystack: 'food',
    match: 1
  },
  {
    needle: 'a string',
    haystack: 'a longer string',
    match: 0.54
  },
  {
    needle: 'a string',
    haystack: 'a much longer string',
    match: 0.41
  },
  {
    needle: 'a punctuated? string',
    haystack: 'a "punctuated" string!',
    match: 1
  },
  {
    needle: 'Mixed cAsE',
    haystack: 'MIXED case',
    match: 1
  },
  {
    needle: 'order',
    haystack: 'oder',
    match: 0
  },
  {
    needle: 'oder',
    haystack: 'order',
    match: 0.8
  },
  {
    needle: '',
    haystack: 'zero',
    match: 0
  },
  {
    needle: 'longer',
    haystack: 'short',
    match: 0
  },
  {
    needle: 'xyz',
    haystack: 'none',
    match: 0
  }
];

lab.experiment('kinda()', _ => {
  for (const c of cases) {
    lab.test(
      `works for needle ${JSON.stringify(
        c.needle
      )} and haystack ${JSON.stringify(c.haystack)}`,
      () => {
        const actual = kinda(c.needle, c.haystack);
        if (c.match === 0 || c.match === 1) {
          expect(actual).to.equal(c.match);
        } else {
          expect(actual).to.be.about(c.match, 0.01);
        }
      }
    );
  }
});
