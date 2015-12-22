Package.describe({
  name: 'marvin:meteor-xiqs',
  version: '0.0.1',
  summary: 'Meteor package for XIQS.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'underscore'
  ]);

  api.use([
    "joncursi:socket-io-client@0.1.4",
    'marvin:xmlbuilder@0.0.1'
    // 'peerlibrary:xml2js'
  ], 'server')

  api.addFiles('meteor-xiqs.js');

  api.export('xiqs')
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest'
  ]);

  api.use('marvin:meteor-xiqs');
  api.addFiles([
    'meteor-xiqs-tests.js'
  ], 'server');
});
