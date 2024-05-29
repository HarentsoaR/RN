// import React, { useState } from 'react';
// import {
//     Alert,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     useColorScheme,
//     View,
//     Button,
//     Modal,
//     FlatList,
//     TextInput,
//     TouchableOpacity,
// } from 'react-native';
// import { Toast } from 'react-native-toast-notifications';



// // Sample data structure
// const initialData = [];

// function Product() {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [editModalVisible, setEditModalVisible] = useState(false);
//     const [data, setData] = useState(initialData);
//     const [newItem, setNewItem] = useState({
//         number: '',
//         design: '',
//         price: '',
//         quantity: '',
//     });
//     const [selectedItem, setSelectedItem] = useState(null);



//     const isDarkMode = useColorScheme() === 'dark';

//     const backgroundStyle = {
//         backgroundColor: isDarkMode ? 'dark' : 'blue', // Adjust this as per your Colors object
//     };

//     const addData = () => {
//         // Check if any field is empty
//         if (!newItem.number || !newItem.design || !newItem.price || !newItem.quantity) {
//             Alert.alert(
//                 'Error',
//                 'All fields are required !',
//                 [
//                     {
//                         text: 'OK',
//                         onPress: () => console.log('OK Pressed'),
//                     },
//                 ],
//                 { cancelable: false }
//             );
//             return; // Exit the function if any field is empty
//         }
//         setData([...data, newItem]);
//         setNewItem({
//             number: '',
//             design: '',
//             price: '',
//             quantity: '',
//         });
//         setModalVisible(false);
//         // Show a success toast message
//         Toast.show('Product added !');
//     };


//     const handleUpdate = (selectedItem) => {
//         // Assuming number is a unique identifier for each item
//         const updatedData = data.map(item =>
//             item.number === selectedItem.number ? { ...newItem } : item
//         );
//         setData(updatedData);
//         setSelectedItem(null);
//         setNewItem({
//             number: '',
//             design: '',
//             price: '',
//             quantity: '',
//         });
//         setEditModalVisible(false);
//         Toast.show('Product updated !');
//     };



//     const handleDelete = () => {
//         // Filter out the selected item from the data array
//         const updatedData = data.filter(item => item.number !== selectedItem.number);
//         setData(updatedData);
//         setSelectedItem(null); // Clear the selected item
//         setEditModalVisible(false); // Close the edit modal
//         Toast.show('Product deleted !');
//         setNewItem({
//             number: '',
//             design: '',
//             price: '',
//             quantity: '',
//         });
//     };

//     const prices = data.map(item => item.price);
//     const maxPrice = Math.max(...prices, 0);
//     const minPrice = Math.min(...prices);
//     //console.log(minPrice)


//     const totalMontant = data.reduce((total, product) => {
//         return total + (product.price * product.quantity);
//     }, 0);


//     return (
//         <SafeAreaView style={backgroundStyle}>
//             <StatusBar
//                 barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//                 backgroundColor={backgroundStyle.backgroundColor}
//             />
//             {/* <ScrollView
//                 contentInsetAdjustmentBehavior="automatic"
//                 style={backgroundStyle}> */}
//                 <View
//                     style={{
//                         backgroundColor: isDarkMode ? 'black' : 'white', // Adjust this as per your Colors object
//                     }}>
//                     <Button title="A D D" onPress={() => setModalVisible(true)} />
//                     <Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={modalVisible}
//                         onRequestClose={() => {
//                             setModalVisible(!modalVisible);
//                         }}>
//                         <View style={styles.centeredView}>
//                             <View style={styles.modalView}>
//                                 <Text style={styles.modalText}>Add New Product</Text>
//                                 <TouchableOpacity
//                                     style={styles.closeButton}
//                                     onPress={() => setModalVisible(false)}>
//                                     <Text style={styles.closeButtonText}>Close</Text>
//                                 </TouchableOpacity>

//                                 <TextInput
//                                     style={styles.modalInput}
//                                     onChangeText={text => setNewItem({ ...newItem, number: text })}
//                                     value={newItem.number}
//                                     placeholder="Product Number"
//                                 />
//                                 <TextInput
//                                     style={styles.modalInput}
//                                     onChangeText={text => setNewItem({ ...newItem, design: text })}
//                                     value={newItem.design}
//                                     placeholder="Design"
//                                 />
//                                 <TextInput
//                                     style={styles.modalInput}
//                                     onChangeText={text => setNewItem({ ...newItem, price: text })}
//                                     value={newItem.price}
//                                     placeholder="Price"
//                                 />
//                                 <TextInput
//                                     style={styles.modalInput}
//                                     onChangeText={text => setNewItem({ ...newItem, quantity: text })}
//                                     value={newItem.quantity}
//                                     placeholder="Quantity"
//                                 />
//                                 <View style={styles.buttonRowAdd}>
//                                     <TouchableOpacity
//                                         style={[styles.modalButtonAdd, { backgroundColor: 'grey' }]}
//                                         onPress={() => {
//                                             setModalVisible(!modalVisible);
//                                         }}>
//                                         <Text style={styles.textStyle}>Cancel</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         style={styles.modalButtonAdd}
//                                         onPress={addData}>
//                                         <Text style={styles.textStyle}>Submit</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </Modal>
//                     <FlatList
//                         data={data}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity onPress={() => {
//                                 setSelectedItem(item);
//                                 setNewItem(item); // Update newItem with the selected item's data
//                                 setEditModalVisible(true); // Open the edit modal
//                             }}>
//                                 <View style={styles.itemContainer}>
//                                     <Text style={styles.itemText}>Product Number: {item.number}</Text>
//                                     <Text style={styles.itemText}>Design: {item.design}</Text>
//                                     <Text style={styles.itemText}>Price: {item.price}</Text>
//                                     <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
//                                     <Text style={styles.itemText}>Montant: {(item.quantity) * (item.price)}</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         )}
//                     />
//                     <Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={editModalVisible}
//                         onRequestClose={() => setEditModalVisible(false)}>
//                         <View style={styles.centeredView}>
//                             <View style={styles.modalView}>
//                                 <Text style={styles.modalText}>Edit Product</Text>
//                                 <TouchableOpacity
//                                     style={styles.closeButton}
//                                     onPress={() => setEditModalVisible(false)}>
//                                     <Text style={styles.closeButtonText}>Close</Text>
//                                 </TouchableOpacity>

//                                 {/* Inputs for editing */}
//                                 <TextInput
//                                     style={styles.modalInput}
//                                     onChangeText={text => setNewItem({ ...newItem, number: text })}
//                                     value={newItem.number}
//                                     placeholder="Product Number"
//                                 />
//                                 <TextInput
//                                     style={styles.modalInput}
//                                     onChangeText={text => setNewItem({ ...newItem, design: text })}
//                                     value={newItem.design}
//                                     placeholder="Design"
//                                 />
//                                 <TextInput
//                                     style={styles.modalInput}
//                                     onChangeText={text => setNewItem({ ...newItem, price: text })}
//                                     value={newItem.price}
//                                     placeholder="Price"
//                                 />
//                                 <TextInput
//                                     style={styles.modalInput}
//                                     onChangeText={text => setNewItem({ ...newItem, quantity: text })}
//                                     value={newItem.quantity}
//                                     placeholder="Quantity"
//                                 />

//                                 {/* Buttons for Cancel, Delete, and Update */}
//                                 <View style={styles.buttonRow}>
//                                     <TouchableOpacity
//                                         style={[styles.editButton, { backgroundColor: 'gray' }]}
//                                         onPress={() => setEditModalVisible(false)}>
//                                         <Text style={styles.textStyle}>Cancel</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         style={[styles.editButton, { backgroundColor: 'red' }]}
//                                         onPress={() => { handleDelete() }}>
//                                         <Text style={styles.textStyle}>Delete</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         style={[styles.editButton, { backgroundColor: 'blue' }]}
//                                         onPress={() => { handleUpdate(selectedItem) }}>
//                                         <Text style={styles.textStyle}>Update</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                             </View>
//                         </View>
//                     </Modal>
//                 </View>
//             {/* </ScrollView> */}
//             <View style={{ padding: 10, backgroundColor: isDarkMode ? 'black' : 'white' }}>
//                 <Text>Most Expensive Product: {maxPrice}</Text>
//                 <Text>Cheapest Product: {minPrice === Infinity ? 0 : minPrice}</Text>
//                 <Text>Total Montant: ${totalMontant.toFixed(2)}</Text>
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
//     modalInput: {
//         height: 40,
//         width: 250,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingLeft: 10,
//         borderRadius: 5, // Added border radius for a more modern look
//         backgroundColor: '#fff', // Light background
//         color: '#333', // Darker text color
//     },

//     modalButton: {
//         backgroundColor: 'blue',
//         borderRadius: 20,
//         padding: 12,
//         elevation: 1,
//     },

//     modalButtonAdd: {
//         backgroundColor: 'blue',
//         borderRadius: 20,
//         padding: 15,
//         margin: 10,
//         elevation: 1,
//     },
//     editButton: {
//         borderRadius: 20,
//         padding: 15,
//         margin: 10,
//         elevation: 2,
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between', // Optional: Adjusts spacing between buttons
//         marginTop: 10, // Optional: Adds some space above the buttons
//     },
//     buttonRowAdd: {
//         flexDirection: 'row',
//         justifyContent: 'space-between', // Optional: Adjusts spacing between buttons
//         marginTop: 10, // Optional: Adds some space above the buttons
//     },

//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     item: {
//         padding: 10,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         fontSize: 17,
//     },
//     itemContainer: {
//         padding: 10,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         backgroundColor: '#f9c2ff', // Example background color
//         borderRadius: 5,
//         elevation: 2,
//     },
//     itemText: {
//         fontSize: 17,
//         color: '#333',
//     },
//     closeButton: {
//         position: 'absolute',
//         right: 10,
//         top: 10,
//         backgroundColor: '#f4511e',
//         borderRadius: 5,
//         padding: 5,
//         elevation: 2,
//     },
//     closeButtonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },


// });

// export default Product;

import React, { useState, useEffect } from 'react';
import {
    Alert,  
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Button,
    Modal,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Toast } from 'react-native-toast-notifications';
import axios from 'axios';
import { useColorScheme } from 'react-native';

// Sample data structure
const initialData = [];

async function fetchProducts() {
    try {
        const response = await axios.get('http://192.168.135.65:8080/api/product/listProduct');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function createProduct(product) {
    try {
        const response = await axios.post('http://192.168.135.65:8080/api/product/addProduct', product);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function updateProduct(product) {
    try {
        const response = await axios.put(`http://192.168.135.65:8080/api/product/editProduct/${product.number}`, product);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function deleteProduct(number) {
    try {
        const response = await axios.delete(`http://192.168.135.65:8080/api/product/deleteProduct/${number}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

function Product() {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [newItem, setNewItem] = useState({
        number: '',
        design: '',
        price: '',
        quantity: '',
    });

    // Function to handle opening the edit modal
    const handlePress = (item) => {
        setSelectedItem(item);
        setNewItem(item);
        setEditModalVisible(true);
    };

    const [selectedItem, setSelectedItem] = useState(null);

    const isDarkMode = useColorScheme();

    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle opening the edit modal
    const handleEdit = async (itemId) => {
        try {
            const response = await axios.get(`http://192.168.135.65:8080/api/product/listProduct/${itemId}`);
            setSelectedItem(response.data); // Assuming the response contains the product data
            setNewItem({
                number: response.data.number,
                design: response.data.design,
                price: response.data.price,
                quantity: response.data.quantity,
            });
            setEditModalVisible(true);
        } catch (error) {
            console.error("Failed to load product:", error);
            // Optionally, handle the error, e.g., show an error message
        }
    };
    // Function to handle closing the edit modal
    const handleClose = () => {
        // Reset the newItem state to its initial values
        setNewItem({
            number: '',
            design: '',
            price: '',
            quantity: '',
        });
    
        // Clear any other state related to the modal's content or selection
        setSelectedItem(null); // Assuming this is used to hold the currently edited item
    
        // Set the modal visibility to false
        setEditModalVisible(false);
    };
    

    async function fetchData() {
        const fetchedData = await fetchProducts();
        setData(fetchedData);
        console.log('KEz')
        console.log(fetchedData)
    }

    const addData = async () => {
        if (!newItem.number || !newItem.design || !newItem.price || !newItem.quantity) {
            Alert.alert(
                'Error',
                'All fields are required!',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
            );
            return;
        }

        try {
            const newProduct = await createProduct(newItem);
            setData([...data, newProduct]);
            setNewItem({
                number: '',
                design: '',
                price: '',
                quantity: '',
            });
            setModalVisible(false);
            Toast.show('Product added!');
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show an error message to the user
        }
    };


    const handleUpdate = async () => {
        try {
            // Assuming updateProduct is a function that makes the API call
            const response = await axios.put(`http://192.168.135.65:8080/api/product/editProduct/${selectedItem.id}`, newItem);

            // Assuming the response contains the updated product
            const updatedProduct = response.data;

            // Update the local data array with the updated product
            const updatedData = data.map(item => item.number === updatedProduct.number ? updatedProduct : item);
            setData(updatedData);

            // Reset the selected item and new item states
            setSelectedItem(null);
            setNewItem({
                number: '',
                design: '',
                price: '',
                quantity: '',
            });

            // Close the edit modal
            setEditModalVisible(false);
            fetchData();
            // Show a success message
            Toast.show('Product updated!');
        } catch (error) {
            console.error('Error updating product:', error);
            // Optionally, show an error message to the user
            Toast.show('Failed to update product');
        }
    };


    // Function to handle deletion of a selected product
    const handleDelete = async () => {
        if (!selectedItem || !selectedItem.number) {
            Toast.show('Please select a product to delete');
            return;
        }

        try {
            await axios.delete(`http://192.168.135.65:8080/api/product/deleteProduct/${selectedItem.id}`);
            // Assuming you have a state or method to refresh the product list
            // refreshProductsList();
            Toast.show('Product deleted successfully');
            setNewItem({
                number: '',
                design: '',
                price: '',
                quantity: '',
            });
            handleClose(); // Close the modal after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
            Toast.show('Failed to delete product');
        }
    };

    const prices = data.map(item => item.price);
    const maxPrice = Math.max(...prices, 0);
    const minPrice = Math.min(...prices);
    const totalMontant = data.reduce((total, product) => total + (product.price * product.quantity), 0);

    return (
        <SafeAreaView>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <View style={{ backgroundColor: isDarkMode ? 'black' : 'white' }}>
                <Button title="ADD" onPress={() => setModalVisible(true)} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Add New Product</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>

                            <TextInput
                                style={styles.modalInput}
                                onChangeText={text => setNewItem({ ...newItem, number: text })}
                                value={newItem.number}
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
                                onChangeText={text => setNewItem({ ...newItem, price: text })}
                                value={newItem.price}
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
                                    }}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButtonAdd}
                                    onPress={addData}
                                >
                                    <Text style={styles.textStyle}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ backgroundColor: 'white', padding: 10 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePress(item)}>
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemText}>Product Number: {item.number}</Text>
                                <Text style={styles.itemText}>Design: {item.design}</Text>
                                <Text style={styles.itemText}>Price: {item.price}</Text>
                                <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                                <Text style={styles.itemText}>Montant: {(item.quantity) * (item.price)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={handleClose}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Edit Product</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleClose}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>

                            {/* Inputs for editing */}
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={text => setNewItem({ ...newItem, number: text })}
                                value={newItem.number}
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
                                onChangeText={text => setNewItem({ ...newItem, price: text })}
                                value={String(newItem.price)} // Convert number to string
                                placeholder="Price"
                            />
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={text => setNewItem({ ...newItem, quantity: text })}
                                value={String(newItem.quantity)} // Convert number to string
                                placeholder="Quantity"
                            />

                            {/* Buttons for Cancel, Delete, and Update */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.editButton, { backgroundColor: 'gray' }]}
                                    onPress={handleClose}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.editButton, { backgroundColor: 'red' }]}
                                    onPress={handleDelete}
                                >
                                    <Text style={styles.textStyle}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.editButton, { backgroundColor: 'blue' }]}
                                    onPress={handleUpdate}
                                >
                                    <Text style={styles.textStyle}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={{ padding: 20, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Most Expensive Product: {maxPrice}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cheapest Product: {minPrice === Infinity ? 0 : minPrice}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Montant: ${totalMontant.toFixed(2)}</Text>
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
