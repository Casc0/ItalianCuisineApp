// StarRating.js — Displays 1-5 stars, supports read-only (display) and interactive (form input) modes
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { rateRecipe } from '../../Services/recipes.service';
import styles from './Styles';

export default function StarRating({ slug, currentAverage, currentTotal, onRated }) {
  const { token } = useAuth();
  const [myVote, setMyVote] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handlePress = async (value) => {
    if (!token || submitting) return;
    setSubmitting(true);
    try {
      const updated = await rateRecipe(slug, value, token);
      setMyVote(value);
      onRated?.(updated);
    } catch (error) {
      console.error('Error al valorar:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.summary}>
        ⭐ {currentAverage ?? 0} ({currentTotal ?? 0} valoraciones)
      </Text>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity key={value} onPress={() => handlePress(value)} disabled={submitting}>
            <Text style={[styles.star, value <= myVote && styles.starFilled]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      {myVote > 0 && <Text style={styles.thanks}>¡Gracias por tu valoración!</Text>}
    </View>
  );
}