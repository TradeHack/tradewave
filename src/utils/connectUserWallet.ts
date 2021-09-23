import Moralis from 'moralis';

//TODO: this needs to be refactored to add supplier information
export const connectUserWallet = async (currentUser: Moralis.User) => {
  const ethAddress: string = currentUser.get('ethAddress');
  const user = new (Moralis as any).User();
  user.set('ethAddress', ethAddress);
  try {
    await user.signUp();
  } catch (error: any) {
    alert(`Error ${error.code} ${error.message}`);
  }
};
