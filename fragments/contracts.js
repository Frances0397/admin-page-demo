import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { DatePickerInput } from 'react-native-paper-dates';
import { Button, Searchbar, TextInput } from 'react-native-paper';

import ContractsPositions from './contractsPositions';

export default function Contracts() {

    const [customers, setCustomers] = useState([]);
    const [contract_types, setTypes] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [contractDate, setContractDate] = useState(null);
    const [headerSaved, setHeaderSaved] = useState(false);
    // const [isOpen, setIsOpen] = useState 
    const [contractType, setContractType] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [contractHeader, setContractHeader] = useState({});
    const [headerDialogvisible, setHeaderDialogVisible] = useState(false);

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

    const fetchContracts = async () => {
        //TODO
    }

    useEffect(() => {
        fetchTypes();
    }, [])

    const saveContractHeader = () => {
        setHeaderSaved(true);
        let newContractHeader = {
            customer: selectedCustomer.nome,
            contract_date: contractDate,
            contract_type: contractType.contract_type,
            description: description,
            notes: notes
        }
        setContractHeader(newContractHeader);
        console.log("PROVA", newContractHeader);
        console.log(contractHeader);
    }

    //searchbar contratti
    const matchcodeContracts = () => {
        fetchContracts();
        setHeaderDialogVisible(true);
    }

    const searchContract = () => {
        //TODO
        setHeaderSaved(true);
    }

    const clearContract = () => {
        setHeaderSaved(false);
    }


    return (
        <View>
            <Text style={styles.inputSectionTitle} >Aggiungi/Modifica contratto</Text >
            <Searchbar placeholder="Numero contratto" style={{ marginVertical: 15, marginBottom: 25 }} traileringIcon='magnify'
                icon='folder-outline' onIconPress={matchcodeContracts} onTraileringIconPress={searchContract}
                editable={headerSaved}
            >
            </Searchbar>
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
                            disabled={headerSaved}
                        />
                    </View>
                    <View styles={{ margin: 15, marginTop: 20 }}>
                        <DatePickerInput
                            locale="it"
                            label="Data contratto"
                            value={contractDate}
                            onChange={(d) => setContractDate(d)}
                            inputMode="start"
                            disabled={headerSaved}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.selectorLabel}>Tipologia*:   </Text>
                        <SelectDropdown
                            disabled={headerSaved}
                            data={contract_types}
                            // defaultValueByIndex={8} // use default value by index or default value
                            // defaultValue={'kiss'} // use default value by index or default value
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setContractType(selectedItem);
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
                        <TextInput placeholder='Descrizione' style={{ marginRight: 20 }} onChangeText={(text) => setDescription(text)}
                            editable={!headerSaved}></TextInput>
                        <TextInput placeholder='Note' mode='outlined' onChangeText={(text) => { setNotes(text) }}
                            editable={!headerSaved}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Button style={{ marginLeft: 280, marginRight: 15 }} mode='outlined' onPress={clearContract}>Annulla</Button>
                        <Button mode='contained' onPress={saveContractHeader} disabled={headerSaved}>Salva</Button>
                    </View>
                </View>
                {headerSaved ? <ContractsPositions header={contractHeader} /> : <></>}
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