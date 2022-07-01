const {
  drainpipeApi: { getDrainpipe },
  rainfallApi: { getRainfall },
} = require('../apis');

// const getCombinedData = async (limit = 1, gubn = '01', meaYmd, meaYmd2) => {
//   const {
//     DrainpipeMonitoringInfo: { row: drainpipeRow },
//   } = await getDrainpipe(limit, gubn, meaYmd, meaYmd2);
//   const nonNumberRegExp = /[^0-9]/g;

//   const combinedData = drainpipeRow.reduce(
//     (data, { IDN, MEA_YMD, MEA_WAL, SIG_STA }) => {
//       const time = MEA_YMD.replace(nonNumberRegExp, '').slice(0, 12);
//       const drainpipeIndex = Number(IDN.slice(3)) - 1;

//       if (!data.timeline.hasOwnProperty(time)) {
//         data.timeline[time] = {
//           MEA_WALs: [],
//           SIG_STAs: [],
//         };
//       }

//       data.timeline[time].MEA_WALs[drainpipeIndex] = MEA_WAL;
//       data.timeline[time].SIG_STAs[drainpipeIndex] = SIG_STA;

//       return data;
//     },
//     {
//       GUBN: gubn,
//       GUBN_NAM: drainpipeRow[0].GUBN_NAM,
//       timeline: {},
//     },
//   );

//   const {
//     ListRainfallService: { row: rainfallRow },
//   } = await getRainfall(limit, `${drainpipeData.GUBN_NAM}구`);

//   rainfallRow.forEach(({ RAINGAUGE_CODE, RAINGAUGE_NAME, GU_CODE, GU_NAME, RAINFALL10, RECEIVE_TIME }) => {
//     const time = RECEIVE_TIME.replace(nonNumberRegExp, '');
//   });
// };

// const getCombinedData = async () => {
//   const { data: { ListRainfallService} } = await getRainfall(1, 1000);
// };

module.exports = {
  // getCombinedData,
};
