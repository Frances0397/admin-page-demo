import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { DataTable, FAB } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Dialog } from '@rneui/base';

export default function ContractsPositions() {

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
    }, [])

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
                </DataTable.Header>
                {dummy.map((item, index) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.id}</DataTable.Cell>
                        <DataTable.Cell>{item.oda}</DataTable.Cell>
                        <DataTable.Cell>{item.date}</DataTable.Cell>
                        <DataTable.Cell>{item.descrizione}</DataTable.Cell>
                        <DataTable.Cell>{item.totale}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
            <FAB icon="plus" variant="tertiary" onPress={() => setAddVisible(true)} style={styles.FAB}></FAB>
            <Dialog
                isVisible={addVisible}
                onBackdropPress={() => setAddVisible(false)}
            >
                <Dialog.Title title="Dialog Title" />
                <Text style={{ color: 'red' }}>Dialog body text. Add relevant information here.</Text>
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