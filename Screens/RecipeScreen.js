import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../Components/Header';
import {SearchBar, SpeedDial} from 'react-native-elements';
type SearchBarComponentProps = {};

const RecipeScreen: React.FunctionComponent<SearchBarComponentProps> = ({
  navigation,
}) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = React.useState(false);

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <>
      <Header name="Przepisy" />
      <View style={styles.background}>
        <View style={styles.view}>
          <SearchBar
            placeholder="Znajdź produkt..."
            onChangeText={updateSearch}
            value={search}
          />
        </View>
      </View>
      <SpeedDial
        isOpen={open}
        icon={{name: 'edit', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        color="#b70000"
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Dodaj"
          color="#b70000"
          onPress={() => navigation.navigate('AddMeal')}
        />
        <SpeedDial.Action
          icon={{name: 'delete', color: '#fff'}}
          title="Licz"
          color="#b70000"
          onPress={() => console.log('Delete Something')}
        />
      </SpeedDial>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '80%',
  },
  view: {
    margin: 10,
  },
});

export default RecipeScreen;
