sys = require('sys');
ini = require('ini');
fs = require('fs');

var config_file = __dirname + '/../config.ini';

exports.http = {port: 8080, listen: null};
exports.smtp = {port: 2525, listen: null, smarthost: null};

/* we are doing a lot of blocking I/O here. We are doing it only once
   and we really want to make sure that the configuration file, if it exists,
   is actually loaded when this module is imported
 */

var cf = fs.statSync(config_file);
if (cf.isFile()){
  var c = ini.parse(fs.readFileSync(config_file));
  if (c.http){
    if (c.http.port) exports.http.port = parseInt(c.http.port, 10);
    if (c.http.listen) exports.http.listen = c.http.listen;
  }
  if (c.smtp){
    if (c.smtp.port) exports.smtp.port = parseInt(c.smtp.port, 10);
    if (c.smtp.listen) exports.smtp.listen = c.smtp.listen;
    if (c.smtp.smarthost) exports.smtp.smarthose = c.smtp.smarthost;
  }
}