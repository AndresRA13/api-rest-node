// Configuración e inicialización de Firebase para la aplicación

// Importamos las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Configuración de la aplicación web de Firebase
// Estos valores se obtienen de las variables de entorno para mayor seguridad
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Inicializamos la aplicación de Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Inicializamos y obtenemos la instancia de Firestore
const db = getFirestore(app);

// Exportamos la instancia de la base de datos para usarla en otros archivos
export { db };