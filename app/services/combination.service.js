const {
  drainpipeOpenApi: { getDrainpipe },
  rainfallOpenApi: { getRainfall },
} = require('../openApis');
const { dateToString, numberToDateString } = require('../utils');
const { drainpipeInfos } = require('../constants');

const getCombinedData = async (limit = 1, gubn = '01', meaYmd, meaYmd2) => {
  const rainfallStartIndices = [];
  const drainpipeStartIndices = [];
  const guName = `${drainpipeInfos[gubn].guName}구`;
  let isRainfallEnough = false;
  let startDate;
  let endDate;

  // startDate endDate 설정
  if (!!meaYmd && !!meaYmd2) {
    startDate = new Date(meaYmd.slice(0, 4), meaYmd.slice(4, 6) - 1, meaYmd.slice(6, 8), meaYmd.slice(8));
    endDate = new Date(meaYmd2.slice(0, 4), meaYmd2.slice(4, 6) - 1, meaYmd2.slice(6, 8), meaYmd2.slice(8));
  } else if (!meaYmd && !meaYmd2) {
    startDate = new Date();
    endDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();
    const startHours = startDate.getHours();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth() + 1;
    const endDay = endDate.getDate();
    const endHours = endDate.getHours();

    meaYmd = numberToDateString(startYear, true) + numberToDateString(startMonth) + numberToDateString(startDay) + numberToDateString(startHours);
    meaYmd2 = numberToDateString(endYear, true) + numberToDateString(endMonth) + numberToDateString(endDay) + numberToDateString(endHours);
  } else if (!meaYmd) {
    startDate = new Date(meaYmd2.slice(0, 4), meaYmd2.slice(4, 6) - 1, meaYmd2.slice(6, 8), meaYmd2.slice(8));
    endDate = new Date(meaYmd2.slice(0, 4), meaYmd2.slice(4, 6) - 1, meaYmd2.slice(6, 8), meaYmd2.slice(8));
    startDate.setDate(startDate.getDate() - 7);

    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const date = startDate.getDate();
    const hours = startDate.getHours();

    meaYmd = numberToDateString(year, true) + numberToDateString(month) + numberToDateString(date) + numberToDateString(hours);
  } else {
    startDate = new Date(meaYmd.slice(0, 4), meaYmd.slice(4, 6) - 1, meaYmd.slice(6, 8), meaYmd.slice(8));
    endDate = new Date(meaYmd.slice(0, 4), meaYmd.slice(4, 6) - 1, meaYmd.slice(6, 8), meaYmd.slice(8));
    endDate.setDate(endDate.getDate() + 7);

    const year = endDate.getFullYear();
    const month = endDate.getMonth() + 1;
    const date = endDate.getDate();
    const hours = endDate.getHours();

    meaYmd2 = numberToDateString(year, true) + numberToDateString(month) + numberToDateString(date) + numberToDateString(hours);
  }

  const { data: firstRainfallData } = await getRainfall(1, 1000, guName);
  const { data } = await getDrainpipe(1, 1000, gubn, meaYmd, meaYmd2);
  const rainfallDataAmount = firstRainfallData?.ListRainfallService.list_total_count || 0;
  const drainpipeDataAmount = data?.DrainpipeMonitoringInfo.list_total_count || 0;
  const { data: firstDrainpipeData } = await getDrainpipe(drainpipeDataAmount - 999, drainpipeDataAmount, gubn, meaYmd, meaYmd2);
  const rainfallData = {};
  const drainpipeData = {};
  const combinedDataRow = [];

  // rainfall start
  if (firstRainfallData.hasOwnProperty('ListRainfallService')) {
    const {
      ListRainfallService: { row: firstRainfallRow },
    } = firstRainfallData;

    for ({ GU_CODE, GU_NAME, RECEIVE_TIME, ...rest } of firstRainfallRow) {
      const time = dateToString(RECEIVE_TIME);
      const date = new Date(time.slice(0, 4), time.slice(4, 6) - 1, time.slice(6, 8), time.slice(8, 10), time.slice(10));

      if (startDate <= date) {
        if (endDate < date) {
          isRainfallEnough = true;
          break;
        }

        if (!rainfallData.hasOwnProperty(time)) {
          rainfallData[time] = [];
        }

        rainfallData[time].push(rest);
      }
    }
  }

  if (false) {
    for (let startIndex = 1001; startIndex <= rainfallDataAmount; startIndex += 1000) {
      rainfallStartIndices.push(startIndex);
    }

    if (rainfallStartIndices.length > 0) {
      await Promise.all(
        rainfallStartIndices.map(async startIndex => {
          const { data: restRainfallData } = await getRainfall(startIndex, startIndex + 999, guName);

          if (restRainfallData.hasOwnProperty('ListRainfallService')) {
            const {
              ListRainfallService: { row: restRainfallRow },
            } = restRainfallData;

            for ({ GU_CODE, GU_NAME, RECEIVE_TIME, ...rest } of restRainfallRow) {
              const time = dateToString(RECEIVE_TIME);

              if (!rainfallData.hasOwnProperty(time)) {
                rainfallData[time] = [rest];
              } else if (!rainfallData[time].some(({ RAINGAUGE_CODE }) => RAINGAUGE_CODE === rest.RAINGAUGE_CODE)) {
                rainfallData[time].push(rest);
              }
            }
          }
        }),
      );
    }
  }
  // rainfall end

  // drainpipe start
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

  if (false) {
    for (let startIndex = 1001; startIndex <= drainpipeDataAmount; startIndex += 1000) {
      drainpipeStartIndices.push(startIndex);
    }

    if (drainpipeStartIndices.length > 0) {
      await Promise.all(
        drainpipeStartIndices.map(async startIndex => {
          const { data: restDrainpipeData } = await getDrainpipe(startIndex, startIndex + 999, gubn, meaYmd, meaYmd2);

          if (restDrainpipeData.hasOwnProperty('DrainpipeMonitoringInfo')) {
            const {
              DrainpipeMonitoringInfo: { row: restDrainpipeRow },
            } = restDrainpipeData;

            restDrainpipeRow.forEach(({ IDN, MEA_YMD, MEA_WAL, SIG_STA }) => {
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
            });
          }
        }),
      );
    }
  }
  // drainpipe end

  const drainpipeEntires = Object.entries(drainpipeData);
  const rainfallEntries = Object.entries(rainfallData);
  const list_total_count = rainfallEntries.length;

  rainfallEntries
    .sort(([aTime], [bTime]) => (aTime < bTime ? 1 : aTime > bTime ? -1 : 0))
    .slice(0, 10)
    .forEach(([rainfallTime, rainfall]) => {
      const drainpipe = {};
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
          drainpipe[drainpipeTime] = {
            MEA_WALs,
            SIG_STAs,
          };
        }
      });

      const combinedData = {
        GUBN: gubn,
        GUBN_NAM: drainpipeInfos[gubn].guName,
        GU_CODE: firstRainfallData?.ListRainfallService.row[0].GU_CODE,
        GU_NAME: guName,
        MEA_YMD: rainfallTime,
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
