import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    Modal,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Toast } from 'react-native-toast-notifications';



// Sample data structure
const initialData = [];

function Product() {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [data, setData] = useState(initialData);
    const [newItem, setNewItem] = useState({
        numProduct: '',
        design: '',
        prix: '',
        quantity: '',
    });
    const [selectedItem, setSelectedItem] = useState(null);



    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? 'dark' : 'blue', // Adjust this as per your Colors object
    };

    const addData = () => {
        // Check if any field is empty
        if (!newItem.numProduct || !newItem.design || !newItem.prix || !newItem.quantity) {
            Alert.alert(
                'Error',
                'All fields are required !',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed'),
                    },
                ],
                { cancelable: false }
            );
            return; // Exit the function if any field is empty
        }
        setData([...data, newItem]);
        setNewItem({
            numProduct: '',
            design: '',
            prix: '',
            quantity: '',
        });
        setModalVisible(false);
        // Show a success toast message
        Toast.show('Product added !');
    };


    const handleUpdate = (selectedItem) => {
        // Assuming numProduct is a unique identifier for each item
        const updatedData = data.map(item =>
            item.numProduct === selectedItem.numProduct ? { ...newItem } : item
        );
        setData(updatedData);
        setSelectedItem(null);
        setNewItem({
            numProduct: '',
            design: '',
            prix: '',
            quantity: '',
        });
        setEditModalVisible(false);
        Toast.show('Product updated !');
    };



    const handleDelete = () => {
        // Filter out the selected item from the data array
        const updatedData = data.filter(item => item.numProduct !== selectedItem.numProduct);
        setData(updatedData);
        setSelectedItem(null); // Clear the selected item
        setEditModalVisible(false); // Close the edit modal
        Toast.show('Product deleted !');
        setNewItem({
            numProduct: '',
            design: '',
            prix: '',
            quantity: '',
        });
    };

    const prices = data.map(item => item.prix);
    const maxPrice = Math.max(...prices, 0);
    const minPrice = Math.min(...prices);
    //console.log(minPrice)


    const totalMontant = data.reduce((total, product) => {
        return total + (product.prix * product.quantity);
    }, 0);


    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            {/* <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}> */}
                <View
                    style={{
                        backgroundColor: isDarkMode ? 'black' : 'white', // Adjust this as per your Colors object
                    }}>
                    <Button title="A D D" onPress={() => setModalVisible(true)} />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Add New Product</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={text => setNewItem({ ...newItem, numProduct: text })}
                                    value={newItem.numProduct}
                                    placeholder="Product Number"
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={text => setNewItem({ ...newItem, design: text })}
                                    value={newItem.design}
                                    placeholder="Design"
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={text => setNewItem({ ...newItem, prix: text })}
                                    value={newItem.prix}
                                    placeholder="Price"
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={text => setNewItem({ ...newItem, quantity: text })}
                                    value={newItem.quantity}
                                    placeholder="Quantity"
                                />
                                <View style={styles.buttonRowAdd}>
                                    <TouchableOpacity
                                        style={[styles.modalButtonAdd, { backgroundColor: 'grey' }]}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                        }}>
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.modalButtonAdd}
                                        onPress={addData}>
                                        <Text style={styles.textStyle}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                setSelectedItem(item);
                                setNewItem(item); // Update newItem with the selected item's data
                                setEditModalVisible(true); // Open the edit modal
                            }}>
                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemText}>Product Number: {item.numProduct}</Text>
                                    <Text style={styles.itemText}>Design: {item.design}</Text>
                                    <Text style={styles.itemText}>Price: {item.prix}</Text>
                                    <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                                    <Text style={styles.itemText}>Montant: {(item.quantity) * (item.prix)}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={editModalVisible}
                        onRequestClose={() => setEditModalVisible(false)}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Edit Product</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setEditModalVisible(false)}>
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>

                                {/* Inputs for editing */}
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={text => setNewItem({ ...newItem, numProduct: text })}
                                    value={newItem.numProduct}
                                    placeholder="Product Number"
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={text => setNewItem({ ...newItem, design: text })}
                                    value={newItem.design}
                                    placeholder="Design"
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={text => setNewItem({ ...newItem, prix: text })}
                                    value={newItem.prix}
                                    placeholder="Price"
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    onChangeText={text => setNewItem({ ...newItem, quantity: text })}
                                    value={newItem.quantity}
                                    placeholder="Quantity"
                                />

                                {/* Buttons for Cancel, Delete, and Update */}
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: 'gray' }]}
                                        onPress={() => setEditModalVisible(false)}>
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: 'red' }]}
                                        onPress={() => { handleDelete() }}>
                                        <Text style={styles.textStyle}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: 'blue' }]}
                                        onPress={() => { handleUpdate(selectedItem) }}>
                                        <Text style={styles.textStyle}>Update</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>
            {/* </ScrollView> */}
            <View style={{ padding: 10, backgroundColor: isDarkMode ? 'black' : 'white' }}>
                <Text>Most Expensive Product: {maxPrice}</Text>
                <Text>Cheapest Product: {minPrice === Infinity ? 0 : minPrice}</Text>
                <Text>Total Montant: ${totalMontant.toFixed(2)}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalInput: {
        height: 40,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5, // Added border radius for a more modern look
        backgroundColor: '#fff', // Light background
        color: '#333', // Darker text color
    },

    modalButton: {
        backgroundColor: 'blue',
        borderRadius: 20,
        padding: 12,
        elevation: 1,
    },

    modalButtonAdd: {
        backgroundColor: 'blue',
        borderRadius: 20,
        padding: 15,
        margin: 10,
        elevation: 1,
    },
    editButton: {
        borderRadius: 20,
        padding: 15,
        margin: 10,
        elevation: 2,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Optional: Adjusts spacing between buttons
        marginTop: 10, // Optional: Adds some space above the buttons
    },
    buttonRowAdd: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Optional: Adjusts spacing between buttons
        marginTop: 10, // Optional: Adds some space above the buttons
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        fontSize: 17,
    },
    itemContainer: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9c2ff', // Example background color
        borderRadius: 5,
        elevation: 2,
    },
    itemText: {
        fontSize: 17,
        color: '#333',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: '#f4511e',
        borderRadius: 5,
        padding: 5,
        elevation: 2,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },


});

export default Product;