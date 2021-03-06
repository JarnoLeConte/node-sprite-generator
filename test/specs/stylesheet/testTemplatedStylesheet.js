'use strict';

module.exports = function (name, suffix, additionalTests) {
    var R = require('ramda'),
        path = require('path'),
        testUtils = require('../../utils/test'),
        nameToClass = require('../../../lib/utils/stylesheet').nameToClass,
        stylesheetGenerator = require('../../../lib/stylesheet')[name],
        defaultOptions = R.merge({
            prefix: '',
            nameMapping: nameToClass,
            spritePath: './images/png/sprite.png',
            pixelRatio: 1
        });

    describe('Stylesheet/' + name, function () {
        if (!suffix) {
            suffix = name;
        }

        var layout = {
                width: 150,
                height: 156,
                images: [
                    { path: '/bla/foo.png', x: 0, y: 0, width: 150, height: 12 },
                    { path: '/foo/bar.png', x: 0, y: 12, width: 150, height: 24 },
                    { path: '/images/test.png', x: 0, y: 36, width: 150, height: 12 }
                ]
            };

        it('should generate the correct ' + name + ' with a prefix specified', function () {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/with-prefix.' + suffix;
            return testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, defaultOptions({ prefix: 'prefix-' }));
        });

        it('should generate the correct ' + name + ' with a spritePath specified', function () {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/with-spritePath.' + suffix;
            return testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, defaultOptions({ spritePath: '/this/is/my/spritepath.png' }));
        });

        it('should generate the correct ' + name + ' with a custom nameMapping specified', function () {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/with-nameMapping.' + suffix,
                nameMapping = function (imagePath) {
                    return path.basename(imagePath, path.extname(imagePath)).split('').reverse().join('');
                };
            return testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, defaultOptions({ nameMapping: nameMapping }));
        });

        it('should generate the correct ' + name + ' with a pixelRatio specified', function () {
            var expectedStylesheetPath = 'test/fixtures/stylesheets/' + name + '/with-pixelRatio.' + suffix;
            return testUtils.testStylesheetGeneration(stylesheetGenerator, layout, expectedStylesheetPath, defaultOptions({ pixelRatio: 2 }));
        });

        if (additionalTests) {
            additionalTests();
        }
    });
};
