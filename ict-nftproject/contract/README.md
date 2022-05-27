# NFT project chaincode
#### Refer to token-erc-721 file in fabric-samples

## ERC721 metadata extension
```go
func (c *NftChaincode) Name(ctx contractapi.TransactionContextInterface) (string, error)
func (c *NftChaincode) Symbol(ctx contractapi.TransactionContextInterface) (string, error)
func (c *NftChaincode) TokenURI(ctx contractapi.TransactionContextInterface, tokenId string) (string, error)
func _readNFT(ctx contractapi.TransactionContextInterface, tokenId string) (*Nft, error)
func _nftExists(ctx contractapi.TransactionContextInterface, tokenId string) bool
```

## Mint a new non-fungible token
```go
func (c *TokenERC721Contract) MintWithTokenURI(ctx contractapi.TransactionContextInterface, tokenId string, tokenURI string) (*Nft, error)
```

## NFT Holder

```go
func (c *NftChaincode) Wallet(ctx contractapi.TransactionContextInterface, owner string)  error
func (c *NftChaincode) AI(ctx contractapi.TransactionContextInterface, Owner string, aititle string, tokenId string, aisum float64, learningdata string) error
func (c *NftChaincode) ReadAIinfo(ctx contractapi.TransactionContextInterface, Owner string) (string, error)
```

## User(labeler)
```go
func (c *NftChaincode) AddUser(ctx contractapi.TransactionContextInterface, username string) error
func (c *NftChaincode) AddScore(ctx contractapi.TransactionContextInterface, username string, project_name string, activity_score string) error
func (c *NftChaincode) ReadScore(ctx contractapi.TransactionContextInterface, username string) (string, error)
```