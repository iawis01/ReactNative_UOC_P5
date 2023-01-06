import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
//import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Icon } from '@rneui/themed';
import { useTailwind } from "tailwind-rn/dist";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Image, Input } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../db/firebaseConfig";
import uuid from "react-native-uuid";
const NuevoReto = () => {
  const tw = useTailwind();
  const navigation = useNavigation();

  //functionality for add an element to database
  const [id, setId] = useState("");
  const [activo, setActivo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [completado, setCompletado] = useState("");
  const [nombre, setNombre] = useState("");
  const [detalle, setDetalle] = useState("");
  const [periodicidad, setPeriodicidad] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [tiempo, setTiempo] = useState("");

  const [reqCategoriaErr, setReqCategoriaErr] = useState(false);
  const [reqNombreErr, setReqNombreErr] = useState(false);
  const [reqDetalleErr, setReqDetalleErr] = useState(false);
  const [reqPeriodicidadErr, setReqPeriodicidadErr] = useState(false);
  const [reqPrioridadErr, setReqPrioridadErr] = useState(false);
  const [reqTiempoErr, setReqTiempoErr] = useState(false);

  const [intPeriodicidadErr, setIntPeriodicidadErr] = useState(false);
  const [intTiempoErr, setIntTiempoErr] = useState(false);

  const newDocRef = doc(collection(db, "retos"));

  const messages = {
    req: "Debe rellenar todos los campos",
    reqCategoria: "Debe rellenar el campo categoria",
    reqNombre: "Debe rellenar el campo nombre",
    reqDetalle: "Debe rellenar el campo detalle",
    reqPeriodicidad: "Debe rellenar el campo periodicidad",
    reqPrioridad: "Debe rellenar el campo prioridad",
    reqTiempo: "Debe rellenar el campo tiempo",
    intPeriodicidad: "El campo periodicidad solo puede ser rellenado con números",
    intTiempo: "El campo tiempo solo puede ser rellenado con números"
  };

  const reqRegex = new RegExp(/^[^]+$/);
  const intRegex = new RegExp(/^[0-9]+$/);

  const validateReqCategoria = () => {
    reqRegex.test(categoria) ? setReqCategoriaErr(false) : setReqCategoriaErr(true);
  };
  const validateReqNombre = () => {
    reqRegex.test(nombre) ? setReqNombreErr(false) : setReqNombreErr(true);
  };
  const validateReqDetalle = () => {
    reqRegex.test(detalle) ? setReqDetalleErr(false) : setReqDetalleErr(true);
  };
  const validateReqPeriodicidad = () => {
    reqRegex.test(periodicidad) ? setReqPeriodicidadErr(false) : setReqPeriodicidadErr(true);
  };
  const validateReqPrioridad = () => {
    reqRegex.test(prioridad) ? setReqPrioridadErr(false) : setReqPrioridadErr(true);
  };
  const validateReqTiempo = () => {
    reqRegex.test(tiempo) ? setReqTiempoErr(false) : setReqTiempoErr(true);
  };

  const validateIntPeriodicidad = () => {
    if (intRegex.test(periodicidad)) {
      setIntPeriodicidadErr(false);
    }else{
      setIntPeriodicidadErr(true);
    }
  };

  const validateIntTiempo = () => {
    if (intRegex.test(tiempo)) {
      setIntTiempoErr(false);
    }else{
      setIntTiempoErr(true);
    }
  };

  function addGoal() {

    validateReqCategoria();
    validateReqNombre();
    validateReqDetalle();
    validateReqPeriodicidad();
    validateReqPrioridad();
    validateReqTiempo();

    validateIntPeriodicidad();
    validateIntTiempo();

    /*if (reqCategoriaErr) {
      alert("El campo categoria no puede estar vacío");
    }else if (reqNombreErr) {
      alert("El campo nombre no puede estar vacío");
    } else if (intTiempoErr) {
      alert("El campo tiempo tiene que ser un número");
    }*/ if (isNaN(tiempo)){
      alert(messages.intTiempo);
    }else if (isNaN(periodicidad)){
      alert(messages.intPeriodicidad);
    } else if (
      categoria === '' ||
      detalle === "" ||
      nombre === "" ||
      prioridad === "" ||
      tiempo === "" ||
      periodicidad === ""
    ) {
      alert(messages.req);
    }else {
        setDoc(
       newDocRef, 
       {activo: true,
        categoria: categoria,
        completado: 0,
        detalle: detalle,
        nombre: nombre,
        periodicidad: Number(periodicidad),
        prioridad: prioridad,
        tiempo: Number(tiempo),
         id: newDocRef.id
       }).then(() => {
          console.log("goal submitted");
        })
        .catch((error) => {
          console.log(error);
        });
      navigation.navigate("Evolucion");
      alert("Reto creado");
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
    <View style={styles.bigContainer}>
      <Text
      style={styles.title}>Nuevo reto</Text>
    <ScrollView style={styles.container}>
      
    <Text style={styles.titleField}>Nombre <FontAwesomeIcon name="search"/></Text>

      <Input
        value={nombre}
        onChangeText={(nombre) => {
          setNombre(nombre);
        }}
        placeholder="Escribe el nombre del reto"
        placeholderTextColor="white" 
        errorMessage={reqNombreErr && messages.reqNombre}
        errorStyle={styles.errorText1}
        style={styles.inputBox}
      ></Input>

<Text style={styles.titleField}>Detalle</Text>
      <Input
        value={detalle}
        onChangeText={(detalle) => {
          setDetalle(detalle);
        }}
        errorMessage={reqDetalleErr && messages.reqDetalle}
        errorStyle={styles.errorText1}
        placeholder="Describe tu reto"
        placeholderTextColor="white" 
        style={styles.inputBox}
      ></Input>

      <Text style={styles.titleField}>Categoria</Text>
      <Input
        value={categoria}
        onChangeText={(categoria) => {
          setCategoria(categoria);
        }}
        errorMessage={reqCategoriaErr && messages.reqCategoria}
        errorStyle={styles.errorText1}
        placeholder="Escribe la categoria"
        placeholderTextColor="white" 
        style={styles.inputBox}
      ></Input>

<Text style={styles.titleField}>Tiempo </Text>

      <Input
        value={tiempo}
        keyboardType="numeric"
        onChangeText={(tiempo) => {
          setTiempo(tiempo);
        }}
        placeholder="Días de duración"
        placeholderTextColor="white" 
        errorMessage={reqTiempoErr && messages.reqTiempo}
        errorStyle={styles.errorText1}
        style={styles.inputBox}
      ></Input>
      {intTiempoErr && (
        <Text style={styles.errorText2}>{messages.intTiempo}</Text>
      )}
     
      <Text style={styles.titleField}>Periodicidad</Text>
      <Input
        value={periodicidad}
        keyboardType="numeric"
        onChangeText={(periodicidad) => {
          setPeriodicidad(periodicidad);
        }}
        placeholder="Escribe la periodicidad semanal"
        placeholderTextColor="white" 
        errorMessage={(reqPeriodicidadErr && messages.reqPeriodicidad)}
        errorStyle={styles.errorText1}
        style={styles.inputBox}
      ></Input>
      {intPeriodicidadErr && (
        <Text style={styles.errorText2}>{messages.intPeriodicidad}</Text>
      )}
<Text style={styles.titleField}>Prioridad</Text>

      <Input
        value={prioridad}
        onChangeText={(prioridad) => {
          setPrioridad(prioridad);
        }}
        placeholder="Alta, media o baja"
        placeholderTextColor="white" 
        style={styles.inputBox}
        errorMessage={reqPrioridadErr && messages.reqPrioridad}
        errorStyle={styles.errorText1}
      ></Input>


      <TouchableOpacity style={styles.buttonStyle}>
        <FontAwesomeIcon.Button name ="save"  onPress={() => addGoal()} >
        Crear reto
          </FontAwesomeIcon.Button>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "#998830",
    flex:1,
    
  },
  container: {
    backgroundColor: "#998830",
    height: "100%",
    flex: 1,
    
  },
  title:{
    fontSize: 36,
    color: "#437103",
    fontWeight: "bold",
    height: 50,
    marginLeft: 10,
  },
  titleField:{
    fontSize: 18,
    color: "#B3B1B1",
    marginLeft: 15,
    marginBottom: -10,
  },
  inputBox: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: 14,  
    padding: 10,
    color: "white"
  },


  buttonStyle: {
    color: "white",
    fontSize: 30,
    lineHeight: 70,
    margin: 15,
    marginHorizontal: 40,
    borderRadius: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
    

  },
  errorText1: {
    color: "#ff0000",
    fontSize: 13,
    paddingBottom: -5
  },
  errorText2: {
    color: "#ff0000",
    marginLeft: 15,
    fontSize: 13,
    paddingBottom: -5,
  },
});

export default NuevoReto;
