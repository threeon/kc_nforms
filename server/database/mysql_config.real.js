/*
 * 설정
 *
 * @date 2022-01-07
 * @author ThreeOn
 */

module.exports = {
	port: 3306,
	// nforms
	host: "10.3.36.11",
	user: "kc_nforms",
	password: "kc_nforms",
	database: "kc_nforms",
	format: { language: "sql", indent: "" },

	KC_ETP: {
		host: "10.3.37.11",
		port: 3306,
		user: "kc_etp",
		password: "kc_etp",
		database: "kc_etp",
		format: { language: "sql", indent: "" },
	},
	DP_STOCK: {
		host: "10.3.35.139",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_stock",
		format: { language: "sql", indent: "" },
	},
	DP_FUTURE: {
		host: "10.3.35.140",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_future",
		format: { language: "sql", indent: "" },
	},
	DP_BOND: {
		host: "10.3.35.141",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_bond",
		format: { language: "sql", indent: "" },
	},
	DP_EXT: {
		host: "10.3.35.142",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_ext",
		format: { language: "sql", indent: "" },
	},
	DP_ETC: {
		host: "10.3.35.143",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_etc",
		format: { language: "sql", indent: "" },
	},
	DP_MACRO: {
		host: "10.3.35.143",
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_macromanager",
		format: { language: "sql", indent: "" },
		port: 3306,
	},
};
