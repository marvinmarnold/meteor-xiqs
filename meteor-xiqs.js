
xiqs = {}

if(Meteor.isServer) {
  _.extend(xiqs, {
    _socket: null,
    connect: function(host, port, onConnect) {
      var url = host + ":" + port
      console.log("connecting to ");
      var net = Npm.require('net');

      this._socket = new net.Socket();
      this._socket.connect(port, host, Meteor.bindEnvironment(function() {
      	console.log('Connected');
      	onConnect()
      }));

      // client.on('data', function(data) {
      // 	console.log('Received: ' + data);
      // 	client.destroy(); // kill client after server's response
      // });
    },
    login: function(username, password, onLogin) {
      console.log('login');
      var loginXIQS = {
        command: {
          '@name': "loginXIQS",
          param: [
            { '#text': username, '@type': 'string' },
            { '#text': password, '@type': 'string' }
          ],
        }
      };

      var xml = XMLBuilder.create(loginXIQS, {
        encoding: 'UTF-8',
        separateArrayItems: false,
        noDoubleEncoding: true,
      });

      console.log(xml.end({pretty: true}));
      var that = this
      this._socket.on('data', Meteor.bindEnvironment(function(data) {
      	console.log('Received: ' + data);
        onLogin(that._socket)
      }));
      this._socket.write(xml.end());
    }
  }),
  deactivateXIQSObject: function(tid, integer, long) {
    console.log('deactivateXIQSObject');
    var obj = {
      command: {
        '@tid': tid,
        '@name': "deactivateXIQSObject",
        param: [
          { '#text': integer, '@type': 'integer' },
          { '#text': long, '@type': 'long' }
        ],
      }
    };

    var xml = XMLBuilder.create(obj, {
      encoding: 'UTF-8',
      standalone: 'yes',
      separateArrayItems: false,
      noDoubleEncoding: false,
    });

    var that = this
    this._socket.on('data', Meteor.bindEnvironment(function(data) {
      console.log('Received: ' + data);
      that._socket.destroy(); // kill client after server's response
      onLogin(data)
    }));
    this._socket.write(xml.end());
  }
}
