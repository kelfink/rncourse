import React from 'react';
import DefaultInput from '../ui/DefaultInput/DefaultInput';

import { minLengthValidator } from '../../util/validation'

const placeInput = props => (
    <DefaultInput
        placeholder="Place Name"
        value={props.placeData.value}
        valid={props.placeData.valid}
        touched={props.placeData.valid}
        onChangeText={props.onChangeText}
    />
)
 
export default placeInput