// hooks/movie/useImageSelection.ts
import { useState } from 'react';

export function useImageSelection() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return {
        selectedImage,
        selectImage: setSelectedImage,
        clearSelection: () => setSelectedImage(null)
    };
}