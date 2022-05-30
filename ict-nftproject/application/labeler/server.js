'use strict';

var express = require('express'); // express 모듈은 웹 서버를 생성하기 위해서 사용되는 모듈 입니다.
var bodyParser = require('body-parser'); // body-parser 모듈은 express 웹 서버가 실행되면서 POST DATA를 파싱하기 위해 사용되는 모듈입니다.

var app = express(); // express 서버 구성 시작
app.use(bodyParser.json());

const { Gateway, Wallets } = require('fabric-network'); // fabric chaincode를 사용하기 위해서 사용되는 모듈입니다.
const FabricCAServices = require('fabric-ca-client');
const path = require('path'); // 경로 관련 모듈입니다.
const fs = require('fs'); // 파일 처리 모듈입니다. ( read, write )

////////////////////////////////////////////////// user(라벨러) API //////////////////////////////////////////////////

app.get('/api/AddUser', async function (req, res) {
    /*
    호출 함수 네임 : AddUser
    매개변수 : username
    */

    // 만약 코드에서 에러가 난 경우 예외 처리
    try {

        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org2.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.submitTransaction('AddUser', req.body.username);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        // 에러가 난 경우 해당 코드 부분 실행
        // error -> 에러 관련된 메세지 출력
        console.error(`Failed to evaluate transaction: ${error}`); // 에러 메세지 출력
        // process.exit(1); -> nodejs express 종료
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/AddScore', async function (req, res) {
    /*
    호출 함수 네임 : AddScore
    매개변수 : username, project_name, activity_score
    */

    // 만약 코드에서 에러가 난 경우 예외 처리
    try {

        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org2.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.submitTransaction('AddScore', req.body.username, req.body.project_name, req.body.activity_score);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/ReadScore', async function (req, res) {
    /*
    호출 함수 네임 : ReadScore
    매개변수 : username
    */

    // 만약 코드에서 에러가 난 경우 예외 처리
    try {
        const username = req.body.id
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org2.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.evaluateTransaction('ReadScore', req.body.to, req.body._value);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.listen(8090, '0.0.0.0');
console.log('Running on api server');