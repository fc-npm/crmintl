var _ = require("lodash");

var zh_local_message = require("./locales/zh.json");
var zh_TW_local_message = require("./locales/zh_TW.json");
var en_US_local_message = require("./locales/en.json");

var MESSAGE_MAP = {
  en_US: en_US_local_message,
  zh_TW: zh_TW_local_message,
  zh_HK: zh_TW_local_message,
  zh: zh_local_message
};

var CrmIntl = {
  data: {},
  type: "zh",
  setIntl: function(data, type) {
    this.data = data || {};
    return this.combine(type || "zh");
  },
  combine: function(type) {
    var message = _.get(this.data, type, {});
    const localMessage = _.get(MESSAGE_MAP, type, zh_local_message);
    return _.assign({}, localMessage, message);
  },
  getIntl: function(code, defaultValue) {
    if (!_.isObject(this.data)) {
      console.log("[error]CrmIntl getIntl need  initData ");
      return "";
    }
    if (!_.isString(code)) {
      console.error("[error]CrmIntl getIntl need  correct code");
      return "";
    }

    var allIntl = this.combine(this.type);
    var message = _.get(allIntl, code, "");
    if (!message && _.isString(defaultValue)) {
      return defaultValue;
    }
    return message;
  }
};

module.exports = CrmIntl;
