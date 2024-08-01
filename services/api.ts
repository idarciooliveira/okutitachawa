import { getDoc, doc, collection, getDocs, addDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";

type Path = 'gados' | 'users' 

export async function saveDoc<T>(path: Path, values: T, userId: string) {
     await addDoc(collection(database, path), {
        ...values,
        userId
      });
}

export async function  getDocById<T>(id: string, path: Path): Promise<T>{
    const result = await getDoc(doc(database, path, id));
    const data = { ...result.data(), id: result.id } as T;
    return data
}

export async function getDocuments<T>(path: Path): Promise<T[]> {
    const querySnapshot = await getDocs(collection(database, path));

    const data = querySnapshot.docs.map((cow) => {
      return {
        ...cow.data(),
        id: cow.id,
      };
    }) as T[];

    return data
}