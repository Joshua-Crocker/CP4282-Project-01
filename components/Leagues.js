import { Text, Image, StyleSheet, View } from 'react-native';
import { Card } from '@rneui/themed';
import imageMappings from './imageMappings';

export default function Leagues({ props }) {
  const imageSource = props.imageLink && props.imageLink !== 'link' ? 
    { uri: props.imageLink } : imageMappings[props.name];

  return (
    <View style={styles.leagueContainer}>
      <Card>
        <Card.Title style={styles.leagueName}>{props.name}</Card.Title>
        <Card.Divider />
        <Image style={styles.leagueImage} source={imageSource} />
        <Text style={styles.leagueYear}>{props.year}</Text>
        <Text style={styles.leagueCommissioner}>{props.commissioner}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  leagueContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  leagueName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  leagueImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderColor: '#3498db',
    borderWidth: 5,
    borderRadius: 10,
  },
  leagueYear: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  leagueCommissioner: {
    fontSize: 16,
    color: '#555',
  }
});
