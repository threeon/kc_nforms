
/*
 * 설정
 */
var config = require("./config");

module.exports = {
    err: {
        DB_CONNECT:'DB CONNECTION ERROR. CALL THE MANAGER (7968).',
        DB_NODATA:'NO DATA DB.',
        DB_DUPLICATED:'DATA ID DUPLICATED.',
        MAIL_TCP:'MAIL TCP ERROR. CALL THE MANAGER (7968).',
        FILE_SIZE:'OVER FILE MAX SIZE(' + config.upload_file_max_size + ' MB) LIMIT',
        LOGIN:'ID or PAWWORD IS NOT CORRECT.'
    },
    succ: {
        MAIL_SEND: '메일이 정상적으로 발송되었습니다.',
        LOGIN:'LOGIN SUCCESS.',
        DB_MIGRATION: '데이터 이관이 정상적으로 처리되었습니다.',
        DB_VIEWDATA: '데이터 조회가 정상적으로 처리되었습니다.',
    }
}