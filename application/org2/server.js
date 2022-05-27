'use strict';

var express = require('express'); // express 모듈은 웹 서버를 생성하기 위해서 사용되는 모듈 입니다.
var bodyParser = require('body-parser'); // body-parser 모듈은 express 웹 서버가 실행되면서 POST DATA를 파싱하기 위해 사용되는 모듈입니다.

var app = express(); // express 서버 구성 시작
app.use(bodyParser.json());

const { Gateway, Wallets } = require('fabric-network'); // fabric chaincode를 사용하기 위해서 사용되는 모듈입니다.
const FabricCAServices = require('fabric-ca-client');
const path = require('path'); // 경로 관련 모듈입니다.
const fs = require('fs'); // 파일 처리 모듈입니다. ( read, write )

// app.post('/api/minter', async function (req, res) {
//     /*
//     호출 함수 네임 : CreateToken
//     매개변수 : name, symbol, totalSupply
//     */

//     // 만약 코드에서 에러가 난 경우 예외 처리
//     try {
//         const username = req.body.id
//         const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org2.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);
            
//         const identity = await wallet.get(username);
//         if (!identity) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
        
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
//         const network = await gateway.getNetwork('mychannel');
//         const contract = network.getContract('erc20');

//         const result = await contract.submitTransaction('Mint', req.body.totalsupply); //
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//         res.status(200).json({response: "ok"});

//         await gateway.disconnect();

//     } catch (error) {
//         // 에러가 난 경우 해당 코드 부분 실행
//         // error -> 에러 관련된 메세지 출력
//         console.error(`Failed to evaluate transaction: ${error}`); // 에러 메세지 출력
//         // process.exit(1); -> nodejs express 종료
//         res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
//     }
// });

app.get('/api/test', async function (req, res) {
    /*
    호출 함수 네임 : Get_Token_Info
    매개변수 : 없음
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

        const result = await contract.evaluateTransaction('test'); //
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

app.post('/api/Burn', async function (req, res) {
    /*
    호출 함수 네임 : Create_Account
    매개변수 : name, value
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

        const result = await contract.submitTransaction('Burn', req.body.key, req.body.init_amount); //
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

app.post('/api/Transfer', async function (req, res) {
    /*
    호출 함수 네임 : Get_Account
    매개변수 : address
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

        const result = await contract.submitTransaction('Transfer', req.body.to, req.body._value); //
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

app.post('/api/BalanceOf', async function (req, res) {
    /*
    호출 함수 네임 : Transfer
    매개변수 : from address, to address, value
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

        const result = await contract.submitTransaction('BalanceOf'); //
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        // 에러가 난 경우 해당 코드 부분 실행
        // error -> 에러 관련된 메세지 출력
        console.error(`Failed to evaluate transaction: ${error}`); // 에러 메세지 출력
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
        // process.exit(1); -> nodejs express 종료
    }
});

app.post('/api/ClientAccountBalance', async function (req, res) {
    /*
    호출 함수 네임 : Get_tx
    매개변수 : TxId
    */

    // 만약 코드에서 에러가 난 경우 예외 처리
    try {
        const username = req.body.id
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org2.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log('An identity for the user ${username} does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.evaluateTransaction('ClientAccountBalance'); //
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

app.post('/api/ClientAccountID', async function (req, res) {
    /*
    호출 함수 네임 : Get_Root_Receipt
    매개변수 : address
    */

    // 만약 코드에서 에러가 난 경우 예외 처리
    try {
        const username = req.body.id

        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org2.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log('An identity for the user "username" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.evaluateTransaction('ClientAccountID'); //
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

app.post('/api/TotalSupply', async function (req, res) {
    /*
    호출 함수 네임 : Get_Last_Receipt
    매개변수 : address
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

        const result = await contract.evaluateTransaction('TotalSupply', req.body.value); //
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

app.post('/api/Approve', async function (req, res) {
    /* 
    호출 함수 네임 : Get_receipts
    매개변수 : receiptId
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

        const result = await contract.evaluateTransaction('Approve', req.body.value); //
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

app.post('/api/Allowance', async function (req, res) {
    /*
    호출 함수 네임 : Get_receipt
    매개변수 : receiptId
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

        const result = await contract.evaluateTransaction('Allowance', req.body.value); //
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

app.post('/api/TransferFrom', async function (req, res) {
    /*
    호출 함수 네임 : Get_Transfer
    매개변수 : 없음
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

        const result = await contract.evaluateTransaction('TransferFrom'); //
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

app.post('/api/register', async function (req, res) {
    try {

        const username = req.body.id;
        const password = req.body.password;
        
        if(!username){
            return res.status(404).json({"response":"id 파라미터의 값이 존재하지 않습니다."});
        }
        if(!password){
            return res.status(404).json({"response":"password 파라미터의 값이 존재하지 않습니다."});
        }

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org2.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org2.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const userIdentity = await wallet.get(username);
        if (userIdentity) {
            console.log(userIdentity)
            console.log(`An identity for the user "${username}" already exists in the wallet`);
            return;
        }

        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            // affiliation: 'org1.example.com',
            enrollmentID: username,
            role: 'client'
        }, adminUser);

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org2MSP',
            type: 'X.509',
        };
        await wallet.put(username, x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
        res.status(200).json({response: `${username} User Register Successfully`});

    } catch (error) {
        console.error(`Failed to enroll Error: ${error}`);
        // process.exit(1);
    }
});

app.listen(8000, '0.0.0.0');
console.log('Running on api server');