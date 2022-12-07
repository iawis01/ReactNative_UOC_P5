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
import { addDoc, collection } from "firebase/firestore"; 
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

	const [reqErr, setReqErr] = useState(true);
   const [intErr, setIntErr] = useState(true);

	const nombreError = nombre ? '' : 'Nombre no puede estar vacio';

	const messages = {
		req: "Todos los campos son obligatorios",
		int: "Debes introducir un número"
	 };


	 const reqRegex = new RegExp(/^[^]+$/);
	 const intRegex = new RegExp(/^[0-9]+$/);

	 const validateReqCategoria = () => {
		if (reqRegex.test(categoria)) {
			 setReqErr(false);
		}
		//console.log(reqErr);
 };

 const validateIntTiempo = () => {
	if (intRegex.test(tiempo)) {
		 setIntErr(false);
		 
	}
};


  function addGoal() {
		setReqErr(true);
		setIntErr(true);
		validateReqCategoria();
		validateIntTiempo();
		if(reqErr){
			alert("El campo categoria no puede estar vacío");
		}else if(/*categoria === '' ||*/ detalle === '' || nombre === ''|| prioridad === '' || tiempo === ''|| periodicidad === ''){
			alert(messages.req);
		}else if(intErr){
			alert("El campo tiempo tiene que ser un número");
		}else{
			addDoc(collection(db, "retos"), {
				//TODO last id + 1
				id: 31,
				activo: true,
				categoria: categoria,
				completado: 0,
				detalle: detalle,
				nombre: nombre,
				periodicidad: periodicidad,
				prioridad: prioridad,
				tiempo: Number(tiempo),
			}).then(() => {
				console.log('goal submitted')
			}).catch((error) =>{
				console.log(error);
			});
			navigation.navigate('Evolucion');
			alert('Reto creado');
		}


		
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
        value={categoria} onChangeText={(categoria => {setCategoria(categoria)})}
        placeholder="categoria"
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
				patterns
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={periodicidad} keyboardType="numeric" onChangeText={(periodicidad => {setPeriodicidad(periodicidad)})}
        placeholder="periodicidad"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={prioridad} onChangeText={(prioridad => {setPrioridad(prioridad)})}
        placeholder="prioridad"
        style={styles.inputBox}
      ></TextInput>
      <TextInput
        value={tiempo}  keyboardType="numeric" onChangeText={(tiempo => {setTiempo(tiempo)})}
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
