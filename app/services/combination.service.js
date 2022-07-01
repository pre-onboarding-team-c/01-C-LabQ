const {
  drainpipeOpenApi: { getDrainpipe },
  rainfallOpenApi: { getRainfall },
} = require('../openApis');
const { dateToString, numberToDateString } = require('../utils');
const { drainpipeInfos } = require('../constants');

/**
 * 작성자 : 김지유
 * 현재는 gubn으로 지정한 구의 최근 강우량 1000개의 데이터를 기준으로 관련 하수관로 수위 데이터와 결합짓는 것까지만 구현되었습니다. (v1)
 * @param {number} limit - 페이지를 의미합니다.
 * @param {string} gubn - NN 형태의 구분코드 문자열입니다.
 * @param {string} meaYmd - 데이터를 받아올 시작 시간 입니다. YYYYMMDDhhmm 형태의 문자열입니다.
 * @param {string} meaYmd2 - 데이터를 받아올 끝 시간 입니다. YYYYMMDDhhmm 형태의 문자열입니다.
 * @returns
 */
const getCombinedData = async (limit = 1, gubn = '01', meaYmd, meaYmd2) => {
  const guName = `${drainpipeInfos[gubn].guName}구`;
  let startDate;
  let endDate;

  // startDate endDate 설정
  if (!!meaYmd && !!meaYmd2) {
    startDate = new Date(meaYmd.slice(0, 4), meaYmd.slice(4, 6) - 1, meaYmd.slice(6, 8), meaYmd.slice(8, 10), meaYmd.slice(10));
    endDate = new Date(meaYmd2.slice(0, 4), meaYmd2.slice(4, 6) - 1, meaYmd2.slice(6, 8), meaYmd2.slice(8, 10), meaYmd2.slice(10));
  } else if (!meaYmd && !meaYmd2) {
    startDate = new Date();
    endDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;
    const endDay = endDate.getDate();
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    meaYmd =
      numberToDateString(startYear, true) +
      numberToDateString(startMonth) +
      numberToDateString(startDay) +
      numberToDateString(startHours) +
      numberToDateString(startMinutes);
    meaYmd2 =
      numberToDateString(endYear, true) +
      numberToDateString(endMonth) +
      numberToDateString(endDay) +
      numberToDateString(endHours) +
      numberToDateString(endMinutes);
  } else if (!meaYmd) {
    startDate = new Date(meaYmd2.slice(0, 4), meaYmd2.slice(4, 6) - 1, meaYmd2.slice(6, 8), meaYmd2.slice(8, 10), meaYmd2.slice(10));
    endDate = new Date(meaYmd2.slice(0, 4), meaYmd2.slice(4, 6) - 1, meaYmd2.slice(6, 8), meaYmd2.slice(8, 10), meaYmd2.slice(10));
    startDate.setDate(startDate.getDate() - 7);

    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const date = startDate.getDate();
    const hours = startDate.getHours();
    const minutes = startDate.getMinutes();

    meaYmd = numberToDateString(year, true) + numberToDateString(month) + numberToDateString(date) + numberToDateString(hours) + numberToDateString(minutes);
  } else {
    startDate = new Date(meaYmd.slice(0, 4), meaYmd.slice(4, 6) - 1, meaYmd.slice(6, 8), meaYmd.slice(8, 10), meaYmd.slice(10));
    endDate = new Date(meaYmd.slice(0, 4), meaYmd.slice(4, 6) - 1, meaYmd.slice(6, 8), meaYmd.slice(8, 10), meaYmd.slice(10));
    endDate.setDate(endDate.getDate() + 7);

    const year = endDate.getFullYear();
    const month = endDate.getMonth() + 1;
    const date = endDate.getDate();
    const hours = endDate.getHours();
    const minutes = endDate.getMinutes();

    meaYmd2 = numberToDateString(year, true) + numberToDateString(month) + numberToDateString(date) + numberToDateString(hours) + numberToDateString(minutes);
  }

  const { data: firstRainfallData } = await getRainfall(1, 1000, guName);
  const { data } = await getDrainpipe(1, 1000, gubn, meaYmd.slice(0, 10), meaYmd2.slice(0, 10));
  const drainpipeDataAmount = data?.DrainpipeMonitoringInfo.list_total_count || 0;
  const { data: firstDrainpipeData } = await getDrainpipe(drainpipeDataAmount - 999, drainpipeDataAmount, gubn, meaYmd.slice(0, 10), meaYmd2.slice(0, 10));
  const rainfallData = {};
  const drainpipeData = {};
  const combinedDataRow = [];

  if (firstRainfallData.hasOwnProperty('ListRainfallService')) {
    const {
      ListRainfallService: { row: firstRainfallRow },
    } = firstRainfallData;

    for ({ GU_CODE, GU_NAME, RECEIVE_TIME, ...rest } of firstRainfallRow) {
      const time = dateToString(RECEIVE_TIME);

      if (!rainfallData.hasOwnProperty(time)) {
        rainfallData[time] = [];
      }

      rainfallData[time].push(rest);
    }
  }

  if (firstDrainpipeData.hasOwnProperty('DrainpipeMonitoringInfo')) {
    const {
      DrainpipeMonitoringInfo: { row: firstDrainpipeRow },
    } = firstDrainpipeData;

    for ({ IDN, MEA_YMD, MEA_WAL, SIG_STA } of firstDrainpipeRow) {
      const time = dateToString(MEA_YMD);
      const drainpipeIndex = Number(IDN.slice(3)) - 1;

      if (!drainpipeData.hasOwnProperty(time)) {
        drainpipeData[time] = {
          MEA_WALs: [],
          SIG_STAs: [],
        };
      }

      drainpipeData[time].MEA_WALs[drainpipeIndex] = MEA_WAL;
      drainpipeData[time].SIG_STAs[drainpipeIndex] = SIG_STA;
    }
  }

  const drainpipeEntires = Object.entries(drainpipeData);
  const rainfallEntries = Object.entries(rainfallData);
  const list_total_count = rainfallEntries.length;

  rainfallEntries
    .sort(([aTime], [bTime]) => (aTime < bTime ? 1 : aTime > bTime ? -1 : 0))
    .slice((limit - 1) * 10, limit * 10)
    .forEach(([rainfallTime, rainfall]) => {
      const drainpipe = [];
      const startTime = new Date(
        rainfallTime.slice(0, 4),
        rainfallTime.slice(4, 6) - 1,
        rainfallTime.slice(6, 8),
        rainfallTime.slice(8, 10),
        rainfallTime.slice(10),
      );
      const endTime = new Date(
        rainfallTime.slice(0, 4),
        rainfallTime.slice(4, 6) - 1,
        rainfallTime.slice(6, 8),
        rainfallTime.slice(8, 10),
        rainfallTime.slice(10),
      );
      startTime.setMinutes(startTime.getMinutes() - 10);

      drainpipeEntires.forEach(([drainpipeTime, { MEA_WALs, SIG_STAs }]) => {
        const drainpipeDate = new Date(
          drainpipeTime.slice(0, 4),
          drainpipeTime.slice(4, 6) - 1,
          drainpipeTime.slice(6, 8),
          drainpipeTime.slice(8, 10),
          drainpipeTime.slice(10),
        );

        if (startTime < drainpipeDate && drainpipeDate <= endTime) {
          drainpipe.push({
            YMD: drainpipeTime,
            MEA_WALs,
            SIG_STAs,
          });
        }
      });

      drainpipe.sort(({ YMD: aYMD }, { YMD: bYMD }) => (aYMD < bYMD ? 1 : aYMD > bYMD ? -1 : 0));

      const combinedData = {
        GUBN: gubn,
        GUBN_NAM: drainpipeInfos[gubn].guName,
        GU_CODE: firstRainfallData?.ListRainfallService.row[0].GU_CODE,
        GU_NAME: guName,
        YMD: rainfallTime,
        rainfall,
        drainpipe,
      };

      combinedDataRow.push(combinedData);
    });

  return {
    list_total_count,
    RESULT: {
      CODE: 'INFO-000',
      MESSAGE: '정상 처리되었습니다',
    },
    row: combinedDataRow,
  };
};

module.exports = {
  getCombinedData,
};
