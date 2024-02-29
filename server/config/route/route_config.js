/*
 * 설정
 *
 * @date 2022-02-10
 * @author threeon
 */
const nforms_config = require("config/route/nforms_config");
const datamanage_config = require("config/route/datamanage_config");
const crawl_config = require("config/route/crawl_config");
const etp_config = require("config/route/etp_config");

module.exports = {
	route_info: [
		...nforms_config,
    ...datamanage_config,
    ...crawl_config,
    ...etp_config,
	],
};
