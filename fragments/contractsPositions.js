import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, DataTable, FAB, TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Dialog } from '@rneui/base';
import { DatePickerInput } from 'react-native-paper-dates';
import { DialogButton } from '@rneui/base/dist/Dialog/Dialog.Button';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';

export default function ContractsPositions(header) {

    const [addVisible, setAddVisible] = useState(false);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [posDate, setPosDate] = useState(null);
    const [posDescription, setPosDescription] = useState('');
    const [positions, setPositions] = useState([]);
    const [newPositions, setNewPositions] = useState([]);

    // const [dummy, setDummy] = useState();

    useEffect(() => {
        console.log("header ------", header);
        fetchOrders();
        fetchContracts();
        fetchPositions();
    }, [])

    const fetchOrders = async () => {
        let response = await axios.get('https://gtr-express.onrender.com/orders');
        console.log(response.data);
        setOrders(response.data);
    }

    const fetchContracts = async () => {
        //to be implemented
    }

    const fetchPositions = async () => {
        setPositions([{
            id: 1,
            oda: 20240001,
            date: '31/05/2024',
            descrizione: "dummy",
            totale: 100.00
        }]);
    }

    const saveRow = () => {
        //setDummy([...dummy, { id: 2, oda: 12341234, date: '02/06/2024', descrizione: 'add dummy', totale: 50.00 }]);
        const lastPos = positions[positions.length - 1];
        let newId = 0;
        if (lastPos) {
            newId = lastPos.id + 1
        }
        let newPos = {
            id: newId,
            oda: order.order_number,
            date: posDate.toLocaleDateString('it-IT'),
            descrizione: posDescription,
            totale: 6.66
        }
        console.log(newPos);
        const updatedPos = [...positions, newPos]
        const updatedNewPos = [...newPositions, newPos]
        setPositions(updatedPos);
        setNewPositions(updatedNewPos);

        setAddVisible(false);
    }

    const deleteItem = (item) => {
        const updatedPos = positions.filter(pos => pos.id !== item.id);
        const updatedNewPos = newPositions.filter(pos => pos.id !== item.id);
        setPositions(updatedPos);
        setNewPositions(updatedNewPos);
        console.log("after removal", updatedPos);
    }

    return (
        <View style={styles.positionsContainer}>
            <Text>TEST</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Pos.</DataTable.Title>
                    <DataTable.Title>N. Ordine</DataTable.Title>
                    <DataTable.Title>Data</DataTable.Title>
                    <DataTable.Title>Descrizione</DataTable.Title>
                    <DataTable.Title>Totale</DataTable.Title>
                    <DataTable.Title></DataTable.Title>
                </DataTable.Header>
                {positions.map((item, index) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.id}</DataTable.Cell>
                        <DataTable.Cell>{item.oda}</DataTable.Cell>
                        <DataTable.Cell>{item.date}</DataTable.Cell>
                        <DataTable.Cell>{item.descrizione}</DataTable.Cell>
                        <DataTable.Cell>{item.totale}</DataTable.Cell>
                        {newPositions.includes(item) ? <DataTable.Cell><Button icon='delete-outline' onPress={() => deleteItem(item)} /></DataTable.Cell>
                            : <DataTable.Cell></DataTable.Cell>}
                    </DataTable.Row>
                ))}
            </DataTable>
            <FAB icon="plus" variant="tertiary" onPress={() => setAddVisible(true)} style={styles.FAB}></FAB>
            <Dialog
                isVisible={addVisible}
                onBackdropPress={() => setAddVisible(false)}
                overlayStyle={{ backgroundColor: 'white', color: 'white', borderRadius: 15 }}
            >
                <Dialog.Title title="Aggiungi riga contratto" />
                <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                    <SelectDropdown
                        data={orders}
                        // defaultValueByIndex={8} // use default value by index or default value
                        // defaultValue={'kiss'} // use default value by index or default value
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setOrder(selectedItem);
                        }}
                        renderButton={(selectedItem, isOpen) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    <Text style={styles.dropdownButtonTxtStyle}>{selectedItem ? selectedItem.order_number : 'Numero Ordine'}</Text>
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
                                    <Text style={styles.dropdownItemTxtStyle}>{item.order_number} - {item.description}</Text>
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
                    <DatePickerInput locale='it' label='Data' value={posDate} onChange={(d) => setPosDate(d)} />
                </View>
                <TextInput placeholder='Descrizione' mode='outlined' onChangeText={(text) => setPosDescription(text)} value={posDescription} />
                <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: '80%' }}>
                    <Button mode='contained' style={{ marginRight: 10 }} onPress={saveRow}>Salva</Button>
                    <Button mode='contained-tonal'>Annulla</Button>
                </View>
            </Dialog>
        </View>
    )
}

const styles = StyleSheet.create({
    positionsContainer: {
        margin: 15,
        marginLeft: 35,
        flex: 1,
        width: 700
    },
    FAB: {
        width: 58,
        position: 'absolute',
        right: 26,
        bottom: 16
    },
    dropdownButtonStyle: {
        width: 350,
        height: 50,
        marginRight: 20,
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
        width: 350,
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownSearchInputStyle: {
        width: '100%',
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