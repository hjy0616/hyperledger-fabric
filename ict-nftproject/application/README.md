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


## Org1 (NFT holder) Api list
```
1. Create User (admin_register)
2. MintWithTokenURI (mint)
3. Wallet (WalletInfo)
4. AI (AIinfo)
5. ReadAIinfo (ReadAIinfo)
```

## Org2 (labeler) Api list
```
1. Create User (AddUser)
2. AddScore (add Score)
3. ReadScore (Read Score)
```

## Endpoint
```
http://IP:Port/api/function
```

# NFT minting & NFT Holder
### 1. Create User
 - Method : POST
 - Path : /admin_register
 + Reaquest
 ```json
 { 
     "id" : "",
     "password" : ""
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
 - Path : /Mint
 + Reaquest
 ```json
 {
     "id" : "",
     "tokenId" : "",
     "tokenURI" : ""
 }
 ```
 + __response__
 ```json
  {
    "response": "Ok"
  }
 ```
 
 - Error
 ```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```

### 3. WalletInfo
 - Method : Post
 - Path : /Wallet
 + Reaquest
 ```json
 {
     "owner": "username"
 }
 ```
 + __response__
 ```json
 {
     "response": "Ok"
 }
 ```
 + __Error__
 ```json
 {
     "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```



### 4. AIinfo
 - Method : Post
 - Path : /AIinfo
 + __Reaquest__
 ```json
 {
     "owner" : "",
     "aititle" : "",
     "tokenId" : "",
     "aisum" : "",
     "learningdata" : ""
 }
 ```

 + __response__
 ```json
 {
    "response": "Ok"
 }
 ```

 + __Error__
 ```json
 {
     "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```


### 5. ReadAIinfo
 - Method : Post
 - Path : /ReadAIinfo
 + __Reaquest__
 ```json
 {
     "owner" : "username"
 }
 ```
 + __response__
 ```json
 {
     "response" : "{\"owner\":\"username\",\"count\":0,\"aiinfos\":[{\"aititle\":\"사과\",\"tokenId\":\"101\",\"aisum\":1,\"learningdata\":0}]}"
 }
 ```

  + __Error__
 ```json
 {
     "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
 ```

# User(labeler)
### 6. AddUser
- Method : Post
- Path : /AddUser
+ __Reaquest__
```json
 {
    "username" : "username"
 }
```
+ __response__
```json
 {
    "response" : "Ok"
 }
```

+ __Error__
```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
```


### 7. AddScore
- Method : Post
- Path : /AddScore
+ __Reaquest__
```json
 {
    "username" : "username",
    "project_name" : "사과",
    "activity_score" : "1000"
 }
```
+ __response__
```json
 {
    "response" : "Ok"
 }
```

+ __Error__
```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
```

### 8. ReadScore
- Method : Post
- Path : /ReadScore
+ __Reaquest__
```json
 {
    "username" : "username"
 }
```
+ __response__
```json
 {
    "response" : "{\"infos\":[{\"activityscore\":1000,\"projecttitle\":\"사과\"}],\"sum\":0,\"user\":\"username\"}"
 }
```

+ __Error__
```json
 {
    "response": "잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."
 }
```