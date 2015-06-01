api.sunserfers
==============

### First time:
1. Install nodejs (+ npm), mysql
2. Create database:
```
$ sudo mysql
$ CREATE USER 'sunserfer'@'localhost' IDENTIFIED BY 'nonsecurepassword';
$ GRANT ALL PRIVILEGES ON 'suncommunity' . * TO 'sunserfer'@'localhost';
```
3. Then npm-packages:
```
$ npm i
$ sudo npm i -g supervisor
```
4. Fill database with fixtures:
```
$ node db-refill.js
```

### Dev-mode:
```
$ npm run watch (for watchers js/css of webapp)
$ npm run server (for json api and static serving)
open http://127.0.0.1:3000
```



### Docs for developing:
* Sequelize ORM - http://sequelize.readthedocs.org/en/
* Express.js server - http://expressjs.com/4x/api.html
...


> TODO: separate api.sunserfers (db and json-api) and community.sunserfers (webapp)
> TODO: hot-loader
> TODO: moment.js to react
