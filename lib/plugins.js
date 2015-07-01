'use strict';

/**
 * 所有預設的 plugin
 */

module.exports = {
  'campaign': require('YouMeb/analytics.js-campaign'),
  'user-info': require('YouMeb/analytics.js-user-info'),
  'anonymous': require('YouMeb/analytics.js-anonymous'),
  'google-analytics': require('YouMeb/analytics.js-google-analytics')
};
