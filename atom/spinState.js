import { atom } from 'recoil';

const spinState = atom({
	key: 'spinState',
	default: false,
})

export default spinState;