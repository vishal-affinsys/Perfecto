// import React from 'react';
// import {View, FlatList, Text, StyleSheet, Button} from 'react-native';
// import {useState} from 'react';
// import {clearLogs, logs} from '../helpers/Quality';

// const LogScreen = () => {
//   const [log, setlog] = useState(logs);
//   return (
//     <View>
//       <FlatList
//         data={log}
//         keyExtractor={(item, index) => {
//           return index;
//         }}
//         ListFooterComponent={() => {
//           return (
//             <Button
//               onPress={async () => {
//                 setlog([]);
//                 clearLogs();
//               }}
//               title="CLEAR LOGS"
//               color="#841584"
//               accessibilityLabel="Learn more about this purple button"
//             />
//           );
//         }}
//         renderItem={({item, index}) => {
//           return (
//             <View style={style.box}>
//               <Text>{item.date.toString()}</Text>
//               <Text>{item.message.toString()}</Text>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };
// export default LogScreen;

// const style = StyleSheet.create({
//   box: {
//     marginVertical: 8,
//   },
// });
