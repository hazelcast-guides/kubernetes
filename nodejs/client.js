var async = require('async');
var Client = require('hazelcast-client').Client;

var clientConfig = {
    network: {
        clusterMembers: [
            'hz-hazelcast'
        ]
    }
}

Client.newHazelcastClient(clientConfig).then(function (hazelcastClient) {
    var client = hazelcastClient;
    var map;
    hazelcastClient.getMap('map').then(function (mp) {
      map = mp;

      map.put('key', 'value').then(function () {
          return map.get('key');
      }).then((res) => {
          if(res === 'value')
          {
              console.log("Connection Successful!");
              console.log("Now the map named 'map' will be filled with random entries.");

              async.whilst(() => {
                return true;
              },(next) => {
                var randomKey = Math.floor(Math.random() * 100000);
                map.put('key' + randomKey, 'value' + randomKey).then(function () {
                    map.get('key' + randomKey);
                    if (randomKey % 100 == 0) {
                        map.size().then((size) => console.log(`map size: ${size}`));
                    }
                    next();
                });
              },(err) => {
                client.shutdown();
              });
          }
          else {
              throw new Error("Connection failed, check your configuration.");
          }
      });
    });
});