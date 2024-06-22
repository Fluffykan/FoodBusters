import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import DropDownSelector from '@/components/DropdownSelector';
import axios from 'axios';
import LinkIconButtonWithOptionalText from '@/components/LinkIconButtonWithOptionalText';

export default function RandomRec() {

    useEffect(() => {
        axios.get("http://10.0.2.2:4200/getFoodTypes")
            .then(res => {
                updateApiData(res.data);
            })
            .catch(error => console.error(error));
    }, [])

    const [foodType, changeFoodType] = useState("Any");
    const [apiData, updateApiData] = useState([]);
    const [redirectTo, updateredirectTo] = useState("");
    const [hasResult, updateHasResult] = useState(true);
    const handleSearch = () => {
        console.log("searching for " + foodType);
        axios.post("http://10.0.2.2:4200/getStoresByFoodType", {type:foodType})
            .then(result => {
                const data = result.data;
                console.log(data);
                if (data.length == 0) {
                    updateHasResult(false);
                } else {
                    updateHasResult(true);
                    updateredirectTo(data[Math.floor(Math.random() * data.length)]["name"]);
                    console.log(redirectTo);
                }

            })
            .catch(error => console.error(error));
    }

    const handleImFeelingAdventureous = () => {
        changeFoodType("Any");
        handleSearch();
    }

    return (
        <View style={styles.container}>
            <Header header="Food of the Day!"/>
            <DropDownSelector items={apiData} selectedValueStore={foodType} title="Select Food Type" updatePress={(x:string) => changeFoodType(x)}/>
            <LinkIconButtonWithOptionalText iconName='search1' text='Search' fontSize={25} flexDir='row' fn={handleSearch} />
            <LinkIconButtonWithOptionalText iconName='smileo' text="I'm Feeling Adventerous" fontSize={25} flexDir='row' fn={() => handleImFeelingAdventureous()} />
            {hasResult && <Text>Your random recommendation is {redirectTo}!</Text>}
            {!hasResult && <Text>No such store</Text>}
            <Navbar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
})