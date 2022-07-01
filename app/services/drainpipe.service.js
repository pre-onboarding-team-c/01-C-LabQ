const { drainpipeAmounts, getIndices, numberToDateString } = require('../utils');
const { drainpipeApi } = require('../apis');

module.exports = {
  /**
   * 작성자 황시우
   * 서울시 종로구(고유번호 : 01)을 기준으로 처음으로 사용자에게 보여지는 페이지로 활용됩니다.
   * @param {number} meaYmd - 이 날짜를 기점으로 측정합니다.
   * @param {number} meaYmd2 - 이 날짜를 기점으로 측정을 마칩니다.
   */
  // landingPage: async (req, res) => {
  //   const { meaYmd, meaYmd2 } = req.query;

  //   const response = await axios.get(
  //     `http://openapi.seoul.go.kr:8088/${process.env.AUTHORIZATION_KEY}/json/DrainpipeMonitoringInfo/1/10/01/${meaYmd}/${meaYmd2}`,
  //   );

  //   res.status(200).send(response.data);
  // },
  /**
   * 작성자 황시우
   * 부 작성자 : 김지유
   * 서울시 각 구의 하수관 수위 현황을 검색할 수 있습니다.
   * @param {number} limit - 페이지를 받아오는 쿼리입니다. 값이 존재하지 않아도 1페이지로 적용됩니다.
   * @param {string} gubn - 서울시 구 단위의 고유번호로 필수로 작성해야합니다. ex(01, 02 ...)
   * @param {number} meaYmd - 이 날짜를 기점으로 측정합니다. ex(2022063010)
   * @param {number} meaYmd2 - 이 날짜를 기점으로 측정을 마칩니다. ex(2022063012)
   */
  getDrainpipe: async (limit = 1, gubn = '01', meaYmd, meaYmd2) => {
    const [startIndex, endIndex] = getIndices(limit, drainpipeAmounts[gubn]);

    if (!meaYmd) {
      const currentTime = new Date();

      currentTime.setHours(currentTime.getHours() - 1);

      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const date = currentTime.getDate();
      const hours = currentTime.getHours();

      meaYmd = numberToDateString(year, true) + numberToDateString(month) + numberToDateString(date) + numberToDateString(hours);
    }

    if (!meaYmd2) {
      const endTime = new Date(meaYmd.slice(0, 4), meaYmd.slice(4, 6) - 1, meaYmd.slice(6, 8), meaYmd.slice(8));

      endTime.setHours(endTime.getHours() + 1);

      const year = endTime.getFullYear();
      const month = endTime.getMonth() + 1;
      const date = endTime.getDate();
      const hours = endTime.getHours();

      meaYmd2 = numberToDateString(year, true) + numberToDateString(month) + numberToDateString(date) + numberToDateString(hours);
    }

    const { data } = await drainpipeApi.getDrainpipe(startIndex, endIndex, gubn, meaYmd, meaYmd2);

    if (isTypeXml(data)) {
      throw new Error('받은 데이터가 XML이 아닌 JSON 이여야 합니다(요청 값을 확인해주세요)');
    }

    return data;
  },
};
