import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface GeoNavFeedProps {
  location: string; // e.g. city/state/country
}

type GeoPost = {
  id: string;
  content: string;
  location: string;
  timestamp: any;
};

export default function GeoNavFeed({ location }: GeoNavFeedProps) {
  const [posts, setPosts] = useState<GeoPost[]>([]);

 
