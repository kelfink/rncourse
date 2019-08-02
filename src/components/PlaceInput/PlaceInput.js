import React from 'react';
import DefaultInput from '../ui/DefaultInput/DefaultInput';

placeInput = props => (
    <DefaultInput
        placeholder="Place Name"
        value={props.placeName}
        onChangeText={props.onChangeText}
    />

)
 
export default placeInput
 
/*


    
    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {
            return
        }
        this.props.onPlaceAdded(this.state.placeName)
    }
    
 const styles = StyleSheet.create({
    inputContainer: {
      // flex: 1,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    placeInput: {
      width: "70%"
    },
    placeButton: {
      width: "30%"
    }
  });
*/