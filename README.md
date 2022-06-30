# (주)랩큐
## 환경
![node](https://img.shields.io/badge/node-v16.15.1-3776AB?&style=plastic&logo=JavaScript&logoColor=white?label=healthinesses)
![npm](https://img.shields.io/badge/npm-v8.13.1-7986cb?&style=plastic&logo=npm&logoColor=white?label=healthinesses)
## 사용법
레퍼지토리를 clone한 뒤, `npm install`을 하고 `.env`파일을 다음과 같이 작성한다.
```
AUTHORIZATION_KEY=서울열린데이터광장에서 인증키를 받아 사용
```
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
    <td>http://localhost:8081/drainpipes?gubn=01&limit=1&meaYmd={날짜시간}&meaYmd2={날짜시간}</td>
</tr>
<tr>
    <td>GET</td>
    <td>/rainfalls?limit={1}&guName={강남구}</td>
    <td>강우량 조회</td>
    <td>http://localhost:8081/rainfalls?limit={1}&guName={강남구}</td>
</tr>
<tr>
    <td>GET</td>
    <td>/combinations</td>
    <td>하수관로 수위, 강우량 데이터 결합 조회</td>
    <td>http://localhost:8081/combinations</td>
</tr>
</table>

## Response 출력 값
IDN(고유번호)와 측정수위(MEA_WAL) 값을 배열로 표시
```json
{
  "list_total_count": 456,
  "RESULT": {
    "CODE": "INFO-000",
    "MESSAGE": "정상 처리되었습니다"
  },
  "row": [
    {
      "GUBN": "12",
      "GUBN_NAM": "은평",
      "GU_CODE": "113",
      "GU_NAME": "은평구",
      "MEA_YMD": "2022-06-30 11:49",
      "drainpipe": {
        "MEA_WALs": {
          "2022-06-30 11:40": [0.23, 0.1, 0.12, 0.1, null, 0.28, 0.34, 0.1],
          "2022-06-30 11:41": [0.23, 0.1, 0.13, 0.1, null, 0.28, 0.33, 0.1],
          "2022-06-30 11:42": [0.23, 0.09, 0.13, 0.1, null, 0.28, 0.33, 0.1],
          "2022-06-30 11:43": [0.22, 0.09, 0.13, 0.1, null, 0.28, 0.33, 0.1],
          "2022-06-30 11:44": [0.22, 0.09, 0.13, 0.1, null, 0.28, 0.33, 0.1],
          "2022-06-30 11:45": [0.22, 0.09, 0.13, 0.1, null, 0.28, 0.32, 0.1],
          "2022-06-30 11:46": [0.22, 0.09, 0.13, 0.1, null, 0.28, 0.32, 0.1],
          "2022-06-30 11:47": [0.22, 0.09, 0.13, 0.1, null, 0.27, 0.32, 0.1],
          "2022-06-30 11:48": [0.22, 0.09, 0.13, 0.09, null, 0.28, 0.32, 0.1],
          "2022-06-30 11:49": [0.22, 0.09, 0.13, 0.09, null, 0.28, 0.32, 0.1]
        },
        "SIG_STA": "통신양호"
      },
      "rainFall": [
        {
          "RAINGAUGE_CODE": 1302,
          "RAINGAUGE_NAME": "증산P",
          "RAINFALL10": 0
        },
        {
          "RAINGAUGE_CODE": 1301,
          "RAINGAUGE_NAME": "은평구청",
          "RAINFALL10": 0
        },
        {
          "RAINGAUGE_CODE": 1303,
          "RAINGAUGE_NAME": "갈현1동",
          "RAINFALL10": 0
        }
      ]
    }
  ]
}
```

