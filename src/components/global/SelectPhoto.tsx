import * as ImagePicker from 'expo-image-picker';
import React, { forwardRef, useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { PostAPI } from '../../lib/axios';

interface PhotoPickProps {
  onImagemChange: (imageData: { key: string; location: string }) => void;
}

export const PhotoPick = forwardRef<ActionSheetRef, PhotoPickProps>((props, ref) => {
  const { onImagemChange } = props;
  const [loading, setLoading] = useState(false);
  const handleImageUpload = async (uri: string) => {
    setLoading(true);
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData: any = new FormData();
    formData.append('file', {
      uri: uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const serverSend = await PostAPI('/upload?folder=budget', formData);
      if (serverSend.status === 200) {
        setLoading(false);
        return {
          key: serverSend.body.image.key,
          location: serverSend.body.image.location,
        };
      } else {
        setLoading(false);
        Alert.alert('Erro ao fazer upload', 'Não foi possível fazer o upload da imagem');
        return null;
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer o upload');
      setLoading(false);
      return null;
    }
  };

  const pickImage = async (source: 'camera' | 'gallery') => {
    let result;
    if (source === 'camera') {
      //   await ImagePicker.getCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
    }

    if (!result.canceled && result.assets) {
      const imageData = await handleImageUpload(result.assets[0].uri);
      if (imageData) {
        onImagemChange(imageData);
      }
    }
  };

  return (
    <ActionSheet
      ref={ref}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 3,
      }}
      indicatorStyle={{
        width: 100,
      }}
      gestureEnabled={true}
    >
      {loading ? (
        <View className="w-full h-56 items-center justify-center">
          <ActivityIndicator size="large" color="#FFE533" />
        </View>
      ) : (
        <View className="w-full h-56 flex-row items-center justify-around">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => pickImage('camera')}
          >
            <Image className="w-28 h-28" source={require('../../../assets/camera.png')} />
            <Text className="text-center">Usar a Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => pickImage('gallery')}
          >
            <Image className="w-28 h-28" source={require('../../../assets/gallery.png')} />
            <Text>Usar a Galeria</Text>
          </TouchableOpacity>
        </View>
      )}
    </ActionSheet>
  );
});

export default PhotoPick;
