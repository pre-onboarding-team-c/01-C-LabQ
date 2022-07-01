const { isTypeXml, getIndices } = require('../utils');
const { gus } = require('../constants');
const { rainfallOpenApi } = require('../openApis');

/**
 * 작성자 : 김지유
 * 서울시 강우량 정보를 받아옵니다.
 * @param {number} limit - 페이지 넘버입니다.
 * @param {string} guName - XX구 형태의 문자열입니다. 선택사항입니다. 입력하면 그 구의 정보만 받아오고, 입력하지 않으면 서울시 전체의 정보를 받아옵니다.
 * @return https://www.notion.so/7b878b8b09d24a1fb40b83f4be684674#db3729e4fb4d4d26a3071ad38327929e 를 참고해주세요.
 */
const getRainfall = async (limit = 1, guName = '') => {
  const [startIndex, endIndex] = getIndices(limit);

  try {
    if (startIndex <= 0) {
      throw new Error(`startIndex 는 0보다 커야 합니다. startIndex : ${startIndex}`);
    }

    const requestVolume = endIndex - startIndex;

    if (requestVolume <= 0) {
      throw new Error(`endIndex 는 startIndex 보다 커야합니다. startIndex : ${startIndex}\nendIndex : ${endIndex}`);
    }

    if (requestVolume >= 1000) {
      throw new Error(`endIndex - startIndex 는 1000보다 작아야합니다. endIndex - startIndex : ${requestVolume}`);
    }

    if (guName) {
      if (guName[guName.length - 1] !== '구') {
        throw new Error(`guName 은 XX구 형태의 문자열이여야합니다. guName : ${guName}`);
      }

      if (!gus.includes(guName.slice(0, guName.length - 1))) {
        throw new Error(`입력하신 이름의 구가 없습니다. guName : ${guName}`);
      }
    }

    const { data } = await rainfallOpenApi.getRainfall(startIndex, endIndex, guName);

    if (isTypeXml(data)) {
      throw new Error('받은 데이터가 XML이 아닌 JSON 이여야 합니다(요청 값을 확인해주세요)');
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getRainfall,
};
