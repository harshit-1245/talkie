import {create} from 'zustand';

// Define Zustand store
const useChatStore = create((set) => ({
  message: '',
  showEmoji: false,
  selectedImage: '',
  chatMessage: {},
  recepientData:[],
  setRecepientData:(newRecepientData)=>set({recepientData:newRecepientData}),
  setMessage: (newMessage) => set({ message: newMessage }),
  setShowEmoji: (newShowEmoji) => set({ showEmoji: newShowEmoji }),
  setSelectedImage: (newSelectedImage) => set({ selectedImage: newSelectedImage }),
  setChatMessage: (newChatMessage) => set({ chatMessage: newChatMessage }),
}));

export default useChatStore;
