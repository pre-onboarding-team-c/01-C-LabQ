# (주)랩큐
## Api Documentation
https://documenter.getpostman.com/view/21440012/UzJESK7v
## 환경
![node](https://img.shields.io/badge/node-v16.15.1-3776AB?&style=plastic&logo=JavaScript&logoColor=white?label=healthinesses)
![npm](https://img.shields.io/badge/npm-v8.13.1-7986cb?&style=plastic&logo=npm&logoColor=white?label=healthinesses)
## 사용법
레퍼지토리를 clone한 뒤, `npm install`을 하고 `.env`파일을 다음과 같이 작성한다.
```
AUTHORIZATION_KEY=서울열린데이터광장에서 인증키를 받아 사용
```
## 서비스 개요
하수관로 수위, 강우량, 둘을 결합한 데이터, 총 세 가지 종류의 데이터를 한 페이지 당 10개씩 제공하는 가상의 클라이언트(웹) 에서 사용할 API.  
## 요구사항 분석
* 데이터 JSON 전달
* 기본 서울시 하수관로 수위 현황 데이터 수집
  - 하수관로 수위 현황 데이터 얻는 함수 구현
* 기본 서울시 강우량 데이터 수집
  - 강우량 데이터 얻는 함수 구현
* 하수관로 수위, 강우량 데이터를 결합
  - GUBN_NAM(구분명), GU_NAME(구청명) 기준으로 데이터를 결합하는 함수 구현
* 하수관로 수위 목록 조회 REST API 구현
* 강우량 목록 조회 REST API 구현
* GUBN(구분코드), MEA_YMD(측정일자1), MEA_YMD2(측정일자2), 페이지로 하수관로 조회하는 REST API 구현
  - GET /drainpipes?gubn=01&limit=1&meaYmd={MEA_YMD}&meaYmd2={MEA_YMD2}
* 페이지, GU_NAME(구청명)로 조회하는 REST API 구현
  - GET /rainfalls?limit=1&guName=강남구
* OpenAPI 문제로 xml 형식 문자열 파악하는 함수 구현
  - json 형식인데 xml 형식으로 넘어오는 경우가 있음
## API
<table>
<tr>
    <th>Method</th><th>Endpoint</th><th>기 능 설 명</th><th>URL</th>
</tr>
<tr>
    <td>GET</td>
    <td>/drainpipes?gubn={01}&limit={1}&meaYmd={2022063009}&meaYmd2={2022060310}</td>
    <td>하수관로 수위 조회</td>
    <td>http://localhost:8081/api/drainpipes?gubn=01&limit=1&meaYmd={날짜시간}&meaYmd2={날짜시간}</td>
</tr>
<tr>
    <td>GET</td>
    <td>/rainfalls?limit={1}&guName={강남구}</td>
    <td>강우량 조회</td>
    <td>http://localhost:8081/api/rainfalls?limit={1}&guName={강남구}</td>
</tr>
<tr>
    <td>GET</td>
    <td>/combinations</td>
    <td>하수관로 수위, 강우량 데이터 결합 조회</td>
    <td>http://localhost:8081/api/combinations</td>
</tr>
</table>

## Response 출력 값
v1. 지정한 구의 최근 1000개 강우량 데이터를 기준, 관련 최근 1000개 하수관로 수위 데이터 결합

YMD : 강우량 측정 시각, 10분우량  
(ex: 202207011629 일때, 2022년 7월 1일 16시 20분 ~ 2022년 7월 1일 16시 29분까지의 강우량)  
drainpipe : 해당 시각 10분 동안의 하수관로 수위 데이터 배열  
drainpipe[n].YMD : 하수관로 수위 측정 시각  
drainpipe[n].MEA_WALs : 하수관로 수위 배열  
drainpipe[n].SIG_STAs : 통신상태 배열  

하수관로 고유번호인 IDN(ex: 01-0001, 01-0002, 01-0003, ...)의 뒷 4자리가
MEA_WALs, SIG_STAs 의 인덱스가 된다.  
(ex: 01-0001의 수위 -> MEA_WALs[0], 01-0005의 통신상태 SIG_STAs[4])

```json
{
  "list_total_count": 501,
  "RESULT": {
    "CODE": "INFO-000",
    "MESSAGE": "정상 처리되었습니다"
  },
  "row": [
    {
      "GUBN": "01",
      "GUBN_NAM": "종로",
      "GU_CODE": 110,
      "GU_NAME": "종로구",
      "YMD": "202207011629",
      "rainfall": [
        {
          "RAINGAUGE_CODE": 1002,
          "RAINGAUGE_NAME": "부암동",
          "RAINFALL10": "0"
        },
        {
          "RAINGAUGE_CODE": 1001,
          "RAINGAUGE_NAME": "종로구청",
          "RAINFALL10": "0"
        }
      ],
      "drainpipe": [
        {
          "YMD": "202207011629",
          "MEA_WALs": [0.14, 0, 0.13, 0.16],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011628",
          "MEA_WALs": [0.14, 0, 0.13, 0.17],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011627",
          "MEA_WALs": [0.14, 0, 0.13, 0.16],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011626",
          "MEA_WALs": [0.14, 0, 0.14, 0.17],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011625",
          "MEA_WALs": [0.14, 0, 0.14, 0.16],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011624",
          "MEA_WALs": [0.14, 0, 0.14, 0.16],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011623",
          "MEA_WALs": [0.14, 0, 0.13, 0.17],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011622",
          "MEA_WALs": [0.14, 0, 0.14, 0.17],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011621",
          "MEA_WALs": [0.14, 0, 0.14, 0.17],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        },
        {
          "YMD": "202207011620",
          "MEA_WALs": [0.14, 0, 0.13, 0.17],
          "SIG_STAs": ["통신양호", "통신양호", "통신양호", "통신양호"]
        }
      ]
    }
  ]
}
```

