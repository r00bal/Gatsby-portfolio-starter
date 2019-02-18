export const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

const groupBy2 = (xs, key) =>
  xs.reduce(
    (acc, x) =>
      Object.assign({}, acc, {
        [x[key]]: (acc[x[key]] || []).concat(x),
      }),
    {}
  )

console.log(groupBy(['one', 'two', 'three'], 'length'))
// => {3: ["one", "two"], 5: ["three"]}

Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

const state = {
  str:
    '<h1>This is super cool awesome project !!</h1>\n<p>This projects uh ah what a project</p>\n<h2>Pulp fiction is awesome move</h2>\n<p>The best move ever</p>\n<h2>Blade runner is best since fiction ever !!</h2>\n<p>Is Harrison Ford an android ?</p>',
}

const escapeRegExp = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
const getBetwenTwo = (start, end, str) => {
  const reg = RegExp(
    `(?<=${escapeRegExp(start)}).*?(?=${escapeRegExp(end)})`,
    'g'
  )
  return reg.test(str) ? str.match(reg)[0] : false
}
