// server
Tinytest.addAsync('Authentication - Login', function (test, done) {
  xiqs.connect(Meteor.settings.host, Meteor.settings.port, function() {
    xiqs.login(Meteor.settings.user, Meteor.settings.password, function(socket) {
      test.equal(true, true);
      socket.destroy();
      done()
    })
  })
});

Tinytest.addAsync('deactivateXIQSObject', function (test, done) {
  xiqs.connect(Meteor.settings.host, Meteor.settings.port, function() {
    xiqs.login(Meteor.settings.user, Meteor.settings.password, function() {
      xiqs.deactivateXIQSObject(
        Meteor.settings.tid,
        Meteor.settings.integer,
        Meteor.settings.long, function(socket) {
          test.equal(true, true);
          socket.destroy();
          done()
        })
    })
  })
});
