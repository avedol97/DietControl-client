import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';

type SearchBarComponentProps = {};

const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> =
  props => {
    const [search, setSearch] = useState('');

    const updateSearch = search => {
      setSearch(search);
    };

    return (
      <View style={styles.view}>
        <SearchBar
          placeholder={props.placeholder}
          onChangeText={updateSearch}
          value={search}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

export default SwitchComponent;
