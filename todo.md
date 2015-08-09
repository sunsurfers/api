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
  nickname
  public_status
  description
  status
  instagram_id
  facebook_id
  vkontakte_id
  
  living [country.code > name]
  wasincountries [codes]
  points [points]
  ads [ads]
  

### WASINCOUNTRIES
  user_id
  country_code
  type (was|live)
  

### POINTS
  user_id
  lat
  lng
  type (auto|manual)
  
### ADS
  user_id
  title
  description
  img
  place
  country
  expired_date

  
### COUNTRIES  
  code
  name
  original

  
  
  
  
  

API
====

### USERS
[+] /users
  [{
        id
        name
        surname
        nickname
        living [country.code > name]
    }...]
[-] /user/#{id}
  all, without password


### ADS
[-] /ads
[-] /ads/#{id}








---------------------------
[-] добавить сашу тинькофа
[-] поиграться с миграциями http://docs.sequelizejs.com/en/latest/docs/migrations/