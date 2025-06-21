//Karma Backing Option (Free Support)
await updateDoc(doc(db, 'auctions', auction.id), {
    karmaBackers: arrayUnion(user.uid)
  });
  