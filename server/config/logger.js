/*
 * 설정
 *
 * @date 2022-04-21
 * @author jwahn
 */

const log4js = require("log4js");

function createCustomLayout(colorCodeFn) {
  return function (config) {
    return function (logEvent) {
      const instanceId = process.env.INSTANCE_ID || 'UNKNOWN_INSTANCE';
      const now = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        millisecond: 'numeric',
        hour12: false,
        timeZone: 'Asia/Seoul',
        hourCycle: 'h23',
      };
      const timestamp = now.toLocaleString('ko-KR', options);
      const colorCode = colorCodeFn(logEvent.level.levelStr);
      const logLevel = logEvent.level.levelStr.padEnd(5);
      let logMessageConcat = '';
      logEvent.data.map((x, idx) => {
        if(idx!=0) {
          logMessageConcat += ' ';
        }
        if(typeof x == 'object') {
          logMessageConcat += JSON.stringify(x);
        } else {
          logMessageConcat +=  x;
        }
      });
      const logMessage = `${colorCode}[${timestamp}] ${logLevel} - ${colorCode!=''?'\x1b[0m':''}(id:${instanceId}) ${logMessageConcat}`;// ${logEvent.data[0]}`;
      return logMessage;
    };
  };
}

function getColorCode(level) {
  switch (level) {
    case 'TRACE':
      return '\x1b[37m'; // White for TRACE
    case 'DEBUG':
      return '\x1b[36m'; // Cyan (light blue) for DEBUG
    case 'INFO':
      return '\x1b[32m'; // Green for INFO
    case 'WARN':
      return '\x1b[33m'; // Yellow for WARN
    case 'ERROR':
      return '\x1b[31m'; // Red for ERROR
    case 'FATAL':
      return '\x1b[35m'; // Magenta (purple) for FATAL
    default:
      return '\x1b[0m'; // Default color for other levels
  }
}

log4js.addLayout('custom', createCustomLayout(() => ''));
log4js.addLayout('customColored', createCustomLayout(getColorCode));

log4js.configure({
	appenders: {
		console: { type: "stdout", layout: { type: "customColored" } },
		output: { type: "dateFile", pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true, filename: "D:/workspace/kc_checktool/server/logs/CHECKTOOL",  layout: { type: 'custom' } },
	},
	categories: {
		default: { appenders: ["console", "output" ], level: "all" },
	},
	pm2: true,
	pm2InstanceVar: "INSTANCE_ID",
  // disableClustering: true,
});

exports.logger = log4js.getLogger("output");


