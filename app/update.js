import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import Button from '../components/Button'; // Ensure the path is correct
import { useSQLiteContext } from 'expo-sqlite';
import { LinearProgress } from '@rneui/themed'; // Import LinearProgress

const Update = () => {
  const [currentIndex, setIndex] = useState(0);
  const [newLeague, updateNewLeague] = useState({
    name: "", year: "", commissioner: "", imageLink: ""
  });
  const db = useSQLiteContext();
  const [leagues, setLeagues] = useState([]);
  const [loading, isLoading] = useState(true);

  const insertNewLeague = async (name, year, commissioner, uri) => {
    await db.runAsync(`
      INSERT INTO leagues (name, year, commissioner, imageLink) VALUES (?, ?, ?, ?)`, 
      name, year, commissioner, uri
    );
  };

  const updateLeagues = async (name, year, commissioner, uri, leagueToReplace) => {
    await db.runAsync(`
      UPDATE leagues SET name = ?, year = ?, commissioner = ?, imageLink = ? WHERE name = ?`, 
      name, year, commissioner, uri, leagueToReplace
    );
  };

  useEffect(() => {
    async function start() {
      const result = await db.getAllAsync(`SELECT * FROM leagues`);
      setLeagues(result);
      isLoading(false);
    }
    start();
  }, []);

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <LinearProgress style={styles.progress} />
      </View>
    );
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Item to Replace</Text>
        <View style={styles.buttonContainer}>
          {leagues.map((league, index) =>
            <Button
              key={index}
              label={league.name} 
              onPress={() => setIndex(index)}
              isActive={currentIndex === index} 
              style={currentIndex === index ? styles.activeButton : null} 
            />
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder='Paste Image URL here'
          onChangeText={image => updateNewLeague({ ...newLeague, imageLink: image })}
          placeholderTextColor={"#888"}
        />
        <TextInput
          style={styles.input}
          placeholder='Insert Name here'
          onChangeText={name => updateNewLeague({ ...newLeague, name: name })}
          placeholderTextColor={"#888"}
        />
        <TextInput
          style={styles.input}
          placeholder='Insert Year here'
          onChangeText={year => updateNewLeague({ ...newLeague, year: year })}
          placeholderTextColor={"#888"}
        />
        <TextInput
          style={styles.input}
          placeholder='Insert Commissioner here'
          onChangeText={commissioner => updateNewLeague({ ...newLeague, commissioner: commissioner })}
          placeholderTextColor={"#888"}
        />
        <View style={styles.buttonContainer}>
          <Button
            label="Update"
            onPress={() => {
              updateLeagues(newLeague.name, newLeague.year, newLeague.commissioner, newLeague.imageLink, leagues[currentIndex].name)
            }}
            style={styles.actionButton}
          />
          <Button
            label="Add"
            onPress={() => {
              insertNewLeague(newLeague.name, newLeague.year, newLeague.commissioner, newLeague.imageLink)
            }}
            style={styles.actionButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    width: '80%',
    marginVertical: 20,
    color: '#3498db',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  actionButton: {
    margin: 10,
  },
  activeButton: {
    backgroundColor: '#2980b9', 
  }
});

export default Update;
