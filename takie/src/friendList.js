import { create } from "zustand";

const useFriendListStore = create((set) => ({
  friendList: [],
  setFriendList: (newFriendList) => set({ friendList: newFriendList })
}));

export default useFriendListStore;
