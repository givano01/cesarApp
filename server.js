const express = require('express');
const bodyParser = require('body-parser');
const pg = require("pg");
const {
  encrypt,
  decrypt
} = require("./modules/cesarcipher");
const credentials = process.env.DATABASE_URL || require("./NEI").credentials;
const db = new (require("./modules/storagehandler"))(credentials);
const port = (process.env.PORT || 7070);
const server = express();
server.set('port', port);
server.use(express.static('public'));
server.use(bodyParser.json());



//Lagre meldinger

let meldinger = [];

server.post("/secret", async function (req, res) {

  const message = req.body.message;
  const secretKey = req.body.secretKey;
  const cipherText = encrypt(message, secretKey);

  let result = await db.saveSecret(cipherText);
  if (result instanceof Error) {
      res.status(500).end()
  } else {
      res.status(200).json({
          "secretId": result
      }).end();
  }

});

//Hente meldinger

server.get("/secret/:id/:key", async function (req,res){
    
  const cipherText = await db.retrieveSecret(req.params.id);
  const message = decrypt(cipherText, req.params.key);

  res.status(200).json({
      message: message
  }).end()
})






server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
  });

  