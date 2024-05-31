import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { DatePickerInput } from 'react-native-paper-dates';
import { Button, TextInput } from 'react-native-paper';

import ContractsPositions from './contractsPositions';

export default function Contracts() {

    const [customers, setCustomers] = useState([]);
    const [contract_types, setTypes] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [contractDate, setContractDate] = useState(null);
    const [headerSaved, setHeaderSaved] = useState(false);
    // const [isOpen, setIsOpen] = useState

    const fetchCustomers = async () => {
        let response = await axios.get('https://gtr-express.onrender.com/customers');
        console.log(response.data);
        setCustomers(response.data);
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    useEffect(() => { //TEST
        console.log(customers);
    }, [customers])

    const fetchTypes = async () => {
        let response = await axios.get('https://gtr-express.onrender.com/contract_types');
        console.log(response.data);
        setTypes(response.data);
    }

    useEffect(() => {
        fetchTypes();
    }, [])



    return (
        <View>
            <Text style={styles.inputSectionTitle} >Aggiungi contratto</Text >
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 15 }}>
                        <Text style={styles.selectorLabel}>Cliente*:       </Text>
                        <SelectDropdown
                            data={customers}
                            // defaultValueByIndex={8} // use default value by index or default value
                            // defaultValue={'kiss'} // use default value by index or default value
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setSelectedCustomer(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpen) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>{selectedItem ? selectedItem.nome : 'Seleziona Cliente'}</Text>
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            ...styles.dropdownItemStyle,
                                            ...(isSelected && { backgroundColor: '#D2D9DF' }),
                                        }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
                                    </View>
                                );
                            }}
                            dropdownStyle={styles.dropdownMenuStyle}
                            search
                            searchInputStyle={styles.dropdownSearchInputStyle}
                            searchInputTxtColor={'#151E26'}
                            searchPlaceHolder={'Search here'}
                            searchPlaceHolderColor={'#72808D'}
                        />
                    </View>
                    <View styles={{ margin: 15, marginTop: 20 }}>
                        <DatePickerInput
                            locale="it"
                            label="Data contratto"
                            value={contractDate}
                            onChange={(d) => setContractDate(d)}
                            inputMode="start"
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.selectorLabel}>Tipologia*:   </Text>
                        <SelectDropdown
                            data={contract_types}
                            // defaultValueByIndex={8} // use default value by index or default value
                            // defaultValue={'kiss'} // use default value by index or default value
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setSelectedCustomer(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpen) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>{selectedItem ? selectedItem.contract_type : 'Seleziona Tipologia'}</Text>
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            ...styles.dropdownItemStyle,
                                            ...(isSelected && { backgroundColor: '#D2D9DF' }),
                                        }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item.contract_type}</Text>
                                    </View>
                                );
                            }}
                            dropdownStyle={styles.dropdownMenuStyle}
                            search
                            searchInputStyle={styles.dropdownSearchInputStyle}
                            searchInputTxtColor={'#151E26'}
                            searchPlaceHolder={'Search here'}
                            searchPlaceHolderColor={'#72808D'}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TextInput placeholder='Descrizione' style={{ marginRight: 20 }}></TextInput>
                        <TextInput placeholder='Note' mode='outlined'></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Button style={{ marginLeft: 280, marginRight: 15 }} mode='outlined'>Annulla</Button>
                        <Button mode='contained' onPress={() => setHeaderSaved(true)} disabled={headerSaved}>Salva</Button>
                    </View>
                </View>
                {headerSaved ? <ContractsPositions /> : <></>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputSectionTitle: {
        marginBottom: 10,
        fontFamily: 'Manrope',
        fontWeight: 'bolder',
        fontSize: 20,
        color: '#252B42'
    },
    inputSection: {
        marginTop: 30,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    selectorLabel: {
        fontFamily: 'Manrope',
        fontWeight: 'bold',
        color: '#252B42',
        margin: 15,
        marginRight: 10,
        fontSize: 18
    },
    dropdownButtonStyle: {
        width: 350,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
        textAlign: 'center',
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownSearchInputStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#B1BDC8',
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#B1BDC8',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
        textAlign: 'center',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },

})