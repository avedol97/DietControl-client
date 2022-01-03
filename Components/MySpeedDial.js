import React from 'react';
import {SpeedDial} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

const MySpeedDial = props => {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.background}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '10%',
    height: '10%',
  },
  view: {
    margin: 10,
  },
});

export default MySpeedDial;
