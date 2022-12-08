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
import { GenerateUUID } from "react-native-uuid";
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
      addDoc(collection(db, "retos"), {
        id: uuid.v4(),
        activo: true,
        categoria: categoria,
        completado: 0,
        detalle: detalle,
        nombre: nombre,
        periodicidad: Number(periodicidad),
        prioridad: prioridad,
        tiempo: Number(tiempo),
      })
        .then(() => {
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
      
    <ScrollView style={styles.container}>
      
      <Text>Categoria</Text>
      <TextInput
        value={categoria}
        onChangeText={(categoria) => {
          setCategoria(categoria);
        }}
        placeholder="categoria"
        style={styles.inputBox}
      ></TextInput>

      {reqCategoriaErr && (
        <Text style={styles.errorText}>{messages.reqCategoria}</Text>
      )}

      <Text>Nombre</Text>
      <TextInput
        value={nombre}
        onChangeText={(nombre) => {
          setNombre(nombre);
        }}
        placeholder="nombre"
        patterns
        style={styles.inputBox}
      ></TextInput>

      {reqNombreErr && (
        <Text style={styles.errorText}>{messages.reqNombre}</Text>
      )}
<Text>Detalle</Text>
      <TextInput
        value={detalle}
        onChangeText={(detalle) => {
          setDetalle(detalle);
        }}
        placeholder="detalle"
        style={styles.inputBox}
      ></TextInput>

      {reqDetalleErr && (
        <Text style={styles.errorText}>{messages.reqDetalle}</Text>
      )}
      <Text>Periodicidad</Text>
      <TextInput
        value={periodicidad}
        keyboardType="numeric"
        onChangeText={(periodicidad) => {
          setPeriodicidad(periodicidad);
        }}
        placeholder="periodicidad"
        style={styles.inputBox}
      ></TextInput>

      {reqPeriodicidadErr && (
        <Text style={styles.errorText}>{messages.reqPeriodicidad}</Text>
      )}
      {intPeriodicidadErr && (
        <Text style={styles.errorText}>{messages.intPeriodicidad}</Text>
      )}
<Text>Prioridad</Text>
      <TextInput
        value={prioridad}
        onChangeText={(prioridad) => {
          setPrioridad(prioridad);
        }}
        placeholder="prioridad"
        style={styles.inputBox}
      ></TextInput>

      {reqPrioridadErr && (
        <Text style={styles.errorText}>{messages.reqPrioridad}</Text>
      )}
<Text>Tiempo</Text>
      <TextInput
        value={tiempo}
        keyboardType="numeric"
        onChangeText={(tiempo) => {
          setTiempo(tiempo);
        }}
        placeholder="tiempo"
        style={styles.inputBox}
      ></TextInput>

      {reqTiempoErr && (
        <Text style={styles.errorText}>{messages.reqTiempo}</Text>
      )}
      {intTiempoErr && (
        <Text style={styles.errorText}>{messages.intTiempo}</Text>
      )}

      <TouchableOpacity style={styles.buttonStyle}>
        <Button title="Crear reto" onPress={() => addGoal()} />
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
  inputBox: {
    width: "60%",
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
  errorText: {
    color: "#ff0000",
  },
});

export default NuevoReto;
