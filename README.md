api.sunserfers
==============

First time:

Install nodejs (+ npm), mysql

Create database:
$ sudo mysql
$ CREATE USER 'sunserfer'@'localhost' IDENTIFIED BY 'nonsecurepassword';
$ GRANT ALL PRIVILEGES ON 'suncommunity' . * TO 'sunserfer'@'localhost';

Fill database with fixtures:
$ node db-refill.js

Then npm-packages:
$ npm i
$ sudo npm i -g supervisor

```
Dev-mode:
$ npm run watch (for watchers js/css of webapp)
$ npm run server (for json api and static serving)
open http://127.0.0.1:3000

Other:
$ npm run build (once build webapp)

```

TODO: separate api.sunserfers (db and json-api) and community.sunserfers (webapp)