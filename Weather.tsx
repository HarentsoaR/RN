import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, StatusBar, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { fetchLocations, fetchWeatherForecast } from './api/weather';
import { weatherImages } from './api/constant';
import { getData, storeData } from './utils/asyncStorage';


export default function Weather() {
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showSearch, toggleSearch] = useState(false);
  const [weather, setWeather] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true)


  const handleSearchChange = value => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then(data => {
        // console.log('got locations: ',data)
        setFilteredLocations(data)
      })
    }
    // // setSearchQuery(text);
    // const filtered = locations.filter(location =>
    //   location.toLowerCase().includes(value.toLowerCase())
    // );
    // setFilteredLocations(filtered);
  };

  const handleLocationClick = (loc) => {
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data => {
      console.log(data)
      setWeather(data);
      setLoading(false);
      toggleSearch(false);
      storeData('city', loc.name)
    })
  };

  const { current, location } = weather;

  useEffect(() => {
    const data = {"current": {"cloud": 0, "condition": {"code": 1000, "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png", "text": "Clear"}, "dewpoint_c": 10.1, "dewpoint_f": 50.2, "feelslike_c": 12, "feelslike_f": 53.6, "gust_kph": 10.6, "gust_mph": 6.6, "heatindex_c": 12.7, "heatindex_f": 54.9, "humidity": 95, "is_day": 0, "last_updated": "2024-06-03 04:00", "last_updated_epoch": 1717401600, "precip_in": 0, "precip_mm": 0, "pressure_in": 29.97, "pressure_mb": 1015, "temp_c": 12, "temp_f": 53.6, "uv": 1, "vis_km": 10, "vis_miles": 6, "wind_degree": 10, "wind_dir": "N", "wind_kph": 3.6, "wind_mph": 2.2, "windchill_c": 12.7, "windchill_f": 54.9}, "forecast": {"forecastday": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]]}, "location": {"country": "Canada", "lat": 45.42, "localtime": "2024-06-03 4:01", "localtime_epoch": 1717401674, "lon": -75.7, "name": "Ottawa", "region": "Ontario", "tz_id": "America/Toronto"}}
  setWeather(data)
  setLoading(false)
  }, []);

  const FetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Fianarantsoa';
    if (myCity) cityName = myCity;

    fetchWeatherForecast({
      cityName,
      days: '7'
    }).then(data => {
      setWeather(data);
      setLoading(false);
    })

  }


  return (
    <View style={{ display: 'flex', flex: 1, position: 'relative', width: '100%', height: '100%' }}>
      <StatusBar />
      <Image style={styles.bg_img} blurRadius={34} source={require('./assets/images/realBg.jpg')} />
      {
        loading ? (
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <Text>Loading</Text>
          </View>
        ) :
          (
            <SafeAreaView>
              {/* Search Section */}
              <View style={styles.search_section}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderRadius: 9999,
                  backgroundColor: showSearch ? 'white' : 'transparent',
                }}>
                  {
                    showSearch ? (
                      <TextInput
                        onChangeText={handleSearchChange}
                        placeholder='Search city'
                        placeholderTextColor={'lightgray'}
                        style={styles.search_input} />
                    ) : null
                  }
                  <TouchableOpacity style={styles.search_btn} onPress={() => toggleSearch(!showSearch)}>
                    <MagnifyingGlassIcon size={25} color={'black'} />
                  </TouchableOpacity>
                  {filteredLocations.length >= 0 && showSearch ? (
                    <View style={styles.search_view}>
                      {filteredLocations.map((loc, index) => (
                        <TouchableOpacity
                          onPress={() => handleLocationClick(loc)}
                          key={index}
                          style={{
                            ...styles.search_list,
                            // Remove borderBottomWidth for the last item
                            borderBottomWidth: index !== filteredLocations.length - 1 ? 1 : 0,
                          }}>
                          <MapPinIcon size={20} color={'black'} />
                          <Text style={styles.search_text}>{loc?.name}, {loc?.country}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : null}
                </View>
              </View>
              {/* Location */}
              <Text style={styles.forecast_location}>
                {location?.name}, <Text style={{
                  fontSize: 20, fontWeight: '600', color: '#dac0c0'
                }}>
                  {" " + location?.country}
                </Text>
              </Text>
              {/* Forecast Section */}
              <View style={styles.forecast_section}>
                {/* Weather Image */}
                <View style={styles.weather_image_section}>
                  <Image style={styles.party_cloud} source={weatherImages[current?.condition?.text] || weatherImages['others']} />
                  {/* <Image style={styles.party_cloud} source={{ uri: 'https:' + current?.condition?.icon }} /> */}
                </View>

                {/* Degree Celcius */}
                <View style={styles.degree_section}>
                  <Text style={styles.degree_text}>{current?.temp_c}&#176;</Text>
                  <Text style={styles.indique_text}>{current?.condition?.text}</Text>
                  {/* STATS */}
                  <View style={styles.middle_section}>
                    <Image style={styles.info_img} source={require('./assets/images/3741354_weather_wind_windy_icon.png')} />
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 15 }}>{current?.wind_kph}km</Text>
                    <Image style={styles.info_img} source={require('./assets/images/3741361_celcius_fahrenheit_thermometer_weather_icon.png')} />
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 15 }}>{current?.humidity}%</Text>
                    <Image style={styles.info_img} source={require('./assets/images/3741356_sun_sunny_weather_icon.png')} />
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 15 }}>{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
                    <Image style={styles.info_img} source={require('./assets/images/3741356_sun_sunny_weather_icon.png')} />
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 15 }}>{weather?.forecast?.forecastday[0]?.astro?.sunset}</Text>
                  </View>
                </View>
              </View>
              {/* Forecast for next days */}
              <View style={styles.bottom_section}>
                <View style={styles.bottom_item}>
                  <CalendarDaysIcon size={22} color={'white'} />
                  <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>
                    Daily forecast
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  contentContainerStyle={{ paddingHorizontal: 15 }}
                  showsHorizontalScrollIndicator
                >
                  {
                    weather?.forecast?.forecastday?.map((item, index) => {
                      let date = new Date(item.date);
                      let options = { weekday: 'long' };
                      let dayName = date.toLocaleDateString('en-US', options)
                      dayName = dayName.split(',')[0]
                      console.log(item?.day?.condition?.text)
                      return (
                        <View style={styles.forecast_content} key={index}>

                          <Image style={styles.forecast_img} source={weatherImages[item?.day?.condition?.text] || require('../AwesomeProject/assets/images/cloudy.png')} />
                          <Text style={{ color: 'white', fontSize: 12 }}>{dayName}</Text>
                          <Text style={{ color: 'white', fontSize: 20 }}>{item?.day?.avgtemp_c}&#176;</Text>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </View>
            </SafeAreaView>
          )
      }

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
    position: 'relative',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    elevation: 5,
  },
  search_input: {
    marginRight: '50%',
    height: 50,
    fontSize: 16,
  },
  search_btn: {
    backgroundColor: 'gray',
    borderRadius: 9999,
    padding: 12,
    margin: 4
  },
  search_view: {
    marginTop: 35,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#6d93a6',
    top: 30,
    borderRadius: 30,
  },
  search_list: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  search_text: {
    padding: 8,
    color: 'black',
    fontSize: 15,
    letterSpacing: 2
  },
  forecast_section: {
    position: 'relative',
    paddingTop: '15%'
  },
  forecast_location: {
    position: 'relative',
    paddingTop: '10%',
    color: '#f3dede',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
  },
  weather_image_section: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  party_cloud: {
    width: 208,
    height: 208,
  },
  degree_section: {
    marginTop: 8,
    marginBottom: 8,
  },
  degree_text: {
    color: '#767086',
    padding: 10,
    fontSize: 55,
    fontWeight: '700',
    textAlign: 'center'
  },
  indique_text: {
    color: '#ebf8ff',
    padding: 10,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center'
  },
  middle_section: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  info_img: {
    height: 30,
    width: 30
  },
  bottom_section: {
    marginTop: 20,
  },
  bottom_item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  forecast_content: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 15,
    width: 90,
    height: 110,
    borderRadius: 24,
    backgroundColor: '#6d93a6',
    alignItems: 'center',
  },
  forecast_img: {
    width: 43,
    height: 43
  }
});