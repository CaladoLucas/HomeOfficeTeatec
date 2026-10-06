const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function readEvents(file) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  let events;
  const hooks = {
    useState: value => [value, () => {}],
    useMemo: callback => (events = callback()),
    createElement: type => typeof type === 'function' ? type() : null,
  };
  const context = { React: hooks, ...hooks, ReactDOM: { render() {} }, document: { getElementById() {} } };
  const code = file === 'app.js' ? source : source.slice(source.indexOf('const App ='), source.indexOf('  // Navegação')) + '\n}; App();';
  vm.runInNewContext(code, context);
  return JSON.parse(JSON.stringify(events));
}

for (const file of ['app.js', 'index.js']) {
  test(`${file}: primeiras vagas seguem o critério aprovado`, () => {
    const events = readEvents(file);
    for (const [date, name] of Object.entries({ '2026-10-12': 'Arthur', '2026-10-22': 'Glauber', '2026-10-28': 'Lucas', '2026-11-03': 'Lucas' })) {
      assert.equal(events[date]?.[0]?.name, name, date);
    }
  });

  test(`${file}: preserva escala base e preenche vagas com equilíbrio sem dias consecutivos`, () => {
    const events = readEvents(file);
    const pattern = ['Arthur', null, 'Glauber', 'Lucas'];
    const extras = { Arthur: 0, Glauber: 0, Lucas: 0 };
    let week = 0;
    for (let monday = new Date(2026, 1, 23); monday.getFullYear() === 2026; monday.setDate(monday.getDate() + 7), week++) {
      const names = [];
      for (let day = 0; day < 5; day++) {
        const date = new Date(monday);
        date.setDate(date.getDate() + day);
        const key = date.toISOString().slice(0, 10);
        const expected = day === 4 ? 'Leandro' : pattern[(week + day) % 4];
        const actual = events[key]?.[0]?.name;
        names.push(actual);
        if (key === '2026-10-13') {
          assert.equal(actual, undefined, key);
        } else if (expected || key < '2026-10-12') {
          assert.equal(actual, expected || undefined, key);
        } else {
          const eligible = Object.keys(extras).filter(name =>
            (day === 0 || pattern[(week + day - 1) % 4] !== name) &&
            (day === 3 || pattern[(week + day + 1) % 4] !== name));
          assert.ok(eligible.includes(actual), key);
          assert.equal(extras[actual], Math.min(...eligible.map(name => extras[name])), key);
          extras[actual]++;
        }
        if (actual) assert.equal(events[key].length, 1, key);
      }
      for (let day = 1; day < 5; day++) {
        if (names[day]) assert.notEqual(names[day], names[day - 1]);
      }
    }
  });
}

test('as duas versões geram a mesma escala', () => {
  assert.deepEqual(readEvents('app.js'), readEvents('index.js'));
});
