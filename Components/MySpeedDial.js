// import React from 'react';
// import {SpeedDial} from 'react-native-elements';
// import {StyleSheet, View} from 'react-native';
//
// const MySpeedDial = props => {
//   const [open, setOpen] = React.useState(false);
//
//   return (
//     <View style={styles.background}>
//       <SpeedDial
//         color="#b70000"
//         isOpen={open}
//         icon={{name: 'edit', color: '#fff'}}
//         openIcon={{name: 'close', color: '#fff'}}
//         onOpen={() => setOpen(!open)}
//         onClose={() => setOpen(!open)}>
//         <SpeedDial.Action
//           icon={{name: 'add', color: '#fff'}}
//           color="#b70000"
//           title="Dodajsddddddddddddddd"
//           onPress={() => {
//             props.navigation.navigate('AddMeal');
//             setOpen(!open);
//           }}
//         />
//       </SpeedDial>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   background: {
//     width: 50,
//     height: 50,
//   },
// });
//
// export default MySpeedDial;

import React from 'react';
import {SpeedDial} from 'react-native-elements';

const MySpeedDial = props => {
  const [open, setOpen] = React.useState(false);
  return (
    <SpeedDial
      color="#b70000"
      isOpen={open}
      icon={{name: 'edit', color: '#fff'}}
      openIcon={{name: 'close', color: '#fff'}}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}>
      <SpeedDial.Action
        icon={{name: 'add', color: '#fff'}}
        color="#b70000"
        title="Dodaj Produkt"
        onPress={() => {
          props.navigation.navigate('AddMeal');
          setOpen(!open);
        }}
      />
    </SpeedDial>
  );
};
export default MySpeedDial;
