
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
      	that._socket.destroy(); // kill client after server's response
        onLogin(data)
      }));
      this._socket.write(xml.end());
    }
  })
}

// [REQUEST]
// <?xml version="1.0" encoding="UTF-8"?>
// <command name="loginXIQS">
//   <param type="string">administrator</param>
//   <param type="string">iqsim</param>
// </command>
//
// [ANSWER (OK)]
// <?xml version="1.0" encoding="UTF-8"?>
// <event type="return">
//   <meta-data>
//     <meta-value>
//       <name>ret_code</name>
//       <pos>1</pos>
//     </meta-value>
//   </meta-data>
//   <param type="integer">1</param>
// </event>
//
// [ANSWER (Error)]
// <?xml version="1.0" encoding="UTF-8"?>
// <event type="error">
//   <meta-data>
//     <meta-value>
//       <name>err_code</name>
//       <pos>1</pos>
//     </meta-value>
//     <meta-value>
//       <name>err_desc</name>
//       <pos>2</pos>
//     </meta-value>
//   </meta-data>
//   <param type="integer">401</param>
//   <param type="string"> err.user.notfound(administrator)</param>
// </event>
