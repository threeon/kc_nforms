/*
 * 설정
 *
 * @date 2022-01-07
 * @author ThreeOn
 */

module.exports = {
	port: 3306,
	// nforms
	host: "127.0.0.1",
	user: "kc_nforms",
	password: "kc_nforms",
	database: "kc_nforms",
	format: { language: "sql", indent: "" },

	KC_ETP: {
		host: "127.0.0.1",
		port: 3306,
		user: "kc_etp",
		password: "kc_etp",
		database: "kc_etp",
		format: { language: "sql", indent: "" },
	},
	DP_STOCK: {
		host: "172.23.29.140",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_stock",
		format: { language: "sql", indent: "" },
	},
	DP_FUTURE: {
		host: "172.23.29.140",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_future",
		format: { language: "sql", indent: "" },
	},
	DP_BOND: {
		host: "172.23.29.140",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_bond",
		format: { language: "sql", indent: "" },
	},
	DP_EXT: {
		host: "172.23.29.140",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_ext",
		format: { language: "sql", indent: "" },
	},
	DP_ETC: {
		host: "172.23.29.140",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_etc",
		format: { language: "sql", indent: "" },
	},
	DP_MACRO: {
		host: "172.23.29.140",
		port: 3306,
		user: "kc_dp",
		password: "kc_dp",
		database: "dp_macromanager",
		format: { language: "sql", indent: "" },
	},
};
