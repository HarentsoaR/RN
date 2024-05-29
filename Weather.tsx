import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';

export default function Weather() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    // Example locations array
    const locations = ['Fianarantsoa, Madagascar', 'Antananarivo, Madagascar', 'Toamasina, Madagascar'];

    const handleSearchChange = (text) => {
        setSearchQuery(text);
        const filtered = locations.filter(location =>
            location.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredLocations(filtered);
    };

    const handleLocationClick = (loc) => {
        console.log('Selected location:', loc);
        // Handle location selection here
    };

    return (
        <View style={{ display: 'flex', flex: 1, position: 'relative', width: '100%', height: '100%' }}>
            <StatusBar />
            <Image style={styles.bg_img} blurRadius={10} source={require('./assets/images/jj.jpg')} />
            <SafeAreaView style={{ display: 'flex', flex: 1 }}>
                <View style={styles.search_section}>
                    <View style={styles.search_section1}>
                        <TextInput
                            value={searchQuery}
                            onChangeText={handleSearchChange}
                            placeholder='Search city'
                            placeholderTextColor={'lightgray'}
                            style={styles.search_input} />
                        <TouchableOpacity style={styles.search_btn} onPress={() => setShowSearch(true)}>
                            <MagnifyingGlassIcon size={25} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    {filteredLocations.length > 0 && showSearch? (
                        <View style={styles.search_view}>
                            {filteredLocations.map((loc, index) => (
                                <TouchableOpacity
                                    onPress={() => handleLocationClick(loc)}
                                    key={index}
                                    style={styles.search_list}>
                                    <MapPinIcon size={20} color={'gray'} />
                                    <Text style={styles.search_text}>{loc}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : null}
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
  bg_img: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  search_section: {
    height: '7%',
    position: 'relative',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    zIndex: 50
  },
  search_section1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 9999,
    backgroundColor: 'white'
  },
  search_input: {
    position: 'relative',
    marginRight: '50%',
    height: 50,
    fontSize: 16,
    lineHeight: 24,
  },
  search_btn: {
    backgroundColor: 'gray',
    borderRadius: 9999,
    padding: 12,
    margin: 4
  },
  search_view: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'gray',
    top: 64,
    borderRadius: 24
  },
  search_list: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    padding: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 2,
  },
  search_text: {
    color: 'black',
    fontSize: 12
  }
});