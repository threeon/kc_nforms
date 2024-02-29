/**
 * kc_checktool
 * @date 2018-07-30
 * @author ThreeOn
 */

// Express 기본 모듈 불러오기
var express = require("express"),
	http = require("http"),
	path = require("path");

var bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	static = require("serve-static"),
	cors = require("cors"),
	fs = require("fs"),
	errorHandler = require("errorhandler");

require("app-module-path").addPath(__dirname);

// 에러 핸들러 모듈 사용
var expressErrorHandler = require("express-error-handler");

// Session 미들웨어 불러오기
var expressSession = require("express-session");

// connect-flash 미들웨어 불러오기
var flash = require("connect-flash");

// 모듈로 분리한 설정 파일 불러오기
var config = require("./config/config");
// 모듈로 분리한 설정 파일 불러오기
// var cron = require('./config/cron_scheduler');

// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require("./routes/route_loader");

// connectionPool 객체
const Pool = require("./database/pool");
const pool = new Pool();
const Pool_kcetp = require("./database/pool_kcetp");
const pool_kcetp = new Pool_kcetp();
const Pool_dpstock = require("./database/pool_dpstock");
const pool_dpstock = new Pool_dpstock();
const Pool_dpbond = require("./database/pool_dpbond");
const pool_dpbond = new Pool_dpbond();
const Pool_dpfuture = require("./database/pool_dpfuture");
const pool_dpfuture = new Pool_dpfuture();
const Pool_dpext = require("./database/pool_dpext");
const pool_dpext = new Pool_dpext();
const Pool_dpetc = require("./database/pool_dpetc");
const pool_dpetc = new Pool_dpetc();
const Pool_dpmacro = require("./database/pool_dpmacro");
const pool_dpmacro = new Pool_dpmacro();

// 익스프레스 객체 생성
var app = express();

app.set("pool", pool);
app.set("mapper", pool.getMapper());
app.set("pool_kcetp", pool_kcetp);
app.set("mapper_kcetp", pool_kcetp.getMapper());
app.set("pool_dpstock", pool_dpstock);
app.set("mapper_dpstock", pool_dpstock.getMapper());
app.set("pool_dpext", pool_dpext);
app.set("mapper_dpext", pool_dpext.getMapper());
app.set("pool_dpbond", pool_dpbond);
app.set("mapper_dpbond", pool_dpbond.getMapper());
app.set("pool_dpfuture", pool_dpfuture);
app.set("mapper_dpfuture", pool_dpfuture.getMapper());
app.set("pool_dpetc", pool_dpetc);
app.set("mapper_dpetc", pool_dpetc.getMapper());
app.set("pool_dpmacro", pool_dpmacro);
app.set("mapper_dpmacro", pool_dpmacro.getMapper());

// SPA fallback
// https://github.com/bripkens/connect-history-api-fallback
//var history = require('connect-history-api-fallback');
//var middleware = history({
//  verbose: true,
//  //logger: console.log.bind(console), //
//  disableDotRule: false, // true 이면 public/ 자원에 접근 불가 (dot 이 주소에 포함됐을 때 rewrite를 해버림)
//  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
//  //rewrites: [
//  //  //{ from: /\/soccer/, to: '/soccer.html' },
//  //  //{ from: /\/api/, to: '/soccer.html' },
//  //  {
//  //    from: /^\/api\/.*$/,
//  //    to: function(context) {
//  //      return context.parsedUrl.pathname;
//  //    }
//  //  }
//  //]
//});
//app.use(middleware);

//===== 서버 변수 설정  =====//
console.log("config.server_port : %d", config.server_port);
app.set("port", config.server_port); //8021

//Cross Origin Resource Sharing
app.use(cors());
// app.options('*', cors());

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: false,
		parameterLimit: 1000000,
	})
);

// body-parser를 이용해 application/json 파싱
app.use(
	bodyParser.json({
		limit: "50mb",
	})
);

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(
	expressSession({
		secret: "!@!!#!#!#!@$^#$$#%#$%#%$%#%#$#$",
		resave: false,
		saveUninitialized: true,
	})
);

// public 폴더를 static으로 오픈
app.use(static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

//라우팅에 대한 사전 세션체크 (개발시 체크 하지 않음)
if (config.runenv == "dev") {
	// route_loader.sessionCheckRegister(app);
} else {
	route_loader.sessionCheckRegister(app);
}

//라우팅 정보를 읽어들여 라우팅 설정
var router = express.Router();
route_loader.routerInit(app, router);

//===== 404 에러 페이지 처리 =====//
app.get("*", function (req, res) {
	res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
	fs.readFile(__dirname + "/public/error/404.html", (err, data) => {
		res.end(data, "utf-8");
	});
});
// express-error-handler 못 가져옴
/*
var errorHandler = expressErrorHandler({
  static: {
      '404': './public/error/404.html'
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
*/

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// cron 작업 등록
// cron.init(app);

//20230310 환경변수 server/.env 읽어 들임(dotenv 모듈 필요)
//require("dotenv").config({ path: '../../.env' });

//20230407 dotenv 사용하지 않고,
// .bashrc 에 XDB 정보 저장 (export)
// pm2 reload 할 때 .bashrc 의 환경변수 값 로딩이 확실히 다시 되도록 설정
let { NODE_ENV, XDB_USER, XDB_PASSWORD } = process.env;
console.log("NODE_ENV=", NODE_ENV, XDB_USER, XDB_PASSWORD);

//===== 서버 시작 =====//

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on("uncaughtException", function (err) {
	console.log("uncaughtException 발생함 : " + err);
	console.log("서버 프로세스 종료하지 않고 유지함.");

	console.log(err.stack);
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on("SIGTERM", function () {
	console.log("프로세스가 종료됩니다.");
	app.close();
});

app.on("close", function () {
	console.log("Express 서버 객체가 종료됩니다.");
});

// 시작된 서버 객체를 리턴받도록 합니다.
var server = http
	.createServer(app)
	.listen(app.get("port"), function (req, res) {
		console.log("서버가 시작되었습니다. 포트 : " + app.get("port"));
	});
