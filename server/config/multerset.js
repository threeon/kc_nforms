/**
 * Multer 함수 정의
 *
 * @date 2018-03-21
 * @author ThreeOn
 */
var multer = require('multer');
var config = require('./config');

module.exports.multerSet = function() {
    console.log('MulterSet 호출됨.');

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './public/upload/');
        },
        filename: (req, file, cb) => {
        //   console.log(req);
          console.log(file);
        //   const fileName = "흠냐" + req.params.id + ".jpg";
          const fileName = file.originalname;
          cb(null, fileName);
        }
    });
      
    return multer({
        storage: storage,
        limits: {fileSize: config.upload_file_max_size * 1024 * 1024}
    });
};