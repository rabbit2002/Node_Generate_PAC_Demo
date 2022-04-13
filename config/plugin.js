'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  static: {
    enable: true,
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },
};
