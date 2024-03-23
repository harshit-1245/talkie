import {create} from 'zustand';

// Define Zustand store
const useAreaStore = create((set) => ({
  isLoading: false,
  selectedArea: null,
  areas: [],
  modalVisible: false,
  animatedValue: new Animated.Value(0),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSelectedArea: (area) => set({ selectedArea: area }),
  setAreas: (newAreas) => set({ areas: newAreas }),
  setModalVisible: (visible) => set({ modalVisible: visible }),

}));

export default useAreaStore;
