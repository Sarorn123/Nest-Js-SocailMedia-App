"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.bcryptPassword = void 0;
const bcrypt = require("bcrypt");
function bcryptPassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}
exports.bcryptPassword = bcryptPassword;
function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=Bcrypt.js.map