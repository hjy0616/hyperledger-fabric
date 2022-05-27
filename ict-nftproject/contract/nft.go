package main



//Const names key
const nameKey = "User"
const symbolKey = "symbol"

const balancePrefix = "balance"
const nftPrefix = "nft"
const approvalPrefix = "approval"

//////////////////////////////////	NFT Holder //////////////////////////////////
//	- NFT 소유자
//	- NFT 보유개수  *NFT 1개 당 AI 서비스 1개
//	- AI 서비스 정보
//		- AI 서비스 이름
//		- AI NFT 주소
//		- AI 호출횟수
//		- AI 서비스 학습 데이터양


type Nft struct {
	TokenId  string `json:"tokenId"`
	Owner    string `json:"owner"`
	TokenURI string `json:"tokenURI"`
	Approved string `json:"approved"`
}

type WalletInfo struct{
	Owner 	string `json:"owner"`
	Count 	float64 `json:"count"`
	AiInfos []AiInfo `json:"aiinfos"`
}

type AiInfo struct{
	AiTitle 	 string `json:"aititle"`
	TokenId 	 string `json:"tokenId"`
	AiSum 		 float64 `json:"aisum"`
	LearningData float64 `json:"learningdata"`
}

type Transfer struct {
	From    string `json:"from"`
	To      string `json:"to"`
	TokenId string `json:"tokenId"`
}

////////////////////////////////// User(라벨러) //////////////////////////////////
//	- 아이디
//	- 활동점수 합계
//	- 참여 소싱풀 정보
//		-마지막 참여 프로젝트(소싱풀) 이름
//		-마지막 참여 프로젝트(소싱풀) 활동점수

type UserInfo struct {
	User  string  `json:"user"`
	Sum   float64 `json:"sum"`
	Infos []Info  `json:"infos"`
}

type Info struct {
	ProjectTitle  string  `json:"projecttitle"`
	ActivityScore float64 `json:"activityscore"`
}