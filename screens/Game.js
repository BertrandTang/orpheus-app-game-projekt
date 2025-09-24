import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableHighlight, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Game() {
    const [choice, setChoice] = useState('');
    const baseNumber = Math.floor(Math.random() * 100);
    const score = Math.floor(Math.random() * 100);

    console.log(`beginning base Number = ${baseNumber} et score = ${score}`);

    const navigation = useNavigation();

    useEffect(() => {
        if (choice) {
            console.log(`log in useeffect base Number = ${baseNumber} et score = ${score}`);
            const winner =
                (choice === 'higher' && score > baseNumber) ||
                (choice === 'lower' && baseNumber > score);

            navigation.navigate('Result', {
                winner,
                baseNumber,
                score
            });
        }
    }, [baseNumber, score, choice]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text>Starting: {baseNumber}</Text>

            <TouchableHighlight
                onPress={() => setChoice('higher')}
                style={[styles.button, styles.buttonGreen]}
            >
                <Text style={styles.buttonText}>Higher</Text>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => setChoice('lower')}
                style={[styles.button, styles.buttonRed]}
            >
                <Text style={styles.buttonText}>Lower</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    baseNumber: {
        fontSize: 40,
        marginBottom: 30,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        padding: 30,
        marginVertical: 15,
    },
    buttonRed: {
        backgroundColor: 'red',
    },
    buttonGreen: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
    },
});