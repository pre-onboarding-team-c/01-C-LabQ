const dotenv = require('dotenv');

dotenv.config();

const { drainpipeOpenApi } = require('../app/openApis');
const drainpipeService = require('../app/services/drainpipe.service');

/**
 * 작성자 : 김영우
 * 하수관로 수위 Open API 호출하는 함수 테스트
 */
describe('하수관로 Open API 호출', () => {
  const startIndex = 1;
  const endIndex = 3;
  const gubn = '01';
  const meaYmd = '2022070100';
  const meaYmd2 = '2022070101';
  const data = {
    DrainpipeMonitoringInfo: {
      list_total_count: 480,
      RESULT: {
        CODE: 'INFO-000',
        MESSAGE: '정상 처리되었습니다',
      },
      row: [
        {
          IDN: '01-0004',
          GUBN: '01',
          GUBN_NAM: '종로',
          MEA_YMD: '2022-07-01 00:00:03.0',
          MEA_WAL: 0.27,
          SIG_STA: '통신양호',
        },
        {
          IDN: '01-0003',
          GUBN: '01',
          GUBN_NAM: '종로',
          MEA_YMD: '2022-07-01 00:00:03.0',
          MEA_WAL: 0.19,
          SIG_STA: '통신양호',
        },
        {
          IDN: '01-0002',
          GUBN: '01',
          GUBN_NAM: '종로',
          MEA_YMD: '2022-07-01 00:00:03.0',
          MEA_WAL: 0.0,
          SIG_STA: '통신양호',
        },
      ],
    },
  };

  describe('Open API 데이터 요청 성공', () => {
    test('getDrainpipe 함수', async () => {
      const result = await drainpipeOpenApi.getDrainpipe(startIndex, endIndex, gubn, meaYmd, meaYmd2);

      expect(result.data).toHaveProperty('DrainpipeMonitoringInfo');
      expect(result.data).toEqual(data);
    });
  });

  describe('Open API 데이터 요청 실패', () => {
    test('getDrainpipe 함수', async () => {
      const gubn1 = '';
      const result = await drainpipeOpenApi.getDrainpipe(startIndex, endIndex, gubn1, meaYmd, meaYmd2);

      expect(result.data).not.toHaveProperty('DrainpipeMonitoringInfo');
    });
  });

  describe('하수관로 서비스 함수', () => {
    test('getDrainpipe 함수', async () => {
      const result = await drainpipeService.getDrainpipe();

      expect(result).toBeInstanceOf(Object);
    });
  });
});
