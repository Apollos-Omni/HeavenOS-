import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid';

/**
 * Allows user to pick an image and uploads it to Firebase Storage.
 * @param folder Folder in Firebase Storage to upload the image to.
 * @returns The download URL of the uploaded image, or null if canceled or failed.
 */
export async function pickAndUploadImage(folder: string): Promise<string | null> {
  try {
    // Request media permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permission to access media library is required!');
      return null;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7, // Optional: Compress image for faster upload
      allowsEditing: true,
    });

    // If user cancels
    if (result.canceled || !result.assets || result.assets.length === 0) return null;

    const asset = result.assets[0];
    const response = await fetch(asset.uri);
    const blob = await response.blob();

    // Firebase storage reference
    const storage = getStorage();
    const id = uuid.v4();
    const storageRef = ref(storage, `${folder}/${id}`);

    // Upload and get URL
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Image pick/upload error:', error);
    return null;
  }
}
