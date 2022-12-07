import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
	Button,
} from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Image } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../db/firebaseConfig";

const NuevoReto = () => {
  const tw = useTailwind();
  const navigation = useNavigation();

	//functionality for add an element to database
	const [id, setId] = useState('');
	const [activo, setActivo] = useState('');
	const [categoria, setCategoria] = useState('');
	const [completado, setCompletado] = useState('');
	const [detalle, setDetalle] = useState('');
	const [nombre, setNombre] = useState('');
	const [periodicidad, setPeriodicidad] = useState('');
	const [prioridad, setPrioridad] = useState('');
	const [tiempo, setTiempo] = useState('');

  function addGoal() {
		addDoc(collection(db, "retos"), {
			id: id,
			activo: activo,
			categoria: categoria,
			completado: completado,
			detalle: detalle,
			nombre: nombre,
			periodicidad: periodicidad,
			prioridad: prioridad,
			tiempo: tiempo,
		}).then(() => {
			console.log('goal submitted')
		}).catch((error) =>{
			console.log(error);
		});
	}

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={() => navigation.navigate("Evolucion")}
        >
          <AntDesign name="home" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
      ),
      title: "Agregar Reto",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#998830",
      },
      headerTitleStyle: {
        color: navigation.isFocused ? "#fff" : "gray",
        fontWeight: "bold",
      },
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/new-goal.jpg")}
        containerStyle={{ width: "100%", height: 220 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      {/*input, icon y button*/}
			<TextInput
        value={id} onChangeText={(id => {setId(id)})}
        placeholder="id"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={activo} onChangeText={(activo => {setActivo(activo)})}
        placeholder="activo"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={categoria} onChangeText={(categoria => {setCategoria(categoria)})}
        placeholder="categoria"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
       value={completado} onChangeText={(completado => {setCompletado(completado)})}
        placeholder="completado"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={detalle} onChangeText={(detalle => {setDetalle(detalle)})}
        placeholder="detalle"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
       value={nombre} onChangeText={(nombre => {setNombre(nombre)})}
        placeholder="nombre"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={periodicidad} onChangeText={(periodicidad => {setPeriodicidad(periodicidad)})}
        placeholder="periodicidad"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={prioridad} onChangeText={(prioridad => {setPrioridad(prioridad)})}
        placeholder="prioridad"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={tiempo} onChangeText={(tiempo => {setTiempo(tiempo)})}
        placeholder="tiempo"
        style={styles.inputBox}
      ></TextInput>

      <TouchableOpacity style={styles.buttonStyle}>
        <Button title="Crear reto" onPress={() => addGoal()} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#998830",
    height: "100%",
  },
  inputBox: {
    width: "50%",
    padding: 10,
    bordercolor: "gray",
    borderWidth: 2,
    borderRadius: 15,
  },

  buttonStyle: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    margin: 5,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});

export default NuevoReto;
