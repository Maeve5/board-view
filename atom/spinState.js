import React from 'react';
import { atom } from 'recoil';

const spinState = atom({
	key: 'spinState',
	default: true,
})

export default spinState;