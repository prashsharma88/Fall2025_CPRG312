## Configuration:

- Create a **.env** at the root of **RBAC_Lab** folder
- Add below variables in that .env file
  > #<span style="color:red;">NOTE:</span> If you change the port value and wish to use **unified frontend** then you will have to update the port number in all the fetch request inside **components/rbacLab** folder
  >
  > PORT=3001
  >
  > #Below DB_URL is used if you are running it in your local machine, if you want to use Atlas cluster then see instruction on MongoDB site on how to use it in your code.
  >
  > DB_URL=mongodb://localhost:27017
  >
  > #Can be any name you want.
  >
  > DB_NAME=passwordLab
  >
  > #Any random string which is hard to guess
  >
  > JWT_SECRET=SomeRandomStringForGeneratingJWTToken>
