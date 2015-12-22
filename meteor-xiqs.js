xiqs = {}

if(Meteor.isServer) {
  _.extend(xiqs, {
    _socket: null,
    connect: function(host, port, onConnect) {
      var url = host + ":" + port
      console.log("connecting to ");
      console.log(url);

      this._socket = io(url);
      // this._socket.connect(host + ":" + port);
      // io(host + ":" + port);

      this._socket.on('connection', function(data) {
        console.log("on connect");
        onConnect()
      });

      this._socket.on('command execution response', function(msg){
        console.log('command execution response ' + msg);
      });

      this._socket.connect()
      this.login(Meteor.settings.user, Meteor.settings.password)
    },
    login: function(username, password) {
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
      this._socket.emit("command invocation", xml.end())
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
