import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';


const DropdownComponent = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);

  //GET COUNTRY
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let countryArray = [];
        for (let i = 0; i < count; i++) {
          countryArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setCountryData(countryArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleState = useCallback(countryCode => {
    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {
        'X-CSCAPI-KEY': 'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let stateArray = [];
        for (let i = 0; i < count; i++) {
          stateArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setStateData(stateArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleCity = useCallback((countryCode, stateCode) => {
    console.log(countryCode,stateCode,'aaaaaaa')

    var config = {
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        'X-CSCAPI-KEY': 'NEVpNDRDN2h4aE15ckN0dXNlVHNPeGJVSXlEazRqMDVvWndiVUlDbg==',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let cityArray = [];
        for (let i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setCityData(cityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.dropDownView}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={countryData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Country' : '...'}
          searchPlaceholder="Search..."
          value={country}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            handleState(item.value);
            setCountry(item.value);
            setCountryName(item.label)
            setIsFocus(false);
          }}
        />

        <Dropdown
          style={[styles.dropdown, isFocus1 && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={stateData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus1 ? 'Select State' : '...'}
          searchPlaceholder="Search..."
          value={state}
          onFocus={() => setIsFocus1(true)}
          onBlur={() => setIsFocus1(false)}
          onChange={item => {
            console.log(country,'CountryAPi')
            handleCity(country,item.value);
            setState(item.value);
            setStateName(item.label)

            setIsFocus1(false);
          }}
        />

        <Dropdown
          style={[styles.dropdown, isFocus2 && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cityData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus2 ? 'Select City' : '...'}
          searchPlaceholder="Search..."
          value={city}
          onFocus={() => setIsFocus2(true)}
          onBlur={() => setIsFocus2(false)}
          onChange={item => {
            setCity(item.value);
            setCityName(item.label)

            setIsFocus2(false);
          }}
        />
      <TouchableOpacity onPress={()=>Alert.alert(`you have selected country ${countryName+' '+stateName+ " " +cityName}`)}>
        <Text>Submit</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#533483',
    padding: 16,
    justifyContent: 'center',
  },
  dropDownView: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
