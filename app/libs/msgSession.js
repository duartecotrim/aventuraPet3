module.exports = {
    getMsgError: function (req) {
        var msgError = "";
        if (req.session.strErrorMsg !== undefined && req.session.strErrorMsg.length !== 0) {
            msgError = req.session.strErrorMsg;
        } else {
            msgError = null;
        }

        return msgError;
    },
    getMsgSuccess: function (req) {
        var msgSuccess = "";
        if (req.session.strSuccessMsg !== undefined && req.session.strSuccessMsg.length !== 0) {
            msgSuccess = req.session.strSuccessMsg;
        } else {
            msgSuccess = null;
        }

        return msgSuccess;
    },
    cleanMsgError: function(req){
        req.session.strErrorMsg = "";
    },
    cleanMsgSuccess: function(req){
        req.session.msgSuccess = "";
    }

}