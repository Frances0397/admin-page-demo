import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, DataTable, FAB, TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Dialog } from '@rneui/base';
import { DatePickerInput } from 'react-native-paper-dates';
import { DialogButton } from '@rneui/base/dist/Dialog/Dialog.Button';

export default function ContractsPositions(header) {

    const [addVisible, setAddVisible] = useState(false);
    const [dummy, setDummy] = useState([{
        id: 1,
        oda: 20240001,
        date: '31/05/2024',
        descrizione: "dummy",
        totale: 100.00
    }]);

    useEffect(() => {
        console.log(dummy);
        console.log("header ------", header);
    }, [])

    const saveRow = () => {
        setDummy([...dummy, { id: 2, oda: 12341234, date: '02/06/2024', descrizione: 'add dummy', totale: 50.00 }]);
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
                {dummy.map((item, index) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.id}</DataTable.Cell>
                        <DataTable.Cell>{item.oda}</DataTable.Cell>
                        <DataTable.Cell>{item.date}</DataTable.Cell>
                        <DataTable.Cell>{item.descrizione}</DataTable.Cell>
                        <DataTable.Cell>{item.totale}</DataTable.Cell>
                        <DataTable.Cell><Button icon='delete-outline' /></DataTable.Cell>
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
                    <TextInput placeholder='Numero Ordine' style={{ marginRight: '20' }} />
                    <DatePickerInput locale='it' label='Data' />
                </View>
                <TextInput placeholder='Descrizione' mode='outlined' />
                <Text style={{ color: 'red' }}>Dialog body text. Add relevant information here.</Text>
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
    }
})