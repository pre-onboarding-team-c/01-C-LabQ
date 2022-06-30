const { createCommonOpenApiUrl } = require('../utils');
const { SERVICE_LISTRAINFALLSERVICE, gus } = require('../constants');
const { default: axios } = require('axios');

const rainfallInstance = axios.create({
  baseURL: createCommonOpenApiUrl(SERVICE_LISTRAINFALLSERVICE),
});

/**
 * 작성자 : 김지유
 * 서울시 강우량 정보를 받아옵니다.
 * @param {number} startIndex - 페이징 시작 번호, 필수로 입력해야하며 0보다 커야합니다. default 는 1입니다.
 * @param {number} endIndex - 페이징 끝 번호, 필수로 입력해야하며 startIndex 보다 크고, endIndex - startIndex < 1000 이여야 합니다. default 는 10입니다.
 * @param {string} guName - XX구 형태의 문자열입니다. 선택사항입니다. 입력하면 그 구의 정보만 받아오고, 입력하지 않으면 서울시 전체의 정보를 받아옵니다.
 * @return https://www.notion.so/9ea1ae127cf94323b78ad19614a694cb#f54d4b862ecf4677adf734ba69de056e 를 참고해주세요.
 */
const getRainfall = async (startIndex = 1, endIndex = 10, guName = '') => {
  try {
    if (startIndex <= 0) {
      throw new Error(
        `startIndex 는 0보다 커야 합니다. startIndex : ${startIndex}`,
      );
    }

    const requestVolume = endIndex - startIndex;

    if (requestVolume <= 0) {
      throw new Error(
        `endIndex 는 startIndex 보다 커야합니다. startIndex : ${startIndex}\nendIndex : ${endIndex}`,
      );
    }

    if (requestVolume >= 1000) {
      throw new Error(
        `endIndex - startIndex 는 1000보다 작아야합니다. endIndex - startIndex : ${requestVolume}`,
      );
    }

    if (guName) {
      if (guName[guName.length - 1] !== '구') {
        throw new Error(
          `guName 은 XX구 형태의 문자열이여야합니다. guName : ${guName}`,
        );
      }

      if (!gus.includes(guName.slice(0, guName.length - 1))) {
        throw new Error(`입력하신 이름의 구가 없습니다. guName : ${guName}`);
      }
    }

    const { data } = await rainfallInstance.get(
      `${startIndex}/${endIndex}/${guName}`,
    );

    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getRainfall,
};
