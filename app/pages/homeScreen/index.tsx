import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import Header from "@/components/Header";
import ShopCondensedInfo from "@/app/pages/stallscreen/components/shopCondensedInfo";
import PageBreakLine from "@/components/PageBreakLine";
import InputBoxWithOptionalTitle from "@/components/InputBoxWithTitle";
import Navbar from "@/components/Navbar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";

export default function HomeScreen() {

    const [keywords, updateKeywords] = useState('');

    const handleSearch = () => {
        console.log(`searching for ${keywords}`);
    }

    const handleFilter = () => {
        console.log('open filter dropdown');
    }


    return (

        <View style={styles.container}>
            <Header header='FoodBuster' />
            <PageBreakLine style="solid" />

            <View style={styles.searchBar}>
                <View style={{width: '80%'}}>
                <InputBoxWithOptionalTitle updaterFn={updateKeywords} placeholder='Search' />
                </View>
                <LinkIconButtonWithOptionalText iconName="search1" fn={handleSearch} />
                <LinkIconButtonWithOptionalText iconName="filter" fn={handleFilter} />
            </View>
            <ScrollView style={styles.scrollView}>                
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
                <ShopCondensedInfo />
            </ScrollView>
            <Navbar />
        </View>    

    )

}

const styles = StyleSheet.create({
    searchBar: {
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    container: {
        flex: 1,
        paddingHorizontal: 5,
    }, 
    scrollView: {
        paddingHorizontal: 10, 
        width: '100%',
        alignContent: 'center',
        borderWidth: 1,
    }
})