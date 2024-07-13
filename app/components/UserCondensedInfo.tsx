import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

type UserCondensedInfoProps = {
    username: string;
    preference: string;
    rank: string;
};

export default function UserCondensedInfo(props: UserCondensedInfoProps) {
    const { username, preference, rank } = props;

    // Truncate the preference field to the first 4 words
    const truncatedPreference = preference.split(' ').slice(0, 4).join(' ') + ' ...';

    // Create query string with parameters
    const queryParams = `username=${username}&preference=${truncatedPreference}&rank=${rank}`;

    return (
        <Link href={`/pages/recommendToUserPage?${queryParams}`} style={styles.overallContainer} replace={true}>
            <View style={styles.profileIconContainer}>
                <FontAwesome name="user-circle" size={50} color="black" />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.informationText}>User: {username}</Text>
                <Text style={styles.informationText}>Preference: {truncatedPreference}</Text>
                <Text style={styles.informationText}>Rank: {rank}</Text>
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    overallContainer: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileIconContainer: {
        marginRight: 15,
        width: "30%"
    },
    userInfoContainer: {
        flexDirection: 'column',
        marginLeft: 15,
    },
    informationText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

