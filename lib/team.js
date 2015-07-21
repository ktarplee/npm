var log = require('npmlog')
var mapToRegistry = require('./utils/map-to-registry.js')
var npm = require('./npm')

module.exports = team

team.usage =
  'npm team <teamname> create\n' +
  '                    destroy\n' +
  '                    add <user>\n' +
  '                    rm <user>\n' +
  '                    ls\n' +
  '                    edit'

team.completion = function (opts, cb) {
  // var argv = opts.conf.argv.remain
  return cb(null, [])
}

var COMMANDS = {}

function team (args, cb) {
  // Entities are in the format <scope>:<team>
  if (args.length >= 2 && npm.registry.team[args[1]]) {
    var entity = args.shift().split(':')
    return mapToRegistry('/', npm.config, function (err, uri, auth) {
      if (err) { return cb(err) }
      return npm.registry.team(args.shift(), uri, {
        auth: auth,
        scope: entity[0],
        team: entity[1],
        user: args.shift()
      }, function (err, data) {
        if (!err) { console.log(JSON.stringify(data)) }
        cb(err, data)
      })
    })
  } else {
    return cb('Usage:\n' + team.usage)
  }
}
