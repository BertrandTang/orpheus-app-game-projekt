import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Game() {
    const [choice, setChoice] = useState("");
    const [baseNumber, setBaseNumber] = useState("");
    const [score, setScore] = useState("");

    console.log(`beginning base Number = ${baseNumber} et score = ${score}`);

    const navigation = useNavigation();

    // This useEffect runs once on component mount to set initial numbers
    useEffect(() => {
        setBaseNumber(Math.floor(Math.random() * 100));
        setScore(Math.floor(Math.random() * 100));
        console.log(
            `useeffect initialisation base Number = ${baseNumber} et score = ${score}`
        );
    }, []);

    // This useEffect handles the game logic and resets for the next round
    useEffect(() => {
        if (choice) {
            console.log(
                `in useeffect base Number = ${baseNumber} et score = ${score}`
            );
            const winner =
                (choice === "higher" && score > baseNumber) ||
                (choice === "lower" && baseNumber > score);
            navigation.navigate("Result", { winner, baseNumber, score });

            // Reset for the next round immediately after navigating
            setChoice(""); // Reset choice to allow making a new one
            setBaseNumber(Math.floor(Math.random() * 100)); // Generate new numbers
            setScore(Math.floor(Math.random() * 100));
        }
    }, [choice, navigation, baseNumber, score]); // Dependencies are important here

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text>Starting: {baseNumber}</Text>

            <TouchableHighlight
                onPress={() => {
                    console.log("higher pressed");
                    setChoice("higher");
                }}
                style={[styles.button, styles.buttonGreen]}
            >
                <Text style={styles.buttonText}>Higher</Text>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => {
                    console.log("lower pressed");
                    setChoice("lower");
                }}
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    baseNumber: {
        fontSize: 40,
        marginBottom: 30,
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 10,
        padding: 30,
        marginVertical: 15,
    },
    buttonRed: {
        backgroundColor: "red",
    },
    buttonGreen: {
        backgroundColor: "green",
    },
    buttonText: {
        color: "white",
        fontSize: 24,
    },
});
