chaincode api server
====================

## programs
```
nodejs
```


## Server Start
```
node server.js > /dev/null 2>&1 &
```


## Api list
```
1. Create User (register)
2. Minting (mint)
3. TotalSupply (TotalSupply)
4. Minter account balance (Burn)
5. Account check (ClientAccountID)
6. Account balance (ClientAccountBalance)
7. Transfer (Transfer)
8. Approve (Approve)
9. Allowance (Allowance)
10. TransferFrom (TransferFrom)
```


## Endpoint
```
http://IP:Port/api/v1.0/function
```


### 1. Create User
 - Method : POST
 - Path : /register
 + Reaquest
 ```json
 { 
     "id" : "",
     "password" ""
 }
 ```
 
 + __response__

 - Success 201 code
 ```json
 {
     "response" : "{Create Username} User Register Successfully"
 }
 ```

 - Password Error
 ```json
 {
     "response" :  "password 파라미터의 값이 존재하지 않습니다."
 }
 ```

 - ID Error
 ```json
 {
     "response" :  "id 파라미터의 값이 존재하지 않습니다."
 }
 ```



### 2. Minting
 - Method : Post
 - Path : /minter
 + Reaquest
 ```json
 {
     "id" : "",
     "totalsupply" : ""
 }
 ```
 + __response__
 ```json
 
 ```
 
 - Error
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```

### 3. TotalSupply
 - Method : Post
 - Path : /TotalSupply
 + Reaquest
 ```
 ```
 + __response__
 ```
 ```




### 4. Minter account balance Burn
 - Method : Post
 - Path : /Burn
 + __Reaquest__
 ```
 ```
 + __response__
 ```
 ```



### 5. Account check (ClientAccountID)
 - Method : Post
 - Path : /ClientAccountID
 + __Reaquest__
 ```
 ```
 + __response__
 ```
 ```