import { getDoc, doc, collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { database } from "./firebaseConfig";

type Path = 'animals' | 'users' | 'events' | 'ciclos'

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

export async function getDocuments<T>(path: Path,userId: string, type: string): Promise<T[]> {
  const q = query(
    collection(database, path),
    where("userId", "==", userId),
    where("tipo","==", type)
  );
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((data) => {
      return {
        ...data.data(),
        id: data.id,
      };
    }) as T[];

    return data
}

export async function getDocumentsById<T>(path: string, field: string, id: string): Promise<T[]> {
  const q = query(collection(database, path),where(field, "==", id));
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((data) => {
    return {
      ...data.data(),
      id: data.id,
    };
  }) as T[];
  
  return data
}