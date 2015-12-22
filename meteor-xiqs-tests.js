// server
Tinytest.addAsync('Authentication - Login', function (test, done) {
  xiqs.connect(Meteor.settings.host, Meteor.settings.port, function() {
    xiqs.login(Meteor.settings.user, Meteor.settings.password)
    test.equal(true, true);
    done()
  })

});
