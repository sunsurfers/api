# API.SUNSURFERS
отдаем только то что надо, на клиенте будем кешировать
никаких пейджингов, просто работаем как апишка






Таблицы
=======

### USERS
  id
  email
  password
  name
  surname
  living: country_code
  public_status
  description
  status
  instagram_id
  facebook_id
  vkontakte_id
   
### POINTS
  user_id
  lat
  lng
  type (auto|manual)
  
### ADS
  


###  


Словари
=======

### countries.json
  code
  name
  
  
  

API
====

### USERS
[+] /users
[-] /user/#{id}

### ADS
[-] /ads
[-] /ads/#{id}








---------------------------
[-] добавить сашу тинькофа
[-] поиграться с миграциями http://docs.sequelizejs.com/en/latest/docs/migrations/