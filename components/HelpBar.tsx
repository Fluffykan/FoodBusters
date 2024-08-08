import { Text, View, Modal, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from './Button';
import LinkIconButtonWithOptionalText from './LinkIconButtonWithOptionalText';

type HelpBarProps = {
    visibility: boolean;
    changeVisibility: (b:boolean) => void;
    page: 'profile' | 'home' | 'fotd' | 'wallet';
}

export default function HelpBar({visibility, changeVisibility, page}:HelpBarProps) {
    switch (page) {
        case 'profile':
            return (
                <>
                <Modal
                animationType="slide"
                transparent={true}
                visible={visibility}>
                    <View style={styles.popupContainer}>
                        <View style={styles.popup}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.header1}>Help </Text>
                                <Icon name='questioncircleo' size={30} color='white' />
                            </View>
                            <Text/>
                            <ScrollView>
                                <Text style={styles.header2}>How to Reset Password / Change Food Preference?</Text>
                                <Text style={styles.header3}>Click on Edit Profile</Text>
                                <Text/>
                                <Text style={styles.header2}>Where do I find my favorited Restaurants?</Text>
                                <Text style={styles.header3}>Click on the heart icon to view your favorited restaurants</Text>
                                <Text/>
                                <Text style={styles.header2}>Where do I find images I have submitted for reviews?</Text>
                                <Text style={styles.header3}>Click on the image icon to view your favorited restaurants</Text>
                            </ScrollView>
                            <Text/>
                            <Button fn={() => changeVisibility(!visibility)} text='Close' />
                        </View>
    
                    </View>
                </Modal>
                <LinkIconButtonWithOptionalText text='Help' iconColor='red' floating={true} fn={() => changeVisibility(!visibility)} iconName='questioncircleo' iconSize={50} />
                </>
            )
        case 'fotd':
            return (
                <>
                <Modal
                animationType="slide"
                transparent={true}
                visible={visibility}>
                    <View style={styles.popupContainer}>
                        <View style={styles.popup}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.header1}>Help </Text>
                                <Icon name='questioncircleo' size={30} color='white' />
                            </View>
                            <Text/>
                            <ScrollView>
                                <Text style={styles.header2}>How to Change Food Preference?</Text>
                                <Text style={styles.header3}>Click on Indicate your Preference</Text>
                                <Text/>
                                <Text style={styles.header2}>How can I check the restaurants recommended to me by others?</Text>
                                <Text style={styles.header3}>Click on the Mail icon to check the recommended restaurants</Text>
                                <Text/>
                                <Text style={styles.header2}>Where do I find images I have submitted for reviews?</Text>
                                <Text style={styles.header3}>Click on the image icon to view your favorited restaurants</Text>
                            </ScrollView>
                            <Text/>
                            <Button fn={() => changeVisibility(!visibility)} text='Close' />
                        </View>
    
                    </View>
                </Modal>
                <LinkIconButtonWithOptionalText text='Help' iconColor='red' floating={true} fn={() => changeVisibility(!visibility)} iconName='questioncircleo' iconSize={50} />
                </>
            )
        case 'home':
            return (
                <>
                <Modal
                animationType="slide"
                transparent={true}
                visible={visibility}>
                    <View style={styles.popupContainer}>
                        <View style={styles.popup}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.header1}>Help </Text>
                                <Icon name='questioncircleo' size={30} color='white' />
                            </View>
                            <Text/>
                            <ScrollView>
                                <Text style={styles.header2}>How do I find information and reviews of restaurants?</Text>
                                <Text style={styles.header3}>Click on the restaurant's tab</Text>
                                <Text/>
                                <Text style={styles.header2}>How do I set a restaurant as a favorite?</Text>
                                <Text style={styles.header3}>Click on the restaurant's tab and click the "Save as Favorite" button</Text>
                                <Text/>
                                <Text style={styles.header2}>How can I leave my review of the restaurant?</Text>
                                <Text style={styles.header3}>Click on the restaurant's tab and click the "Review" button</Text>
                                <Text/>
                                <Text style={styles.header2}>How can I find a specific restaurant?</Text>
                                <Text style={styles.header3}>Key in the resataurant's name into the search bar or filter restaurants by distance, classification, or rating</Text>
                                <Text/>
                                <Text style={styles.header2}>How can I check the restaurants recommended to me by others?</Text>
                                <Text style={styles.header3}>Click on the Mail icon to check the recommended restaurants</Text>
                                <Text/>
                                <Text style={styles.header2}>How do I know if others have recommended restaurants to me?</Text>
                                <Text style={styles.header3}>A red Mail icon indicates that there are unread recommendations in your inbox. Else if it is black, there are no new recommendations</Text>
                            
                            </ScrollView>
                            <Text/>
                            <Button fn={() => changeVisibility(!visibility)} text='Close' />
                        </View>
    
                    </View>
                </Modal>
                </>
            )
        case 'wallet':
            return (
                <Modal
                animationType="slide"
                transparent={true}
                visible={visibility}>
                    <View style={styles.popupContainer}>
                        <View style={styles.popup}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.header1}>Help </Text>
                                <Icon name='questioncircleo' size={30} color='white' />
                            </View>
                            <Text/>
                            <ScrollView>
                                <Text style={styles.header2}>Features are under development, please stay tuned in the future!</Text>
                            </ScrollView>
                            <Text/>
                            <Button fn={() => changeVisibility(!visibility)} text='Close' />
                        </View>
    
                    </View>
                </Modal>
        )
    }
 
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between', 
        height: '100%',
    }, 
    header1: {
        fontSize: 30,
        color: 'white',
    },
    header2: {
        fontSize: 20,
        color: 'white',
    },
    header3: {
        fontSize: 15,
        color: '#00ff44',
    },
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        height: '70%',
        width: '70%',
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between'
    }
});